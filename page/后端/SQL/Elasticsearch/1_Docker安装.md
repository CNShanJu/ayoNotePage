>参考：https://cloud.tencent.com/developer/article/2192234
>
>### 注意事项
>
>- [elasticsearch](https://cloud.tencent.com/product/es?from_column=20065&from=20065)安装之后，十分消耗内存资源，需要手动配置限制内存大小。
>- elasticsearch和Kibana安装时，版本号需要一致。

## 创建网络

一般来说，我们在使用elasticsearch的时候会结合kibana一起使用，为了他们能够正常关联，我们创建一个网络来连接他们

```sh
docker network create es-net
```

查看是否创建

```sh
docker network ls

docker inspect es-net
```

## 运行ElasticSearch容器

#### 拉取 ElasticSearch 镜像

我这边选择的版本是 `docker pull elasticsearch:8.15.3`在终端中执行以下命令以拉取 `docker pull elasticsearch:8.15.3`根据自己使用过的版本：

```sh
docker pull swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.elastic.co/elasticsearch/elasticsearch:8.15.3
docker tag  swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.elastic.co/elasticsearch/elasticsearch:8.15.3  elasticsearch:8.15.3
docker rmi swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.elastic.co/elasticsearch/elasticsearch:8.15.3
```

#### 准备挂载目录

```sh
mkdir -p /home/docker_volume/es/main
cd /home/docker_volume/es/main
mkdir data plugins config logs
```

#### 创建并运行容器

使用以下命令创建一个新的 elasticsearch 容器并将其启动：

```sh
# docker stop elasticsearch
# docker rm elasticsearch
# docker exec -it elasticsearch bash

docker run -d \
--name elasticsearch \
--restart=always \
-p 9200:9200 \
-p 9300:9300 \
-e "discovery.type=single-node" \
-e ES_JAVA_OPTS="-Xms512M -Xmx1G" \
--net es-net \
elasticsearch:8.15.3




############################
# 参数解释说明
# -d 后台运行 
# --name xybes 						指定容器唯一的名称，方便管理
# --net xybnet						指定网络
# -p 9200:9200 -p 9300:9300 		映射容器端口到宿主机上
# -e "discovery.type=single-node" 	环境变量配置为单机模式
# -e ES_JAVA_OPTS="-Xms1024m -Xmx2048m"	设置内存大小
# elasticsearch:8.2.0 					镜像名称和版本号
```

拷贝出文件

```sh
docker cp elasticsearch:/usr/share/elasticsearch/data /home/docker_volume/es/main
docker cp elasticsearch:/usr/share/elasticsearch/plugins /home/docker_volume/es/main
docker cp elasticsearch:/usr/share/elasticsearch/config /home/docker_volume/es/main
docker cp elasticsearch:/usr/share/elasticsearch/logs /home/docker_volume/es/main

sudo chown -R 1000:1000 /home/docker_volume/es/main/data
sudo chown -R 1000:1000 /home/docker_volume/es/main/plugins
sudo chown -R 1000:1000 /home/docker_volume/es/main/config
sudo chown -R 1000:1000 /home/docker_volume/es/main/logs
```

重新部署并挂载目录

```sh
docker stop elasticsearch
docker rm elasticsearch
```

```sh
docker run -d \
--name elasticsearch \
--restart=always \
-p 9200:9200 \
-p 9300:9300 \
-e "discovery.type=single-node" \
-e ES_JAVA_OPTS="-Xms512M -Xmx1G" \
-v /home/docker_volume/es/main/data:/usr/share/elasticsearch/data \
-v /home/docker_volume/es/main/plugins:/usr/share/elasticsearch/plugins \
-v /home/docker_volume/es/main/config:/usr/share/elasticsearch/config \
-v /home/docker_volume/es/main/logs:/usr/share/elasticsearch/logs \
--net es-net \
elasticsearch:8.15.3
```

--name 是 容器别名
将 宿主机 9200[端口映射](https://so.csdn.net/so/search?q=端口映射&spm=1001.2101.3001.7020)到 容器内9200
and 端口9300端口映射到 容器内9300 端口，访问宿主机端口的时候会映射到对应容器端口
-e 表示额外参数
"`discovery.type=single-node`" 表示 指定 Elasticsearch 节点在`单节点模式`下运行，即启动一个独立的 Elasticsearch 实例而不是一个多节点集群

`ES_JAVA_OPTS`设置内存大小可根据当前设备来调整

表示 -d 表示后台运行。

#### elasticsearch常用端口以及作用

9300端口：是用于Elasticsearch节点之间的内部通信和数据传输的端口，多用于集群在多个节点中通信。

9200端口：用于HTTP REST API与Elasticsearch进行通信和操作的端口。

#### 测试，是否启动成功

注意！ es8.0以上默认开启了 ssl 认证
直接访问 : http://127.0.0.1:9200 是无法访问的，需要访问 https,或者关闭 SSL认证

使用浏览器打开 https://127.0.0.1:9200

自Elasticsearch 7.8.0版本开始，Elasticsearch 不再提供默认的用户名和密码。相反，它采用了内置安全特性，并引入了超级用户（superuser）角色和内置用户（built-in users）概念来管理访问控制。

在新安装的情况下，您需要设置一个初始的内置用户以及相关的登录凭据。可以通过修改 Elasticsearch 的配置文件（elasticsearch.yml）来完成此操作。以下是一个示例：

Docker ElastIcSearch容器配置文件路径

进入容器

```sh
docker exec -it elasticsearch bash
```

找到配置文件路径

```sh
cd  /usr/share/elasticsearch/config
```

打开 elasticsearch.yml 文件 找到 xpack.security.enabled: true 改为 xpack.security.enabled: false,这样就可以直接 使用http访问，并且`不需要账号密码鉴权`,这个设置看个人情况，如果是生产环境建议开始开启 https和账号密码鉴权

重启容器

```sh
docker restart elasticsearch
```

在访问 `http://127.0.0.1:9200`

#### 设置账号密码

```sh
docker exec -it elasticsearch bash

cd /usr/share/elasticsearch/bin
./elasticsearch-setup-passwords interactive
```

依次设置用户：`elastic`、`apm_system`、`kibana_system`、`logstash_system`、`beats_system`、`remote_monitoring_user`共6个用户。
**内部用户**
X-Pack 安全有三个内部用户（`_system`、`_xpack`和`_xpack_security`），负责在 Elasticsearch 集群中进行的操作。

这些用户仅由源自集群内的请求使用。出于这个原因，它们不能用于对 API 进行身份验证，并且没有密码可以管理或重置。

有时，您可能会在日志中找到对这些用户之一的引用，包括审计日志。

![image-20241118114909291](img/1_Docker%E5%AE%89%E8%A3%85/image-20241118114909291.png)

##### 测试是否设置成功

```sh
curl localhost:9200
```

结果显示：

```sh
root@tiduvm:~# curl localhost:9200
{"error":{"root_cause":[{"type":"security_exception","reason":"missing authentication credentials for REST request [/]","header":{"WWW-Authenticate":["Basic realm=\"security\", charset=\"UTF-8\"","ApiKey"]}}],"type":"security_exception","reason":"missing authentication credentials for REST request [/]","header":{"WWW-Authenticate":["Basic realm=\"security\", charset=\"UTF-8\"","ApiKey"]}},"status":401}
```

显示这个则设置成功。
使用密码访问elasticsearch测试是否可以访问。

```sh
curl localhost:9200 -u elastic
```

就可以看到elasticsearch信息。

##### 修改密码

###### 已知密码修改

```bash
POST _security/user/elastic/_password
POST _security/user/<username>/_password


# 将用户elastic  密码改为elastic
curl -u elastic:<current_password> -H "Content-Type: application/json" -X POST "http://localhost:9200/_security/user/elastic/_password" -d '{
  "password" : "new_password"
}'
#请将 <current_password> 替换为当前的 elastic 用户密码，
#并将 new_password 替换为你希望设置的新密码。
curl -u elastic:123456 -H "Content-Type: application/json" -X POST "http://localhost:9200/_security/user/elastic/_password" -d '{
  "password" : "123456"
}'

# 测试是否修改成功
curl localhost:9200 -u elastic
```

###### 忘记密码（重置elastic的密码）

创建本地超级账户，然后使用api接口本地超级账户重置elastic账户的密码

确保你的配置文件中支持本地账户认证支持，如果你使用的是xpack的默认配置则无需做特殊修改；如果你配置了其他认证方式则需要确保配置本地认证方式在ES_HOME/config/elasticsearch.yml中。

使用命令ES_HOME/bin/x-pack/users创建一个基于本地问价认证的超级管理员。

进入docker容器中elasticsearch中，执行

```bash
docker exec -it elasticsearch bash
/usr/share/elasticsearch/bin/elasticsearch-users useradd test_admin -p test_password -r superuser
```

查看已经创建的用户

```sh
/usr/share/elasticsearch/bin/elasticsearch-users list
```

通过api重置elastic超级管理员的密码

```bash
curl -u test_admin -XPUT  -H 'Content-Type: application/json' 'http://localhost:9200/_security/user/elastic/_password' -d '{"password" : "新密码"}'

# curl -u test_admin:test_password -XPUT  -H 'Content-Type: application/json' 'http://localhost:9200/_security/user/elastic/_password' -d '{"password" : "123456"}'
```

删除已经创建的用户

```sh
/usr/share/elasticsearch/bin/elasticsearch-users userdel test_admin
```

校验下密码是否重置成功

```bash
curl localhost:9200 -u elastic
```

退出容器

```sh
exit
```

##### **创建用户**

**方式一(一般用于重置elastic的密码)：**

进入docker容器中elasticsearch中，执行

```bash
docker exec -it elasticsearch bash
/usr/share/elasticsearch/bin/elasticsearch-users useradd test_admin -p test_password -r superuser


# /usr/share/elasticsearch/bin/elasticsearch-users useradd ayo -p 123456 -r superuser
```

**方式二：**

使用 REST API

如果你更喜欢使用 REST API 来管理用户，可以按照以下步骤操作：

```bash
curl -u elastic:<current_password> -H "Content-Type: application/json" -X POST "http://localhost:9200/_security/user/ayo" -d '{
  "password" : "123456",
  "roles" : [ "superuser" ]
}'
```

将 `<current_password>` 替换为当前的 `elastic` 用户密码

**方式三：**

使用环境变量

你可以在启动 Kibana 容器时通过环境变量传递这些配置

```bash
docker run -d \
  --name kibana \
  --restart=always \
  -p 5601:5601 \
  -e ELASTICSEARCH_HOSTS="https://elasticsearch:9200" \
  -e ELASTICSEARCH_USERNAME="ayo" \
  -e ELASTICSEARCH_PASSWORD="123456" \
  -e SERVER_SSL_ENABLED="true" \
  -e SERVER_SSL_CERTIFICATE="/usr/share/kibana/config/elasticsearch.crt" \
  -e SERVER_SSL_KEY="/usr/share/kibana/config/elasticsearch.key" \
  -v /path/to/elasticsearch.crt:/usr/share/kibana/config/elasticsearch.crt \
  -v /path/to/elasticsearch.key:/usr/share/kibana/config/elasticsearch.key \
  --net es-net \
  kibana:8.15.3
```

**验证是否创建成功**

```sh
#curl -u elastic:<current_password> -X GET "http://localhost:9200/_security/user?pretty"
curl -u elastic:1234567 -X GET "http://localhost:9200/_security/user?pretty"
# curl -u ayo:123456 -X GET "http://localhost:9200/_security/user/ayo?pretty"
# curl -u elastic:123456 -X GET "http://localhost:9200/_security/user/elastic?pretty"
```

所有创建的用户都存于这个文件里

```sh
cat /usr/share/elasticsearch/config/users_roles
```

#### Elastic Search出现跨域异常

如果连接 Elastic Search出现跨域异常，需要配置 Elasticsearch允许跨域请求

Docker ElastIcSearch容器配置文件路径

进入容器

```java
docker exec -it elasticsearch bash
```

找到配置文件路径

```java
cd  /usr/share/elasticsearch/config
```

打开 `elasticsearch.yml` 文件 加上以下配置支持跨域请求

```java
http.cors.enabled: true
http.cors.allow-origin: "*"
```

![在这里插入图片描述](img/1_Docker%E5%AE%89%E8%A3%85/dc204d2f1b99d462ddf4eb818c409d3a.png)

#### 退出容器异常

当在es容器内执行exit语句报错，信息如下

```sh
elasticsearch@07df855414a4:/$ exit
exit
There are stopped jobs.
elasticsearch@07df855414a4:/$
```

看到"`There are stopped jobs.`"的提示时，这意味着有一些后台任务（jobs）被暂停了。在这种情况下，直接使用`exit`命令退出可能会导致这些任务被强制终止。

你可以通过以下步骤来处理这种情况：

1. **列出所有任务**：使用`jobs`命令可以查看当前session中所有的后台任务。

   深色版本

   ```sh
   elasticsearch@07df855414a4:/$ jobs
   ```

2. **恢复并终止任务**：如果想要继续并安全地结束这些任务，可以使用`fg %jobnumber`将指定的任务带回到前台，然后使用`Ctrl+C`来终止它。例如，如果有两个任务，你可以这样做：

   深色版本

   ```sh
   elasticsearch@07df855414a4:/$ fg %1
   (使用 Ctrl+C 终止任务)
   elasticsearch@07df855414a4:/$ fg %2
   (使用 Ctrl+C 终止任务)
   ```

3. **直接终止任务**：如果你确定不需要这些任务的结果，可以直接用`kill`命令来终止它们。例如，要终止任务1，可以执行：

   深色版本

   ```sh
   elasticsearch@07df855414a4:/$ kill %1
   ```

4. **退出会话**：一旦所有任务都被妥善处理，你可以再次尝试使用`exit`来退出会话。

   深色版本

   ```sh
   elasticsearch@07df855414a4:/$ exit
   ```

如果你不确定这些任务是否重要，或者担心终止它们可能造成的影响，最好先查阅相关文档或咨询有经验的同事。处理完所有停止的任务后，你应该能够顺利退出当前的shell会话。



## 集群方式运行ElasticSearch容器

#### 参数挂载启动

注意每台服务器需要修改的参数
node.name —— es集群节点名称，每台服务器不同
network.publist_host —— 服务器ip

```bash
docker run -d \
  --privileged=true \
  --name=es8 \ 
  -p 9200:9200 \
  -p 9300:9300 \
  # es集群节点名称，每台服务器不同
  -e node.name=node-1 \ 
  # 服务器ip
  -e network.publish_host=192.168.100.125 \ 
  -e network.host=0.0.0.0 \ 
  # es集群连接ip和端口9300
  -e discovery.seed_hosts=192.168.100.125:9300,192.168.100.39:9300,192.168.100.2:9300 \
  # es集群节点
  -e cluster.initial_master_nodes=node-1,node-2,node-3 \
  # es集群名称，三台服务器要统一
  -e cluster.name=es-cluster \
  -e xpack.security.enabled=false \
  -e TZ=Asia/Shanghai \
  elasticsearch:8.15.3
```

#### 配置文件挂载启动

编写elasticsearch.yml

```bash
# 进入elasticsearch文件目录
cd /usr/local/docker/elasticsearch
# 创建config文件夹
mkdir config
# 进入config文件加
cd config
# 编写elasticsearch.yml
vim elasticsearch.yml
```

elasticsearch.yml

```bash
# 集群名称
cluster.name: es-cluster
# 节点名称
node.name: node-1
# 网络地址
network.host: 0.0.0.0
network.publish_host: 192.168.100.125
# 集群节点配置
discovery.seed_hosts: ["192.168.100.125:9300","192.168.100.39:9300","192.168.100.2:9300"]
# 主节点候选
cluster.initial_master_nodes: ["node-1","node-2","node-3"]

# 客户端端口
http.port: 9200
# 集群节点端口
transport.port: 9300

# 是否开启安全认证
xpack.security.enabled: false
xpack.security.enrollment.enabled: true

# 是否开启ssl
xpack.security.http.ssl:
  enabled: false
  #keystore.path: /usr/share/elasticsearch/config/certs/http.p12
  #truststore.path: /usr/share/elasticsearch/config/certs/http.p12

# 是否开启访问安全认证
xpack.security.transport.ssl:
  enabled: false
  #verification_mode: certificate
  #keystore.path: /usr/share/elasticsearch/config/certs/elastic-certificates.p12
  #truststore.path: /usr/share/elasticsearch/config/certs/elastic-certificates.p12

# 跨域配置
http.cors.enabled: true
http.cors.allow-origin: "*"
http.host: 0.0.0.0
```

启动es

```bash
docker run -d \
  --privileged=true \
  --name es \ 
  --network es-net \
  -p 9200:9200 \
  -p 9300:9300 \
  -v /usr/local/docker/elasticsearch/data:/usr/share/elasticsearch/data \
  -v /usr/local/docker/elasticsearch/plugins:/usr/share/elasticsearch/plugins \
  -v /usr/local/docker/elasticsearch/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml \
  elasticsearch:8.15.3
```

## 安装ElastIcSearch 可视化管理界面

####  使用 Kibana 可视化管理界面

```sh
docker pull swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/kibana:8.15.3
docker tag  swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/kibana:8.15.3  kibana:8.15.3
docker rmi swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/kibana:8.15.3
```

#### 准备挂载目录

```sh
mkdir -p /home/docker_volume/es/kibana
cd /home/docker_volume/es/kibana
```

#### 无挂载启动

```sh
#docker run -d \
#--restart=always \
#--name kibana \
#-p 5601:5601 \
#--privileged \
#-e ELASTICSEARCH_HOSTS=elasticsearch:9200 \
#--net es-net \
#kibana:8.15.3


#docker run -d \
#--restart=always \
#--name kibana \
#-e ELASTICSEARCH_HOSTS="http://192.168.56.101:9200" \
#--network="container:elasticsearch" \
#kibana:8.15.3


docker run -d \
  --name kibana \
  --restart=always \
  -p 5601:5601 \
  -e ELASTICSEARCH_HOSTS="http://elasticsearch:9200" \
  --net es-net \
  kibana:8.15.3
```

ELASTICSEARCH_HOSTS：指定es链接信息

> -e ELASTICSEARCH_HOSTS=elasticsearch:9200 

#### cp文件

```bash
docker cp kibana:/usr/share/kibana/data /home/docker_volume/es/kibana
docker cp kibana:/usr/share/kibana/config /home/docker_volume/es/kibana


sudo chown -R 1000:1000 /home/docker_volume/es/kibana/data
sudo chown -R 1000:1000 /home/docker_volume/es/kibana/config
```

**设置中文**

在`/home/docker_volume/es/kibana/config/kibana.yml`下加入一条配置信息即可

```yaml
i18n.locale: "zh-CN"
```

**设置es的访问用户(如果需要)**

在`/home/docker_volume/es/kibana/config/kibana.yml`下加入一条配置信息即可

```sh
# 此处设置elastic的用户名和密码
elasticsearch.username: ayo
elasticsearch.password: 123456
```

#### 创建新的挂载容器

1、停止并删除原容器

```bash
docker stop kibana
docker rm kibana
```

2、创建新容器并挂载

```sh
docker run -d \
--restart=always \
--name kibana \
-p 5601:5601 \
-v /home/docker_volume/es/kibana/data:/usr/share/kibana/data \
-v /home/docker_volume/es/kibana/config:/usr/share/kibana/config \
-e ELASTICSEARCH_HOSTS="http://elasticsearch:9200" \
--net es-net \
kibana:8.15.3
```

#### 验证是否安装成功

输入服务器ip地址+端口，如**http://127.0.0.1:5601**

![image-20241118141306873](img/1_Docker%E5%AE%89%E8%A3%85/image-20241118141306873.png)

#### 配置令牌

![image-20241118141402382](img/1_Docker%E5%AE%89%E8%A3%85/image-20241118141402382.png)

##### 生成elasticsearch的token

```sh
docker exec -it elasticsearch bash
cd /usr/share/elasticsearch/bin
./elasticsearch-create-enrollment-token --scope kibana
```

将生成的令牌填入页面

##### 获取kibana验证码

![image-20241118142026444](img/1_Docker%E5%AE%89%E8%A3%85/image-20241118142026444.png)

```sh
docker logs kibana

# Go to http://0.0.0.0:5601/?code=675842 to get started.
```

会看到  `Go to xxxx`,其中code的值`675842`就是验证的值

## 安装ik分词器

在全文检索理论中，文档的查询是通过关键字查询文档索引来进行匹配，因此将文本拆分为有意义的单
词，对于搜索结果的准确性至关重要，因此，在建立索引的过程中和分析搜索语句的过程中都需要对文
本串分词。ES的倒排索引是分词的结果。

为了后面做类型映射,需要先集成分词器；
lucene由于是jar工具包,如果要在使用lucene的环境下使用ik分词器,只需导入对应jar,做一些配置就OK.但是ES不是工具包了,是服务器.怎么集成呢?
以插件的方式集成ES服务器,客户端只需告诉我们某个字段要用这个分词器就OK了.

ik分词器开源地址

```bash
https://github.com/infinilabs/analysis-ik/releases
```

![image-20241122172356758](img/1_Docker%E5%AE%89%E8%A3%85/image-20241122172356758.png)

安装拼音分词

```sh
安装拼音分词
./bin/elasticsearch-plugin install https://github.com/medcl/elasticsearch-analysis-pinyin/releases/download/v7.5.1/elasticsearch-analysis-pinyin-7.5.1.zip
```

### 离线安装

下载zip包，将zip包上传到`es的plugins目录下`

这里我由于部署的时候已经挂载了plugins的地址，所以直接上传到对应地址即可`/home/docker_volume/es/main/plugins`

![image-20241122172713109](img/1_Docker%E5%AE%89%E8%A3%85/image-20241122172713109.png)

```sh
cd /home/docker_volume/es/main/plugins

# 解压
mkdir ./ik
chmod 755 ./ik

unzip ik_8.12.2.zip -d ./ik/
# 复制到容器内 => 未挂载plugins目录则执行拷贝语句
# docker cp ik elasticsearch:/usr/share/elasticsearch/plugins/


# unzip analysis-ik-Latest.zip -d ./ik/
```

打开IK分词器所在的位置，打开 `plugin-descriptor.properties`文件，将`version`和`elasticsearch.version`的值从8.12.2修改为`8.15.3`（当前es的版本），重启容器完成。

>一定记得删除`/home/docker_volume/es/main/plugins`下的zip包再重新启动，不然会一直报启动的错误

```sh
# 重启es节点
docker restart elasticsearch
```

### 测试分词器

随便在网上找段话，看看效果如何

```
POST _analyze
{
  "analyzer":"ik_smart",
  "text":"总有一些文章一些句子让我们感同身受,引发读者们的共鸣"
}
```

> **注意：IK分词器有两种类型，分别是`ik_smart`分词器和`ik_max_word`分词器。
> ik_smart: 会做最粗粒度的拆分，比如会将“中华人民共和国国歌”拆分为“中华人民共和国,国歌”。
> ik_max_word: 会将文本做最细粒度的拆分，比如会将“中华人民共和国国歌”拆分为“中华人民共和国,中华人民,中华,华人,人民共和国,人民,人,民,共和国,共和,和,国国,国歌”，会穷尽各种可能的组合；**
