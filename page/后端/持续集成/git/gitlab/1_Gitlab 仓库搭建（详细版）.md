引言：公司代码的管理不统一，一部分人用SVN，一部分人用Git，对于习惯了使用Linux或者Mac命令行的人来说，Git的操作更方便和快捷，和小伙伴商量了一下把整个代码管理工具切换成了Git，GitHub如果不是开源项目的话是需要付费使用，所以选择使用GitLab

## 一、gitlab 介绍

 `Gitlab`是一个用于`仓库管理系统`的开源项目，使用`Git`作为代码管理工具，并在此基础上搭建起来的web服务。Gitlab有乌克兰程序员DmitriyZaporozhets和ValerySizov开发，它由Ruby写成。后来，一些部分用Go语言重写，现今并在国内外大中型互联网公司广泛使用。`gitlab-ce`是它的`社区版`，`gitlab-ee`是`企业版`，是收费的。

## 二、git和svn 的区别

`Git`: 是一个开源的`分布式版本控制系统`，用于敏捷高效地处理任何或小或大的项目。Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

下图就是分布式版本控制工具管理方式：

![img](img/1_Gitlab 仓库搭建（详细版）/75e344af0a92b02fb780c09bc89871d9.png)

`Git`是分布式版本控制系统，它没有中央服务器，每个人的电脑就是一个完整的版本库，这样工作的时候就不需要联网了，因为版本都是在自己的电脑上。既然每个人的电脑都有一个完整的版本库，那多个人如何协作呢？比如说自己在电脑上改了文件A，其他人也在电脑上改了文件A，这时，你们两之间只需把各自的修改推送给对方，就可以互相看到对方的修改了。

`SVN`: 是一个开放源代码的版本控制系统，通过采用分支管理系统的高效管理，简而言之就是用于多个人共同开发同一个项目，实现共享资源，实现最终集中式的管理。集中管理方式在一定程度上看到其他开发人员在干什么，而管理员也可以很轻松掌握每个人的开发权限。

 下图就是标准的集中式版本控制工具管理方式：

![img](img/1_Gitlab 仓库搭建（详细版）/c0d9c256215305b146689734b06d7f2d.png)

但是相较于其优点而言，集中式版本控制工具缺点很明显：

- 服务器单点故障

- 容错性差

`Git` 的内容完整性要优于`svn`

GIT的内容存储使用的是SHA-1哈希算法。这能确保代码内容的完整性，确保在遇到磁盘故障和网络问题时降低对版本库的破坏。

一个研发队伍的成员正常包括：需求分析、设计、美工、程序员、测试、实施、运维，每个成员在工作中都有产出物， 包括了文档、设计代码、程序代码，这些都需要按项目集中进行管理的。SVN能清楚的按目录进行分类管理， 使项目组的管理处于有序高效的状态，`SVN更适用于项目管理`， `Git更适用于代码管理`。

#### 1、集中式vs分布式

Subversion（`svn`）属于集中式的版本控制系统

`Git`属于分布式的版本控制系统

#### 2. 版本库与工作区

`SVN`的版本库和工作区是分离的

`Git` 的版本库和工作区如影随形

#### 3. 全局版本号和全球版本号

`SVN`的全局版本号和CVS的每个文件都独立维护一套版本号相比，是一个非常大的进步。在看似简单的全局版本号的背后，是Subversion提供对于事物处理的支持，每一个事物处理（即一次提交）都具有整个版本库全局唯一的版本号。

`Git`的版本号则更进一步，版本号是全球唯一的。Git 对于每一次提交，通过对文件的内容或目录的结构计算出一个SHA-1 哈希值，得到一个40位的十六进制字符串，Git将此字符串作为版本号

#### 4、部分检出和全局检出

`Subversion(SVN)`可以将整个库检出到工作区，也可以将某个目录检出到工作区。对于要使用一个庞大、臃肿的版本库的用户来说，部分检出是非常方便和实际的。
`Git`只能全部检出，不支持按照目录进行的部分检出。

#### 5、更新和提交

在`SVN`中，因为只有一个中心仓库，所以所谓的远程更新，也就是svn update ,通过此命令来使工作区和版本库保持同步。如果不能连接到服务器上，基本上不可以工作。

对于`git`来说，别人的改动是存在于远程仓库上的，所以git checkout命令尽管在某些功能上和svn中的update类似（例如取仓库特定版本的内容），但是在远程更新这一点上，还是不同的，不属于git checkout的功能涵盖范围。 Git使用git fetch和git pull来完成远程更新任务，fetch操作只是将远程数据库的object拷贝到本地，然后更新remotes head的refs，git pull 的操作则是在git fetch的基础上对当前分支外加merge操作。可离线工作。

## 三、Git和svn的优缺点比较

#### 1、SVN优缺点

优点：

1、 管理方便，逻辑明确，符合一般人思维习惯。

2、 易于管理，集中式服务器更能保证安全性。

3、 代码一致性非常高。

4、 适合开发人数不多的项目开发。

缺点：

1、 服务器压力太大，数据库容量暴增。

2、 如果不能连接到服务器上，基本上不可以工作，如果服务器不能连接上，就不能提交，还原，对比等等。

3、 不适合开源开发（开发人数非常非常多，但是Google app engine就是用svn的）。但是一般集中式管理的有非常明确的权限管理机制（例如分支访问限制），可以实现分层管理，从而很好的解决开发人数众多的问题。

#### 2、Git优缺点

优点： 

1、适合分布式开发，强调个体。

2、公共服务器压力和数据量都不会太大。

3、速度快、灵活。

