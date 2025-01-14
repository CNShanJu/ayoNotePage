# CentOS

## 1.卸载旧版

首先如果系统中已经存在旧的Docker，则先卸载：

```shell
#CentOS
yum remove docker \
    docker-client \
    docker-client-latest \
    docker-common \
    docker-latest \
    docker-latest-logrotate \
    docker-logrotate \
    docker-engine
```

## 2.配置Docker的yum库

首先要安装一个yum工具

```shell
yum install -y yum-utils
```

安装成功后，执行命令，配置Docker的yum源：

```shell
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

## 3.安装Docker

最后，执行命令，安装Docker

```Bash
yum install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

## 4.启动和校验

```Bash
# 启动Docker
systemctl start docker

# 停止Docker
systemctl stop docker

# 重启
systemctl restart docker

# 设置开机自启
systemctl enable docker

# 执行docker ps命令，如果不报错，说明安装启动成功
docker ps
```

# Ubuntu

## 卸载旧版

首先如果系统中已经存在旧的Docker，则先卸载：

```shell
#Ubuntu
sudo apt-get remove docker docker-engine docker.io containerd runc
#或者
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done

#安装必要支持
sudo apt install apt-transport-https ca-certificates curl software-properties-common gnupg lsb-release
```

## 准备安装

```shell
#添加 Docker 官方 GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

#添加 apt 源:
sudo add-apt-repository \
   "deb [arch=amd64] http://mirrors.aliyun.com/docker-ce/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

#更新源
sudo apt update
sudo apt-get update
```

>添加 Docker 官方 GPG key由于政策原因导致官方的地址无法被访问
>**解决方法**
>
>1）先把官方GPG key下载到本地，下载下来是一个gpg文件，Url链接为：
>
>```cobol
>https://download.docker.com/linux/ubuntu/gpg
>```
>
>2）下载到本地后，采用如下命令，安装官方GPG key：
>
>```cobol
>sudo apt-key add /root/gpg
>```
>
>3）注意：/root/gpg 为gpg文件在我Ubuntu下的文件路径，读者记住，一定要用自己的。
>
>4.解决问题，完美安装！
>
>**解决方法二**
>
>添加阿里云和清华大学镜像源的GPG密钥（如果需要）：
>
>```
>sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 3B4FE6ACC0B21F32
>```

## 安装Docker

```shell
#安装最新版本的Docker
sudo apt install docker-ce docker-ce-cli containerd.io
#等待安装完成


#查看Docker版本
sudo docker version
docker -v

# 设置开机自启
systemctl enable docker

#查看Docker运行状态
sudo systemctl status docker
```

>### 配置Docker源
>
>如果您想要使用Docker的官方源，可以按照官方文档中的说明来配置。但是，由于网络原因，直接访问Docker官方源可能会比较慢，您可以选择使用国内的镜像源，例如阿里云提供的Docker镜像源。
>
>#### 使用阿里云Docker镜像源
>
>**移除旧版本的Docker**（如果存在）：
>
>```
>sudo apt-get remove docker docker-engine docker.io containerd runc
>```
>
>*设置Docker的APT仓库**：
>
>- 更新APT包索引：
>
>  ```
>  sudo apt-get update
>  ```
>
>- 安装必要的包以允许apt通过HTTPS使用仓库：
>
>  ```
>  sudo apt-get install apt-transport-https ca-certificates curl software-properties-common
>  ```
>
>- 添加Docker的官方GPG密钥（上面已经提到过）。
>
>- 设置稳定版仓库（这里以阿里云为例）：
>
>  ```
>  echo "deb [arch=amd64] https://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list
>  ```
>
>**安装Docker CE**：
>
>- 更新APT包索引：
>
>  ```
>  sudo apt-get update
>  ```
>
>- 安装Docker CE：
>
>  ```
>  sudo apt-get install docker-ce docker-ce-cli containerd.io
>  ```
>
>完成以上步骤后，您应该能够成功安装Docker了。如果在安装过程中仍然遇到问题，请确保您的Ubuntu版本与Docker兼容，并且您正确地执行了每一步操作。

## 安装Docker 命令补全工具

```shell
sudo apt-get install bash-completion

sudo curl -L https://raw.githubusercontent.com/docker/docker-ce/master/components/cli/contrib/completion/bash/docker -o /etc/bash_completion.d/docker.sh

source /etc/bash_completion.d/docker.sh
```

## 允许非Root用户执行docker 命令

当我们安装好了Docker之后，有两种方式来执行docker 命令

- 在docker命令前加上sudo, 比如：sudo docker ps
- sudo -i 切换至root用户，再执行docker 命令

是不是可以让当前用户在不切root，或者不加sudo 的情况下正常使用 docker 命令呢？答案是有的。

#### 添加docker用户组

```shell
sudo groupadd docker
```

#### 将当前用户添加到用户组

```shell
sudo usermod -aG docker $USER
```

#### 使权限生效

```shell
newgrp docker 
```

#### 测试一下

```shell
#查看所有容器
docker ps -a
```

#### 最后一步 更新.bashrc文件

我们需要编辑 ~/.bashrc文件，并在文件末尾增加如下一行,如果不在.bashrc文件中增加下面这一行命令

```shell
#如果没有此行命令，你会发现，当你每次打开新的终端
#你都必须先执行一次 “newgrp docker” 命令
#否则当前用户还是不可以执行docker命令
groupadd -f docker
```

# 配置镜像加速

## 注册阿里云账号

首先访问阿里云网站:

https://www.aliyun.com/

注册一个账号。

## 5.2.开通镜像服务

在首页的产品中，找到阿里云的**容器镜像服务**：

![img](img/1_安装Docker/-17201743092211.png)

点击后进入控制台：

![img](img/1_安装Docker/-17201743141003.png)

首次可能需要选择立刻开通，然后进入控制台。

## 5.3.配置镜像加速

找到**镜像工具**下的**镜像****加速器**：

![img](img/1_安装Docker/-17201743180505.png)

页面向下滚动，即可找到配置的文档说明：

![img](img/1_安装Docker/-17201743217877.png)

具体命令如下：

```Bash
# 创建目录
mkdir -p /etc/docker

# 复制内容，注意把其中的镜像加速地址改成你自己的
tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": [
  	"https://xxxx.mirror.aliyuncs.com",
  	"https://github.com/DaoCloud/public-image-mirror"
  ]
}
EOF

# 重新加载配置
systemctl daemon-reload

# 重启Docker
systemctl restart docker
```
