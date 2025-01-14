# 深入理解Apache ZooKeeper与Kafka的协同工作原理

## 引言

在当今的大数据和微服务领域，`消息队列`已经成为构建高性能、高可用分布式系统的基石。`Apache Kafka`作为一个广受欢迎的`分布式流处理平台`，以其出色的吞吐量、低延迟和持久化特性受到业界青睐。与此同时，`Apache ZooKeeper`作为`分布式协调服务`，在`Kafka`中承担了关键的角色。本文将深度探讨`ZooKeeper`与`Kafka`之间的协同工作原理以及他们在构建高效稳定的分布式系统中所发挥的重要作用

## 一、ZooKeeper基础概念

### **（一）ZooKeeper简介**

`ZooKeeper`是一种开源的分布式协调服务，由雅虎开发并捐赠给Apache软件基金会。它采用了一种简单易懂的数据模型，即类似于`文件系统的树形结构`，称为`ZNode`。每个`ZNode`可以存储`少量的数据`，并且支持`监听机制`（Watch）。此外，`ZooKeeper`特别强调`强一致性`，保证了在整个`集群`中的所有更新操作具有`全局有序性`。

### （二）ZooKeeper数据结构

在`ZooKeeper`的世界里，数据以`ZNode`的形式存在，每个`ZNode`有唯一的路径标识符（`Path`），并且可以设置为`持久化`或`临时`两种类型。持久化节点在创建后不会因为客户端会话结束而消失，而临时节点则会在创建它的`会话关闭`时自动删除。同时，`ZNode`还支持`版本控制`，每次更新都会增加版本号，便于实现`条件更新`和`乐观锁`

### （三）ZooKeeper特点

`ZooKeeper`具有以下显著特点：

**数据一致性**： `ZooKeeper`提供了一致性保证，保证客户端在任何时刻都能看到相同的数据视图。它通过`ZAB协议`（ZooKeeper Atomic Broadcast）确保了更新操作的`原子性`和`顺序一致性`。

**单一系统映像**： 所有`ZooKeeper`集群中的节点都维护了一份相同的数据副本，客户端不论连接到集群中的哪个服务器，都能得到一致的数据视图。

**高可用性**： `ZooKeeper`通过`Leader-Follower`模型实现高可用，当`Leader`节点失效时，剩余的`Follower`节点可以通过选举产生新的`Leader`，确保服务连续性。

**有序性**： `ZooKeeper`保证来自同一个客户端的更新请求将严格按照客户端发送的顺序进行处理，这包括全局有序和偏序。

**原子性**： `ZooKeeper`的更新操作要么全部成功，要么全部失败，不存在部分成功的中间状态。

**简单API**： `ZooKeeper`提供了简单易用的API，允许开发者执行基本操作，如创建、读取、更新和删除节点，以及设置Watcher监听器。

**分布式协调服务**： `ZooKeeper`被设计为分布式协调服务，可以实现分布式锁服务、领导者选举、组成员管理、分布式队列和命名服务等功能。

**快速响应**： `ZooKeeper`系统设计的目标之一是提供快速响应，尤其适用于那些需要近乎实时响应的分布式应用。

**容错性**： `ZooKeeper`具有良好的容错能力，通过仲裁机制（quorum）确保在大多数节点存活的情况下依然能够对外提供服务。

### （四）应用场景

提供的服务包括：统一命名服务、统一配置管理、统一集群管理、服务器节点动态上下线、软负载均衡等。

**统一命名服务**

在分布式环境下，经常需要对应用/服务进行统一命名，便于识别。例如：IP不容易记住，而域名容易记住。

**统一配置管理**

分布式环境下，配置文件同步非常常见。一般要求一个集群中，所有节点的配置信息是一的，比如Kafka集群。对配置文件修改后，希望能够快速同步到各个节点上。

配置管理可交由`ZooKeeper`实现。可将配置信息写入`ZooKeeper`上的一个`Znode`。各个客户端服务器监听这个`Znode`。一旦` Znode`中的数据被修改，`ZooKeeper`将通知各个客户端服务器。

**集群管理**

`ZooKeeper`可以维护集群成员信息，比如在`Hadoop`、`Kafka`等系统中，节点可以将自己的在线状态、角色等信息写入`ZooKeeper`，其他节点可以实时监控这些信息，从而实现集群的动态管理和扩容缩容。

**服务器动态上下线**

客户端能实时洞察到服务器上下线的变化。

**软负载均衡**

在`Zookeeper`中记录每台服务器的访问数，让访问数最少的服务器去处理最新的客户端请求。

**服务注册与发现**

微服务架构中，服务提供者可以将自己的服务信息注册到`ZooKeeper`，服务消费者通过查询`ZooKeeper`发现可用的服务实例，从而实现服务的动态注册和发现。

## 二、ZooKeeper工作模式

### （一）工作机制

`ZooKeeper`是一个基于观察者模式设计的分布式服务管理框架，负责存储与管理数据信息，通过`Watch`机制，客户端可以在`读取数据`或`查询子节`点时设置`Watch`	，当所关注的数据发生变化时，`ZooKeeper`会立即通知客户端，使得客户端能够做出相应的反应。

### （二）选举机制

只要服务器的票数超过半数以上，该服务器就当选为leader。所以一般服务器数量为大于等于3的奇数量，如3、5、7