4、任意两个开发者之间可以很容易的解决冲突。

5、离线工作。

缺点：

1、学习周期相对而言比较长。

2、不符合常规思维。

3、代码保密性差，一旦开发者把整个库克隆下来就可以完全公开所有代码和版本信息。

## 四、git、gitlab、GitHub的简单区别

`git` 是一种基于命令的版本控制系统，全命令操作，没有可视化界面

`gitlab` 是一个基于git实现的在线代码仓库软件，提供web可视化管理界面，通常用于企业团队内部协作开发

`github` 是一个基于git实现的在线代码托管仓库，亦提供可视化管理界面，同时免费账户和提供付费账户，提供开放和私有的仓库，大部分的开源项目都选择github作为代码托管仓库

#### 1、Gitlab和GitHub的区别

相同点：二者都是基于`web`的`Git仓库`，在很大程度上**Gitlab是仿照GitHub来做的**；
它们都提供了分享开源项目的平台，为开发团队提供了存储、分享、发布
和合作开发项目的中心化云存储的场所。

不同点：`GitHub`如果要使用私有仓库，是需要付费的。`Gitlab`可以在上面创建私人的免费仓库。

Gitlab让开发团队对他们的代码仓库拥有更多的控制，相比于GitHub，它有不少的特色：

- 允许免费设置仓库权限;

- 允许用户选择分享一个project的部分代码;

- 允许用户设置project的获取权限，进一步的提升安全性;

- 可以设置获取到团队整体的改进进度;

- 通过innersourceing让不在权限范围内的人访问不到该资源。

从代码私有性方面来看有时公司并不希望员工获取到全部的代码，这个时候Gitlab无疑是更好的选择。但是对于开源项目而言，GitHub依然是代码托管的首选。

## 五、Gitlab 搭建

### 1、gitlab 安装

#### 方法一、设置gitlab的yum源（使用清华镜像源安装GitLab）

gitlab-ce是它的社区版，gitlab-ee是企业版，是收费的。

> ubuntu地址在：https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/ubuntu/pool/focal/main/g/gitlab-ce/,

```shell
# 在 /etc/yum.repos.d/ 下新建 gitlab-ce.repo，写入如下内容：
 
cd /etc/yum.repos.d/
vim gitlab-ce.repo
 
[gitlab-ce]
name=gitlab-ce
baseurl=https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el7/
gpgcheck=0
enabled=1
 
yum clean all && yum makecache
```

![img](img/1_Gitlab 仓库搭建（详细版）/e2bdff16d5f77129da7ebf2a6746d4ae.png)

![img](img/1_Gitlab 仓库搭建（详细版）/4a114f0f7c0610cc7b2c1f0d98553a8c.png)

###### 安装 GitLab

```shell
# 直接安装最新版
yum install -y gitlab-ce
```

![img](img/1_Gitlab 仓库搭建（详细版）/130841015b637d44a07ed7352aa73bee.png)

下图表示gitlab安装成功

![img](img/1_Gitlab 仓库搭建（详细版）/f4f3b0a743120e8aa8ea3b7caa7e94df.png)

```shell
# 如果要安装指定的版本，在后面填上版本号即可
yum install -y  gitlab-ce-×××
# 如果安装时出现gpgkey验证错误，只需在安装时明确指明不进行gpgkey验证
yum install gitlab-ce -y --nogpgcheck
```

#### 方法二、脚本安装gitlab

如果执行脚本出现坏的解释器：脚本文件保存时使用了DOS格式，用DOS2UNIX转为UNIX格式，也可以用vim打开，用:set ff=unix转换。

```bat
#!/bin/bash
  #安装依赖
systemctl stop firewalld
setenforce 0
a=`ifconfig ens33 |grep inet |awk 'NR==1{print $2}'`
  yum install curl wget policycoreutils policycoreutils-python openssh-server openssh-clients postfix -y >/dev/null
  systemctl enable sshd
  systemctl start sshd
  sed -i 's/inet_interfaces = localhost/inet_interfaces = all/g' /etc/postfix/main.cf
 
  #正式安装gitlab
  curl -sS https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.rpm.sh | bash > /dev/null
  sed -i "s/baseurl=https:\/\/packages.gitlab.com\/gitlab\/gitlab-ce\/el\/7\/\$basearch/baseurl=https:\/\/mirrors.tuna.tsinghua.edu.cn\/gitlab-ce\/yum\/el\$releasever\//g" /etc/yum.repos.d/gitlab_gitlab-ce.repo
  yum makecache &>/dev/null
  yum install gitlab-ce -y
  #已经安装完成
 
 
  #验证是否安装成功
  right=$(yum list installed | grep gitlab-ce)
  gitlab='gitlab-ce'
    if [[ ${right} =~ "${gitlab}" ]];then
      echo "gitlab-ce已经安装成功啦！"
    else
      echo "gitlab-ce没有安装成功，请重新检查！"
      exit
    fi
sed -i '32s/gitlab.example.com/'$a':9099/' /etc/gitlab/gitlab.rb
gitlab-ctl reconfigure > /dev/null
echo "此时访问本地IP:9099 就可以显示gitlab 的页面了！"
```

#### 方法三、清华开源软件rpm下载

[地址](https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el7/)

![img](img/1_Gitlab 仓库搭建（详细版）/09976539fd080969d33801ae4f7a031d.png)

```shell
# 安装依赖
yum install -y curl policycoreutils openssh-server openssh-clients
```

![img](img/1_Gitlab 仓库搭建（详细版）/af30096c9977bb277d15d4b85c1106a9.png)

