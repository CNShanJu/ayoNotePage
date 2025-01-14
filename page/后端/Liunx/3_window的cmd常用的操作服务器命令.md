### SSH链接服务器

启动windows的cmd控制台输入指令进行ssh连接。

```sh
ssh -p 端口号 linux服务器用户名@linux服务器ip地址
```

退出连接

```sh
exit
```

### 从服务器取出文件

最直接的方法还是在本地机器上使用 `scp` 命令

`scp` 是一个基于 SSH 的安全文件复制命令。你可以直接在本地机器的命令行中使用它，而不需要先登录到远程服务器。基本语法如下：

```sh
scp username@remote_host:/path/to/remote/file /path/to/local/destination
```

- `username`：你在远程服务器上的用户名。
- `remote_host`：远程服务器的地址，可以是IP地址或者域名。
- `/path/to/remote/file`：你想要拷贝的远程文件路径。
- `/path/to/local/destination`：你希望保存文件的本地路径。

例如，如果你的用户名为 `user`，服务器地址为 `example.com`，并且你想把远程服务器上的 `/home/user/file.txt` 文件拷贝到本地当前目录下，那么你会执行如下命令：

```sh
scp user@example.com:/home/user/file.txt .
```

注意：`.` 表示当前目录。如果你需要指定其他本地路径，请替换为实际路径。

如果需要递归地复制整个目录，可以在命令前加上 `-r` 参数：

```sh
scp -r user@example.com:/home/user/directory /local/path/
```

##### 注意事项

- 确保你的本地机器安装了 `scp` 或者支持 SSH 协议的客户端工具。
- 如果你是第一次连接到该服务器，系统可能会提示你确认服务器的指纹信息。
- 你需要输入正确的密码或使用私钥认证来验证身份。
- 如果端口号不是默认的22，则可以通过 `-P` 参数指定端口，如 `-P 2222`。

如果你已经在服务器上通过 SSH 登录，并且想要从那里传输文件到本地，这在大多数情况下是不可行的，因为 `scp` 需要在本地发起请求。不过，你可以使用一些高级技巧，比如反向 SCP 或设置 SSH 代理转发等方法，但这超出了基本用法的范围。对于更复杂的需求，考虑使用 `rsync` 或图形界面的 SFTP 客户端如 FileZilla。