#### 1.第一次启动选举机制

![img](img/1_Apache%20ZooKeeper%E4%B8%8EKafka%E7%9A%84%E5%8D%8F%E5%90%8C%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86/e4b32feaa1b003b8241a2fe2eb8fc161.png)

**1.1 服务器1启动，发起一次选举**

服务器1投自己一票。此时服务器1票数一票，不够半数以上（3票），选举无法完成，服务器1状态保持为LOOKING；

**1.2 服务器2启动，再发起一次选举**

服务器1和2分别投自己一票并交换选票信息：此时服务器1发现服务器2的myid比自己目前投票推举的（服务器1）大，更改选票为推举服务器2。此时服务器1票数0票，服务器2票数2票，没有半数以上结果，选举无法完成，服务器1，2状态保持LOOKING

**1.3 服务器3启动，发起一次选举**

此时服务器1和2都会更改选票为服务器3。此次投票结果：服务器1为0票，服务器2为0票，服务器3为3票。此时服务器3的票数已经超过半数，服务器3当选Leader。服务器1，2更改状态为FOLLOWING，服务器3更改状态为LEADING；

**1.4 服务器4启动，发起一次选举**

此时服务器1，2，3已经不是LOOKING状态，不会更改选票信息。交换选票信息结果：服务器3为3票，服务器4为1票。此时服务器4服从多数，更改选票信息为服务器3，并更改状态为FOLLOWING；

**1.5 服务器5启动，同服务器4一样**

#### 2.非第一次启动选举机制

当`ZooKeeper `集群中的一台服务器出现以下两种情况之一时，就会开始进入Leader选举：

**服务器初始化启动。**

**服务器运行期间无法和Leader保持连接**。

2.2 而当一台机器进入Leader选举流程时，当前集群也可能会处于以下两种状态：

① 集群中本来就已经存在一个Leader

对于已经存在Leader的情况，机器试图去选举Leader时，会被告知当前服务器的Leader信息，对于该机器来说，仅仅需要和 Leader机器建立连接，并进行状态同步即可。

② 集群中确实不存在Leader

假设ZooKeeper由5台服务器组成，SID分别为1、2、3、4、5，ZXID分别为8、8、8、7、7，并且此时SID为3的服务器是Leader。某一时刻，3和5服务器出现故障，因此开始进行Leader选举。

选举Leader规则：

```txt
1.EPOCH大的直接胜出
 
2.EPOCH相同，事务id大的胜出
 
3.事务id相同，服务器id大的胜出
 
SID：服务器ID。用来唯一标识一台ZooKeeper集群中的机器，每台机器不能重复，和myid一致。
 
ZXID：事务ID。ZXID是一个事务ID，用来标识一次服务器状态的变更。在某一时刻，集群中的每
台机器的ZXID值不一定完全一致，这和ZooKeeper服务器对于客户端“更新请求”的处理逻辑速度有关。
 
Epoch：每个Leader任期的代号。没有Leader时同一轮投票过程中的逻辑时钟值是相同的。
       每投完一次票这个数据就会增加
```

## 三、搭建zookeeper

环境准备

| **IP地址**        | **主机名**  | **安装服务**               |
| ----------------- | ----------- | -------------------------- |
| **192.168.83.70** | **zkfkf-1** | **apache-zookeeper-3.5.7** |
| **192.168.83.80** | **zkfkf-2** | **apache-zookeeper-3.5.7** |
| **192.168.83.90** | **zkfkf-3** | **apache-zookeeper-3.5.7** |

### （一）准备环境

关闭防火墙及核心防护

**systemctl stop firewalld && setenforce 0**

安装JDK环境

![img](img/1_Apache%20ZooKeeper%E4%B8%8EKafka%E7%9A%84%E5%8D%8F%E5%90%8C%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86/74276ad4ba4dd94df267d6eb2b3bc0b7.png)

```sh
#!/bin/bash
#指定该脚本使用的shell解释器为bash。
 
JAVA=`find / -name *jdk*tar* -exec dirname {} \;`
#使用find命令搜索整个根目录下（/）所有包含“jdk”和“tar”字样的文件，并获取它们所在的目录路径
@这里通过dirname获取每个匹配文件的父目录。
 
JDK=`find / -name *jdk*tar* 2>>/dev/null | awk -F/ '{print $NF}'` 
#查找并筛选出包含“jdk”和“tar”的完整文件名，将标准错误重定向到/dev/null忽略错误信息，
#并使用awk分割目录路径，打印出文件名的最后一部分（即完整的JDK压缩包文件名）。
 
cd ${JAVA}
#改变当前工作目录到找到的包含JDK压缩包的目录。
 
tar xf ${JDK} -C /usr/local/
#使用tar命令解压找到的JDK压缩包至/usr/local/目录下。
 
JDKAPP=$(find /usr/local/ -maxdepth 1 -type d | grep jdk | awk -F/ '{print $NF}'): 
#在/usr/local/目录下查找一级子目录（最大深度为1）中包含“jdk”的目录名，
#然后同样使用awk取出最后一个字段作为JDK的实际安装目录名。
 
ln -s /usr/local/${JDKAPP} /usr/local/jdk
#创建一个符号链接（软链接），将实际的JDK安装目录指向/usr/local/jdk，这样可以方便引用。
 
cat > /etc/profile.d/jdk.sh <<EOF 和 EOF之间的内容是在创建一个新的shell脚本文
件/etc/profile.d/jdk.sh，在这个文件中设置环境变量：
 
export JAVA_HOME=/usr/local/jdk
#设置JAVA_HOME环境变量为新安装的JDK主目录。
export PATH=$JAVA_HOME/bin:$PATH
#将JDK的bin目录添加到系统PATH变量前，确保优先使用此JDK的Java命令。
export JRE_HOME=$JAVA_HOME/jre
#设置JRE_HOME环境变量为JDK自带的JRE目录。
export CLASSPATH=$JAVA_HOME/lib/:$JRE_HOME/lib/
#设置CLASSPATH环境变量，包含JDK和JRE的库目录。
#最后一行提示用户执行 source /etc/profile.d/jdk.sh 命令来立即生效上述环境变量更改，
#不需要重启终端或系统。
```

