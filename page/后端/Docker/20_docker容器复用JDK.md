> 参考【
>
> https://blog.csdn.net/qq_27520051/article/details/102637189
>
> 】

# 使用数据卷、数据卷容器实现多个容器共享JDK

## 需求背景

项目的jar包只十几兆，如果使用传统的Dockerfile文件

```sh
FROM openjdk:21
COPY ./target/my-app-1.0.jar /usr/app/my-app.jar
WORKDIR /usr/app
CMD ["java", "-jar", "my-app.jar"]
```

会导致一个项目jar的镜像占用的磁盘大小为`项目jar包的大小+jdk镜像的大小`

而一个jdk镜像往往四五百兆，会导致磁盘的浪费

基于这种情况，解决方法目前我知道的有两种

1. 只启动一个jdk的容器，所有使用该jdk版本的项目jar都放到该jdk容器中执行
2. 利用数据卷挂载的方式，在每个容器内共享该数据卷

本笔记便是对方法二实践的记录

## 环境准备

-  Ubuntu 24.04 LTS

```sh
docker pull swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/ubuntu:24.10
docker tag  swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/ubuntu:24.10 ubuntu:24.10
docker rmi swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/ubuntu:24.10
```

- 安装jdk镜像

```sh
docker pull swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/openjdk:8u342-jdk
docker tag  swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/openjdk:8u342-jdk jdk:8u342
docker rmi swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/openjdk:8u342-jdk
```

- 准备项目jar包

![image-20241129141918781](img/20_docker%E9%83%A8%E7%BD%B2JDK%E5%B9%B6%E7%BB%99%E5%85%B6%E4%BB%96%E5%AE%B9%E5%99%A8%E4%BD%BF%E7%94%A8/image-20241129141918781.png)

## 运行共享的JDK容器

准备挂载目录

```sh
mkdir -p /home/docker_volume/jdk/jdk8/share
```

启动一个JDK容器并保持它运行，而不是让它执行完命令后退出，你需要确保容器有一个长期运行的进程。对于JDK容器来说，通常没有默认的长期运行进程，因为JDK本身不提供一个服务来保持容器运行。

```sh
# -d 参数让容器在后台运行，
# sleep infinity 命令会让容器无限期地休眠，从而保持容器运行。
docker run --name jdk8 -d jdk:8u342 sleep infinity
```

**使用 `sleep` 命令**

```sh
docker run --name jdk8 -d jdk:8u342 sleep infinity
```

**拷贝出jdk**

```sh
docker cp jdk8:/usr/local/openjdk-8/. /home/docker_volume/jdk/jdk8/share
```

卸载容器

```shell
docker stop jdk8
docker rm jdk8
```

重新挂载

```sh
docker run --name jdk8 -d \
-v /home/docker_volume/jdk/jdk8/share:/usr/local/openjdk-8 \
jdk:8u342 sleep infinity
```

## 多个容器挂载宿主机的JDK（数据卷）

> 宿主机安装JDK环境，直接将jar运行的运行所需要的环境直接映射到宿主机的jdk目录即可，我这里就不做实操，照搬百度。
>
> 这里假设服务器是已经安装好jdk的情况下

编写Dockerfile制作镜像，将`app.jar`拷贝到镜像中，并制定Java环境变量

```dockerfile
FROM ubuntu:24.10

# 切换到 root 用户，并设置时区
USER root

#拷贝jar包
COPY app.jar /workSpace/app.jar

# 这里的/home/docker/jdk目录只是一个示例可以修改，真正起作用是在启动容器时的-v命令，将这个目录挂载到物理机的某个目录。
ENV JAVA_HOME="/home/docker/jdk"
ENV PATH="${PATH}:${JAVA_HOME}/bin:${JAVA_HOME}/sbin"

# 设置时区
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

ENTRYPOINT  (sleep 10 && java -version) & \
           (sleep 10 && java -jar /workSpace/app.jar) & \
           tail -f /dev/null
           
```

> **ENTRYPOINT说明**
>
> - 容器启动后，首先休眠10秒，然后打印 Java 的版本信息。
> - 容器启动后，同时休眠10秒，然后执行 `/demo/bin/demo.sh` 脚本。
> - 容器启动后，同时执行 `tail -f /dev/null` 命令，保持容器运行状态。
>
> 第三个命令，它使用 `tail` 命令跟踪 `/dev/null` 文件的内容。由于 `/dev/null` 是一个空设备，这个命令实际上会无限期地等待，从而保持容器运行状态。

需要注意的是，以上镜像是没有jdk环境的，所以在生成容器的时候一定要把宿主机jdk目录挂载到容器中。

**构建镜像**

![image-20241129151246163](img/20_docker%E9%83%A8%E7%BD%B2JDK%E5%B9%B6%E7%BB%99%E5%85%B6%E4%BB%96%E5%AE%B9%E5%99%A8%E4%BD%BF%E7%94%A8/image-20241129151246163.png)

```shell
cd /root
docker build -t test:v1 .
```

**启动容器，并挂载宿主机上的JDK(`根据你的实际情况来`)**

```sh
# mkdir -p /data/uploadPortal/dataResourcePortal

docker run -d \
--name test \
-p 9879:9879 \
-v /home/docker_volume/jdk/jdk8/share:/home/docker/jdk \
-v /data/uploadPortal/dataResourcePortal:/data/uploadPortal/dataResourcePortal \
test:v1

docker run -d \
--name test \
-p 9879:9879 \
-v /home/docker_volume/jdk/jdk8/share:/home/docker/jdk \
test:v1

#docker stop test
# docker rm test
```