#### 

```shell
#启动ssh服务&设置为开机启动
systemctl enable sshd
systemctl start sshd
```

![img](img/1_Gitlab 仓库搭建（详细版）/832559906bf4a12ebfa91b29808b7799.png)

```shell
# 安装Postfix
Postfix是一个邮件服务器，GitLab发送邮件需要用到
#安装postfix
yum install -y postfix
 
#启动postfix并设置为开机启动
systemctl enable postfix
systemctl start postfix
```

​	![img](img/1_Gitlab 仓库搭建（详细版）/0856178286d811806387b76310e743ae.png)

![img](img/1_Gitlab 仓库搭建（详细版）/893380b1d38b9ce52654ada77593ff74.png)

```shell
开放ssh以及http服务（80端口）
#开放ssh、http服务
firewall-cmd --add-service=ssh --permanent
firewall-cmd --add-service=http --permanent
```

说明允许ssh服务通过成功

![img](img/1_Gitlab 仓库搭建（详细版）/1bea71d6b60d3c6484df8edf587d34ac.png)

说明80端口通过成功

![img](img/1_Gitlab 仓库搭建（详细版）/79b9dad217a26f4c741678638513899e.png)

```shell
#重载防火墙规则
firewall-cmd --reload
```

![img](img/1_Gitlab 仓库搭建（详细版）/3e3d0d82185258632c7083c9bb400dae.png)

或者

直接关闭防火墙以及开机自关闭

```shell
systemctl stop firewalld
systemctl disable firewalld
setenforce 0
```

![img](img/1_Gitlab 仓库搭建（详细版）/2ed1515c399cd3dfa0e950f3eb434543.png)

如果出现下图，则说明安装成功。

![img](img/1_Gitlab 仓库搭建（详细版）/e1db088cbaca6a66f9acf28eab4c5cd4.png)

安装完gitlab需要修改配置文件，并加载

```shell
#进入配置文件
Vim /etc/gitlab/gitlab.rb     
```

找到下面一行，修改ip

![img](img/1_Gitlab 仓库搭建（详细版）/a209b10056910492f8c9b323c5e46073.png)

修改好配置文件后，要使用 `gitlab-ctl reconfigure` 命令重载一下配置文件，否则不生效即可启动Gitlab。

注意，启动过程较长，需要耐心等待。

我们查看一下Gitlab的状态，执行命令：

```shell
gitlab-ctl status
```

![img](img/1_Gitlab 仓库搭建（详细版）/c55d531d5c6e50c8b83b72db7fd0cdaa.png)

## 六、gitlab安装目录

以下是gitlab常用的默认安装目录

```txt
gitlab组件日志路径：/var/log/gitlab
 
gitlab配置路径：/etc/gitlab/  路径下有gitlab.rb配置文件
 
应用代码和组件依赖程序：/opt/gitlab
 
各个组件存储路径： /var/opt/gitlab/
 
仓库默认存储路径   /var/opt/gitlab/git-data/repositories
 
版本文件备份路径：/var/opt/gitlab/backups/
 
nginx安装路径：/var/opt/gitlab/nginx/
 
redis安装路径：/var/opt/gitlab/redis
```

## 七、GitLab常用命令汇总

```shell
#查看服务状态
gitlab-ctl status
使用控制台实时查看日志
# 查看所有的logs; 按 Ctrl-C 退出
gitlab-ctl tail
# 拉取/var/log/gitlab下子目录的日志
gitlab-ctl tail gitlab-rails
# 拉取某个指定的日志文件
gitlab-ctl tail nginx/gitlab_error.log
#启动关闭gitlab	
gitlab-ctl start      
gitlab-ctl stop                                #停止            
gitlab-ctl status                              #查看状态
gitlab-ctl restart                             #重启
gitlab-ctl reconfigure			   #更新配置文件
gitlab-ctl help                                #帮助
gitlab-rake gitlab:check SANITIZE=true --trace	检查gitlab
#gitlab 默认的日志文件存放在/var/log/gitlab 目录下
gitlab-ctl tail                                #查看所有日志
#禁止 Gitlab 开机自启动
systemctl disable gitlab-runsvdir.service 
#启用 Gitlab 开机自启动
systemctl enable gitlab-runsvdir.service
```

## 	八、Gitlab访问测试

#### 1、Gitlab登录

打开浏览器输入gitlab服务器地址，注册用户，如下图

![img](img/1_Gitlab 仓库搭建（详细版）/0fa81322319f85e288db4f5ea8ef0d14.png)

注册用户

![img](img/1_Gitlab 仓库搭建（详细版）/02e6510d19f9142e0e66cf451293527e.png)

例：

![img](img/1_Gitlab 仓库搭建（详细版）/aae5ac4a34f4203a2a54cba2b2ffc6ed.png)

完成后想登录`http://192.168.58.10：9091` 需要账号和密码登录，注册一个后`登录报错误`，需要管理员账号初始化。

![img](img/1_Gitlab 仓库搭建（详细版）/ce1cb418fce8db1816f602221c15dede.png)

#### 2、配置默认访问密码

```shell
# 切换到命令运行的目录 
cd /opt/gitlab/bin/
# 执行如下命令：
gitlab-rails console -e production  
#进行初始化密码
```

![img](img/1_Gitlab 仓库搭建（详细版）/b2b071dd5854283cc4311ccc4d942ea8.png)

