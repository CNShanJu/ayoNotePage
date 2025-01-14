## 安装并启动zookeeper

在安装`kafka`之前需要先安装`zookeeper`，因为`kafka` 启动会将元数据保存在 `zookeeper` 中，`zookeeper`是一种`分布式协调服务`，可以在`分布式系统中共享配置`，`协调锁资源`，`提供命名服务`

如果已经安装了`zookeeper`，直接跳过此步骤

### 拉取zookeeper镜像

```sh
docker pull swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/zookeeper:3.9.3-jre-17
docker tag  swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/zookeeper:3.9.3-jre-17  zookeeper:3.9.3-jre-17
docker rmi swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/zookeeper:3.9.3-jre-17
```

### 创建挂载目录

```sh
mkdir -p /home/docker_volume/zookeeper/{data,logs}

# data # 数据挂载目录
# conf # 配置挂载目录
# logs # 日志挂载目录
```

### 运行容器获取基本配置信息并导出

```sh
# 1.运行
docker run -d -p 2181:2181 --name zookeeper zookeeper:3.9.3-jre-17

# 2.拷贝配置文件
docker cp zookeeper:/conf /home/docker_volume/zookeeper

# 3.停止容器并删除
docker stop zookeeper
docker rm zookeeper
```

### zoo.cfg说明(可忽略)

