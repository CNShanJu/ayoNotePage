# DPanel

`DPanel` 是一款 `Docker` 可视化管理面板，提供了完善的容器、镜像、存储、网络等功能。

根据作者自己的描述，它的主要功能为：

> - 全中文的界面，相比于 `portainer` 更友好
> - 完善的容器管理功能，提供域名转发，文件管理，日志监控等功能。轻松对容器内的文件进行管理。
> - 提供容器之间的关联功能，便于多个容器之间的互相依赖访问。
> - 提供多种环境的基础镜像和模板，可以快速构建属于自己的镜像。
> - 可以通过`Dockerfile`、 `Zip` 或是 `Git` 构建镜像，快速实现可持续化构建。

> 官方开源地址：https://github.com/donknap/dpanel
>
> 官方文档：https://doc.dpanel.cc/#/

## 安装

国内镜像 registry.cn-hangzhou.aliyuncs.com/dpanel/dpanel:latest

```shell
docker pull registry.cn-hangzhou.aliyuncs.com/dpanel/dpanel:latest
docker tag registry.cn-hangzhou.aliyuncs.com/dpanel/dpanel:latest dpanel:latest
docker rmi registry.cn-hangzhou.aliyuncs.com/dpanel/dpanel:latest


# docker stop dpanel
# docker rm dpanel
# docker rmi dpanel
```

创建对应挂载的目录

```shell
cd /home/docker_volume
mkdir dpanel
cd dpanel
mkdir data
```

#### 启动并运行容器

```shell
docker run -it -d \
--name dpanel \
--restart=always \
-p 80:80 -p 443:443 -p 8807:8080 \
-e APP_NAME=dpanel \
-v /var/run/docker.sock:/var/run/docker.sock \
-v /home/docker_volume/dpanel/data:/dpanel \
dpanel:latest 
###################################
docker run -it -d \
--name dpanel \
--restart=always \
-p 8807:8080 \
-e APP_NAME=dpanel \
-v /var/run/docker.sock:/var/run/docker.sock \
-v /home/docker_volume/dpanel/data:/dpanel \
dpanel:latest 
###################################
docker run -it -d \
--name dpanel \
--restart=always \
-p 8805:80 -p 8806:443 -p 8807:8080 \
-e APP_NAME=dpanel \
-v /var/run/docker.sock:/var/run/docker.sock \
-v /home/docker_volume/dpanel/data:/dpanel \
dpanel:latest 
```

面板会产生一些数据存储至容器内的 `/dpanel` 目录中，默认下此目录会挂载到docker的存储卷中

如果你想将此目录持久化到宿主机目录中，可以通过修改 -v 参数。

指定目录必须是绝对目录，目录不存在时会自动新建，例如：-v /root/dpanel:/dpanel

配置中的 `-p 8807:8080` 指定面板对外暴露的访问端口，可根据实际情况进行修改

#### 访问地址

```
http://127.0.0.1:8807
```

#### 默认帐号

admin / admin