```shell
# 在irb(main):001:0> 后面通过 
# u=User.where(id:1).first 
# 来查找与切换账号（User.all 可以查看所有用户）
gitlab-rails console -e production
u=User.where(id:1).first
u.password='12345678'
u.password_confirmation='12345678'
u.save!
exit
 
# 出现true说明设置成功！
# 此时就可以用root/12345678来登录页面
```

![img](img/1_Gitlab 仓库搭建（详细版）/e8049593702ff3174e81df617e2fd408.png)

![img](img/1_Gitlab 仓库搭建（详细版）/8aa66f9cc691b5c4e847c76ec2c2f0dc.png)

成功登录root用户

![img](img/1_Gitlab 仓库搭建（详细版）/54954ebd549d147bc992de1c13994a5e.png)

####  3、想要登录自己创建的用户？

解决方案

需要用root账号通过下

![img](img/1_Gitlab 仓库搭建（详细版）/961c37ae5834a2c8d35ce46cac46f8c8.png)

![img](img/1_Gitlab 仓库搭建（详细版）/11251f18d6e318bce8ec51c9e488deec.png)

点击批准

![img](img/1_Gitlab 仓库搭建（详细版）/ab40ed05b38a624c52b62cf50bee23e4.png)

再次登录，即可登录成功

![img](img/1_Gitlab 仓库搭建（详细版）/50e825d77b90ccb89db38b2661d4915e.png)

注： 觉得英文难受的可以在下图设置成中文

![img](img/1_Gitlab 仓库搭建（详细版）/e8188bd4baf0e4fc2233096352c1ce6f.png)

## 九、Gitlab 图形化界面操作

### 1、Gitlab关闭自动注册

在企业生产环境中，我们一般由项目负责人负责创建用户并分配权限，一般`禁止员工私自注册用户`，以防给项目开发工作带来安全性上的风险。为了避免员工自动注册，我们一般会`禁止Gitlab的自动注册功能`。在`Gitlab的主菜单`上，选择`Menu`——`Admin`，如下所示：

**前提：使用`root`管理员账号密码登陆`GitLab`。**

![img](img/1_Gitlab 仓库搭建（详细版）/8dcb9f2551cfe5b265359fad986d0e18.png)

之后，选择`Settings`——`Sign-up restrictions`，点击右边的`Expand`，如下所示：

![img](img/1_Gitlab 仓库搭建（详细版）/c318e1c78a196737f4deec8adbe30c6f.png)

 在弹出的页面中，取消掉`Sign-up enabled`选项前面的勾，如下所示：

![img](img/1_Gitlab 仓库搭建（详细版）/0e088525237ef960be03fc556f8b87e0.png)

 这样，点击下方的`Save`后，就可以使得我们的配置生效了。这样在登录的时候，就无法实现自动注册了。

![img](img/1_Gitlab 仓库搭建（详细版）/faafc25b370babf8d09a2c5b362f8d02.png)

### 2、Gitlab登录免密认证

`Gitlab`的登录免密验证，配置完成后，可以使得我们的`Gitlab`自动执行`Git命令`而无需登录，对于脚本的编写以及其他项目（如`Jenkins`）的运用这一步是必须的。

**首先**，在想要进行验证的设备上执行命令：

```shell
ssh-keygen
```

![img](img/1_Gitlab 仓库搭建（详细版）/4656e9319b19667d69583fa93f780aa2.png)

确认新生成的密钥文件

![img](img/1_Gitlab 仓库搭建（详细版）/55aca3299d9fc1ac60c7d3de78b83978.png)

完成上述配置后，可以生成本设备的公私钥对，执行命令：

可以查看本设备的公钥，如下所示：

![img](img/1_Gitlab 仓库搭建（详细版）/5399ff9f038b785da821dcd1e741919a.png)

 我们将该公钥复制下来，之后，我们打开Gitlab，点击右上角的用户图标，在弹出的选择框中选择Edit Profile，然后点击左边的SSH Keys，如下所示：

![img](img/1_Gitlab 仓库搭建（详细版）/ad3b9e279852aff5d14f946cd52c43a1.png)

之后在弹出的页面中，我们将之前复制的公钥复制到上面去，如下所示：

![img](img/1_Gitlab 仓库搭建（详细版）/fd476f5507632fbab052c7c3b4539d0d.png)

然后点击Add key，即可完成添加，添加完成后的页面如下：

![img](img/1_Gitlab 仓库搭建（详细版）/fdb511316ff70547eeddc23db7036fed.png)

### 3、Gitlab创建项目

`Gitlab`上创建项目。由于新项目的创建必须依赖于一个组，因此，我们在创建项目前，`先创建组`。
进入Gitlab主页面后，点击`Overview`中的`Groups`选项，然后点击右边的`New group`，选择新创建一个组，如下所示：

![img](img/1_Gitlab 仓库搭建（详细版）/a96f6e1b0e0ee40b77c26f25e2125a1c.png)

 输入组的名称和描述，组的URL会随着组名称的输入而自动出现，在组的权限处，我们选择Private，并取消掉下方允许用户访问的请求，配置完成后如下所示：

![img](img/1_Gitlab 仓库搭建（详细版）/40d3976939dbc65e6ccb80b1bd37f588.png)

接下来，我们点击最下方的Create Group，就可以完成组的创建了，如下所示：

![img](img/1_Gitlab 仓库搭建（详细版）/9688e0c5b7e27ba322285d26ac9430ce.png)

![img](img/1_Gitlab 仓库搭建（详细版）/cd34ea145dc2d21e05e5370ff6f372b8.png)

![img](img/1_Gitlab 仓库搭建（详细版）/828622891e166616d60b326835de48e5.png)

