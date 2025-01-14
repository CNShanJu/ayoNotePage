### 前言

网页端一般会遇到各种文件，比如：txt、doc、[docx](https://so.csdn.net/so/search?q=docx&spm=1001.2101.3001.7020)、pdf、xml、xls、xlsx、ppt、pptx、zip、png、jpg等等。

有时候我们不想要把文件下载下来，而是想在线打开文件预览 ，这个时候如果每一种格式都需要我们去写代码造轮子去实现预览功能就太复杂了，并且自己实现的话会有很多兼容性问题。
这个时候 kkFileView 的出现就解决了我们的问题。

### kkFileView介绍

kkFileView 为文件文档在线预览解决方案，该项目使用流行的spring boot搭建，易上手和部署，基本支持主流办公文档的在线预览，如doc,docx,[xls](https://so.csdn.net/so/search?q=xls&spm=1001.2101.3001.7020),xlsx,ppt,pptx,pdf,txt,zip,rar,图片,视频,音频等等

[kkFileView 官网](https://kkfileview.keking.cn/zh-cn/index.html)
[kkFileView 码云地址官网](https://gitee.com/kekingcn/file-online-preview)
[kkFileView github地址官网](https://github.com/kekingcn/kkFileView)

## kkFileView的docker安装

### 方式一：拉取镜像

基于镜像仓库的镜像安装 => 版本太老了

```sh
docker pull swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/keking/kkfileview:4.1.0
docker tag  swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/keking/kkfileview:4.1.0  keking/kkfileview:4.1.0
docker rmi swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/keking/kkfileview:4.1.0
```

#### 运行

```bash
docker run -it --name="kkfileview" -p 8012:8012 keking/kkfileview:4.1.0
```

浏览器访问容器8012端口 `http://127.0.0.1:8012` 即可看到项目演示用首页

### 方式二：基于源码构建镜像

基于Gitee仓库的代码自己构建

访问开源地址：https://gitee.com/kekingcn/file-online-preview，找到Git的拉取地址，将文件拉取到本地

```sh
git clone https://gitee.com/kekingcn/file-online-preview.git
```

然后用 maven 进行打包

![image-20241129182059400](img/1_kkFileView%E5%AE%89%E8%A3%85%E5%8F%8A%E4%BD%BF%E7%94%A8/image-20241129182059400.png)

将对应的文件上传服务器

![image-20241129182250478](img/1_kkFileView%E5%AE%89%E8%A3%85%E5%8F%8A%E4%BD%BF%E7%94%A8/image-20241129182250478.png)

![image-20241129185343840](img/1_kkFileView%E5%AE%89%E8%A3%85%E5%8F%8A%E4%BD%BF%E7%94%A8/image-20241129185343840.png)

修改服务器上`kkfileview-base`文件下Dockerfile的内容，将FROM改成你自己docker上有的镜像

![image-20241129182805870](img/1_kkFileView%E5%AE%89%E8%A3%85%E5%8F%8A%E4%BD%BF%E7%94%A8/image-20241129182805870.png)

![image-20241129182824198](img/1_kkFileView%E5%AE%89%E8%A3%85%E5%8F%8A%E4%BD%BF%E7%94%A8/image-20241129182824198.png)

![image-20241129182911415](img/1_kkFileView%E5%AE%89%E8%A3%85%E5%8F%8A%E4%BD%BF%E7%94%A8/image-20241129182911415.png)

服务器上构建镜像`kkfileview-base:v4.4.0-beta`

```sh
cd /home/cache/kkfileview
docker build -t kkfileview-base:v4.4.0-beta kkfileview-base
```

![image-20241129183635197](img/1_kkFileView%E5%AE%89%E8%A3%85%E5%8F%8A%E4%BD%BF%E7%94%A8/image-20241129183635197.png)

修改Dockerfile文件内容如下

![image-20241129183940326](img/1_kkFileView%E5%AE%89%E8%A3%85%E5%8F%8A%E4%BD%BF%E7%94%A8/image-20241129183940326.png)

```dockerfile
FROM kkfileview-base:v4.4.0-beta
COPY ./kkFileView-4.4.0-beta.jar /opt/kkFileView/kkFileView.jar
COPY ./application.properties /opt/kkFileView/config/application.properties
ENV KKFILEVIEW_BIN_FOLDER=/opt/kkFileView-4.4.0-beta/bin
ENTRYPOINT ["java","-Dfile.encoding=UTF-8","-Dspring.config.location=/opt/kkFileView/config/application.properties","-jar","/opt/kkFileView/kkFileView.jar"]
```

服务器上构建镜像`keking/kkfileview:v4.4.0-beta`

```sh
cd /home/cache/kkfileview
docker build -t keking/kkfileview:v4.4.0-beta .
```

#### 运行容器

```sh
docker run -d -it \
--name="kkfileview" \
--restart=always \
-p 8012:8012 \
keking/kkfileview:v4.4.0-beta
```

```sh
docker logs kkfileview
```

![image-20241129190153136](img/1_kkFileView%E5%AE%89%E8%A3%85%E5%8F%8A%E4%BD%BF%E7%94%A8/image-20241129190153136.png)

删除多余镜像

```sh
docker rmi kkfileview-base:v4.4.0-beta
```

将当前容器导出用于以后使用

```sh
sudo docker save -o kkfileview:v4.4.0-beta.tar keking/kkfileview:v4.4.0-beta
```

文件比较大时间可能会有点长

![image-20241129190619976](img/1_kkFileView%E5%AE%89%E8%A3%85%E5%8F%8A%E4%BD%BF%E7%94%A8/image-20241129190619976.png)

### 方式三：安装离线镜像

```sh
sudo docker load -i kkfileview:v4.4.0-beta.tar
```

这里就相当于`方式一`的`pull`了,后续步骤安装方式一走即可