# [git 配置多端多个账号（码云、github、gitlab）](https://www.cnblogs.com/DL-CODER/p/17302223.html)

首先确认已安装Git，可以通过 git –version 命令可以查看当前安装的版本。

> 为同一个电脑，配置多个 git 账号，其整体流程如下：
> 清空默认的全局 user.name 和 user.email
> 为不同的 git 账户生成不同的 ssh-key
> 将以上的 ssh-key 分别添加到 ssh-agent 信任列表
> 添加以上的公钥到自己的 git 账户中
> 在 config 文件配置多个 ssh-key
> 测试

## 1. 清空默认的全局 user.name 和 user.email

```sh
git config --global --unset user.name
git config --global --unset user.email
```

查看git配置： `git config --global --list`

## 2、配置多个git的用户名和邮箱

#### a、单个用户配置

```sh
git config --global user.name "yourusername"
git config --global user.email "youremail@email.com"
```

#### b、多个用户配置

注意： 这里git config命令没有带—global，表示这是一个局部的设置，也就是这个用户是当前项目的，而不是全局的。

```sh
git config user.name "1"
git config user.email "1@hotmail.com"
```

c、删除配置

```sh
git config --unset user.name
git config --unset user.email
```

## 3、生成多个密钥

管理员打开控制台

a、生成gitte仓库的SSH

指定文件路径，方便后面操作：~/.ssh/id_rsa.gitte，id_rsa.github是秘钥的别名。

```sh
ssh-keygen -t rsa -f ~/.ssh/id_rsa.gitte -C "lx@qq.com"

#ssh-keygen -t rsa -f C:/Users/AyoUser/.ssh/id_rsa.gitlabtidu -C "ouyangqi@tiduyun.com"

#ssh-keygen -t rsa -f C:/Users/tidu_user/.ssh/id_rsa.gitee -C "219247585@qq.com"
qxts,
```

b、生成github仓库的SSH

```sh
ssh-keygen -t rsa -f ~/.ssh/id_rsa.github -C "lx@qq.com"
```

## 4、将 ssh-key 分别添加到 ssh-agent 信任列表

```sh
#先执行（二选一）
eval `ssh-agent -s`
eval `ssh-agent`

# 再执行
ssh-add ~/.ssh/id_rsa.gitte
ssh-add ~/.ssh/id_rsa.github

#ssh-add C:/Users/AyoUser/.ssh/id_rsa.gitlabtidu
#ssh-add C:/Users/tidu_user/.ssh/id_rsa.gitlabtidu
```

> 如果看到 Identitiy added: ~/.ssh/id_ras_github，就表示添加成功了。

```
ssh-add -l
```

你应该能看到你刚刚添加的私钥的指纹。如果没有显示出来，再次尝试使用`ssh-add`命令添加它。

## 5、添加公钥到自己的 git 账户中

> 使用命令，copy公钥，到 git 账户中粘贴即可。或者打开文件复制，带 pub 的文件

```sh
pbcopy < ~/.ssh/id_rsa.gitte
```

添加步骤参考：https://www.jianshu.com/p/68578d52470c

## 6、在 config 文件配置多个 ssh-key

在生成密钥的.ssh 目录下，新建一个config文件，然后配置不同的仓库，

```sh
#Default gitHub user Self
Host github.com
    HostName github.com
    User git #默认就是git，可以不写
    IdentityFile ~/.ssh/id_rsa.github
	
# gitee的配置
host gitee.com  # 别名,最好别改
	Hostname gitee.com #要连接的服务器
	User 4505946500@qq.com #用户名
	#密钥文件的地址，注意是私钥
	IdentityFile ~/.ssh/id_rsa_gittesa

#Add gitLab user 
Host git.lingban.cn
    HostName git.lingban.cn
    User wlliu00@ling-ban.com
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/id_rsa_lingban
    
# 梯度gitlab
Host git.tiduyun.com
    HostName git.tiduyun.com
    User ouyangqi@tiduyun.com #默认就是git，可以不写
    IdentityFile C:/Users/AyoUser/.ssh/id_rsa.gitlabtidu
    PubkeyAcceptedKeyTypes +ssh-rsa
```

## 7、测试

```sh
ssh -T git@gitee.com
# ssh -T git@git.tiduyun.com
# ssh -Tv git@git.tiduyun.com
```

## 问题

当上述流程都走对，还是连接不上

```sh
ssh -T git@git.tiduyun.com
```

报错提示如下

```sh
$ ssh -T git@git.tiduyun.com
git@git.tiduyun.com: Permission denied (publickey).
```

查看详细信息

```sh
ssh -Tv git@git.tiduyun.com
```

输出如下