接下来，我们来创建项目。项目的创建与组的创建过程类似，都是输入项目名称，选择组的名称，项目描述以及权限等，配置好的项目如下所示：

![img](img/1_Gitlab 仓库搭建（详细版）/cb4a479d772d5cb7b8c83188672f245c.png)

![img](img/1_Gitlab 仓库搭建（详细版）/3964f3dd1811e5351dadecb86a1f2aa5.png)

配置完成后，就可以创建项目了。
创建项目后，Gitlab会自动创建一个README.md的文件，我们可以在线对该文件机型编辑，如下所示：

![img](img/1_Gitlab 仓库搭建（详细版）/528ef1f6b0aa3d9c8016e5e3e12c2262.png)

### 4、使用管理员创建用户

前提：使用`root`管理员账号密码登陆`GitLab`

![img](img/1_Gitlab 仓库搭建（详细版）/44d3fc571d4c694e7918ad1fa12df629.png)

![img](img/1_Gitlab 仓库搭建（详细版）/afc1253eab7291cd85ba699ea1f313dd.png)

初始密码由管理员设置，

当用户第一次登录时，由用户进行修改密码

![img](img/1_Gitlab 仓库搭建（详细版）/e9e8577fd827172092e9e2e4151cc377.png)

![img](img/1_Gitlab 仓库搭建（详细版）/b54ad8778828153f89bb5baa536c662b.png)

###  5、Gitlab 添加邮箱设置

邮箱是企业进行工作中的通知，交互必不可少的部分，gitlab同样支持邮箱的配置，方便对一些操作有邮件的提醒，以QQ邮箱为例，进行gitlab邮箱的添加。

#### 5.1、开启smtp功能

登陆邮箱-->设置-->账户-->POP3/IMAP/SMTP/Exchange/CardDAV/CalDAV服务-->开启SMTP服务-->接收验证

​	![img](img/1_Gitlab 仓库搭建（详细版）/fa02764aad8944c7605ff64cf8bcd94f.png)

```shell
# 修改gitlab配置
Vim /etc/gitlab/gitlab.rb
```

![img](img/1_Gitlab 仓库搭建（详细版）/82b87384e72f5b1df5140d12af58811e.png)

![img](img/1_Gitlab 仓库搭建（详细版）/36a15b0e0322059bb2c0509774f8482e.png)

```shell
#更新配置文件
gitlab-ctl reconfigure
gitlab-ctl restart
```

#### 5.2、验证

```shell
#执行 
gitlab-rails console
#进入控制台交互界面, 然后在控制台提示符后输入下面内容发送一封测试邮件，测试完成后exit()退出。

#Notify.test_email('收件人邮箱', '邮件标题', '邮件正文').deliver_now
Notify.test_email('229xxxx@qq.com', 'GitLab email', 'Hellow world').deliver_now
```

![img](img/1_Gitlab 仓库搭建（详细版）/6a1a84bc429b226beae192b6b96e94c5.png)

![img](img/1_Gitlab 仓库搭建（详细版）/b809313707f160d8833a3a6a64b3031f.png)

### 6、修改登录欢迎页面

看下图操作即可

![img](img/1_Gitlab 仓库搭建（详细版）/d387bf2681501695400fb583ec33e5f8.png)

设置完的效果图：

![img](img/1_Gitlab 仓库搭建（详细版）/4c71f63254ca262f0792e0a7e022df0d.png)

## 十、Gitlab命令行操作

第一次使用该项目地址的话，需要创建新版本库,首先从主项目上fork一个自己的项目。
从自己项目上获取clone（克隆）链接地址。在想要存放的目录下执行

![img](img/1_Gitlab 仓库搭建（详细版）/e8fe9e0eeaf41bdb74a728afd5ddccd6.png)

```shell
git clone http://192.168.58.10:9091/ceshi/git-test.git
```

![img](img/1_Gitlab 仓库搭建（详细版）/2fe2d52732c0938c6a5c22c0043e141f.png)![img](img/1_Gitlab 仓库搭建（详细版）/22aa7eff3164133e178846e66e9b3092.png)

![img](img/1_Gitlab 仓库搭建（详细版）/7d911de9dd2d30483beae865c62c173d.png)

### 1、命令行新建分支

```shell
#查看当前所在的分支
git branch
```

![img](img/1_Gitlab 仓库搭建（详细版）/dcca4df97de122e6d099438d77ad367a.png)

![img](img/1_Gitlab 仓库搭建（详细版）/41ae53f95184fbc2538ff86f23a62864.png)

```shell
# 创建分支，deve为新的分支名，可改
git branch deve 
```

![img](img/1_Gitlab 仓库搭建（详细版）/f80016f22fefce01ac173617dd2078a5.png)

```shell
# 进入到刚刚创建的分支
git checkout deve  
# 切换分支
```

![img](img/1_Gitlab 仓库搭建（详细版）/6dc29d494879bc33be02f3f5b72c648e.png)

```shell
git status
# 提交到新分支中
git push -u origin deve 		
```

![img](img/1_Gitlab 仓库搭建（详细版）/df76903840a3dd9bd57c4d11c166c7d4.png)

 添加分支成功

![img](img/1_Gitlab 仓库搭建（详细版）/9c02665539d48efc7a7f61df87a4db90.png)

在切换回main分支

![img](img/1_Gitlab 仓库搭建（详细版）/963a17522b8f3a34bc12a52f42f677e8.png)

### 2、上传代码到仓库

 首次使用Git的话，需要设置全局的用户名和邮箱设置，如下图所示：

