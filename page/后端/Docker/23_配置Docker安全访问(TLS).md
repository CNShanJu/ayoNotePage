>  参考：https://www.cnblogs.com/guangdelw/p/17562539.html

# docker开启远程访问，并添加TLS证书认证 

默认情况下，docker是无法远程访问的

但是有些场景下，是需要远程访问的

## 新建存放证书的目录

```bash
mkdir -p /etc/docker/certs
cd /etc/docker/certs
```

## 生成证书

### 生成ca的私钥

```bash
openssl genrsa -aes256 -passout pass:123456 -out ca-key.pem 4096
```

### 生成CA证书

```bash
openssl req -new -x509 -passin pass:123456 -days 1000 -key ca-key.pem -sha256 -subj "/CN=*" -out ca.pem
```

### 创建服务端私钥

```bash
openssl genrsa -out server-key.pem 4096
```

### 生成服务端证书签名请求

csr即certificate signing request，里面包含公钥与服务端信息

```bash
openssl req -passin pass:123456 -subj "/CN=*" -sha256 -new -key server-key.pem -out server.csr
```

### 生成签名过的服务端证书

```bash
echo subjectAltName = DNS:*,IP:xxx.xxx.xxx.xxx,IP:127.0.0.1 >> extfile.cnf
# 需要将xxx.xxx.xxx.xxx更换为自己的IP地址
echo extendedKeyUsage = serverAuth >> extfile.cnf
openssl x509 -req -passin pass:123456 -days 1000 -sha256 -in server.csr -CA ca.pem -CAkey ca-key.pem  -CAcreateserial -out server-cert.pem -extfile extfile.cnf
```

### 生成客户端私钥

```bash
openssl genrsa -out key.pem 4096
```

### 生成客户端证书签名请求

```bash
openssl req -passin pass:123456 -subj '/CN=client' -new -key key.pem -out client.csr
```

### 生成名为extfile.cnf的配置文件

```bash
echo extendedKeyUsage = clientAuth > extfile-client.cnf
```

### 生成客户端证书

```bash
openssl x509 -req -passin pass:123456 -days 1000 -sha256 -in client.csr -CA ca.pem -CAkey ca-key.pem -CAcreateserial -out cert.pem -extfile extfile-client.cnf
```

### 删除非必要文件

```bash
rm -f client.csr server.csr extfile.cnf extfile-client.cnf
```

### 修改文件权限

```bash
chmod 0400 ca-key.pem server-key.pem key.pem
chmod 0444 ca.pem server-cert.pem cert.pem
```

## 配置docker启动命令

修改文件 `/lib/systemd/system/docker.service`

```bash
vim /lib/systemd/system/docker.service

[Service]
....
# 在这一行中的添加
#ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock -H tcp://0.0.0.0:2376 -H unix:///var/run/docker.sock
....
```

## 添加证书相关配置

修改 /etc/docker/daemon.json

```bash
vim /etc/docker/daemon.json

# {
# 	"hosts": ["unix:///var/run/docker.sock", "tcp://0.0.0.0:2376"],
#   	"tls": true,
#   	"tlscacert": "/etc/docker/certs/ca.pem",
#   	"tlscert": "/etc/docker/certs/server-cert.pem",
#   	"tlskey": "/etc/docker/certs/server-key.pem",
#   	"tlsverify": true
# }


# 添加上下面这部分
{
  "tls": true,
  "tlscacert": "/etc/docker/certs/ca.pem",
  "tlscert": "/etc/docker/certs/server-cert.pem",
  "tlskey": "/etc/docker/certs/server-key.pem",
  "tlsverify": true
}
```

或者直接添加在docker的启动命令中

```bash
vim /lib/systemd/system/docker.service

[Service]
....
# 在这一行中的添加
#ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock --tlsverify --tlscacert=/etc/docker/certs.d/ca.pem --tlscert=/etc/docker/certs.d/server-
cert.pem --tlskey=/etc/docker/certs.d/server-key.pem -H tcp://0.0.0.0:2376 -H unix:///var/run/docker.sock
....
```

## 重启docker服务

```bash
systemctl daemon-reload 
systemctl restart docker
```

之后就可以通过上面生成的客户端证书、客户端密钥以及ca证书来远程访问docker了

注意：虽然不配置证书，只在启动命令中添加 `-H tcp://0.0.0.0:2376 -H unix:///var/run/docker.sock` ,也可以远程访问

但是，最好配置上TLS证书认证，因为不配置证书风险会非常大

## 访问

### 命令行方式

```bash
docker --tlsverify --tlscacert=ca.pem --tlscert=cert.pem --tlskey=key.pem -H tcp://device01:2376 version
```

### 程序通过docker sdk访问

这里采用go语言来访问

远程获取docker info的信息

```go
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"

	"github.com/docker/docker/client"
)

func main() {
	// 设置远程Docker守护进程的地址
	remoteDockerURL := "tcp://10.0.0.12:2376" // 将remote-docker-host替换为远程Docker守护进程的IP地址或域名

	// 创建Docker客户端，并指定远程Docker守护进程地址
	// cli, err := client.NewClientWithOpts(client.WithHost(remoteDockerURL), client.WithVersion("1.41"))
	cli, err := client.NewClientWithOpts(
		client.WithHost(remoteDockerURL),
		// client.WithVersion("1.41"),
		client.WithAPIVersionNegotiation(), //能够自动获取服务端api版本
        // 添加证书部分
		client.WithTLSClientConfig("cert/ca.pem", "cert/cert.pem", "cert/key.pem"),
	)
	if err != nil {
		fmt.Println("Failed to create Docker client:", err)
		os.Exit(1)
	}

	ctx := context.Background()
	dockerInfo, err := cli.Info(ctx)
	if err != nil {
		fmt.Println("Failed to get Docker info:", err)
		os.Exit(1)
	}

	// 将Info信息转换为JSON格式并打印到控制台
	infoJSON, err := json.MarshalIndent(dockerInfo, "", "    ")
	if err != nil {
		fmt.Println("Failed to convert to JSON:", err)
		os.Exit(1)
	}

	fmt.Println("Docker Info:")
	fmt.Println(string(infoJSON))
}
```

更多操作可以参见 https://www.cnblogs.com/guangdelw/p/17562539.html