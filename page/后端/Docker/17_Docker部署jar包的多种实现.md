SpringBoot项目最直接的部署方式，是将项目打包成可执行jar包，然后 `java -jar` 执行。

容器化部署是另外一种流行的方式，把jar包放到Docker中运行，主要有三种方式。

## 方法一、直接构建jar包运行的镜像

##### 1.准备jar

将项目打包，上传到服务器的指定目录

##### 2.创建Dockerfile

在该目录下创建Dockerfile文件

```sh
vi Dockerfile
```

##### 3.编写Dockerfile

Dockerfile写入如下指令

```sh
FROM java:8
MAINTAINER demo
ADD demo-0.0.1-SNAPSHOT.jar demo.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","demo.jar"]
```

其中指令的含义：

- FROM：基础镜像，`FROM java:8` 指的是拉取一个jdk1.8的镜像
- MAINTAINER：作者，`MAINTAINER demo` 作者是demo
- ADD: 将打包的可执行jar包复制到镜像中并重命名（用 COPY 也可），`ADD demo-0.0.1-SNAPSHOT.jar demo.jar`将demo-0.0.1-SNAPSHOT.jar 复制到镜像中并重命名为 demo.jar
- EXPOSE: 声明端口
- ENTRYPOINT ： 容器启动之后执行的命令，`java -jar demo.jar` 即启动jar

##### 4.构建镜像

创建好Dockerfile文件之后，执行命令 **构建镜像**

```
docker build -t my-demo .
```

注意最后的 `.` 表示Dockerfile在当前文件目录下。my-demo表示构建的镜像，构建成功后可以使用`docker images`命令查看镜像。

##### 5.运行容器

镜像构建成功之后，就可以运行容器

```
docker run -d --restart=always --name demo -p 8080:8080 my-demo
```

其中参数的含义：

- -d :后台运行容器，并返回容器ID
- –restart=always :容器在停止或服务器开机之后会自动重新启动
- -p :指定端口映射
- 最后的 my-demo指定镜像

##### 6.查看运行的容器

启动容器后可以使用 `docker ps`命令查看启动的容器

```sh
docker ps
```



##### 7.查看容器日志

运行下述命令查看目标容器的日志

```sh
docker logs --tail 300 -f 容器id
```

##### 8.更新jar包

如果想更新jar包，只需要使用`docker cp demo-0.0.1-SNAPSHOT.jar 容器ID:/demo.jar`，就可以将demo-0.0.1-SNAPSHOT.jar拷贝进容器并重命名，然后 `docker restart 容器ID` 重启容器。



## 方法二、基于jdk镜像运行容器

方法一是直接构建了一个运行jar包的镜像，这里还有另外一种方式，基于jdk镜像运行容器。

##### 1.准备JDK镜像

我这里以jdk1.8为例，在服务器中拉取jdk1.8的镜像

```sh
docker pull jdk8
```

##### 2.准备jar

创建目录，并将jar包上传到该目录

```sh
 cd /server/
 mkdir deploy/jar
```

##### 3.运行容器

运行容器:在运行容器的命令里指定包的运行

```sh
docker run -d \
--restart=always \
-v /server/deploy/jar:/jar
-v /server/logs/demo:/mnt/logs/demo \
-p 7778:7778 \
--name demo \
jdk8 /usr/bin/java -jar \
-Duser.timezone=GMT+08 \
/jar/demo-1.0.jar
```

上面命令的说明：

- **`jdk8`**: 这是要使用的基础镜像名，这里指的是一个包含 JDK 8 的 Docker 镜像。
- **`/usr/bin/java -jar`**: 指定容器启动时执行的命令，这里是调用 Java 运行时来执行 Jar 文件。
- **`-Duser.timezone=GMT+08`**: 这是传递给 Java 的系统属性，设置时区为 GMT+08。这个参数确保应用在正确的时区下运行。
- **`/jar/demo-1.0.jar`**: 这是要运行的 JAR 文件的路径，位于容器内部的 `/jar` 目录中。

##### 4.更新

以后发布，只需要把宿主机目录里的jar包替换掉，重启容器。

## 方法三：基于Maven插件部署

##### docker允许远程访问

修改Docker配置开启允许远程访问 Docker 的功能，开启方式很简单，修改 `/usr/lib/systemd/system/docker.service` 文件，加入如下内容：

```sh
-H tcp://0.0.0.0:2375  -H unix:///var/run/docker.sock
```

配置完成后，保存退出，然后重启 Docker：

```sh
systemctl daemon-reload    
service docker restart 
```

##### 准备Dockerfile

在SpringBoot项目的目录下新建Dockerfile文件

```sh
FROM java:8
VOLUME /tmp
ADD target/docker-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

##### 配置插件

配置Maven插件：在pom.xml文件中添加如下插件：

```xml
<plugin>
    <groupId>com.spotify</groupId>
    <artifactId>docker-maven-plugin</artifactId>
    <version>1.2.0</version>
    <executions>
        <execution>
            <id>build-image</id>
            <phase>package</phase>
            <goals>
                <goal>build</goal>
            </goals>
        </execution>
    </executions>
    <configuration>
        <dockerHost>http://192.168.66.131:2375</dockerHost>
        <imageName>javaboy/${project.artifactId}</imageName>
        <imageTags>
            <imageTag>${project.version}</imageTag>
        </imageTags>
        <forceTags>true</forceTags>
        <dockerDirectory>${project.basedir}</dockerDirectory>
        <resources>
            <resource>
                <targetPath>/</targetPath>
                <directory>${project.build.directory}</directory>
                <include>${project.build.finalName}.jar</include>
            </resource>
        </resources>
    </configuration>
</plugin>
```

这个插件的配置说明：

- 首先在 execution 节点中配置当执行 mvn package 的时候，顺便也执行一下 docker:build
- 然后在 configuration 中分别配置 Docker 的主机地址，镜像的名称，镜像的 tags，其中 dockerDirectory 表示指定 Dockerfile 的位置。
- 最后 resource 节点中再配置一下 jar 的位置和名称即可。

##### 执行命令

```sh
mvn clean package docker:build
```

就可以在服务器上看到构建的镜像了，启动镜像即可。

>`-H tcp://0.0.0.0:2375` 和 `-H unix:///var/run/docker.sock` 是 Docker 的命令行选项，用于指定 Docker 守护进程的监听地址。以下是这两个参数的详细解释：
>
>### 参数详解
>
>1. **`-H tcp://0.0.0.0:2375`**:
>    - 这个选项让 Docker 守护进程通过 TCP 协议监听在所有网络接口的 2375 端口（即 `0.0.0.0`）。
>    - 这意味着您可以从任何地方通过 TCP 连接到 Docker 守护进程。
>    - **注意**: 使用未加密的 TCP 连接（如 2375）**存在安全隐患**，建议在生产环境中使用 TLS 加密。
>2. **`-H unix:///var/run/docker.sock`**:
>    - 这个选项让 Docker 守护进程通过 Unix 套接字（socket）进行通信，路径为 `/var/run/docker.sock`。
>    - 这是默认的 Docker 守护进程通信方式，大多数 Docker CLI 命令都使用此套接字进行本地通信。
>    - 使用 Unix 套接字通常更安全，因为它只允许本地用户访问。
>
>### 总结
>
>结合这两个选项，Docker 守护进程将同时支持通过 TCP 和 Unix 套接字进行连接。这使得您可以在本地（使用 Unix 套接字）和远程（使用 TCP）管理 Docker 容器。
>
>不过，请务必注意安全性，尤其是在启用 TCP 连接时，确保有适当的防火墙规则和身份验证机制，以防止未授权访问。