![img](img/1_Gitlab 仓库搭建（详细版）/da2aa502a2e29d0b69693589df35e0f4.png)

```shell
# 在命令行或终端中使用下面的命令可以设置git自己的名字和电子邮件。
# 这是因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。
git config --global user.name "root"
git config --global user.email "admin@example.com"
```

```shell
# 查看配置
 git config --list
```

![img](img/1_Gitlab 仓库搭建（详细版）/25a5d1d2189ed5a8f0f0f060ab8866bf.png)

```shell
#初始化git
git init	
#将本地git和服务器上的连接
git remote add origin http://192.168.58.10:9091/ceshi/git-test.git
#添加要提交的本地项目	（.代表所有 可用文件名代替. 上传某个文件）
git add 1.java	
#提交到本地仓库
git commit -m "测试代码"
#将项目推送到gitlab端
git push -u origin main 	
 
 
出现报错：
 fatal: 远程 origin 已经存在 
解决：
#删除远程配置 git remote rm origin 
#重新添加 git remote add origin http://192.168.58.10:9091/ceshi/git-test.git
```

![img](img/1_Gitlab 仓库搭建（详细版）/3d796a101638dc56fa41fa21b189366a.png)

这样就可以了，刷新gitlab页面就可以看到上传的项目了。

![img](img/1_Gitlab 仓库搭建（详细版）/58feb52f5bcf910c9231895a14ac950f.png)

![img](img/1_Gitlab 仓库搭建（详细版）/b515d217697c96faff36b7e3c1aa898a.png)

###  3、Git 命令行常用指令的使用

```shell
#上次提交后是否对文件再做了修改项目
git status 	
#添加所有的变动
git add . 
#创建本地分支并切换分支 git checkout -b pr/ffr
git checkout -b 文件夹名称 	
#提交修改 git commit -m “修改什么”
git commit -m “描述”	
#合并origin/develop上别人所做的修改到自己的本地分支 
#git merge origin/develop pr/ffr
git merge origin/develop “本地分支”
#推送本地分支到远程，并建立联系 
#git push origin pr/ffr
git push origin “本地分支” 
#合并多次提交，将前几次的提交合并为一次
git rebase -i 编号 
#切换分支 git checkout pr/FFR-color git cherckout develop
git checkout 分支名 
#更新当前分支的状态
git pull 
#列出本地分支
git branch 
#列出本地分支与远程分支
git branch -a 
#删除分支（目前仅用于删除本地分支）
git branch -D 分支名 
#可以查看远程仓库信息
git remote -v 
#仅仅创建 一个新分支，并不会自动切换到新分支中去
git branch 分支名 
#退出git rebase
git rebase --abort 
#git rebase -i 提交编号，之后出现错误，可以回退到之前未合并时的日志状态
git reset 提交编号 
#修改上一次的提交的描述
git commit --amend -m “描述” 
#暂存上一次的修改，准备切换到其他的分支
git stash 
#还原上一次的修改，将暂存的修改加入到新的
git stash pop 分支
```

#### 3.1、提交与修改操作

|    命令    |                   说明                   |
| :--------: | :--------------------------------------: |
|  git add   |             添加文件到暂存区             |
| git status |  查看仓库当前的状态，显示有变更的文件。  |
|  git diff  | 比较文件的不同，即暂存区和工作区的差异。 |
| git commit |          提交暂存区到本地仓库。          |
| git reset  |                回退版本。                |
|   git rm   |             删除工作区文件。             |
|   git mv   |         移动或重命名工作区文件。         |

## 十一、项目创建（测试）

#### 1.1、访问权限

访问权限是在建立项目时就需要选定的，主要用于决定哪些人可以访问此项目：

Gitlab中的组对项目有三种访问权限

| 权限名称 | 权限类型 | 权限说明                                 |
| -------- | -------- | ---------------------------------------- |
| 私有     | Private  | 只有属于该项目成员才有权限查看和操作项目 |
| 内部     | Internal | 具有GitLab账号的人员登陆后都可以克隆项目 |
| 公开     | Public   | 任何人都可以克隆                         |

#### 1.2、GitLab分支角色管理

Gitlab用户在组中有五种权限：

| 角色名称 | 角色类型  | 角色说明                                         |
| -------- | --------- | ------------------------------------------------ |
| 匿名用户 | Guest     | 访客（只能创建问题和留言评论）                   |
| 报告人   | Reporter  | 可以理解为测试员、产品经理等，一般负责提交问题等 |
| 开发人员 | Developer | 负责项目开发                                     |
| 管理者   | Master    | 一般是组长，负责对Master分支进行维护             |
| 所有者   | Owner     | 一般是项目经理【拥有所有权限】                   |

不同角色，拥有不同权限，下面列出Gitlab各角色权限 ：

#### 1.3、工程权限

![img](img/1_Gitlab 仓库搭建（详细版）/caf9ea707749be82e006c7fdfa39d18c.png)

![img](img/1_Gitlab 仓库搭建（详细版）/35e82d9d0740a9ee9ea9b1fb902744b4.png)

 注意：关于保护分支的设置，可以进入Settings->Protected branches进行管理

#### 1.4、组权限

![img](img/1_Gitlab 仓库搭建（详细版）/3b70d74f9c0ab5927f085b551cfb5937.png)

#### 2、设置用户权限

**前提：使用root管理员账号密码登陆GitLab**

选择项目可以进行权限分配

![img](img/1_Gitlab 仓库搭建（详细版）/72e68468c188687fc5e43050e25f70a9.png)

