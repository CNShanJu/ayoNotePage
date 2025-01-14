> 参考：https://blog.csdn.net/qq_61654952/article/details/139032657

![img](img/2_快速入门部署Mysql/3efe1499e5e5f8f5d51eed6786f1aa3b.png)

## 启动mysql容器

```
docker run -d \
--name mysql \
-p 3306:3306 \
-e TZ=Asia/Shanghai \
-e MYSQL_ROOT_PASSWORD=123456 \
mysql
```

![img](img/2_快速入门部署Mysql/dfcdc219bea8655575ba1612218cbf00.png)

![img](img/2_快速入门部署Mysql/a5eae1b4d74c7b47f18d6c6fdf15877c.png)

## 查看信息

查看本地安装的镜像`docker images`

```shell
root@ayoubuntu:/# docker images
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
mysql        latest    3218b38490ce   2 years ago   516MB
```

查看容器

```shell
#查看正在运行的容器
docker ps
#查看所有容器
docker ps -a
```

## 验证

打开连接`mysql`的IDE
![image-20240705194022460](img/2_快速入门部署Mysql/image-20240705194022460.png)

![image-20240705194033698](img/2_快速入门部署Mysql/image-20240705194033698.png)

## 总结

![img](img/2_快速入门部署Mysql/ad2d26e09b84de15497e79e9346b245b.png)

