# 1、第一行必须指定 基础镜像信息
FROM jdk17
 
# 2、维护者信息
MAINTAINER 空耳 2192475085@qq.com
 
#设定时区
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

#拷贝jar包
COPY docker-demo.jar /app.jar

#入口
ENTRYPOINT ["java"，"-jar"，"/app.jar"]