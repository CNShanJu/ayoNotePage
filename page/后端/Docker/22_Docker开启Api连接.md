> 参考：
>
> https://www.oryoy.com/news/docker-api-quan-xian-pei-zhi-xiang-jie-an-quan-kai-qi-yu-fang-wen-kong-zhi-ji-qiao.html
>
> https://blog.csdn.net/sg_knight/article/details/126319965

# 开启Docker的远程访问

在当今的云计算和微服务架构中，Docker已经成为容器化部署的标配工具。然而，随着Docker使用的普及，如何安全地管理和远程访问Docker API成为一个不容忽视的问题。本文将深入探讨Docker API的权限配置，详细讲解如何安全开启API访问并进行有效的访问控制。

## Docker API概述

`Docker API`是Docker提供的一套`RESTful`接口，允许用户通过`HTTP`请求来`管理容器、镜像、网络等资源`。默认情况下，Docker API**只允许本地访问**，这在一定程度上保证了安全性，但也限制了远程管理的灵活性。

## 开启Docker API远程访问

###  简单开启（不推荐）

通过修改Docker的启动配置文件，可以快速开启API的远程访问：

```bash
sudo vim /lib/systemd/system/docker.service
```

找到 **[Service]** 节点，修改 ExecStart 属性，在`ExecStart`行末尾添加`-H tcp://0.0.0.0:2375`：

```bash
#示例1
ExecStart=/usr/bin/dockerd -H fd:// -H tcp://0.0.0.0:2375
#示例2
ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock -H tcp://0.0.0.0:2375
```

![image-20241216204537705](img/22_Docker%E5%BC%80%E5%90%AFApi%E8%BF%9E%E6%8E%A5/image-20241216204537705.png)

 这样相当于对外开放的是 **2375** 端口，当然也可以根据自己情况修改成其他的。

然后让docker重新读取配置文件,并重启docker服务

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

**注意**：这种方法虽然简单，但没有任何权限校验，任何能访问到2375端口的设备都可以控制你的Docker，存在极大安全隐患。

#### 验证

首先在本地使用-H参数进行操作

```sh
docker -H 127.0.0.1:2375 images
```

![image-20241216205838231](img/22_Docker%E5%BC%80%E5%90%AFApi%E8%BF%9E%E6%8E%A5/image-20241216205838231.png)

通过浏览器访问 **2375** 测试一下，格式为：

```sh
http://ip:2375/version
```

正常输出东西

```json
{
    "Platform": {
        "Name": "Docker Engine - Community"
    },
    "Components": [{
        "Name": "Engine",
        "Version": "27.3.1",
        "Details": {
            "ApiVersion": "1.47",
            "Arch": "amd64",
            "BuildTime": "2024-09-20T11:41:00.000000000+00:00",
            "Experimental": "false",
            "GitCommit": "41ca978",
            "GoVersion": "go1.22.7",
            "KernelVersion": "5.15.0-76-generic",
            "MinAPIVersion": "1.24",
            "Os": "linux"
        }
    }, {
        "Name": "containerd",
        "Version": "1.7.22",
        "Details": {
            "GitCommit": "7f7fdf5fed64eb6a7caf99b3e12efcf9d60e311c"
        }
    }, {
        "Name": "runc",
        "Version": "1.1.14",
        "Details": {
            "GitCommit": "v1.1.14-0-g2c9f560"
        }
    }, {
        "Name": "docker-init",
        "Version": "0.19.0",
        "Details": {
            "GitCommit": "de40ad0"
        }
    }],
    "Version": "27.3.1",
    "ApiVersion": "1.47",
    "MinAPIVersion": "1.24",
    "GitCommit": "41ca978",
    "GoVersion": "go1.22.7",
    "Os": "linux",
    "Arch": "amd64",
    "KernelVersion": "5.15.0-76-generic",
    "BuildTime": "2024-09-20T11:41:00.000000000+00:00"
}
```

如果无法访问的话，可以尝试一下开放防火墙2375端口，具体命令如下：

```bash
firewall-cmd --zone=public --add-port=2375/tcp --permanent
firewall-cmd --reload
```

