## 准备工作

- 下载java JDK

## 1. 下载Jenkins

官网：https://jenkins.io/zh/download/

登录官网，根据系统的类型，下载不同版本的Jenkins。

![img](img/2_Windows安装/pxynxsrl3ycx6_15978aee703846a39a1754612e7933af.png)

## 2. 安装Jenkins

1）点击安装包

![img](img/2_Windows安装/pxynxsrl3ycx6_b532c27ff3f545cf826708a9224cca7a.png)

2）下一步选择安装路径

![img](img/2_Windows安装/pxynxsrl3ycx6_5b82f22aa8c84f52b238c6222b4ec4f7.png)3)选择本地系统

![img](img/2_Windows安装/pxynxsrl3ycx6_21f5f6233f95406fbe63251874017d57.png)

4） 选择端口

![img](img/2_Windows安装/pxynxsrl3ycx6_5084257470404e2ea0dd446f6b0069c1.png)

5）安装

![img](img/2_Windows安装/pxynxsrl3ycx6_7884e9ec5b814ed282135779c0d09a5f.png)

![img](img/2_Windows安装/pxynxsrl3ycx6_8f4b29ff953e4912aca1525543191ff5.png)![img](img/2_Windows安装/pxynxsrl3ycx6_559c3c1502e84ceaa82f677e98a4475a.png)

直接安装即可。

## 3. 运行Jenkins

1）打开cmd，切换到jenkins的安装路径下

![img](img/2_Windows安装/pxynxsrl3ycx6_240b2a8c2e414742b2c020f1ffadee37.png)

![img](img/2_Windows安装/pxynxsrl3ycx6_bc97a689badf4a57bb222b9772b1af5f.png)

2）输入启动命令，启动jenkis

输入如下命令来启动jenkis：

```shell
java -jar jenkins.war --httpPort=8083
```

启动成功后，显示如下：

![img](img/2_Windows安装/pxynxsrl3ycx6_d348272309284230b44884fa1c2d69c6.png)

3）打开网页查看jenkis

打开浏览器输入`http://localhost:8083`。可以看到Jenkins已经启动。

> 注意：这里的端口号要与启动时的端口号一致。

![img](img/2_Windows安装/pxynxsrl3ycx6_df51721a75cc4340aecbfc87f5eebab6.png)
