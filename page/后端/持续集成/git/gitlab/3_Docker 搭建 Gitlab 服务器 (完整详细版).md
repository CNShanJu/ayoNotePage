#### 1、Gitlab镜像

```shell
# 拉取Gitlab镜像
docker pull swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/gitlab/gitlab-ce:17.4.1-ce.0
docker tag swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/gitlab/gitlab-ce:17.4.1-ce.0  gitlab-ce:17.4.1
docker rmi swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/gitlab/gitlab-ce:17.4.1-ce.0
```

#### 2、启动Gitlab容器 

创建对应挂载的目录

```shell
cd /home/docker_volume
mkdir gitlab
cd gitlab
mkdir etc log opt
```

创建运行容器

```shell
docker run \
-itd  \
-p 9980:80 \
-p 9922:22 \
-v /home/docker_volume/gitlab/etc:/etc/gitlab  \
-v /home/docker_volume/gitlab/log:/var/log/gitlab \
-v /home/docker_volume/gitlab/opt:/var/opt/gitlab \
--restart always \
--privileged=true \
--name gitlab \
gitlab-ce:17.4.1
```

| 命令                                          | 描述                                                         |
| :-------------------------------------------- | :----------------------------------------------------------- |
| -i                                            | 以交互模式运行容器，通常与 -t 同时使用命令解释               |
| -t                                            | 为容器重新分配一个伪输入终端，通常与 -i 同时使用             |
| -d                                            | 后台运行容器，并返回容器ID                                   |
| -p 9980:80                                    | 将容器内80端口映射至宿主机9980端口，这是访问gitlab的端口     |
| -p 9922:22                                    | 将容器内22端口映射至宿主机9922端口，这是访问ssh的端口        |
| -v /home/docker_volume/gitlab/etc:/etc/gitlab | 将容器/etc/gitlab目录挂载到宿主机/home/docker_volume/gitlab/etc目录下，若宿主机内此目录不存在将会自动创建，其他两个挂载同这个一样 |
| --restart always                              | 容器自启动                                                   |
| --privileged=true                             | 让容器获取宿主机root权限                                     |
| --name gitlab                                 | 设置容器名称为gitlab                                         |
| gitlab/gitlab-ce                              | 镜像的名称，这里也可以写镜像ID                               |

> <span style="color:red">接下来的配置请在容器内进行修改，不要在挂载到宿主机的文件上进行修改。否则可能出现配置更新不到容器内，或者是不能即时更新到容器内，导致gitlab启动成功，但是无法访问</span>

####  3、修改配置

```bash
#进容器内部
docker exec -it gitlab /bin/bash
#修改gitlab.rb
vi /etc/gitlab/gitlab.rb
#加入如下
#gitlab访问地址，可以写域名。如果端口不写的话默认为80端口
external_url 'http://192.168.124.194'
#ssh主机ip
gitlab_rails['gitlab_ssh_host'] = '192.168.124.194'
#ssh连接端口
gitlab_rails['gitlab_shell_ssh_port'] = 9922
# 让配置生效
gitlab-ctl reconfigure
```

![img](img/3_Docker 搭建 Gitlab 服务器 (完整详细版)/9e3f962c3e7dcf4d2c14b81675c38841.png)

![img](img/3_Docker 搭建 Gitlab 服务器 (完整详细版)/6c73c497998a9887e3127a13140d15f2.png)

> \### 注意不要重启，/etc/gitlab/gitlab.rb文件的配置会映射到gitlab.yml这个文件，由于咱们在docker中运行，在gitlab上生成的http地址应该是http://192.168.124.194:9980,所以，要修改下面文件

```shell
# 修改http和ssh配置
vi /opt/gitlab/embedded/service/gitlab-rails/config/gitlab.yml
 
  gitlab:
    host: 192.168.124.194
    port: 9980 # 这里改为9980
    https: false
```

![img](img/3_Docker 搭建 Gitlab 服务器 (完整详细版)/9b41c52ed6003326a3384638218dc1c1.png)

![img](img/3_Docker 搭建 Gitlab 服务器 (完整详细版)/4ad7ad55c3efa62456ec4b150e0bcfdb.png)

```shell
#重启gitlab 
gitlab-ctl restart
#退出容器 
exit
```

#### 4、浏览器访问 

路径访问：http://192.168.124.194:9980/

> 机器配置要大于4g，否则很容易启动不了，报502

![img](img/3_Docker 搭建 Gitlab 服务器 (完整详细版)/81a4bb5331d8beb8a807a6c11cb7d1ee.png)

> \# 第一次访问，会让修改root密码
> \# 修改后以root用户登录即可 

![img](img/3_Docker 搭建 Gitlab 服务器 (完整详细版)/a34d76030267b5286eb7ad25e9a759da.png)

#### 5、 修改root密码

```shell
# 进入容器内部
docker exec -it gitlab /bin/bash
# 进入控制台
gitlab-rails console -e production
# 查询id为1的用户，id为1的用户是超级管理员
user = User.where(id:1).first
# 修改密码为lhx123456
user.password='lhx123456'
# 保存
user.save!
# 退出
exit
```

![img](img/3_Docker 搭建 Gitlab 服务器 (完整详细版)/18c42ba9f98cce0372eda4695e6d3c4b.png)

#### 6、Gitlab操作

创建分组，创建项目

![img](img/3_Docker 搭建 Gitlab 服务器 (完整详细版)/65dca17db3f7f0ef4d5200b75d5e5746.png)

![img](img/3_Docker 搭建 Gitlab 服务器 (完整详细版)/7cecd39118b0cb673860c8e734b9f70e.png) ![img](img/3_Docker 搭建 Gitlab 服务器 (完整详细版)/513a9613db98faa7f6a2534d5154c461.png)

![img](img/3_Docker 搭建 Gitlab 服务器 (完整详细版)/e4016cf7c2c741f1485a30166da89f3c.png) 至此，Docker搭建Gitlab服务器完成！！！