### 配置Docker安全访问 

如上两步切勿用于生产环境！在开发环境用用就行了，如果直接把Docker这样对外暴露是非常危险的，就跟你Redis对外开放6379还不设置密码一样。

基本网上好多文章都是如上两步，裸奔的步骤... 你品，你细品，不给你挂马给谁挂。

其实官方文档已经提供基于`CA证书`的加密方法了，[详情点击此处链接](https://docs.docker.com/engine/security/https/#create-a-ca-server-and-client-keys-with-openss)

为了确保安全性，推荐使用TLS加密和证书鉴权来开启远程访问。

#### 使用TLS加密和鉴权

创建一个目录来存放证书文件：

```bash
mkdir -p /etc/docker/certs
cd /etc/docker/certs
```

##### **生成CA私钥和公钥：**

###### 私钥

生成一个 4096 位长的 RSA 私钥，并且使用 AES-256 算法对其进行加密。私钥会被存储在 `ca-key.pem` 文件中。执行命令时，你会被提示输入一个用于保护私钥的密码。

```sh
openssl genrsa -aes256 -out ca-key.pem 4096
```

- `openssl`：调用 OpenSSL 工具，这是一个强大的、通用的密码学工具包。
- `genrsa`：生成一个 RSA 私钥。
- `-aes256`：使用 AES-256 对生成的私钥进行加密保护。当你使用这个私钥时，你需要提供一个密码来解密它。
- `-out ca-key.pem`：指定输出文件名为 `ca-key.pem`，该文件将保存生成的私钥。
- `4096`：指定了 RSA 密钥的长度为 4096 位。较长的密钥提供了更强的安全性。
- ![image-20241216215922333](img/22_Docker%E5%BC%80%E5%90%AFApi%E8%BF%9E%E6%8E%A5/image-20241216215922333.png)

###### 公钥

利用上一步骤生成的私钥来创建一个自签名的 X.509 证书，有效期为一年（365天），并使用 SHA-256 哈希算法对证书进行签名。该证书将会被保存到 `ca.pem` 文件中。

```sh
openssl req -new -x509 -days 365 -key ca-key.pem -sha256 -out ca.pem
```

- `openssl`：同样地，调用 OpenSSL 工具。
- `req`：处理证书请求（Certificate Signing Requests, CSR）。它可以用来创建一个新的 CSR 或者处理现有的 CSR。
- `-new`：指示 OpenSSL 创建一个新的证书请求。
- `-x509`：告诉 OpenSSL 不要创建一个普通的证书请求，而是直接创建一个自签名的 X.509 证书。
- `-days 365`：设置证书的有效期为 365 天。你可以根据需要调整这个值。
- `-key ca-key.pem`：指定用来签署证书的私钥文件，即上面创建的 `ca-key.pem`。
- `-sha256`：指定使用 SHA-256 算法作为证书的签名算法。
- `-out ca.pem`：指定输出文件名为 `ca.pem`，该文件将保存生成的自签名证书。

当执行第二条命令时，OpenSSL 会询问你一系列问题以收集有关你的组织的信息（例如国家、省份、城市、组织名称等），这些信息将被嵌入到证书中。

依次输入：访问密码、国家、省、市、组织名称、单位名称、随便一个名字、邮箱等。(`随便填一下得了`)

> 如果你希望自动化这个过程或避免交互式提问，可以使用配置文件或者 `-subj` 参数来非交互地提供这些细节

![image-20241216221032312](img/22_Docker%E5%BC%80%E5%90%AFApi%E8%BF%9E%E6%8E%A5/image-20241216221032312.png)

至此，CA证书就创建完成了，有了CA之后，就可以创建服务器密钥和证书签名请求(CSR)了，确保“`通用名称`”与你连接`Docker`时使用的`主机名`相匹配。

##### 生成服务端私钥和证书签名请求：

###### 创建服务器的私钥

```sh
openssl genrsa -out server-key.pem 4096
```

- `openssl`：调用 OpenSSL 工具
- `genrsa`：生成一个 RSA 私钥。
- `-out server-key.pem`：指定输出文件名为 `server-key.pem`，该文件将保存生成的私钥。
- `4096`：指定了 RSA 密钥的长度为 4096 位。较长的密钥提供了更强的安全性。

这条命令会生成一个 4096 位长的 RSA 私钥，并将其存储在 `server-key.pem` 文件中。与之前的例子不同，这里没有使用 `-aes256` 参数来加密私钥，所以这个**私钥是未加密的**。这意味着它可以在不提供额外密码的情况下直接使用，但也意味着如果私钥被泄露，任何人都可以使用它。

###### 创建一个证书签名请求

```sh
#openssl req -subj "/CN=$(hostname)" -sha256 -new -key server-key.pem -out server.csr

openssl req -subj "/CN=你的IP地址" -sha256 -new -key server-key.pem -out server.csr
```

- `openssl`：同样地，调用 OpenSSL 工具。
- `req`：处理证书请求（Certificate Signing Requests, CSR）。它可以用来创建一个新的 CSR 或者处理现有的 CSR。
- `-subj "/CN=$(hostname)"`：指定主题（Subject）字段，其中 `CN` 是 Common Name 的缩写，通常对应于服务的域名或主机名。这里使用了 `$(hostname)` 来动态获取当前机器的主机名作为 CN 值。如果你有特定的域名或者需要设置其他主题字段，你可以手动指定完整的 Distinguished Name (DN)。
- `-sha256`：指定使用 SHA-256 算法作为证书签名请求的哈希算法。
- `-new`：指示 OpenSSL 创建一个新的证书请求。
- `-key server-key.pem`：指定用来签署证书请求的私钥文件，即上面创建的 `server-key.pem`。
- `-out server.csr`：指定输出文件名为 `server.csr`，该文件将保存生成的证书签名请求。

这条命令使用之前生成的私钥来创建一个证书签名请求（CSR），并将请求保存到 `server.csr` 文件中。CSR 包含了公钥以及一些有关实体（如网站或服务）的信息，这些信息将会包含在最终颁发的证书中。一旦你有了 CSR，你可以将其提交给证书颁发机构（CA），由 CA 验证并签发正式的 SSL/TLS 证书。如果你是在内部网络中使用自签名证书，则可以直接用 CA 的私钥来签署这个 CSR。

> 由于可以通过IP地址和DNS名称建立TLS连接，因此在创建证书时需要指定IP地址。例如，允许使用`10.211.55.4`进行连接：
>
> ```sh
> openssl req -subj "/CN=10.211.55.4" -sha256 -new -key server-key.pem -out server.csr
> ```
>
> 如果你是用的网址(比如:www.sscai.club)则替换一下即可：
>
> ```sh
> openssl req -subj "/CN=www.sscai.club" -sha256 -new -key server-key.pem -out server.csr
> ```
>
> 注意：这里指的ip或者是域名，都是指的将来用于对外的地址。



> 请注意，虽然这里只设置了 `CN` 字段，但在现代 TLS/SSL 实践中，推荐同时设置 `Subject Alternative Names (SANs)`，尤其是当服务器具有多个域名或 IP 地址时。可以通过配置文件或在命令行中添加 SAN 扩展来实现这一点。



##### 限制认证类型

```sh
echo subjectAltName = DNS:www.youalwayscute.com,IP:0.0.0.0 >> extfile.cnf
echo extendedKeyUsage = serverAuth >> extfile.cnf
openssl x509 -req -days 365 -sha256 -in server.csr -CA ca.pem -CAkey ca-key.pem -CAcreateserial -out server-cert.pem -extfile extfile.cnf
```

这两条命令用于为服务器创建一个带有 `extendedKeyUsage` 扩展的 X.509 证书，该扩展指定了证书仅能用于服务器认证（`serverAuth`）

###### 第一条命令

匹配白名单
配置白名单的意义在于，允许哪些ip可以远程连接docker。

配置0.0.0.0，允许所有的ip可以链接（但只允许永久证书的才可以连接成功）

```sh
echo subjectAltName = DNS:www.youalwayscute.com,IP:0.0.0.0 >> extfile.cnf
```

- `echo`：这是一个 shell 内置命令，用来输出文本。
- `subjectAltName = DNS:www.youalwayscute.com,IP:0.0.0.0`：这是要写入配置文件的文本内容。`subjectAltName`是一个 X.509 证书扩展，它定义了证书所涵盖的额外名称（域名或 IP 地址）。这里指定了两个值：
  - `DNS:www.youalwayscute.com` 表示此证书适用于名为 `www.youalwayscute.com` 的域名。
  - `IP:0.0.0.0` 指示该证书适用于所有 IP 地址。通常情况下，你应该使用实际的 IP 地址代替 `0.0.0.0` 来指定具体的服务器地址。使用 `0.0.0.0` 可能会导致安全性问题，并且在某些环境中可能不会被正确识别。
- `>> extfile.cnf`：将上述文本追加到名为 `extfile.cnf` 的文件中。如果 `extfile.cnf` 文件不存在，则会创建一个新的文件。

这条命令的作用是修改或创建 `extfile.cnf` 配置文件，并向其中添加一行，指定证书的 `subjectAltName` 包括 `www.youalwayscute.com` 域名和 `0.0.0.0` IP 地址。

###### 第二条命令

```sh
echo extendedKeyUsage = serverAuth >> extfile.cnf
```

- `echo`：这是一个 shell 内置命令，用来输出文本。
- `extendedKeyUsage = serverAuth`：这是要写入配置文件的文本内容。`extendedKeyUsage` 是一个 X.509 证书扩展，它定义了证书可以使用的特定用途；`serverAuth` 表示此证书仅限于服务器身份验证。
- `>> extfile.cnf`：将上述文本追加到名为 `extfile.cnf` 的文件中。如果 `extfile.cnf` 文件不存在，则会创建一个新的文件。使用 `>>` 可以确保即使文件已存在，也不会覆盖现有的内容，而是添加到文件末尾。

这条命令的作用是修改或创建 `extfile.cnf` 配置文件，并向其中添加一行，指定证书的 `extendedKeyUsage` 为 `serverAuth`。这行配置告诉 OpenSSL 在签署证书时添加这个扩展，从而限制证书只能用于服务器认证。

###### 第三条命令

```sh
openssl x509 -req -days 365 -sha256 -in server.csr -CA ca.pem -CAkey ca-key.pem -CAcreateserial -out server-cert.pem -extfile extfile.cnf
```

- `openssl`：调用 OpenSSL 工具。
- `x509`：处理 X.509 证书，包括创建、检查和转换。
- `-req`：表示输入是一个证书签名请求（CSR）。
- `-days 365`：设置证书的有效期为 365 天。
- `-sha256`：指定使用 SHA-256 算法作为证书的签名算法。
- `-in server.csr`：指定输入文件为 `server.csr`，即要被签署的证书签名请求。
- `-CA ca.pem`：指定 CA 证书文件，用于签署新证书。
- `-CAkey ca-key.pem`：指定 CA 的私钥文件，用于签署新证书。
- `-CAcreateserial`：创建或更新序列号文件（`ca.srl`），以便每次签发新的证书时都能保证序列号是唯一的。
- `-out server-cert.pem`：指定输出文件名为 `server-cert.pem`，该文件将保存生成的已签署证书。
- `-extfile extfile.cnf`：指定包含扩展信息的配置文件，在本例中是之前创建的 `extfile.cnf`，它包含了 `extendedKeyUsage` 扩展。

这条命令使用 CA 的私钥 (`ca-key.pem`) 和证书 (`ca.pem`) 来签署 `server.csr`，创建一个有效期为 365 天的新服务器证书，并应用 `extfile.cnf` 中定义的 `extendedKeyUsage` 扩展（在这里是指定证书仅能用于服务器认证）。最终生成的已签署证书会被保存到 `server-cert.pem` 文件中。

> 通过这种方式创建的证书明确地限定了其用途，增强了安全性和合规性，特别是对于需要严格控制证书用途的环境，比如 TLS/SSL 服务器部署。

![image-20241216225807257](img/22_Docker%E5%BC%80%E5%90%AFApi%E8%BF%9E%E6%8E%A5/image-20241216225807257.png)

##### 生成客户端私钥和证书：

```sh
openssl genrsa -out key.pem 4096
openssl req -subj '/CN=client' -new -key key.pem -out client.csr

echo extendedKeyUsage = clientAuth > extfile-client.cnf
openssl x509 -req -days 365 -sha256 -in client.csr -CA ca.pem -CAkey ca-key.pem -CAcreateserial -out cert.pem -extfile extfile-client.cnf
```

命令的组合用于创建客户端证书，该证书可以用于客户端身份验证。

###### 第一条命令

```sh
openssl genrsa -out key.pem 4096
```

- `openssl`：调用 OpenSSL 工具。
- `genrsa`：生成一个 RSA 私钥。
- `-out key.pem`：指定输出文件名为 `key.pem`，该文件将保存生成的私钥。
- `4096`：指定了 RSA 密钥的长度为 4096 位。

这条命令会生成一个 4096 位长的 RSA 私钥，并将其存储在 `key.pem` 文件中。此私钥稍后将用于创建证书签名请求（CSR）。

###### 第二条命令

```sh
openssl req -subj '/CN=client' -new -key key.pem -out client.csr
```

- `openssl`：调用 OpenSSL 工具。
- `req`：处理证书请求（Certificate Signing Requests, CSR）。
- `-subj '/CN=client'`：设置主题（Subject）字段，这里只设置了 `CN`（Common Name），并设为 "client"。你可以根据需要添加更多的主题字段。
- `-new`：指示 OpenSSL 创建一个新的证书请求。
- `-key key.pem`：指定用来签署证书请求的私钥文件，即上面创建的 `key.pem`。
- `-out client.csr`：指定输出文件名为 `client.csr`，该文件将保存生成的证书签名请求。

这条命令使用之前生成的私钥来创建一个带有主题 `/CN=client` 的证书签名请求（CSR），并将请求保存到 `client.csr` 文件中。

###### 第三条命令：

```sh
echo extendedKeyUsage = clientAuth >> extfile-client.cnf
```

这条命令向 `extfile-client.cnf` 文件追加一行文本，定义了扩展密钥用途（extendedKeyUsage）。这里的 `clientAuth` 表示这个证书将被用于客户端认证。通过这种方式，我们可以确保签发的证书只能用于客户端认证，而不是服务器认证或其他用途。

###### 第四条命令：

```sh
openssl x509 -req -days 365 -sha256 -in client.csr -CA ca.pem -CAkey ca-key.pem -CAcreateserial -out cert.pem -extfile extfile-client.cnf
```

- `openssl`：调用 OpenSSL 工具。
- `x509`：处理 X.509 证书，包括创建、检查和转换。
- `-req`：表示输入是一个证书签名请求（CSR）。
- `-days 365`：设置证书的有效期为 365 天。
- `-sha256`：指定使用 SHA-256 算法作为证书的签名算法。
- `-in client.csr`：指定输入文件为 `client.csr`，即要被签署的证书签名请求。
- `-CA ca.pem`：指定 CA 证书文件，用于签署新证书。
- `-CAkey ca-key.pem`：指定 CA 的私钥文件，用于签署新证书。
- `-CAcreateserial`：创建或更新序列号文件（`ca.srl`），以便每次签发新的证书时都能保证序列号是唯一的。
- `-out cert.pem`：指定输出文件名为 `cert.pem`，该文件将保存生成的已签署证书。
- `-extfile extfile-client.cnf`：指定包含扩展信息的配置文件，在本例中是之前创建的 `extfile-client.cnf`，它包含了 `extendedKeyUsage` 扩展。

这条命令使用 CA 的私钥 (`ca-key.pem`) 和证书 (`ca.pem`) 来签署 `client.csr`，创建一个有效期为 365 天的新证书，并应用 `extfile-client.cnf` 中定义的扩展（在这里是指定证书仅能用于客户端认证）。最终生成的已签署证书会被保存到 `cert.pem` 文件中。

![image-20241216230146182](img/22_Docker%E5%BC%80%E5%90%AFApi%E8%BF%9E%E6%8E%A5/image-20241216230146182.png)

##### 删除不需要的文件

生成后`cert.pem`，`server-cert.pem`您可以安全地删除两个证书签名请求和扩展配置文件：

```sh
rm -v client.csr server.csr extfile.cnf extfile-client.cnf
```

![image-20241216230230179](img/22_Docker%E5%BC%80%E5%90%AFApi%E8%BF%9E%E6%8E%A5/image-20241216230230179.png)

##### 修改权限 

 为了保护您的密钥免于意外损坏，请删除其写入权限。要使它们仅供您阅读，请按以下方式更改文件模式：

```sh
chmod -v 0400 ca-key.pem key.pem server-key.pem
```

![image-20241216224107656](img/22_Docker%E5%BC%80%E5%90%AFApi%E8%BF%9E%E6%8E%A5/image-20241216224107656.png)

证书可以使对外可读的，删除写入权限以防止意外损坏：

```sh
chmod -v 0444 ca.pem server-cert.pem cert.pem
```

##### 最终结果

![image-20241216230441752](img/22_Docker%E5%BC%80%E5%90%AFApi%E8%BF%9E%E6%8E%A5/image-20241216230441752.png)



##### 归集服务器证书(可忽略)

```sh
cp server-*.pem /etc/docker/
cp ca.pem /etc/docker/
```

#####  配置Docker使用TLS

修改Docker启动配置文件：

```bash
sudo vim /lib/systemd/system/docker.service
```

添加TLS相关参数：

```bash
ExecStart=/usr/bin/dockerd --tlsverify --tlscacert=/etc/docker/certs/ca.pem --tlscert=/etc/docker/certs/server-cert.pem --tlskey=/etc/docker/certs/server-key.pem -H=0.0.0.0:2376

# ExecStart=/usr/bin/dockerd 
# --tlsverify --tlscacert=/etc/docker/certs/ca.pem 
# --tlscert=/etc/docker/certs/server-cert.pem 
# --tlskey=/etc/docker/certs/server-key.pem -H=0.0.0.0:2376

# ExecStart=/usr/bin/dockerd --tlsverify --tlscacert=/usr/local/ca/ca.pem --tlscert=/usr/local/ca/server-cert.pem --tlskey=/usr/local/ca/server-key.pem -H tcp://0.0.0.0:2375 -H unix:///var/run/docker.sock
```

**修改前截图**

![image-20241216230659852](img/22_Docker%E5%BC%80%E5%90%AFApi%E8%BF%9E%E6%8E%A5/image-20241216230659852.png)

修改后截图

![image-20241216230827275](img/22_Docker%E5%BC%80%E5%90%AFApi%E8%BF%9E%E6%8E%A5/image-20241216230827275.png)

重启加载Docker配置并重启服务：

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

#### 验证

![image-20241216234827403](img/22_Docker%E5%BC%80%E5%90%AFApi%E8%BF%9E%E6%8E%A5/image-20241216234827403.png)

在本地使用-H参数进行操作

```sh
docker -H 0.0.0.0:2375 images

# Error response from daemon: Client sent an HTTP request to an HTTPS server.
```

![image-20241216234400745](img/22_Docker%E5%BC%80%E5%90%AFApi%E8%BF%9E%E6%8E%A5/image-20241216234400745.png)

```sh
docker --tlsverify \
--tlscacert=/etc/docker/certs/ca.pem \
--tlscert=/etc/docker/certs/cert.pem \
--tlskey=/etc/docker/certs/key.pem \
-H 0.0.0.0:2375 images
#docker --tlsverify --tlscacert=ca.pem --tlscert=cert.pem --tlskey=key.pem -H=0.0.0.0:2375 info
```

![image-20241216234422461](img/22_Docker%E5%BC%80%E5%90%AFApi%E8%BF%9E%E6%8E%A5/image-20241216234422461.png)