![img](img/1_Gitlab 仓库搭建（详细版）/416a6d0981221601c03c4026904ad96e.png)

 先设置全局每个机器都必须自报家门：你的名字和Email地址。

![img](img/1_Gitlab 仓库搭建（详细版）/8023e8553d321ca2559a51ff8516c32e.png)

```shell
git clone http://192.168.58.10:9091/ceshi/git-test.git    
首先从主项目上fork一个自己的项目。
从自己项目上获取clone（克隆）链接地址。
在想要存放的目录下执行
 
以liy用户登录
```

![img](img/1_Gitlab 仓库搭建（详细版）/f09dd484b64ab53344fc5f6af0e63a0b.png)

 由于main 是受保护的分支，开发者没有权限将代码上传到main 分支（主干分支）中

![img](img/1_Gitlab 仓库搭建（详细版）/1f637d0dae0ba5266128ba9801b31f91.png)

![img](img/1_Gitlab 仓库搭建（详细版）/74f51bba9d6e1809bf4c6298d258e742.png)

Main 分支受保护中（主干分支）

![img](img/1_Gitlab 仓库搭建（详细版）/0cbb07c1dafdc298503b469b7c307ae6.png)

所以我们切换分支，切换到deve分支中

![img](img/1_Gitlab 仓库搭建（详细版）/53f5264ed3641137920e40722040da8b.png)

开发者用户liy 编写代码，将代码上传至仓库，将代码上传至分支deve

![img](img/1_Gitlab 仓库搭建（详细版）/1703999d02c48f537f850f4ef7a6caaf.png)刷新查看仓库，查看分支有我们开发者写的代码

![img](img/1_Gitlab 仓库搭建（详细版）/a977def3166d059ec89ba61934fe811e.png)

使用管理员root 用户创建新的用户yong

![img](img/1_Gitlab 仓库搭建（详细版）/3ce51f43fe4cd9f0b05bb31a65fb16f1.png)

创建用户后，会发送邮箱，设置密码

![img](img/1_Gitlab 仓库搭建（详细版）/d06248e76e74f4a7adc0b5ec3437f4f4.png)

 设置密码成功

![img](img/1_Gitlab 仓库搭建（详细版）/43423715be5babbc0922ad7ed801c7b4.png)

Yong 用户登录成功

![img](img/1_Gitlab 仓库搭建（详细版）/0f4629c260234998bf6d23b1c36e4be8.png)

 切换回root用户

![img](img/1_Gitlab 仓库搭建（详细版）/4f4ff3cf168bda4dea6e2f278bd04635.png)

邀请用户yong 进入项目 且为匿名用户 guest  只能进行访问以及评论

![img](img/1_Gitlab 仓库搭建（详细版）/f209e282dad845d34d60dfd747cc2df1.png)

![img](img/1_Gitlab 仓库搭建（详细版）/3cd2c4d7ac8044669ba26d527bb9aa05.png)

定义全局用户yong

![img](img/1_Gitlab 仓库搭建（详细版）/3c4337f8a47e3c269ac9bcd700013eed.png)

用户yong 无法克隆项目  用户yong 为匿名用户（客人），所以没有权限下载项目

![img](img/1_Gitlab 仓库搭建（详细版）/977e19f02062d71e321a74655df80f99.png)

![img](img/1_Gitlab 仓库搭建（详细版）/8d0865916716cc20cecc04bbef5919d2.png)

可以进行分支合并，主要就是开发者编写完代码后，与主干分支进行合并，组成项目

![img](img/1_Gitlab 仓库搭建（详细版）/61d2f9ecc2fa0cdf81c1051ec81e2aeb.png)

![img](img/1_Gitlab 仓库搭建（详细版）/ba6bd19b3a48206ce22d67465016741e.png)

 分支已合并

![img](img/1_Gitlab 仓库搭建（详细版）/d1731338bf4b07c414949024f35fcc4a.png)

####  3、数据流向图

本文主要描述了gitlab 部分的一些操作

![img](img/1_Gitlab 仓库搭建（详细版）/81bfce30d3da578816da1f5dd323f71a.png)

## 十二、Gitlab 数据备份

### 1、Gitlab 创建备份

#### 1.1、手动备份

```shell
#创建备份文件
#使用一条命令即可创建完整的Gitlab备份。
gitlab-rake gitlab:backup:create   
#使用命令会在/var/opt/gitlab/backups目录下创建一个压缩包，这个压缩包就是Gitlab整个的完整部分。
```

![img](img/1_Gitlab 仓库搭建（详细版）/e689da15ea28e8ddffa0724cfb388142.png)

```shell
#生成完后，/var/opt/gitlab/backups目录
#创建一个名称类似为1655990519_2022_06_23_15.0.2_gitlab_backup.tar的压缩包
```

![img](img/1_Gitlab 仓库搭建（详细版）/5c77629121fd6040be1aa207c5678ecf.png)

其中

```shell
#配置文件须备份
/etc/gitlab/gitlab.rb 
#nginx配置文件
/var/opt/gitlab/nginx/conf  
#邮件配置备份
/etc/postfix/main.cfpostfix  
```

### 2、更改Gitlab备份目录

```shell
#也可以通过/etc/gitlab/gitlab.rb配置文件来修改默认存放备份文件的目录
#修改为你想存放备份的目录即可
 
gitlab_rails['backup_path'] = "/home/gitlab-backup"
 
 
#指定备份后数据存放的路径、权限、时间配置
#开启备份功能
gitlab_rails['manage_backup_path'] = true  
#指定备份的路径
gitlab_rails['backup_path'] = "/home/gitlab-backup" 
#备份文件的权限
gitlab_rails['backup_archive_permissions'] = 0644    
# 备份保留时间
gitlab_rails['backup_keep_time'] = 7776000            
```

