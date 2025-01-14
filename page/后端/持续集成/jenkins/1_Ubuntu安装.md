



虽然说网上有很多关于 `Jenkins` 安装的教程，但是大部分都不够详细，或者是需要搭配 `docker` 或者 `k8s` 等进行安装，对于新手小白而已，学习的成本确实有点大，所以该篇博客就是使用最原始的方式进行 `Jenkins` 的安装

## 一、简介



官网：[https://www.jenkins.io](https://www.jenkins.io/)

中文文档：https://www.jenkins.io/zh/

清华大学开源下载地址：https://mirrors.tuna.tsinghua.edu.cn/jenkins/war/latest/

![在这里插入图片描述](img/1_Ubuntu安装/87e4f2b50f0f54ca10628e5c2f322b4b.png)

`Jenkins` 是一个开源的持续集成（CI）工具，用于自动化构建、测试和部署软件项目。它提供了一个易于使用和可扩展的平台，帮助团队更高效地开发和交付软件。

## 	二、安装前准备

从 [Jenkins 的入门指南](https://www.jenkins.io/zh/doc/pipeline/tour/getting-started/) 中可以了解到

![image-20240928153718416](img/1_Ubuntu安装/image-20240928153718416-17275090397162.png)

Jenkins` 对机器的要求是至少要 `256 MB` 的内存，还需要安装 `Java

可以 `java -version` 命令来检查是否已经安装了 `Java`，如果有打印出 `Java` 的版本信息则表示已经安装过了

![在这里插入图片描述](img/1_Ubuntu安装/d7387d6712837197cfb2f3eca9862c30.png)

如何在 `Linux` 上安装 `Java`，具体步骤百度

假如你需要像我一样使用 `Jenkins` 在 `Linux` 上构建 `Java` 项目，可先安装一下 `maven`，步骤自行百度

在 `Linux` 上安装 `Jenkins` 非常简单，如果只是为了学习没必要非得使用 `docker`，和在 `Windows` 上用 `war` 包进行安装差不多，因为 `war` 是跨平台的，只需要系统上安装了 `Java` ，均可以 `java -jar` 的命令运行起来

## 三、下载与安装

进入 `Jenkins` 的 [官方下载页面](https://www.jenkins.io/download/)

![在这里插入图片描述](img/1_Ubuntu安装/dd756438efd4e911dbdf5457cea432b6.png)

`LTS` 是长期支持的版本，是稳定的版本

在下载安装包之前要先确定应该下载哪个版本的 `Jenkins`，`Jenkins` 的版本依赖于 `Java` 的版本，可在 [Jenkins-Java Support Policy](https://www.jenkins.io/doc/book/platform-information/support-policy-java/) 中进行查看

![在这里插入图片描述](img/1_Ubuntu安装/3c4da50c8a09973b2ede09ded4724ed2.png)

如果你下载的 `Jenkins` 版本与本地 `Java` 不支持，那么 `Jenkins` 是无法安装成功的，比如说我服务器上 `JDK` 的版本是 `1.8.0_311`，也就是 `Java 8`，那么我只能安装 `2.346.1` 或者该版本之前的，在 `Past Releases` 上可以查看到历史版本

注意：不过还是建议大家去安装 `JDK-21`，直接下载最新版本的 `Jenkins`，要不然插件安装会比较麻烦

![在这里插入图片描述](img/1_Ubuntu安装/23d02a71852f41be88797afcfeef7ab7.png)

页面如下 ：

![在这里插入图片描述](img/1_Ubuntu安装/0d7bc982e7e29edf7e936293a4e4f4f4.png)

比如我要下载 `2.346.1` 版本的，就下载该版本的 `jenkins.war` 文件

![在这里插入图片描述](img/1_Ubuntu安装/fd6076655938222a3993197d69618833.png)

![在这里插入图片描述](img/1_Ubuntu安装/a38f314f82489724c801222b63384819.png)

下载完成之后就把该 `war` 包上传至服务器

这里我会先在服务器上创建一个 `/soft/jenkins` 的文件夹用于存放 `jenkins` 的安装包，并进入到该目录下

```shell
# 创建 /soft/jenkins 文件夹
mkdir /soft/jenkins
# 进入到 /soft/jenkins 文件夹下
cd /soft/jenkins
```

![在这里插入图片描述](img/1_Ubuntu安装/6967cf885965263ca3e261a4f9194341.png)

使用 `rz` 命令将下载好的安装包上传到该目录下

![在这里插入图片描述](img/1_Ubuntu安装/57f342fefb58089b34f9725e71eae92f.png)

可以用 `ls` 命令查看是否上传成功

![在这里插入图片描述](img/1_Ubuntu安装/f3ce29e18405df2f0fc349352fde5c60.png)

上传成功之后就可以直接用 `java -jar` 命令启动起来，可以通过 `httpPort` 来指定端口号

```shell
java -jar jenkins.war --httpPort=8080
```

![在这里插入图片描述](img/1_Ubuntu安装/752050d271bb7c6a9156c6f997c02bd3.png)

首次启动会比较慢，因为需要初始化和存放一些文件到 `.jenkins` 的目录下

![在这里插入图片描述](img/1_Ubuntu安装/48df670d4b8ca8a7586f427e7f6a06b8.png)

在启动过程中会打印出 `管理员账户密码`

这个时候就可以去游览器上访问下 `ip:port`，`ip` 是服务器的 `ip` 地址，`port` 是启动 `jenkins` 的端口，比如：`192.163.10.12:8080` ，如果你用的是 `云服务器`，可别忘了在云服务器上开放该端口号

![在这里插入图片描述](img/1_Ubuntu安装/c64a130d2f3644db71068faf98b777d8.png)

在游览器上展示页面如下，就可以进行初始化了

![在这里插入图片描述](img/1_Ubuntu安装/ad2566111ff2b8f2735586db44716b91.png)

将 `管理员账户密码` 复制到对应的地方，点击 `继续`

![在这里插入图片描述](img/1_Ubuntu安装/5593fcd9cf9600ac15c5c552a93fcb69.png)

这里建议点击 `选择插件来安装`，在点击 `无` ，不安装任何插件，再点击 `安装`，因为我们没有配置镜像，安装插件是从外网下载过来的，会比较慢，并且下载的插件可能会出现不兼容等状况，导致失败率很高

![在这里插入图片描述](img/1_Ubuntu安装/b3c11bea5a002bfb6c62067d234d97ba.png)

进入到创建管理员页面，填写账户信息后 `保存并完成`

![在这里插入图片描述](img/1_Ubuntu安装/6f707d366f9fac436a3d702a07a8484d.png)

进入以下页面配置 `jenkins` 的 `url` ，一般使用默认的就行了，`保存并完成`

![在这里插入图片描述](img/1_Ubuntu安装/fdfb94311d4cfda61556880c5b41ab60.png)

初始化完成

![在这里插入图片描述](img/1_Ubuntu安装/6f028b5e0245c3a735b1474acc0c84c2.png)

可以点击 `开始使用 Jenkins` 直接登录进入 `Jenkins`

![在这里插入图片描述](img/1_Ubuntu安装/eda487d7f65ccbf09b83332cc067db0c.png)

## 四、配置镜像地址

之前启动 `Jenkins` 时会打印出管理员账户密码所在文件，例如：`/root/.jenkins/secrets/initialAdminPassword`，`/root/.jenkins` 就是 `jenkins` 的工作目录，在 `jenkins` 的工作目录 `.jenkins` 中，找到 `hudson.model.UpdateCenter.xml` 文件打开

![在这里插入图片描述](img/1_Ubuntu安装/d6dfb9391259a55cfa510cbcf7d1827a.png)

将 `https://updates.jenkins.io/update-center.json` 替换成国内镜像网址并 `保存`

- [国内镜像网址](https://mirrors.tuna.tsinghua.edu.cn/)：`https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json`
- [国外镜像网址](https://mirror.xmission.com/)：`https://mirror.xmission.com/jenkins/updates/update-center.json`

![在这里插入图片描述](img/1_Ubuntu安装/8792828a0246f39d90ceb08d18ce1bc8.png)

再进入到 `updates` 目录下，编辑 `default.json` 文件，将该文件中国外的地址全部替换成国内的

![在这里插入图片描述](img/1_Ubuntu安装/ada45d984bb272704ffc4e969421db89.png)

- `https://www.google.com` 全部替换成 `https://cn.bing.com`
- 或者`https://www.google.com` 全部替换成 `https://www.baidu.com`

![在这里插入图片描述](img/1_Ubuntu安装/fe53a63097066a912dbf29951b6014aa.png)

- `https://updates.jenkins.io/download` 全部替换成 `https://mirrors.tuna.tsinghua.edu.cn/jenkins`

​	![在这里插入图片描述](img/1_Ubuntu安装/6171c9d5531cf6b6416787606e5681e3.png)

## 五、启动与关闭



#### **1. 启动**

前文是有用到 `java -jar` 的命令启动了 `Jenkins`，这里简单总结以下：

- 前台启动

    ```shell
    #特点：当前ssh窗口被锁定，可按 CTRL+C 打断程序运行，或直接关闭窗口，程序退出
    java -jar jenkins.war --httpPort=8080
    
    #特定：当前ssh窗口不被锁定，但是当窗口关闭时，程序中止运行
    java -jar jenkins.war --httpPort=8080 & 
    ```

- 后台启动

    ```shell
    # nohup 意思是不挂断运行命令，当账户退出或终端关闭时，程序仍然运行
    # 当用 nohup 命令执行作业时，缺省情况下该作业的所有输出被重定向到 nohup.out 的文件中
    nohup java -jar jenkins.war --httpPort=8080 &
    
    # 这种方法会把日志文件输入到你指定的文件 jenkins.log 中，没有则会自动创建
    nohup java -jar jenkins.war --httpPort=8080 >jenkins.log &
    123456
    ```

如果用的是云服务器，直接后台启动就行了，即使关闭终端，程序依然可以运行

#### **2. 关闭**

可以先查询 `Jenkins` 的进程

```shell
ps -ef | grep jenkins
```

![在这里插入图片描述](img/1_Ubuntu安装/f32960f10266a928ec308bd0534b4320.png)

然后再通过 `kill` 命令来关闭程序

```bash
# 彻底杀死进程号为 pid 的进程
kill -9 pid
```

## 六、常用插件的安装

`Jenkins` 相当于一个平台，它很多的功能都是通过对应的插件去实现的，所以插件安装对于使用 `Jenkins` 非常的重要

在 `Jenkins` 中常用的插件如下：

- [Folders](https://updates.jenkins.io/download/plugins/cloudbees-folder/)
- [OWASP Markup Formatter](https://updates.jenkins.io/download/plugins/antisamy-markup-formatter/)
- [Build Timeout](https://updates.jenkins.io/download/plugins/build-timeout/)
- [Credentials Binding](https://updates.jenkins.io/download/plugins/credentials-binding/)
- [Timestamper](https://updates.jenkins.io/download/plugins/timestamper/)
- [Workspace Cleanup](https://updates.jenkins.io/download/plugins/ws-cleanup/)
- [Ant](https://updates.jenkins.io/download/plugins/ant/)
- [Gradle](https://updates.jenkins.io/download/plugins/gradle/)
- [Pipeline](https://updates.jenkins.io/download/plugins/workflow-aggregator/)
- [GitHub Branch Source](https://updates.jenkins.io/download/plugins/github-branch-source/)
- [Pipeline:GitHub Groovy Libraries](https://updates.jenkins.io/download/plugins/pipeline-github-lib/)
- [Pipeline:Stage View](https://updates.jenkins.io/download/plugins/pipeline-stage-view/)
- [Git](https://updates.jenkins.io/download/plugins/git/)
- [SSH Build Agents](https://updates.jenkins.io/download/plugins/ssh-slaves/)
- [Matrix Authorization Strategy](https://updates.jenkins.io/download/plugins/matrix-auth/)
- [PAM Authentication](https://updates.jenkins.io/download/plugins/pam-auth/)
- [LDAP](https://updates.jenkins.io/download/plugins/ldap/)
- [Email Extension](https://updates.jenkins.io/download/plugins/email-ext/)
- [Mailer](https://updates.jenkins.io/download/plugins/mailer/)
- [Dark Theme](https://updates.jenkins.io/download/plugins/dark-theme/)
- [Localization: Chinese (Simplified)](https://updates.jenkins.io/download/plugins/localization-zh-cn/)

下面我以安装插件 `Loale` 为例，演示安装插件的大概步骤

访问 `Jenkins` ，选择 `Manage Jenkins`

![在这里插入图片描述](img/1_Ubuntu安装/144d04bd26fce926e39b8d01fd00c69d.png)

选择 `Manage Plugins`

![在这里插入图片描述](img/1_Ubuntu安装/fcbf989a981c5ba174005302a25043a7.png)

选择 `Available`

![在这里插入图片描述](img/1_Ubuntu安装/8d7b82c8efee4276103a6cb3e5997040.png)

搜索栏中搜索 `Locale`

![在这里插入图片描述](img/1_Ubuntu安装/5131fe56e42b71fc21310f93a7f899dd.png)

如果下载页面没有红色的警告，点击 `Download now and install after restart` 就会下载最新版本的插件，安装并重启，[跳转至重启后 -->](https://blog.csdn.net/xhmico/article/details/136535498#LOCALE_RESTART)

如果有类似：`Warning: This plugin is built for Jenkins 2.426.2 or newer. Jenkins will refuse to load this plugin if installed.` 这样的提示，就表明当前插件的版本和你所下载的 `Jenkins` 的版本不兼容，很大概率会安装不成功，这个时候就需要去下载兼容该 `Jenkins` 版本的插件

点击插件的名称，打开该插件对应的网址

![在这里插入图片描述](img/1_Ubuntu安装/be8eb572b38bd6fd68bed7eecca6a140.png)

点击 `Releases`

![在这里插入图片描述](img/1_Ubuntu安装/e4fedec9bef8790be8e31d11230ceac2.png)

再点击 `checksums`，就可以看到插件对应的版本了

![在这里插入图片描述](img/1_Ubuntu安装/d16795d467f4057e4459331be62691d7.png)

比如说我下载的 `Jenkins` 版本是 `2.346.1`，那我下载 `180.v207501dff9b_a_`，点击即可

![在这里插入图片描述](img/1_Ubuntu安装/c07fa2c2a79e6416c4fd88962ac9d57f.png)

插件下载完成

![在这里插入图片描述](img/1_Ubuntu安装/48c0cea79bc195d2b551b44b65f76aba.png)

回到 `Jenkins` 中，点击 `Advanced`

![在这里插入图片描述](img/1_Ubuntu安装/cf722193d9a3cf47cd3819821d3dddc7.png)

下拉找到 `Deploy Plugin`，这里可以上传本地下载好的插件，上传完之后点击 `Deploy`

![在这里插入图片描述](img/1_Ubuntu安装/c310b1ba36c7618503d6e8ba99d1446e.png)

就会开始安装该插件

![在这里插入图片描述](F:/主文件/软件/开发/IDE/IDEA/IDEA破解/ee1755941d9dbb81130c1d86eace37d1.png)

可以在 `Installed` 中看到刚刚手动安装的插件了

![在这里插入图片描述](img/1_Ubuntu安装/62115735dfec5aff4ff0dadd12095eb3.png)

接着就重启 `Jenkins` 使该插件生效

重启方法：在 `URL` 的后面加上 `restart`，例如：`http://localhost:8080/restart`

![在这里插入图片描述](img/1_Ubuntu安装/015a1262b8c86e0643bedf82bbb21e33.png)

点击 `Yes` 即可重启

![在这里插入图片描述](img/1_Ubuntu安装/48ec9e263d4ebd7e38f5122818281e0b.png)

重启完成，再次登录并选择 `Manage Jenkins`

![在这里插入图片描述](img/1_Ubuntu安装/92b2ee5124f3ce271be67e906cbc1af7.png)

选择 `Configure System`

![在这里插入图片描述](img/1_Ubuntu安装/2bc783dc07ac358385d551bc9203f319.png)

找到 `Locale` 选项，输入 `zh_CN` 勾选下面的选项，点击 `Apply` 和 `save`

![在这里插入图片描述](img/1_Ubuntu安装/949b5346446e3eaff64362d2b8b6f0b2.png)

如果以上方法已经生效了，表明汉化插件已经安装完成，如果没有生效，则还需要安装一个汉化包

搜索插件 `Localization: Chinese`

![在这里插入图片描述](img/1_Ubuntu安装/1714598fb407865a3b347acc94606f86.png)

按照上述方式进行安装重启

![在这里插入图片描述](img/1_Ubuntu安装/798176b5f14524caacd3b70b83f30fd9.png)

重启之后可以看到汉化完成