在`conf`{/home/docker_volume/zookeeper/conf}文件夹下可修改自定义[配置文件](https://so.csdn.net/so/search?q=配置文件&spm=1001.2101.3001.7020)`zoo.cfg`：

```sh
# 服务器之间或客户端与服务器之间的单次心跳检测时间间隔，单位为毫秒
tickTime=2000

# 指定初始连接时限。这是 ZooKeeper 集群中 follower 节点与 leader 节点建立连接的最大时间限制（以 tickTime 为单位）。
# 确保 follower 节点有足够的时间与 leader 节点同步数据。
initLimit=10

# 指定同步时限。这是 follower 节点与 leader 节点同步数据的最大时间限制（以 tickTime 为单位）。
# 确保 follower 节点能够及时同步 leader 节点的数据，防止数据不一致。
syncLimit=5

# 客户端连接 Zookeeper 服务器的端口，Zookeeper 会监听这个端口，接受客户端的访问请求（通常不做修改）
# clientPort=2181

# 指定 ZooKeeper 存储持久化数据的目录。在这个目录中，ZooKeeper 会存储事务日志和快照。
# 确保 ZooKeeper 的状态数据不会丢失，即使在重启后也能恢复。
dataDir=/data

# 指定 ZooKeeper 存储事务日志的目录。事务日志记录了所有的写操作，用于数据的持久化和恢复。
# 将事务日志与快照分开存储，可以提高性能，特别是在高负载情况下。
dataLogDir=/datalog

# 指定自动清理时保留的快照数量。当自动清理功能启用时，ZooKeeper 会保留最近的 autopurge.snapRetainCount 个快照。
# 控制磁盘空间使用，避免过多的快照占用大量磁盘空间。
autopurge.snapRetainCount=3

# 指定自动清理的间隔时间（以小时为单位）。设置为 0 表示禁用自动清理功能。
# 控制自动清理的频率，防止不必要的磁盘清理操作。
autopurge.purgeInterval=0

# 指定每个客户端的最大连接数。这是单个客户端可以与 ZooKeeper 服务器建立的最大连接数。
# 控制每个客户端的连接数，防止资源耗尽。
maxClientCnxns=6

# 指定是否允许 ZooKeeper 以独立模式运行。如果设置为 true，ZooKeeper 可以在没有集群的情况下单独运行。
# 适用于单节点部署或开发环境。
standaloneEnabled=true

# 指定是否启用 ZooKeeper 的管理服务器。管理服务器提供了一个 HTTP 接口，用于监控和管理 ZooKeeper 服务。
# 便于管理和监控 ZooKeeper 服务，可以通过浏览器或其他工具访问管理接口。
admin.enableServer=true

# 指定 ZooKeeper 集群中的一个节点。server.1 表示这是第一个节点，localhost:2888:3888 是该节点的地址和端口，其中 2888 是 follower 节点与 leader 节点通信的端口，3888 是选举 leader 时使用的端口，2181 是客户端连接的端口。
# 配置 ZooKeeper 集群中的节点信息，使得各个节点能够相互通信。
server.1=localhost:2888:3888;2181

#这些配置项共同决定了 ZooKeeper 的行为和性能。
#在单节点部署中，standaloneEnabled=true 和 server.1=localhost:2888:3888;2181 
#使得 ZooKeeper 能够在独立模式下运行。
#而在多节点集群中，需要为每个节点配置相应的 server.X 项，
#并确保 initLimit 和 syncLimit 设置合理，以保证集群的稳定性和性能。
```

> 注：如果不配置dataLogDir，那么事务日志也会写在data目录中。这样会严重影响zookeeper的性能。因为在zookeeper吞吐量很高的时候，产生的事务日志和快照日志太多。

### 启动zookeeper镜像

```shell
docker run --restart=always \
--name zookeeper \
-e TZ="Asia/Shanghai" \
-p 2181:2181 \
--log-driver json-file \
--log-opt max-size=100m \
--log-opt max-file=2  \
-v /etc/localtime:/etc/localtime \
-v /home/docker_volume/zookeeper/data:/data \
-v /home/docker_volume/zookeeper/conf:/conf \
-v /home/docker_volume/zookeeper/logs:/datalog \
-d zookeeper:3.9.3-jre-17

# docker ps | grep zookeeper
# docker stop zookeeper
# docker rm zookeeper
# docker exec -it zookeeper bash
```

|               命令               |              注释              |
| :------------------------------: | :----------------------------: |
|         –restart=always          |     表示容器退出时总是重启     |
|      –log-driver json-file       | 表示使用 JSON 文件作为日志驱动 |
|      –log-opt max-size=100m      | 表示设置日志的最大大小为100MB  |
|       –log-opt max-file=2        |   表示设置日志文件的最大数量   |
|              –name               |          表示容器命名          |
|                -p                |          表示端口映射          |
| -v /etc/localtime:/etc/localtime |   表示将本地时间映射到容器中   |
|                -d                |          表示后台运行          |

### 检查

```sh
# nc 命令连接到 localhost:2181，确保ZooKeeper 服务器正在监听该地址，并且可以通过网络进行访问
nc -vz localhost 2181

# 进入zookeeper 容器内部
docker exec -it zookeeper /bin/bash
# 检查容器状态
docker exec -it zookeeper /bin/bash ./bin/zkServer.sh status
# 进入控制台
docker exec -it zookeeper zkCli.sh
```

### 可视化

```txt
开源地址：https://github.com/vran-dev/PrettyZoo/releases
```

![image-20241104173033639](img/2_Docker%E5%AE%89%E8%A3%85/image-20241104173033639.png)

## 安装并启动Kafka

### 拉取Kafka镜像

```sh
docker pull swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/wurstmeister/kafka:2.13-2.8.1
docker tag  swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/wurstmeister/kafka:2.13-2.8.1  wurstmeister/kafka:2.13-2.8.1
docker rmi swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/wurstmeister/kafka:2.13-2.8.1
```

###  创建挂载目录

```sh
mkdir -p /home/docker_volume/kafka/{data,logs}
```

### 运行容器导出配置文件

```sh
# 1.运行容器
docker run -p 9092:9092 \
--link zookeeper:zookeeper \
--name kafka \
--log-driver json-file \
--log-opt max-size=100m \
--log-opt max-file=2 \
-e KAFKA_BROKER_ID=0 \
-e KAFKA_LOG_DIRS=/wurstmeister/kafka/logs \
-e KAFKA_ADVERTISED_HOST_NAME=localhost \
-e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 \
-e KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092 \
-e ALLOW_PLAINTEXT_LISTENER=yes \
-e KAFKA_HEAP_OPTS="-Xmx256M -Xms128M" \
-d wurstmeister/kafka:2.13-2.8.1

# 导出配置文件
docker cp kafka:/opt/kafka/config /home/docker_volume/kafka

# 删除
docker stop kafka
docker rm kafka
```

### 启动Kafka镜像

```sh
# 配置
docker run -p 9092:9092 \
--link zookeeper:zookeeper \
--name kafka \
--log-driver json-file \
--log-opt max-size=100m \
--log-opt max-file=2 \
-e KAFKA_BROKER_ID=0 \
-e KAFKA_ADVERTISED_HOST_NAME=localhost \
-e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 \
-e KAFKA_LISTENERS=PLAINTEXT://:9092 \
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://【本机IP】:9092 \
-e ALLOW_PLAINTEXT_LISTENER=yes \
-e KAFKA_HEAP_OPTS="-Xmx256M -Xms128M" \
-v /home/docker_volume/kafka/data:/wurstmeister/kafka/data \
-v /home/docker_volume/kafka/config:/opt/kafka/config \
-v /home/docker_volume/kafka/logs:/wurstmeister/kafka/logs \
-v /etc/localtime:/etc/localtime \
-d wurstmeister/kafka:2.13-2.8.1


# docker stop kafka
# docker rm kafka

# docker exec -it kafka telnet IP 2181
#docker exec -it kafka /opt/kafka/bin/kafka-broker-api-versions.sh --bootstrap-server localhost:9092

# s
docker run -p 9092:9092 \
--link zookeeper:zookeeper \
--name kafka \
--log-driver json-file \
--log-opt max-size=100m \
--log-opt max-file=2 \
-e KAFKA_BROKER_ID=0 \
-e KAFKA_ADVERTISED_HOST_NAME=localhost \
-e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 \
-e KAFKA_LISTENERS=PLAINTEXT://:9092 \
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://192.168.56.101:9092 \
-e ALLOW_PLAINTEXT_LISTENER=yes \
-e KAFKA_HEAP_OPTS="-Xmx256M -Xms128M" \
-v /home/docker_volume/kafka/data:/wurstmeister/kafka/data \
-v /home/docker_volume/kafka/config:/opt/kafka/config \
-v /home/docker_volume/kafka/logs:/wurstmeister/kafka/logs \
-v /etc/localtime:/etc/localtime \
-d wurstmeister/kafka:2.13-2.8.1
```

|                             命令                             |                      注释                      |
| :----------------------------------------------------------: | :--------------------------------------------: |
|                       –privileged=true                       |       表示容器内的root拥有真正的root权限       |
|                    –log-driver json-file                     |         表示使用 JSON 文件作为日志驱动         |
|                    –log-opt max-size=100m                    |         表示设置日志的最大大小为100MB          |
|                     –log-opt max-file=2                      |           表示设置日志文件的最大数量           |
|                            –name                             |                  表示容器命名                  |
|                              -p                              |                  表示端口映射                  |
|                     -e KAFKA_BROKER_ID=0                     |        表示这个ID是集群的标识，不能重复        |
|           -e KAFKA_ZOOKEEPER_CONNECT=IP:2181/kafka           |            表示zookeeper的连接地址             |
|      -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://IP:9092       | 表示kafka发布到zookeeper供客户端使用的服务地址 |
|               -e ALLOW_PLAINTEXT_LISTENER=yes                |          表示允许使用PLAINTEXT侦听器           |
|             -e KAFKA_HEAP_OPTS='-Xms512M -Xmx4G              |                 表示行内存参数                 |
|  -v /home/docker_volume/kafka/data:/wurstmeister/kafka/data  |              表示挂载配置数据目录              |
| -v /home/docker_volume/kafka/config:/wurstmeister/kafka/config |                表示配置文件目录                |
|               -v /etc/localtime:/etc/localtime               |           表示将本地时间映射到容器中           |
|                              -d                              |                  表示后台运行                  |

### 开放端口

```sh
# 检查防火墙状态
sudo ufw status
# 开放端口
sudo ufw allow 9092/tcp
# 防火墙重载
sudo ufw reload
```

### 可视化

```txt
开源地址：https://github.com/dushixiang/kafka-map
```

拉取镜像

```sh
docker pull swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/dushixiang/kafka-map:v1.3.3
docker tag  swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/dushixiang/kafka-map:v1.3.3  kafka-map:v1.3.3
docker rmi swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/dushixiang/kafka-map:v1.3.3
```

>`开放端口`
>
>8080/tcp
>
>`环境变量`
>
>PATH=/jre/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin J
>
>AVA_HOME=/jre 
>
>SERVER_PORT=8080 
>
>DEFAULT_USERNAME=admin 
>
>DEFAULT_PASSWORD=admin

创建挂载目录

```sh
mkdir -p /home/docker_volume/kafka-map/data
```

运行容器

```sh
docker run -d \
  -p 9093:8080 \
  -v /home/docker_volume/kafka-map/data:/usr/local/kafka-map/data \
  -e DEFAULT_USERNAME=admin \
  -e DEFAULT_PASSWORD=admin \
  --name kafka-map \
  --restart always \
  kafka-map:v1.3.3
```

## 命令测试(忽略)

### 通过exec命令进入容器内部

`i` :即使没有附加也保持STDIN 打开
`t` :分配一个伪终端

```shell
docker exec -it kafka /bin/bash
```

### 进入Kafka的bin目录下

```shell
cd /opt/kafka_2.13-2.8.1/bin

cd /opt/kafka/bin
```

### 创建主题，显示主题

```shell
./kafka-topics.sh --create --topic test-kafka --bootstrap-server localhost:9092
kafka-topics.sh --describe --topic test-kafka --bootstrap-server localhost:9092
```

```sh
#单机启动
docker run -d --name kafka \
-p 9092:9092 \
-e KAFKA_BROKER_ID=0 \
-e KAFKA_ZOOKEEPER_CONNECT=124.71.65.6:2181 \
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://124.71.65.6:9092 \
-e KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092 wurstmeister/kafka
#检查kafka是否运行成功
docker ps | grep kafka
#若是服务异常，则查日志，最后100行
docker logs -f -t --tail 100 kafka
#进入容器内部
docker exec -it kafka /bin/bash
cd opt/kafka/bin
#创建topic,测试使用
./kafka-topics.sh --create --zookeeper zookeeper:2181 --replication-factor 1 --partitions 1 --topic kafka_test
#查看topic是否创建成功
./kafka-topics.sh --list --zookeeper zookeeper:2181
#--新开一个窗口，运行生产者
./kafka-console-producer.sh --broker-list 124.71.65.6:9092 --topic kafka_test
#再新开窗口运行消费者，监控消费情况
./kafka-console-consumer.sh --bootstrap-server 124.71.65.6:9092 --topic kafka_test --from-beginning
其他命令：
#查看某个组的消费情况
./kafka-consumer-groups.sh --zookeeper 124.71.65.6:2181 --describe --group groupName
#查看目前所有的消费者组
./kafka-consumer-groups.sh --list --bootstrap-server 124.71.65.6:9092


# /opt/kafka_2.13-2.8.1/server.properties
```