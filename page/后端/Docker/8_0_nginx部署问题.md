> 参考：https://blog.csdn.net/qq_39267743/article/details/128239124

## 流程

#### 1.准备文件

准备宿主机中的文件目录

```shell
cd /home			# 进入/home目录
mkdir docker_volume	# 一个统一的docker挂载的目录
cd docker_volume	# 进入/home/docker_volume目录
mkdir nginx	# 创建用于挂载所有nginx配置文件的目录
cd nginx
mkdir html conf logs #创建三个文件夹
```

#### 2.镜像准备

```shell
docker pull swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/nginx:1.26.1-linuxarm
docker tag  swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/nginx:1.26.1-linuxarm nginx:1.26.1
docker rmi swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/nginx:1.26.1-linuxarm
```

#### 3.执行部署

```shell
docker run \
--name nginx \
-v /home/docker_volume/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
-v /home/docker_volume/nginx/html:/usr/share/nginx/html \
-v /home/docker_volume/nginx/conf/conf.d:/etc/nginx/conf.d
--network ayo_blog \
nginx:1.26.1
###########################################
docker run \
--name nginx \
-v /home/docker_volume/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
-v /home/docker_volume/nginx/html:/usr/share/nginx/html \
-v /home/docker_volume/nginx/conf/conf.d:/etc/nginx/conf.d
nginx:1.26.1
```

## 报错解决

#### 1.先去除 -v 挂载参数 启动容器

```shell
docker rm nginx

docker run -d -P --name nginx nginx:1.26.1
```

#### 2.进入容器查看 `/etc/nginx` 目录下文件是否正常(一般正常启动则没有问题)

```shell
docker exec -it nginx /bin/bash

#如果你的容器基于 Alpine Linux 或 BusyBox 等轻量级基础镜像，它们通常不包含 bash。可以尝试使用 sh 来替代 bash
docker exec -it nginx sh
```

```shell
#进入目录
cd /etc/nginx/
#查看当前目录下的文件
ls
#例举出来的值如下
#conf.d	fastcgi.conf	fastcgi_params  mime.types	modules	nginx.conf	scgi_params	uwsgi_params
#退出系统
exit
```

#### 3.将容器内 `/etc/nginx` 目录拷贝到宿主机目录

```shell
docker cp nginx:/etc/nginx /home/docker_volume/nginx

#若是查看目录结构不对要进行删除
cd /home/docker_volume/nginx/
rm -rf nginx

#重新生成 => 使用docker的拷贝命令将nginx容器下的/etc/nginx/目录拷贝到宿主机/home/docker_volume/nginx/conf/目录
docker cp nginx:/etc/nginx /home/docker_volume/nginx/conf
# 将nginx目录下的内容移到conf目录下
mv /home/docker_volume/nginx/conf/nginx/* /home/docker_volume/nginx/conf
# 删除临时的目录nginx
rm -rf /home/docker_volume/nginx/conf/nginx

```

#### 4.删除 `nginx` 这个容器

```shell
#需要停止才能删除
docker stop nginx
docker rm nginx


#强制删除
docker rm -f nginx
```

#### 5.重启启动容器并挂载指定目录

```shell
docker run -d \
--name nginx \
-p 80:80 \
-p 81:81 \
-v /home/docker_volume/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
-v /home/docker_volume/nginx/html:/usr/share/nginx/html \
-v /home/docker_volume/nginx/conf/conf.d:/etc/nginx/conf.d \
-v /home/docker_volume/nginx/logs:/var/log/nginx \
-v /home/docker_volume/nginx/logs/run:/var/run \
--network ayo_blog \
nginx:1.26.1
#####################
docker run -d \
--name nginx \
-p 80:80 \
-p 81:81 \
-v /home/docker_volume/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
-v /home/docker_volume/nginx/html:/usr/share/nginx/html \
-v /home/docker_volume/nginx/conf/conf.d:/etc/nginx/conf.d \
-v /home/docker_volume/nginx/logs:/var/log/nginx \
-v /home/docker_volume/nginx/logs/run:/var/run \
--network ayo_blog \
nginx:1.26.1
#####################
#docker run -d -P \
#--name nginx \
#-v /home/docker_volume/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
#-v /home/docker_volume/nginx/html:/usr/share/nginx/html \
#-v /home/docker_volume/nginx/conf/conf.d:/etc/nginx/conf.d \
#-e ayo_base_path="/home/docker_volume/nginx" \
#--network ayo_blog \
#nginx:1.26.1
```

`nginx.conf`配置文件如下

```nginx
#nginx.conf########################################################
user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;

events {
		worker_connections  1024;
}

http {
#		set $basepath $ayo_base_path;			
		
#		include mime.types;
		include /etc/nginx/mime.types;
		default_type  application/octet-stream;
		#在Nginx下默认不允许列出整个目录。
		autoindex off;
		
		log_format  main  	'$remote_addr - $remote_user [$time_local] "$request" '
						'$status $body_bytes_sent "$http_referer" '
						'"$http_user_agent" "$http_x_forwarded_for"';
		
		access_log  /var/log/nginx/access.log  main;

		sendfile        on;
		#tcp_nopush     on;

		#keepalive_timeout  0;
		keepalive_timeout  65;

		#gzip  on;
		
		#开启自定义错误页面
		proxy_intercept_errors on;
		fastcgi_intercept_errors on;	

		# 添加的指令 更具自己的系统选择
		include /etc/nginx/conf.d/*.conf;
		# include ./conf/*.conf;  # linux版本

}

```

`conf.d/base.conf`如下

```nginx
server {
	listen       81;
	listen  [::]:81;
	server_name  localhost;

	source_charset utf-8;
	charset utf-8;
	# 开启目录访问 off关闭 on开启
#	autoindex on;

	#access_log  logs/host.access.log  main;
	
    # 设置默认根目录  
    root /usr/share/nginx/html;  
    
  
    # 处理/page请求，假设您希望/page/index.html被服务  
    location /web {  
        alias /usr/share/nginx/html/web; # 使用alias直接指定路径  
        index index.html index.htm;  
        add_header 'Access-Control-Allow-Origin' '*';  
        add_header 'Access-Control-Allow-Credentials' 'true';  
    }  
  
#    error_page   500 502 503 504  /50x.html;
#        location = /50x.html {
#            root   html;
#    }
  
  
    error_page   500 502 503 504  /404/404.html;  
    # 设置404错误页面  
    error_page 404 403 /404/404.html;  

}
```

`目录结构如下`

```shell
├── conf
│   ├── conf.d
│   │   ├── base.conf
│   │   └── default.conf
│   ├── fastcgi.conf
│   ├── fastcgi_params
│   ├── mime.types
│   ├── modules -> /usr/lib/nginx/modules
│   ├── nginx.conf
│   ├── nginx.conf_back
│   ├── scgi_params
│   └── uwsgi_params
├── html
│   ├── 404
│   │   ├── 404.html
│   │   ├── css
│   │   │   ├── index.css
│   │   │   └── reset.css
│   │   └── js
│   │       ├── index.js
│   │       ├── jquery-3.0.0.min.js
│   │       └── parallax.min.js
│   └── web
│       ├── index.html
│       └── style.css
├── logs
│   ├── access.log
│   ├── error.log
│   └── run
│       └── nginx.pid
└── modules -> /usr/lib/nginx/modules
```

#### 6.查看日志输出 运行正常

```shell
docker logs nginx

##输出正常 => ready for start up
/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
/docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
/docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
10-listen-on-ipv6-by-default.sh: info: IPv6 listen already enabled
/docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
/docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
/docker-entrypoint.sh: Configuration complete; ready for start up
```