![img](https://i-blog.csdnimg.cn/blog_migrate/fec219b68b457f09b136b919072599b0.png)

### （二）安装zookeeper

```sh
[root@zkfkf-1 opt]#ls
apache-zookeeper-3.5.7-bin.tar.gz  jdk-8u291-linux-x64.tar.gz  jdk.sh
[root@zkfkf-1 opt]#tar xf apache-zookeeper-3.5.7-bin.tar.gz
#解压数据包
[root@zkfkf-1 opt]#ls
apache-zookeeper-3.5.7-bin  apache-zookeeper-3.5.7-bin.tar.gz  jdk-8u291-linux-x64.tar.gz  jdk.sh
[root@zkfkf-1 opt]#mv  apache-zookeeper-3.5.7-bin /usr/local/zookeeper-3.5.7
#将apache-zookeeper-3.5.7-bin目录移动到/usr/local/目录下并改名为zookeeper-3.5.7
[root@zkfkf-1 opt]#cd /usr/local/zookeeper-3.5.7/conf/
[root@zkfkf-1 conf]#ls
configuration.xsl  log4j.properties  zoo_sample.cfg
[root@zkfkf-1 conf]#cp zoo_sample.cfg  zoo.cfg
#zoo_sample.cfg是模板文件，复制一份并改名为zoo.cfg并进行修改
[root@zkfkf-1 conf]#ls
configuration.xsl  log4j.properties  zoo.cfg  zoo_sample.cfg
[root@zkfkf-1 conf]#
```

修改配置文件

![img](img/1_Apache%20ZooKeeper%E4%B8%8EKafka%E7%9A%84%E5%8D%8F%E5%90%8C%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86/ce146c76a789bc2615b49ea15bef1909.png)

```sh
tickTime=2000
#基本时间单元，所有超时和心跳时间间隔都以tickTime的倍数来表示。这里设置为2000毫秒，即2秒
 
initLimit=10
#初始化连接时的最大时间限制，单位为tickTime。
#当follower启动并试图连接leader时，follower在10*2秒（即20秒）内必须完成与leader初始同步
 
syncLimit=5
#leader与follower之间发送消息的同步确认的最大时间限制，同样单位为tickTime。
#这意味着follower必须在5*2秒（即10秒）内响应leader的心跳或同步请求。
 
dataDir=/usr/local/zookeeper-3.5.7/data
#ZooKeeper存放持久化数据的目录，如事务日志、快照等。需要手动创建
 
dataLogDir=/usr/local/zookeeper-3.5.7/logs
#ZooKeeper专门存放事务日志的目录，分离数据和日志存储可以优化磁盘I/O性能。需要手动创建
 
clientPort=2181
#ZooKeeper服务监听客户端连接的端口号，客户端通过这个端口与ZooKeeper集群进行通信。
 
server.1=192.168.83.70:3188:3288
server.2=192.168.83.80:3188:3288
server.3=192.168.83.90:3188:3288
#这三行配置描述了ZooKeeper集群中的三个服务器节点。格式为server.id=hostname:port1:port2
#其中：
#id（1、2、3）是集群中服务器的唯一标识。
#hostname（192.168.83.70、192.168.83.80、192.168.83.90）是服务器的IP地址。
#port1（3188）是集群内部通信的端口，用于follower和observer与其他服务器通信。
#port2（3288）是选举leader时服务器之间通信的端口。
```

![img](img/1_Apache%20ZooKeeper%E4%B8%8EKafka%E7%9A%84%E5%8D%8F%E5%90%8C%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86/55fa66f4bf1af8cb29c008fcb27aa6f9.png)

### （三）创建启动服务脚本

![img](img/1_Apache%20ZooKeeper%E4%B8%8EKafka%E7%9A%84%E5%8D%8F%E5%90%8C%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86/863a49352197df712440506e8242ca27.png)

```sh
#!/bin/bash
声明该脚本使用bash shell进行解释执行。
 
#chkconfig:2345 20 90
这行注释是针对Red Hat家族（如CentOS、Fedora等）Linux发行版的chkconfig工具的指令，
#用于在不同运行级别（2、3、4、5）下设置服务的启动优先级（20，较高）和停止优先级（90，较低）。
 
#description:Zookeeper Service Control Script
描述脚本的功能，即ZooKeeper服务的控制脚本。
 
ZK_HOME='/usr/local/zookeeper-3.5.7'
#定义ZooKeeper的安装目录，便于在脚本中引用。
 
脚本主体部分使用case $1 in结构，根据传入的第一个参数（$1）执行相应的操作：
 
start：启动ZooKeeper服务，执行$ZK_HOME/bin/zkServer.sh start命令。
stop：停止ZooKeeper服务，执行$ZK_HOME/bin/zkServer.sh stop命令。
restart：重启ZooKeeper服务，执行$ZK_HOME/bin/zkServer.sh restart命令。
status：查看ZooKeeper服务的状态，执行$ZK_HOME/bin/zkServer.sh status命令。
*：如果传入的参数不在上述情况中，脚本将打印正确的使用方式。
 
chmod +x /etc/init.d/zookeeper   #添加执行权限
chkconfig --add zookeeper        #设置开机自动进行管理
```

**以上操作，三台服务器相同**

![img](img/1_Apache%20ZooKeeper%E4%B8%8EKafka%E7%9A%84%E5%8D%8F%E5%90%8C%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86/bc8757070e1ae375c356e9eba058c194.png)

查看服务状态

![img](img/1_Apache%20ZooKeeper%E4%B8%8EKafka%E7%9A%84%E5%8D%8F%E5%90%8C%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86/2118843b8781ed4ef746431ec4186678.png)

## 四、kafka概述

`Apache Kafka` 是一个开源的、分布式的`流处理平台`，最初由LinkedIn开发，后来贡献给了Apache软件基金会，现在已成为Apache顶级项目。`Kafka`主要用于`构建实时数据管道`和`流应用程序`，它在大数据生态系统中发挥着至关重要的作用，允许系统和应用之间以高吞吐量、低延迟的方式发布和订阅大量的实时数据流

### （一）消息队列

`消息队列`（Message Queue，MQ）是一种在分布式系统中实现应用程序间解耦、异步处理和松耦合通信的中间件技术。消息队列允许应用程序通过在消息中发送数据而不是直接调用对方的API来进行通信。它充当了一个临时的中介，负责存储、管理和转发应用程序间的消息。

#### 1.消息队列的工作原理

在实际操作中，消息队列的工作原理大致如下：

**生产者（Producer）**：应用程序将消息放入消息队列，不需要知道消息将被哪个消费者（Consumer）处理，只需关注消息的有效构造和发送。

**消息队列系统**：作为消息的中间存储和转发组件，它负责缓存和管理这些消息，保障消息的安全存储和高效传输。系统通常支持持久化存储、负载均衡、消息过滤、优先级处理等多种高级特性。

**消费者（Consumer）**：从消息队列中拉取或接收消息进行处理。消费者可以独立于生产者运行，并按照自身的处理能力和需求速率来消费消息，这种异步处理方式有助于改善系统的整体吞吐量和响应时间。

**消息投递与确认**：消息队列系统通常还支持消息的可靠投递，即确保消息至少被消费者成功处理一次（有时需要保证恰好处理一次）。消费者在成功处理完一条消息后，可以向消息队列系统发送确认信号。

#### 2.消息队列的优势

**解耦**：消息队列允许生产者（Producer）和消费者（Consumer）之间解耦，生产者只需要将消息发送到队列中，不需要关心谁会消费这些消息。消费者从队列中拉取消息进行处理，两者之间没有直接依赖。这样，生产者和消费者可以独立开发、部署和扩展，降低了系统的耦合度

**异步处理**：通过消息队列，可以将耗时较长的处理过程异步化。生产者发送消息后不必等待消费者的响应就可以继续处理其他任务，而消费者在收到消息后可以在后台异步处理，从而提高系统的响应速度和吞吐量。

**流量削峰**：在高峰期，消息队列可以作为缓冲区，暂时存储超出系统处理能力的请求，避免直接压垮系统。系统在空闲时段逐渐处理堆积的消息，实现系统的平稳运行。

**负载均衡**： 消息队列可以将消息均匀地分发给多个消费者，实现负载均衡。消费者可以根据自身能力选择从队列中消费多少消息，有利于提高系统的整体处理能力。

**数据一致性**： 通过事务消息和消息确认机制，消息队列可以实现最终一致性，确保消息在分布式系统中的可靠投递，即使在某些节点故障的情况下，也能保证数据的完整性。

**可扩展性**： 随着业务发展，可以很容易地增加更多的消费者来并行处理消息，或者增加消息队列服务器来扩展容量，从而实现系统的水平扩展。

#### 3.消息队列的两种模式

消费模式主要有两：

一种是一对一的消费，也即点对点的通信，即一个发送一个接收。

第二种为一对多的消费，即一个消息发送到消息队列，消费者根据消息队列的订阅拉取消息消费

**3.1 点对点模式**

**一对一**![img](img/1_Apache%20ZooKeeper%E4%B8%8EKafka%E7%9A%84%E5%8D%8F%E5%90%8C%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86/33858138f2fdd47768e487070dda736a.png)

消息生产者发布消息到Message Queue队列中，通知消费者从队列中拉取消息进行消费。**消息被消费之后则删除**，Queue支持多个消费者，但对于一条消息而言，只有一个消费者可以消费，即一条消息只能被一个消费者消费。

**3.2 发送/订阅模式**

![img](img/1_Apache%20ZooKeeper%E4%B8%8EKafka%E7%9A%84%E5%8D%8F%E5%90%8C%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86/38a0615e8d64bfa17e639ef1c3c55605.png)

消息生产者（发布）将消息发布到 topic 中，同时有多个消息消费者（订阅）消费该消息。和点对点方式不同，发布到 topic 的消息会被所有订阅者消费。
发布/订阅模式是定义对象间一种一对多的依赖关系，使得每当一个对象（目对标象）的状态发生改变，则所有依赖于它的对象（观察者对象）都会得到通知并自动更新

### （二）kafka特性

Kafka主要特性包括：

**发布/订阅模型（Pub/Sub）**：Kafka采用发布订阅模式，生产者（Producers）向主题（Topics）发布消息，消费者（Consumers）订阅他们感兴趣的主题来消费消息。

**分布式消息系统**：Kafka集群可以在多台服务器上部署，能处理极高的吞吐量，支持水平扩展，具备高可用性。

**持久化和容错**：Kafka将消息持久化存储在磁盘上，即便在节点故障情况下也能保证消息不丢失，通过复制机制保证数据安全性。

**分区和并行处理**：Kafka的主题可以被分成多个分区，每个分区可以分布在不同的Broker上，消费者可以并行消费这些分区以实现高效的处理。

**消息回溯和重放**：Kafka允许消费者从任意偏移量开始消费消息，这意味着消费者可以选择重新消费过去的消息，非常适合用于处理乱序数据和数据补救。

**集成性**：Kafka与许多大数据和流处理工具无缝集成，如Hadoop、Spark、Flink等，常用于构建实时数据处理流水线。

**高吞吐量**：Kafka经过精心设计，能够支持每秒数十万条消息的发布和订阅，非常适合大规模的实时数据处理场景。

**低延迟**：通过高效的消息存储和传输机制，Kafka在保证大量数据处理的同时，还能提供较低的延迟

### （三）Kafka架构

![img](img/1_Apache%20ZooKeeper%E4%B8%8EKafka%E7%9A%84%E5%8D%8F%E5%90%8C%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86/372c6beb6f3f57ade420748bbfeccd2f.png)

#### 1.基本组件信息

**Producer（生产者）**

生产者是向Kafka发送消息的客户端应用程序。生产者可以将消息发布到一个或多个主题（Topic）上。

**Consumer（消费者）**

消息消费者，即从Kafka中拉取消息消费的客户端。

**Replica （副本）**

为保证集群中的某个节点发生故障时，该节点上的 partition 数据不丢失，且 kafka 仍然能够继续工作，kafka 提供了副本机制，一个 topic 的每个分区都有若干个副本，一个 leader 和若干个 follower。

**Topic（主题）**

主题是Kafka中的一类消息的逻辑分类，可以视为消息发布的频道或队列。每个主题可以进一步划分为多个分区（Partition）。

**Partition（分区）**

分区是物理上的概念，每个主题下的消息都被分散存储在多个分区上，每个分区又是一个有序且不可变的消息序列，消息通过offset（偏移量）进行唯一标识。

**Broker（代理）**

Kafka Broker是运行Kafka服务的服务器节点，它负责接收来自生产者的消息、管理这些消息的存储和转发给消费者的消息。每个Broker可以容纳多个主题的多个分区。

**Consumer Group（消费者组）**

消费者是消费Kafka消息的客户端应用程序，消费者组是一组消费者实例的集合，它们共享订阅的主题，但每个组内的消费者实例会各自消费不同分区的消息，从而实现并行消费和负载均衡。

**offset 偏移量**

可以唯一的标识一条消息。
偏移量决定读取数据的位置，不会有线程安全的问题，消费者通过偏移量来决定下次读取的消息（即消费位置）。消息被消费之后，并不被马上删除，这样多个业务就可以重复使用 Kafka 的消息。某一个业务也可以通过修改偏移量达到重新读取消息的目的，偏移量由用户控制。
消息最终还是会被删除的，默认生命周期为 1 周（7*24小时）。

**ZooKeeper（协调服务）**

在早期版本的Kafka中，ZooKeeper是用于管理Kafka集群的元数据、进行Broker的协调（如Leader选举）和消费者组管理等重要任务。但新版Kafka已逐渐减少了对ZooKeeper的依赖，很多元数据和协调任务现在直接在Kafka内部完成。

由于 consumer 在消费过程中可能会出现断电宕机等故障，consumer 恢复后，需要从故障前的位置的继续消费，所以 consumer 需要实时记录自己消费到了哪个 offset，以便故障恢复后继续消费。
Kafka 0.9 版本之前，consumer 默认将 offset 保存在 Zookeeper 中；从 0.9 版本开始，consumer 默认将 offset 保存在 Kafka 一个内置的 topic 中，该 topic 为 __consumer_offsets。

#### 2.架构细节

**分区与副本（Replication）** 每个分区都有多个副本，其中一个为主副本（Leader），其他副本为跟随副本（Follower）。主副本负责处理读写请求，跟随副本则从主副本同步数据，以实现数据冗余和容错。

**分布式与分区策略** 生产者可以选择将消息发送到特定的分区，或者让Kafka自动基于键（Key）的哈希值分配分区。消费者组内的消费者实例按分区分配，每个分区只能被组内一个消费者实例消费。

**Offset管理** 消费者会跟踪并提交它们在每个分区上的消费进度（Offset），这样即使消费者实例崩溃或重新启动，也可以从上次停止的地方继续消费。

**高可用与容错** Kafka通过副本机制实现了高可用，如果主副本所在Broker出现故障，其他跟随副本中的一个会被选举为新的主副本继续服务。同时，Kafka的ISR（In-Sync Replicas）集合确保了数据的同步复制。

## 五、Kafka集群搭建

环境准备

| **IP地址**        | **主机名**  | **安装服务**                                   |
| ----------------- | ----------- | ---------------------------------------------- |
| **192.168.83.70** | **zkfkf-1** | **apache-zookeeper-3.5.7****kafka_2.13-2.7.1** |
| **192.168.83.80** | **zkfkf-2** | **apache-zookeeper-3.5.7****kafka_2.13-2.7.1** |
| **192.168.83.90** | **zkfkf-3** | **apache-zookeeper-3.5.7****kafka_2.13-2.7.1** |

### （一）安装服务

![img](img/1_Apache%20ZooKeeper%E4%B8%8EKafka%E7%9A%84%E5%8D%8F%E5%90%8C%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86/b3e745f99a617edbe38120eeb0db1ed1.png)

### （二）修改配置文件

![img](img/1_Apache%20ZooKeeper%E4%B8%8EKafka%E7%9A%84%E5%8D%8F%E5%90%8C%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86/060eec6ca773185a83eb2695ccdbdfbf.png)

![img](img/1_Apache%20ZooKeeper%E4%B8%8EKafka%E7%9A%84%E5%8D%8F%E5%90%8C%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86/104e39013cdcf76a066081d71b6a56a1.png)

```sh
broker.id=0
#定义当前Kafka Broker的唯一标识ID。在集群中，每个Broker的ID都应是唯一的。
#其它两台服务器设置为1，2
 
listeners=PLAINTEXT://192.168.83.70:9092
#指定Broker监听客户端连接的地址和端口，这里是使用PLAINTEXT协议
 
num.network.threads=3
#设置网络IO线程数量，用于处理网络请求，比如接收生产者的消息和响应消费者的请求。
 
num.io.threads=8
#设置磁盘IO线程数量，用于处理磁盘读写操作，如写入日志文件和从磁盘读取消息。
 
socket.send.buffer.bytes=102400 和 socket.receive.buffer.bytes=102400
#分别设置Socket发送和接收缓冲区的大小（单位为字节），影响TCP层的数据传输效率。
 
socket.request.max.bytes=104857600
#设置单个请求允许的最大字节数，超过这个大小的请求会被拒绝。
 
log.dirs=/usr/local/kafka/logs
#设置Kafka日志数据的存储目录，即Kafka消息持久化的路径。
 
num.partitions=1
#默认每个主题的分区数量，这里设定为每个主题初始化时只有一个分区。
 
num.recovery.threads.per.data.dir=1
#指定每个数据目录（日志目录）下用于恢复数据的线程数量。
 
offsets.topic.replication.factor=1 和 transaction.state.log.replication.factor=1
#这两个配置分别指定了Kafka内部主题（__consumer_offsets）和事务状态日志的复制因子，
#这里均为1，表示没有数据复制，所有数据仅在一个Broker上存储。
 
transaction.state.log.min.isr=1
#设置事务状态日志的最小ISR大小，这里为1，意味着只要有一个副本是同步的，就满足要求。
 
log.retention.hours=168
#设置日志保留时间，这里是168小时（7天），超过这个时间的数据将被删除。
 
log.segment.bytes=1073741824
#每个日志分段的大小，当达到这个阈值时，Kafka会创建新的日志分段。
 
log.retention.check.interval.ms=300000
#日志清理检查间隔，每隔300000毫秒（5分钟）检查一次日志是否需要删除。
 
zookeeper.connect=192.168.83.70:2181,192.168.83.80:2181,192.168.83.90:2181
#设置连接ZooKeeper集群的地址和端口，此处配置了一个由三个节点构成的ZooKeeper集群。
 
zookeeper.connection.timeout.ms=18000
#ZooKeeper连接超时时间，设置为18000毫秒（18秒）。
 
group.initial.rebalance.delay.ms=0
#消费者组在启动时的初始再平衡延迟时间，设置为0表示消费者在加入组时立即开始再平衡。
```

### （三）创建启动脚本

在每台服务器上创建启动脚本，脚本内容一致

![img](img/1_Apache%20ZooKeeper%E4%B8%8EKafka%E7%9A%84%E5%8D%8F%E5%90%8C%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86/f6fd129095fc539847494f865fd86c88.png)

与zookeeper一样，同样是一个用于管理Apache Kafka服务的Linux系统服务控制脚本

```sh
#!/bin/bash：定义脚本使用的解释器为Bash Shell。
 
#chkconfig:2345 22 88
#这是针对Red Hat系列Linux（如CentOS、Fedora等）的 chkconfig 工具的注释行，
#用来设置服务在运行级别2、3、4、5下的启动优先级（22）和关闭优先级（88）。
 
#description:Kafka Service Control Script
#描述脚本功能，即用于控制Apache Kafka服务的启动、停止、重启和查看状态。
 
KAFKA_HOME='/usr/local/kafka'
#定义Kafka的安装目录。
 
case $1 in
#根据用户传入的第一个参数（$1）执行不同的操作。
 
start
#启动Kafka服务，
#通过${KAFKA_HOME}/bin/kafka-server-start.sh -daemon ${KAFKA_HOME}/config/server.properties命令执行。
#-daemon选项表示以守护进程方式运行Kafka服务器,server.properties是Kafka的配置文件。
 
stop
#停止Kafka服务，执行${KAFKA_HOME}/bin/kafka-server-stop.sh命令。
 
restart
#先调用 $0 stop 停止服务，然后调用$0start重新启动服务。
 
status
#检查Kafka服务是否正在运行。
#通过ps -ef | grep kafka | egrep -cv "grep|$$"命令统计Kafka进程的数量，
#如果不为0，则说明Kafka正在运行；否则，Kafka未运行。
 
*
#如果传入的参数不在上述情况中，脚本将打印正确的使用方式
```

![img](img/1_Apache%20ZooKeeper%E4%B8%8EKafka%E7%9A%84%E5%8D%8F%E5%90%8C%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86/ec15dfb260a5b19d720e535a472c4448.png)

### （四）执行操作

基本选项

| --alter              | 修改分区数目，副本赋值，和/或主题的配置 |
| -------------------- | --------------------------------------- |
| --create             | 创建新主题                              |
| --list               | 列出所有主题                            |
| --describe           | # 显示指定主题的详细信息                |
| --alter              | 修改主题配置                            |
| --delete             | 删除指定主题                            |
| --topic <topic_name> | 指定要操作的主题名                      |

#### 1.创建主题

![img](img/1_Apache%20ZooKeeper%E4%B8%8EKafka%E7%9A%84%E5%8D%8F%E5%90%8C%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86/3aac2d6f52afc42385fdd378a00692a3.png)

```sh
kafka-topics.sh
#这是Kafka提供的一个命令行工具，用于管理和监控Kafka主题。
 
--create
#指定该命令用于创建一个新的主题。
 
--zookeeper 192.168.10.17:2181,192.168.10.21:2181,192.168.10.22:2181
#指定了ZooKeeper的连接地址，这里是一个由三个节点组成的ZooKeeper集群，
 
--replication-factor 2
#设置主题的复制因子，表示每个分区都有2份备份，以确保数据的安全性和高可用性。
#在发生节点故障时，仍然可以从其它节点读取数据。
 
--partitions 3
#设置主题的分区数，这里是3个分区。分区是主题内部的逻辑单元，可以看作是主题的子集，
#消息在分区上进行存储，每个分区的消息是有序的，并且可以并行读写，以此来提高系统的并发处理能力。
 
--topic test
#指定要创建的主题名称为test。
```

![img](img/1_Apache%20ZooKeeper%E4%B8%8EKafka%E7%9A%84%E5%8D%8F%E5%90%8C%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86/584936a7654db5ef4df764e3801220d7.png)

```sh
Topic: test           #指明了被描述的主题名称为test。
 
PartitionCount: 3     #表明主题test被划分为3个分区
 
ReplicationFactor: 2
#表示主题test的每个分区都有2个副本，即数据进行了两次复制，提高了数据的高可用性和容灾能力。
 
接下来的三段内容分别描述了每个分区的具体情况：
 
Topic: test	Partition: 0	Leader: 2	Replicas: 2,0	Isr: 2,0：
 
#表示test主题的第0个分区，其领导者（Leader）是Broker编号为2的节点。
#复制列表（Replicas）中，副本分别位于Broker编号为2和0的节点上。
#同步副本集（In-Sync Replicas, ISR）也包含Broker编号为2和0的节点，这意味着这两个节点上
#的副本数据是与Leader同步的。
 
#后面两段类似，分别描述了主题test的第1和第2个分区的领导者、副本分布以及同步副本集的情况。
```

#### 4.发布与消费消息

![img](img/1_Apache%20ZooKeeper%E4%B8%8EKafka%E7%9A%84%E5%8D%8F%E5%90%8C%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86/a124c86714f65646a36729ec224250ec.png)

```sh
'zkfkf-1模拟发布消息'
kafka-console-producer.sh
#Kafka提供的一个命令行工具，用于模拟生产者发送消息到Kafka集群。
 
--broker-list 192.168.83.70:9092,192.168.83.80:9092,192.168.83.90:9092
#指定了Kafka集群的Broker列表，包含了三个Broker节点的IP地址和端口号。
#生产者会随机选择这些Broker之一进行消息发布。
 
--topic test
#指定要发送消息到的主题名称为test。一旦命令执行成功，控制台将变成一个可以输入消息的环境
#用户每输入一行文本并按下回车键，这一行文本就会作为一条消息发送到指定的test主题
 
 
'zkfkf-2消费消息'
kafka-console-consumer.sh
#Kafka提供的一个命令行工具，用于模拟消费者从Kafka集群中读取消息。
 
--bootstrap-server 192.168.83.70:9092,192.168.83.80:9092,192.168.83.90:9092
#指定了Kafka集群的Broker列表，消费者会通过这些Broker连接到集群以获取消息。
#当消费者启动时，它首先会与bootstrap服务器建立连接，然后发现集群中的其他Broker和分区信息。
 
--topic test
#指定要消费的主题名称为test。消费者将从这个主题中读取消息并显示在命令行终端上。
 
--from-beginning
#消费者在启动时，会从指定主题的起始位置开始消费消息，而不是只消费最新产生的消息。
#这意味着消费者会读取主题中存在的所有历史消息。
```

#### 5.修改分区数

![img](img/1_Apache%20ZooKeeper%E4%B8%8EKafka%E7%9A%84%E5%8D%8F%E5%90%8C%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86/2c35a5ff8c0e94f1908be91ffb93812c.png)

查看该主题就会看到六个分区

![img](img/1_Apache%20ZooKeeper%E4%B8%8EKafka%E7%9A%84%E5%8D%8F%E5%90%8C%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86/30a14e8770e838b894a8fe699fa7b85f.png)

#### 6.删除主题

![img](img/1_Apache%20ZooKeeper%E4%B8%8EKafka%E7%9A%84%E5%8D%8F%E5%90%8C%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86/fa969cfd9876203037f215218f745917.png)

## 总结

除了Kafka消息队列，还有一其它的常用消息队列

| 名称             | 关注点                                                       | 特性                                                         | 缺陷                                                         |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **Apache Kafka** | 高吞吐量、低延迟、流处理和大规模数据分发，设计上更倾向于大规模分布式系统 | 持久化存储、多分区、顺序消息、高效的批量数据处理，适合实时大数据流处理和日志收集场景 | 持久化存储、多分区、顺序消息、高效的批量数据处理，适合实时大数据流处理和日志收集场景 |
| **RabbitMQ**     | 广泛的协议支持（AMQP），强大的路由和交换机机制，支持消息确认、死信队列和事务 | 适用于多种消息模式（点对点、发布/订阅、路由等），丰富的插件体系，较强的灵活性和定制性 | 在极高的吞吐量和大规模分布式场景下性能可能不及Kafka，且管理和配置相对复杂 |
| **RocketMQ**     | 阿里巴巴研发，面向大规模互联网应用场景，注重高并发、高可用和海量消息堆积处理 | 支持分布式事务消息、顺序消息、定时/延时消息，适用于金融、电商等行业对消息一致性和顺序性要求较高的场景 | 相对于国际通用的标准协议（如AMQP），RocketMQ的生态相对较小，兼容性可能稍弱 |
| **ActiveMQ**     | 全面支持JMS（Java Message Service）规范，便于Java开发者使用  | 支持多种协议，包括AMQP、STOMP、MQTT等，适合企业级集成和多种消息传递模式 | 在处理极高吞吐量或大数据量场景时性能相对较弱，且扩展性和故障恢复速度可能不如Kafka或RocketMQ |

**还有一些其他消息队列**

Amazon SQS、Azure Service Bus、Google Cloud Pub/Sub等云服务商提供的消息队列服务，它们专注于云环境下的消息传递，提供了易于部署、管理和扩展的能力，通常与自家云平台紧密集成，提供高度可用的服务和便捷的管理工具，但可能在功能丰富性、定制化程度以及某些特定场景下的性能上与开源消息队列存在差异。

ZooKeeper + Kafka 的结合是一种经典的分布式系统架构方案，二者在很多场景下协同工作，共同实现了一种高效、可靠的分布式消息系统。

**ZooKeeper**：

- ZooKeeper 是一个分布式的、开放源码的分布式应用程序协调服务，提供配置维护、命名服务、分布式同步、组服务等功能。
- 在 Kafka 中，ZooKeeper 起到了存储和管理元数据的关键作用，例如 Broker 的注册信息、主题的分区分配信息、消费者组的状态信息等。
- ZooKeeper 为 Kafka 提供了强一致性保障，使得 Kafka 集群的动态管理和协调更加简单和可靠。

**Kafka**：

- Apache Kafka 是一个开源的、分布式的流处理平台，用于构建实时数据管道和流应用程序。
- Kafka 采用了发布/订阅模型，生产者将消息发布到主题（Topic），消费者从主题订阅并消费消息。
- Kafka 内部采用了分区（Partition）、副本（Replica）等设计，提供了高吞吐、低延迟、持久化和容错性的消息传递服务。

**ZooKeeper 与 Kafka 的协作**：

- Kafka 早期版本高度依赖 ZooKeeper 存储和管理元数据，例如 Broker 的上下线信息、主题的分区分配策略、消费者的消费位点（Offset）等关键信息。
- 当 Kafka Broker 发生变更时，会通过 ZooKeeper 进行协调，如 Leader 选举、Broker 注册和注销等操作。
- 随着 Kafka 版本的演进，尤其是 2.0 版本之后，Kafka 已经逐步减轻了对 ZooKeeper 的依赖，一些原本存储在 ZooKeeper 上的元数据被迁移到 Kafka 自身的元数据管理模块中，提高了系统的自主性。

总的来说，ZooKeeper 在 Kafka 的早期发展中扮演了至关重要的角色，帮助 Kafka 实现了分布式协调和服务发现。随着技术的发展，Kafka 正逐步增强自身的管理和协调能力，但这并不否定 ZooKeeper 在分布式系统设计中的价值，它们依然可以紧密结合，为复杂的企业级应用场景提供强大的支撑