```sh
$ ssh -Tv git@git.tiduyun.com
OpenSSH_9.7p1, OpenSSL 3.2.1 30 Jan 2024
debug1: Reading configuration data /c/Users/AyoUser/.ssh/config
debug1: /c/Users/AyoUser/.ssh/config line 2: Applying options for git.tiduyun.com
debug1: Reading configuration data /etc/ssh/ssh_config
debug1: Connecting to git.tiduyun.com [192.168.0.48] port 22.
debug1: Connection established.
debug1: identity file C:/Users/AyoUser/.ssh/id_rsa.gitlabtidu type 0
debug1: identity file C:/Users/AyoUser/.ssh/id_rsa.gitlabtidu-cert type -1
debug1: Local version string SSH-2.0-OpenSSH_9.7
debug1: Remote protocol version 2.0, remote software version OpenSSH_6.6.1p1 Ubuntu-2ubuntu2.7
debug1: compat_banner: match: OpenSSH_6.6.1p1 Ubuntu-2ubuntu2.7 pat OpenSSH_6.6.1* compat 0x04000002
debug1: Authenticating to git.tiduyun.com:22 as 'git'
debug1: load_hostkeys: fopen /c/Users/AyoUser/.ssh/known_hosts2: No such file or directory
debug1: load_hostkeys: fopen /etc/ssh/ssh_known_hosts: No such file or directory
debug1: load_hostkeys: fopen /etc/ssh/ssh_known_hosts2: No such file or directory
debug1: SSH2_MSG_KEXINIT sent
debug1: SSH2_MSG_KEXINIT received
debug1: kex: algorithm: curve25519-sha256@libssh.org
debug1: kex: host key algorithm: ssh-ed25519
debug1: kex: server->client cipher: chacha20-poly1305@openssh.com MAC: <implicit> compression: none
debug1: kex: client->server cipher: chacha20-poly1305@openssh.com MAC: <implicit> compression: none
debug1: expecting SSH2_MSG_KEX_ECDH_REPLY
debug1: SSH2_MSG_KEX_ECDH_REPLY received
debug1: Server host key: ssh-ed25519 SHA256:ke5M69NcAiEqMS7Ju7fKzRQ06oEXLiLhfEHVxBECzOE
debug1: load_hostkeys: fopen /c/Users/AyoUser/.ssh/known_hosts2: No such file or directory
debug1: load_hostkeys: fopen /etc/ssh/ssh_known_hosts: No such file or directory
debug1: load_hostkeys: fopen /etc/ssh/ssh_known_hosts2: No such file or directory
debug1: Host 'git.tiduyun.com' is known and matches the ED25519 host key.
debug1: Found key in /c/Users/AyoUser/.ssh/known_hosts:1
debug1: rekey out after 134217728 blocks
debug1: SSH2_MSG_NEWKEYS sent
debug1: expecting SSH2_MSG_NEWKEYS
debug1: SSH2_MSG_NEWKEYS received
debug1: rekey in after 134217728 blocks
debug1: SSH2_MSG_SERVICE_ACCEPT received
debug1: Authentications that can continue: publickey
debug1: Next authentication method: publickey
debug1: get_agent_identities: bound agent to hostkey
debug1: get_agent_identities: agent returned 1 keys
debug1: Will attempt key: C:/Users/AyoUser/.ssh/id_rsa.gitlabtidu RSA SHA256:kvzkabOry4hfIbYEgwyrR1PR9V8oHK7q4JwCGYdqqXg explicit agent
debug1: Offering public key: C:/Users/AyoUser/.ssh/id_rsa.gitlabtidu RSA SHA256:kvzkabOry4hfIbYEgwyrR1PR9V8oHK7q4JwCGYdqqXg explicit agent
debug1: send_pubkey_test: no mutual signature algorithm
debug1: No more authentication methods to try.
git@git.tiduyun.com: Permission denied (publickey).	
```

从你提供的调试信息来看，问题出在公钥认证过程中。具体来说，服务器拒绝了你的公钥，原因是“`no mutual signature algorithm`”。这通常意味着**客户端和服务器支持的签名算法不匹配**。

### 解决步骤

1. **检查服务器支持的签名算法** 你可以尝试连接到服务器并查看其支持的签名算法。通常，OpenSSH服务器支持多种签名算法，但有时可能需要特定的配置。

2. **更新客户端的OpenSSH版本** 确保你的OpenSSH客户端是最新的。你已经提到你在使用OpenSSH 9.7p1，这是一个相对较新的版本，但仍然可以尝试更新到最新版本。

3. **配置客户端支持的签名算法** 你可以在客户端的SSH配置文件中指定支持的签名算法。编辑`~/.ssh/config`文件，添加以下内容：

    plaintext深色版本

    ```
    #Default gitHub user Self
    Host git.tiduyun.com
        HostName git.tiduyun.com
        User ouyangqi@tiduyun.com #默认就是git，可以不写
        IdentityFile C:/Users/AyoUser/.ssh/id_rsa.gitlabtidu
        PubkeyAcceptedKeyTypes +ssh-rsa
    ```

    这个配置告诉客户端在与`git.tiduyun.com`通信时接受`ssh-rsa`签名算法。

4. **生成兼容的公钥** 如果上述方法仍然无效，可以尝试生成一个兼容的公钥。你可以使用`-m`选项来指定生成公钥时使用的格式：

    bash深色版本

    ```
    ssh-keygen -t rsa -m PEM -f C:/Users/AyoUser/.ssh/id_rsa.gitlabtidu -C "ouyangqi@tiduyun.com"
    ```

    然后将生成的公钥添加到GitLab。

5. **检查服务器的日志** 如果你有权限访问服务器，可以查看服务器的日志文件，通常位于`/var/log/auth.log`或`/var/log/secure`，以获取更多关于认证失败的详细信息。