![img](img/1_Gitlab 仓库搭建（详细版）/d1cb492632966d82c7b15e6e88d6c0a2.png)

```shell
#修改完成之后使用下面命令重载配置文件即可.
gitlab-ctl reconfigure
```

​	![img](img/1_Gitlab 仓库搭建（详细版）/3973ca449cd3e09ae8e35aaffa84dfa1.png)

```shell
#创建备份目录并授权
Chown -R git:git gitlab-backup
```

![img](img/1_Gitlab 仓库搭建（详细版）/1e43998eede20be8bcb61adfa24838c6.png)

使用命令创建完整的Gitlab备份。

![img](img/1_Gitlab 仓库搭建（详细版）/e885303832ca57b88d3c12e4cca20161.png)

这个压缩包就是gitlab 的整个完整部分

![img](img/1_Gitlab 仓库搭建（详细版）/a43324e671f0994ad06c34ca8437b09d.png)

### 3、Gitlab自动备份

#### 定时自动备份

实现每天凌晨2点进行一次自动备份:通过crontab使用备份命令实现，需重启cron服务

#### 3.1、方法一、输入: crontab -e 然后添加相应的任务

```shell

#输入命令crontab -e
crontab -e  
#输入相应的任务
0 2 * * * /opt/gitlab/bin/gitlab-rake gitlab:backup:create CRON=1  
#注意：环境变量CRON=1的作用是如果没有任何错误发生时， 抑制备份脚本的所有进度输出
 
#查看周期性计划任务
crontab -l
```

![img](img/1_Gitlab 仓库搭建（详细版）/6e7126d551e5f6a3e13d65443822a09b.png)

![img](img/1_Gitlab 仓库搭建（详细版）/b23bca5f3c2708e64375c7d09edb23b8.png)

#### 3.2、脚本执行gitlab 备份

```bat
#!/bin/bash
a="/home/gitlab-backup"
back="/home/git_back"
date="$(date +%Y-%m-%d)"
logfile=$back/$date.log
gitlab-rake gitlab:backup:create > /dev/null
b=`ls $a |wc -l`
if [ $b -eq 0 ];then
echo "$date.tar 备份失败" >> $logfile
elif [ $b -gt 0 ];then
echo " $date.tar 备份成功" >> $logfile
fi
mv $a/* $back/$date.tar
```

![img](img/1_Gitlab 仓库搭建（详细版）/cb81dce5234962009aaee945c4ef823d.png)

![img](img/1_Gitlab 仓库搭建（详细版）/d0e0488aa097f57ba7c5f9e21dcdc1ea.png)

将脚本加入周期性计划执行

![img](img/1_Gitlab 仓库搭建（详细版）/e46c72204c3e40db9681a74bc91fdacc.png)

![img](img/1_Gitlab 仓库搭建（详细版）/2a2950cad265d9531ded4b4c8b9fdbce.png)

![img](img/1_Gitlab 仓库搭建（详细版）/d2486f3ff86efc8f19a9535e8df8fffd.png)

## 十三、Gitlab-CI/CD

***\*扩展\****

Gitlab CI/CD 是一个内置在GitLab中的工具，用于通过持续方法进行软件开发：

Continuous Integration (CI) 持续集成

Continuous Delivery (CD)   持续交付

Continuous Deployment (CD)  持续部署

### CICD是什么?

持续集成（Continuous Integration）、持续交付（Continuous Delivery） 、持续部署（Continuous Deployment） 的新方法，关于持续集成、持续交付、持续部署，总结如下：

1. 1、持续集成的重点是将各个开发人员的工作集合到一个代码仓库中。通常，每天都要进行几次，主要目的是尽早发现集成错误，使团队更加紧密结合，更好地协作。
2. 2、持续交付的目的是最小化部署或释放过程中固有的摩擦。它的实现通常能够将构建部署的每个步骤自动化，以便任何时刻能够安全地完成代码发布（理想情况下）。
3. 3、持续部署是一种更高程度的自动化，无论何时对代码进行重大更改，都会自动进行构建/部署。

#### 持续集成的好处是什么？

 持续集成可以使问题尽早暴露，从而也降低了解决问题的难度，持续集成无法消除bug，但却能大大降低修复的难度和时间。

#### 持续交付的好处是什么？

持续交付的好处在于快速获取用户反馈；适应市场变化和商业策略的变化。开发团队保证每次提交的修改都是可上线的修改，那么决定何时上线，上线哪部分功能则完全由产品业务团队决定。

虽然持续交付有显著的优点，但也有不成立的时候，比如对于嵌入式系统的开发，往往需要软硬件的配合。

#### 持续部署的好处是什么？

持续部署的目标是通过减少批量工作的大小，并加快团队工作的节奏，帮助开发团队在其开发流程中消除浪费。这使团队能够一直处于一种可持续的平稳流状态， 让团队更容易去创新、试验，并达到可持续的生产率。

## 十四、总结

GitLab 是一个用于仓库管理系统的开源项目。使用Git作为代码管理工具，并在此基础上搭建起来的web服务。

可通过Web界面进行访问公开的或者私人项目。它拥有与Github类似的功能，能够浏览源代码，管理缺陷和注释。可以管理团队对仓库的访问，它非常易于浏览提交过的版本并提供一个文件历史库。团队成员可以利用内置的简单聊天程序(Wall)进行交流。它还提供一个代码片段收集功能可以轻松实现代码复用。
