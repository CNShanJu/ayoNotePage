## 前言

`Gitea`是一个用于代码托管的轻量级单体程序，它能与现有的经典应用集成，诸如代码分析工具 SonarQube、持续集成工具 `Drone`、`Jenkins `以及用于工单管理的客户端插件（VSCode、Jenkins IDE）。 不久之后，Gitea 也会兼容 GitHub Actions 使得 CI/CD 流程更加简单。

今天要介绍的是 `Gitea `与 `Jenkins` **CI/CD 的集成**。

## 关于 Jenkins 的 Gitea 插件

`Jenkins` 支持从`通用 Git 服务器`拉取代码，无需安装额外的插件即可配合 Gitea 使用。用于 Jenkins 的 Gitea 插件作用在于将 Jenkins CI/CD 权限直接赋予 Gitea 服务器上被授权的组织或个人，用户无需单独为每一个仓库配置 Jenkins 触发器即可享受 CI/CD 功能。

当用户在仓库中创建 `Jenkinsfile` 时，Jenkins 能够自动扫描到该仓库并启动 CI/CD 流水线。

> 插件详情：[plugins.jenkins.io/gitea/](https://link.juejin.cn/?target=https%3A%2F%2Fplugins.jenkins.io%2Fgitea%2F)

## Gitea 与 Jenkins 的集成简单实践

### Jenkins

> 可获取`crumb`的地址(浏览器直接输入地址):
> `http://[YOUR_JENKINS_URL]/crumbIssuer/api/json`

##### 准备API密钥

在用户头像处点击`安全`

![image-20240929232144598](img/1_集成/image-20240929232144598.png)

在`API Token`下添加一个新的Token

![image-20240929232258880](img/1_集成/image-20240929232258880.png)

名字随便起，然后生成

![image-20240929232424162](img/1_集成/image-20240929232424162.png)

![image-20240929233321690](img/1_集成/image-20240929233321690.png)

`找个位置保存，后续会用到`

```shell
1169ad6ba1eaa9df14189281a90c02766c
```

##### 制作流水线Item

新建一个Item

![image-20240929232636707](img/1_集成/image-20240929232636707.png)

起个item名字选择`流水线`

![image-20240929232719565](img/1_集成/image-20240929232719565.png)

在`流水线`下写`Pipeline`脚本，点击保存

![image-20240929233003292](img/1_集成/image-20240929233003292.png)

```shell
pipeline {
    agent any
    stages {
        stage('test') {
            steps {
                script {
                    sh """
                        java -version
                        which java
                    """
                }
            }
        }
    }
}
```

测试item可以正常执行

![image-20240929233058969](img/1_集成/image-20240929233058969.png)

验证成功

### Gitea

进入要触发`Jenkins`动作的`仓库`，点击`设置`

![image-20240929231952826](img/1_集成/image-20240929231952826.png)

添加一个`Gitea`的web钩子

![image-20240929232046966](img/1_集成/image-20240929232046966.png)

##### 目标URL

填写`目标URL`，即`Jenkins`的`Item`所在的位置加上`/build`

```shell
Jenkins_url/job/item名/build
```

![image-20240929233842756](img/1_集成/image-20240929233842756.png)

![image-20240929233858637](img/1_集成/image-20240929233858637.png)

##### 过滤分支

过滤分支这里根据你需要的来，这里我就测试，懒得改了

![image-20240929234022380](img/1_集成/image-20240929234022380.png)

##### 授权标头

接下来填`授权标头`

![image-20240929235147210](img/1_集成/image-20240929235147210.png)

这里我们使用第二种方法

> `Bearer` 和 `Basic` 是两种不同的 HTTP 认证方式，它们在用途和使用方式上有所不同。下面是这两种认证方式的区别和使用方法：
>
> #### 1. Bearer Token
>
> **用途**：
>
> - `Bearer` 认证通常用于 OAuth 2.0 和其他现代认证机制中。
> - 它用于传递访问令牌（access token），这些令牌通常是经过某种安全机制（如 OAuth 2.0 授权流程）获得的。
>
> **格式**：
>
> - `Authorization: Bearer <token>`
>
> **示例**：
>
> ```shell
> Authorization: Bearer token123456
> ```
>
> **使用场景**：
>
> - 适用于 API 调用，特别是在需要用户授权的应用中。
> - 适用于 JWT（JSON Web Tokens）等安全令牌。
>
> #### 2. Basic Authentication
>
> **用途**：
>
> - `Basic` 认证是一种简单的 HTTP 认证方式，用于传递用户名和密码。
> - 它将用户名和密码组合成一个字符串，然后对其进行 Base64 编码。
>
> **格式**：
>
> - `Authorization: Basic <base64(username:password)>`
>
> **示例**：
>
> ```shell
> Authorization: Basic YWxhZGRpbjpvcGVuc2VzYW1l
> ```
>
> **解码示例**：
>
> - `YWxhZGRpbjpvcGVuc2VzYW1l` 解码后是 `aladdin:open sesame`。
>
> **使用场景**：
>
> - 适用于简单的认证需求，特别是在不需要复杂授权机制的情况下。
> - 适用于测试和开发环境，因为它是明文传输的（尽管经过了 Base64 编码，但 Base64 编码不是加密）。

首先拿上文准备好的`API密钥`，以及你登录`Jenkinse`用的`用户名`，找个命令窗口输入

`Liunx`如下操作

```shell
echo -n 'Jenkins用户名:API密钥' | base64

echo -n 'root:1169ad6ba1eaa9df14189281a90c02766c' | base64
# 得到：cm9vdDoxMTY5YWQ2YmExZWFhOWRmMTQxODkyODFhOTBjMDI3NjZj
```

![image-20240929235001521](img/1_集成/image-20240929235001521.png)

`Window如下操作`

```shell
# 选择 Windows PowerShell (管理员) 或 Windows Terminal (管理员)
# 依次执行
$username = "root"
$password = "1169ad6ba1eaa9df14189281a90c02766c"
$pair = "$($username):$($password)"
$encodedCreds = [System.Convert]::ToBase64String([System.Text.Encoding]::ASCII.GetBytes($pair))
Write-Output $encodedCreds
#得到：cm9vdDoxMTY5YWQ2YmExZWFhOWRmMTQxODkyODFhOTBjMDI3NjZj
```

![image-20240929234948425](img/1_集成/image-20240929234948425.png)

根据下方提示最终`授权标头`中填入的值为`Basic`+`空格`+`终端拿到的值`

```shell
Basic cm9vdDoxMTY5YWQ2YmExZWFhOWRmMTQxODkyODFhOTBjMDI3NjZj
```

点击添加web钩子

![image-20240929235327707](img/1_集成/image-20240929235327707.png)

![image-20240929235401041](img/1_集成/image-20240929235401041.png)

##### 测试

点击该钩子对象进入

​	![image-20240929235503649](img/1_集成/image-20240929235503649.png)

滑倒最底下有个`测试推送`按钮，点击

![image-20240929235527598](img/1_集成/image-20240929235527598.png)

![image-20240929235613095](img/1_集成/image-20240929235613095.png)

回到Jenkins的Item页面刷新，这时候发现有条推送记录，操作完成

![image-20240929235703651](img/1_集成/image-20240929235703651.png)

## 对应的postman请求

![image-20240930001307995](img/1_集成/image-20240930001307995.png)
