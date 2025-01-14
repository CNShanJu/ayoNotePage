# Git安装教程

## 一、前言

最近新买了一台 LG Gram，电脑空荡荡的，啥都得重头装，记录一下 Git 的安装过程，温习温习。

## 二、Git 的安装

### 2.1 Git 的下载

这个就需要去 Git 官网下载对应系统的软件了，下载地址为 [git-scm.com](https://git-scm.com/)或者[gitforwindows.org](http://gitforwindows.org/)
上面的 `git-scm` 是 `Git 的官方`，里面有`不同系统不同平台`的安装包和源代码，而 `gitforwindows.org `里`只有 windows 系统`的安装包



### 2.2 Git 的安装

我下载的版本是 `Git-2.31.1-64-bit.exe`  `Git-2.35.1.2-64-bit.exe`，接下来我们就对这个版本进行安装工作。

---

#### 2.2.1 使用许可声明

双击下载后的 `Git-2.31.1-64-bit.exe` `Git-2.35.1.2-64-bit.exe`，开始安装，这个界面主要展示了 GPL 第 2 版协议1的内容，点击 [next] 到第二步。

![img](1_1_git安装/1.png)

---

#### 2.2.2 选择安装目录

可点击 “Browse…” 更换目录，也可直接在方框里面改，我一般直接将 “C” 改为 “D”，这样就直接安装在 D 盘里了。点击 [next] 到第三步。

![在这里插入图片描述](1_1_git安装/2.png)

---

#### 2.2.3 选择安装组件

图中这些英文都比较简单，我已经把大概意思翻译出来了，大家根据自己的需要选择勾选。点击 [next] 到第四步。

![在这里插入图片描述](1_1_git安装/3.png)

`注：最后一个选项打勾的话，需要下载 Windows Terminal 配合 Git Bash使用`，如图：

![在这里插入图片描述](1_1_git安装/4.png)

---

#### 2.2.4 选择开始菜单文件夹

方框内 Git 可改为其他名字，也可点击 “`Browse...`” 选择其他文件夹或者给"`Don't create a Start Menu folder`" 打勾不要文件夹，点击 [next] 到第五步。

![在这里插入图片描述](1_1_git安装/5.png)

安装成功后在开始菜单里的图如下：

![在这里插入图片描述](1_1_git安装/6.png)

---

#### 2.2.5 选择 Git 默认编辑器

Git 安装程序里面内置了 10 种编辑器供你挑选，比如 Atom、Notepad、Notepad++、Sublime Text、Visual Studio Code、Vim 等等，默认的是 Vim ，选择 Vim 后可以直接进行到下一步，但是 Vim 是纯命令行，操作有点难度，需要学习。如果选其他编辑器，则还需要去其官网安装后才能进行下一步。


下图为默认编辑器 Vim.可直接点击 [next] 到第六步。


![在这里插入图片描述](1_1_git安装/7.png)

如果你不想用 `Vim` 当默认编辑器，换一个，比如 `Notepad++` ，那么你者需要点击下面的蓝色字体 " Notepad++ " 去其官网下载安装好才能进行下一步 [next].

![在这里插入图片描述](1_1_git安装/8.png)

安装后还要配置在`我的电脑->属性->高级系统设置->高级->环境变量->系统变量->Path->编辑添加` Notepad++ 的安装地址，如 **`C:\Program Files\notepad++`**.
这样才能在 Git Bash 里面直接调用 Notepad++.

```js
notepad++ 文件名.后缀  //在 git bash 调用 notepad++ 打开文件
```

新手建议使用 `Notepad++` 、`Sublime Text`，这两个比 Windows 自带的记事本功能多太多了。点击 [next] 到第六步。

---

#### 2.2.6 决定初始化新项目(仓库)的主干名字

第一种是让 Git 自己选择，名字是 `master` ，但是未来也有可能会改为其他名字；第二种是我们自行决定，默认是 `main`，当然，你也可以改为其他的名字。一般默认第一种，点击 [next] 到第七步。

> 注： 第二个选项下面有个 NEW！ ，说很多团队已经重命名他们的默认主干名为 main . 这是因为2020 年非裔男子乔治·弗洛伊德因白人警察暴力执法惨死而掀起的 Black Lives Matter(黑人的命也是命)运动，很多人认为 master 不尊重黑人，呼吁改为 main.

![在这里插入图片描述](1_1_git安装/9.png)

---

#### 2.2.7 调整你的 path 环境变量

![在这里插入图片描述](1_1_git安装/10.png)

翻译如下：

```shell
Use Git from Git Bash only 
This is the most cautious choice as your PATH will not be modified at all. You w only be able to use the Git command line tools from Git Bash.
#仅从 Git Bash 使用 Git
#这是最谨慎的选择，因为您的 PATH 根本不会被修改。您将只能使用 Git Bash 中的 Git 命令行工具。


Git from the command line and also from 3rd-party software
(Recommended) This option adds only some minimal Git wrappers to your PATH to avoid cluttering your environment with optional Unix tools.
You will be able to use Git from Git Bash, the Command Prompt and the Windov PowerShell as well as any third-party software looking for Git in PATH.
#从命令行以及第三方软件进行 Git
#（推荐）此选项仅将一些最小的 Git 包装器添加到PATH中，以避免使用可选的 Unix 工具使环境混乱。
#您将能够使用 Git Bash 中的 Git，命令提示符和 Windov PowerShell 以及在 PATH 中寻找 Git 的任何#第三方软件。


Use Git and optional Unix tools from the Command Prompt 
Both Git and the optional Unix tools will be added to your PATH.
Warning: This will override Windows tools like "find"and "sort". Only use this option if you understand the implications.
#使用命令提示符中的 Git 和可选的 Unix 工具
#Git 和可选的 Unix 工具都将添加到您的 PATH 中。
#警告：这将覆盖 Windows 工具，例如 "find" and "sort". 仅在了解其含义后使用此选项。

```

第一种是`仅从 Git Bash 使用 Git`。这个的意思就是你只能通过 Git 安装后的 Git Bash 来使用 Git ，其他的什么命令提示符啊等第三方软件都不行。

第二种是`从命令行以及第三方软件进行 Git`。这个就是在第一种基础上进行第三方支持，你将能够从 `Git Bash`，`命令提示符(cmd)` 和 `Windows PowerShell` 以及`可以从 Windows 系统环境变量中寻找 Git` 的任何第三方软件中使用 Git。推荐使用这个。

第三种是`从命令提示符使用 Git 和可选的 Unix 工具`。选择这种将覆盖 Windows 工具，如 “ find 和 sort ”。只有在了解其含义后才使用此选项。一句话，适合比较懂的人折腾。

---

#### 2.2.8 选择 SSH 执行文件

![在这里插入图片描述](1_1_git安装/11.png)

翻译如下：

```sh
Use bundled OpenSSH 
This uses ssh. exe that comes with Git.
#使用捆绑的 OpenSSH
#这使用的 ssh.exe 是 Git 自带的 


Use (Tortoise) Plink 
To use PuTTY, specify the path to an existing copy of (Tortoise) Plink.exe
Set ssh. variant for Tortoise Plink 
#使用 TortoisePlink (注，这是一个软件)
#要使用 PuTTY，请指定 TortoisePlink.exe 的现有副本的路径
#为 TortoisePlink 设置 ssh.variant

Use external OpenSSH 
NEW! This uses an external ssh. exe. Git will not install its own OpenSSH
(and related) binaries but use them as found on the PATH.
#使用外部 OpenSSH
#新！这使用外部 ssh.exe 文件。 
#Git 不会安装自己的 OpenSSH（和相关）二进制文件，而是使用在环境变量 PATH 中找到的它们。

```

> 注：这是一个新功能，我 2021-4-17 安装的 2.31.1 版本并没有这个选项，先按默认的来吧，先填个坑，有机会再补充

---

#### 2.2.9 选择HTTPS后端传输

![在这里插入图片描述](1_1_git安装/12.png)

翻译如下：

```shell
use the OpenSSL library 
Server certificates will be validated using the ca-bundle. crt file.
#使用 OpenSSL 库
#服务器证书将使用 ca-bundle.crt 文件进行验证。
	
Use the native Windows Secure Channel library 
Server certificates will be validated using Windows Certificate Stores.
This option also allows you to use your company's internal Root CA certificates distributed e.g. via Active Directory Domain Services.
#使用本机 Windows 安全通道库
#服务器证书将使用 Windows 证书存储进行验证。
#此选项还允许您使用公司内部分发的内部根 CA 证书，例如通过 Active Directory 域服务。
```

这两种选项有什么区别呢？

来自https://stackoverflow.com/questions/62456484/whats-the-difference-between-openssl-and-the-native-windows-secure-channel-libr

> 如果在具有企业管理证书的组织中使用 Git，则将需要使用安全通道。如果你仅使用 Git 来访问公共存储库（例如 GitHub ），或者你的组织不管理自己的证书，那么使用 SSL 后端（它们只是同一协议的不同实现）就可以了。
>

也就是说，作为普通用户，只是用 Git 来访问 Github、GitLab 等网站，选择前者就行了。点击 [next] 到第十步。


---

#### 2.2.10 配置行尾符号转换

![在这里插入图片描述](1_1_git安装/13.png)

```shell
Checkout Windows-style, commit Unix-style line endings 
Git will convert LF to CRLF when checking out text files. 
When committing text files, CRLF will be converted to LF. For cross-platform projects, this is the recommended setting on Windows("core. autocrif"is set to "true").
#签出 Windows 样式，提交 Unix 样式的行结尾
#Git 签出文本文件时，会将 LF 转换为 CRLF。
#提交文本文件时，CRLF 将转换为 LF。
#对于跨平台项目，这是 Windows 上的建议设置（"core.autocrif" 设置为 "true"）。

Checkout as-is, commit Unix-style line endings 
Git will not perform any conversion when checking out text files. 
When committing text files, CRLF will be converted to LF. For cross-platform projects, this is the recommended setting on Unix("core.autocrif" is set to "input").
#按原样签出，提交 Unix 样式的行结尾
#Git 在签出文本文件时不会执行任何转换。提交文本文件时，CRLF 将转换为 LF。
#对于跨平台项目，这是在 Unix 上的建议设置（"core.autocrif" 设置为 "input"）。

Checkout as-is, commit as-is 
Git will not perform any conversions when checking out or committing text files. 
Choosing this option is not recommended for cross-platform projects("core. autocrif"is set to "false").
#按原样签出，按原样提交
#Git 在签出或提交文本文件时不会执行任何转换。
#不建议跨平台项目选择此选项（"core.autocrif" 设置为 "false"）。
```

这三种选择分别是：
`签出 Windows 样式，提交 Unix 样式的行结尾。`
`按原样签出，提交Unix样式的行结尾。`
`按原样签出，按原样提交。`



那 Windows 样式和 Unix 样式到底有什么区别呢？

引用 《[GitHub 入门与实践](https://book.douban.com/subject/26462816/)》 第 50 页内容[2](https://blog.csdn.net/mukes/article/details/115693833#fn2)

> GitHub 中公开的代码大部分都是以 Mac 或 Linux 中的 LF（Line Feed）换行。然而，由于 Windows 中是以 CRLF（Carriage Return+ Line Feed）换行的，所以在非对应的编辑器中将不能正常显示。
>
> Git 可以通过设置自动转换这些换行符。使用 Windows 环境的各位，请选择推荐的 “Checkout Windows-style，commit Unix-style line endings” 选项。换行符在签出时会自动转换为 CRLF，在提交时则会自动转换为 LF .

上面说 Mac 、Linux、Unix 的 Line Feed ，翻译过来就是换行符，用 “\n” 表示，换行符 “\n” 的 ASCII 值为10；
Windows 的是 Carriage Return+ Line Feed（回车+换行），用 “\r\n” 表示，回车符 “\r” 的 ASCII 值为13；

这上下两者是不一样的。
所以这就需要转换了，至于为什么选第一项？这还用问吗？`我们现在的教程就是介绍怎么安装 Windows 版 Git，肯定选第一项啦。`

至于 “回车”（carriage return）和 “换行”（line feed）这两个概念的来历和区别？
引用一下 [阮一峰老师博客的部分内容](http://www.ruanyifeng.com/blog/2006/04/post_213.html)

> 在计算机还没有出现之前，有一种叫做电传打字机（Teletype Model 33）的玩意，每秒钟可以打 10 个字符。但是它有一个问题，就是打字机打完一行换行的时候，要用去 0.2 秒，正好可以打两个字符。要是在这 0.2 秒里面，又有新的字符传过来，那么这个字符将丢失。
> 于是，研制人员想了个办法解决这个问题，就是在每行后面加两个表示结束的字符。一个叫做 "回车"，告诉打字机把打印头定位在左边界；另一个叫做 "换行"，告诉打字机把纸向下移一行。

更多资料参考：

1. 腾讯云 - 换行符 ‘\n’ 和 回车符 ‘\r’ 的区别？[https://cloud.tencent.com/developer/article/1353286]
2. 知乎 - 为什么会用 \r\n 两个字符表示换行？[https://www.zhihu.com/question/29326647]
3. Stackoverflow - What are carriage return, linefeed, and form feed?[https://stackoverflow.com/questions/3091524/what-are-carriage-return-linefeed-and-form-feed]



点击 [next] 到第十一步。

---

#### 2.2.11 配置终端模拟器以与 Git Bash 一起使用

![在这里插入图片描述](1_1_git安装/14.png)

```shell
Use MinTTY(the default terminal of MSYS2) 
Git Bash will use MinTTY as terminal emulator, which sports a resizable window
non-rectangular selections and a Unicode font.Windows console programs(such
as interactive Python) must be launched via 'winpty' to work in MinTTY.
#使用 MinTTY（MSYS2的默认终端）
#Git Bash 将使用 MinTTY 作为终端仿真器，该仿真器具有可调整大小的窗口非矩形选择和 Unicode 字体。
#Windows 控制台程序（例如交互式 Python）必须通过 "winpty" 启动才能在 MinTTY 中运行。

Use Windows' default console 
window Git will use the default console window of Windows("cmd.exe"), which works v
with Win32 console programs such as interactive Python or node. js, but has a
very limited default scroll-back,needs to be configured to use a Unicode font in 
order to display non-ASCII characters correctly, and prior to Windows 10 its 
window was not freely resizable and it only allowed rectangular text selections.<br>
#使用 Windows 的默认控制台窗口
#Git 将使用 Windows 的默认控制台窗口（"cmd.exe"），该窗口可与 Win32 控制台程序（例如交互式Python 或 
#node.js）一起使用，但默认回滚非常有限，需要将其配置为使用 Unicode 字体才能正确显示非 ASCII 字符，并且在 
#Windows 10 之前，其窗口不可随意调整大小，并且仅允许选择矩形文本。
```

建议选择第一种，`MinTTY 3`功能比 `cmd `多，cmd 只不过 比 MinTTY 更适合处理 Windows 的一些接口问题，这个对 Git 用处不大，除此之外 Windows 的默认控制台窗口（cmd）有很多劣势，比如 cmd 具有非常有限的默认历史记录回滚堆栈和糟糕的字体编码等等。
相比之下，MinTTY 具有可调整大小的窗口和其他有用的可配置选项，可以通过右键单击的工具栏来打开它们 git-bash 。点击 [next] 到第十二步。

---

#### 2.2.12 选择默认的 “git pull” 行为

![在这里插入图片描述](1_1_git安装/15.png)

```shell
ODefault(fast-forward or merge)
This is the standard behavior ofgit pull": fast-forward the current branch to 
the fetched branch when possible, otherwise create a merge commit.
#默认（快进或合并）
#这是 "git pull" 的标准行为：在可能的情况下将 当前分支 快进到 获取的分支，否则创建合并提交。

ORebase Rebase the current branch onto the fetched branch. If there are no local 
commits to rebase, this is equivalent to a fast-forward.
#变基将当前分支变基到获取的分支上。如果没有本地提交要变基，则等同于快进。

Oonly ever fast-forward 
Fast-forward to the fetched branch. Fail if that is not possible.
#只能快进快进到获取的分支。如果不可能，则失败。
```

“`git pull`” 是什么意思呢？
git pull 就是获取最新的远程仓库分支到本地，并与本地分支合并

上面给了三个 “git pull” 的行为：

第一个是 `merge`
第二个是 `rebase`
第三个是 `直接获取`

第一种 `git pull = git fetch + git merge`
第二种 `git pull = git fetch + git rebase`
第三种 `git pull = git fetch` ？(这个没试过，纯属猜测

一般默认选择第一项，`git rebase` 绝大部分程序员都用不好或者不懂，而且风险很大，但是很多会用的人也很推崇，但是用不好就是灾难。

`git pull` 只是拉取远程分支并与本地分支合并，而 `git fetch` 只是拉取远程分支，怎么合并，选择 `merge` 还是 `rebase` ，可以再做选择。

更多参考资料：

1. 知乎 - git pull 和 git fetch 的区别？ [https://www.zhihu.com/question/38305012]
2. 知乎 - 在开发过程中使用 git rebase 还是 git merge，优缺点分别是什么？ [https://www.zhihu.com/question/36509119]
3. Stackoverflow - Why does git perform fast-forward merges by default? [https://stackoverflow.com/questions/2850369]
4. Stackoverflow - In git how is fetch different than pull and how is merge different than rebase? [https://stackoverflow.com/questions/14894768/]
5. Stackoverflow - Difference between git pull and git pull --rebase [https://stackoverflow.com/questions/18930527]

---

#### 2.2.13 选择一个凭证帮助程序

![在这里插入图片描述](1_1_git安装/16.png)

```shell
Git Credential Manager 
Use the cross-platform Git Credential Manager.
See more information about the future of Git Credential Manager here.
#Git 凭证管理
#使用跨平台的 Git  凭证管理。
#在此处查看有关 Git 凭证管理未来的更多信息。

None 
Do not use a credential helper.
#不使用凭证助手。
```

一共两个选项：
`Git 凭证管理`
`不使用凭证助手`

第一个选项是提供登录凭证帮助的，Git 有时需要用户的凭据才能执行操作；例如，可能需要输入用户名和密码才能通过 HTTP 访问远程存储库（GitHub，GItLab 等等）。

登录图如下(属于第一个选项的，老图了)，来自https://segmentfault.com/q/1010000011171685
![在这里插入图片描述](1_1_git安装/17.png)

更多参考资料：

1. Stackoverflow - Is Control Panel’s Credential Manager same as git’s credential helpers Credential Manager and Credential manager Core? [https://stackoverflow.com/questions/66795897]
2. GitHub - Git Credential Manager Core [https://github.com/microsoft/Git-Credential-Manager-Core]
3. GitHub - Git Credential Manager Core Core FAQ [https://github.com/microsoft/Git-Credential-Manager-Core/blob/master/docs/faq.md#about-the-project]
4. Git 官网文档 - https://git-scm.com/docs/gitcredentials [https://git-scm.com/docs/gitcredentials]
   `注：资料链接建议不用看，这个本来三个选项的，不知因何回退成两个选项了，原本的那个新选项被取消了`

点击 [next] 进到十四步。

---

#### 2.2.14 配置额外的选项

![在这里插入图片描述](1_1_git安装/18.png)

```shell
Enable file system caching 
File system data will be read in bulk and cached in memory for certain operations("core.fscache" is set to "true"). 
This provides a significant performance boost.
#启用文件系统缓存
#将批量读取文件系统数据并将其缓存在内存中以进行某些操作（"core.fscache” 设置为 "true"）。
#这可以显着提高性能。


Enable symbolic links 
Enable symbolic links(requires the SeCreateSymbolicLink permission).
Please note that existing repositories are unaffected by this setting.
#启用符号链接
#启用符号链接（需要SeCreateSymbolicLink权限）。
#请注意，现有存储库不受此设置的影响。
```

有两个选项：
`启用文件系统缓存`
`启用符号链接`

`启用文件系统缓存`就是将批量读取文件系统数据并将其缓存在内存中以进行某些操作，可以显著提升性能。这个选项默认开启。
`启用符号链接` ，符号链接是一类特殊的文件， 其包含有一条以绝对路径或者相对路径的形式指向其它文件或者目录的`引用`，类似于 Windows 的快捷方式，不完全等同 类Unix（如 Linux） 下的 符号链接。因为该功能的支持需要一些条件，所以默认不开启。

更多关于 “符号链接” 参考资料：

1. GitHub - Symbolic-Links [https://github.com/git-for-windows/git/wiki/Symbolic-Links]
2. Stackoverflow - How does Git handle symbolic links? [https://stackoverflow.com/questions/954560/]
3. Stackoverflow - What is the difference between NTFS Junction Points and Symbolic Links? [https://stackoverflow.com/questions/9042542/]

点击 [next] 到第十五步。

---

#### 2.2.15 配置实验性选项

![在这里插入图片描述](1_1_git安装/19.png)

```shell
Enable experimental support for pseudo consoles.
(NEW!) This allows running native console programs like Node or Python in a Git Bash window without using winpty, 
but it still has known bugs.
#启用对伪控制台的实验性支持。
#(新功能!) 这允许在不使用 winpty 的情况下在 Git Bash 窗口中运行诸如 Node 或 Python 之类的本机控制台程序，
#但是它仍然存在已知的 bug。

Enable experimental built-in file system monitor
(NEW!) Automatically run a built-in file system watcher, to speed up common operations such as ' git status', ' git add', ' git commit', etc in worktrees containing many files.
#启用实验性内置文件系统监视器
#（新！）自动运行内置文件系统监视器，以加快包含许多文件的工作树中的常见操作，例如 'git status'、'git add'、'git commit' 等.
```

这是实验性功能，可能会有一些小错误之类的，建议不用开启。
点击 [install] 进行安装。
…
…
…
`安装成功`

![在这里插入图片描述](1_1_git安装/20.png)

---

### 2.3 Git 的功能介绍

这是安装成功后开始菜单里面的图。

![在这里插入图片描述](1_1_git安装/21.png)

有 `Git Bash`、`Git CMD`、`Git FAQs`、`Git GUI`、`Git Release Note`，下面我们就分别介绍一下这几个。

---

#### 2.3.1 Git Bash

`Git Bash` 是基于CMD的，在CMD的基础上增添一些新的命令与功能，平时主要用这个，功能很丰富，长这样：

![在这里插入图片描述](1_1_git安装/22.png)

---

#### 2.3.2 Git CMD

`Git CMD` 不能说和 cmd 完全一样，只能说一模一样，功能少得可怜，两者如下图：

![在这里插入图片描述](1_1_git安装/23.png)

---

#### 2.3.3 Git FAQs

`Git FAQs` 就是 Git Frequently Asked Questions（常问问题），访问地址：https://github.com/git-for-windows/git/wiki/FAQ

---

#### 2.3.4 Git GUI

`Git GUI` 就是 Git 的图形化界面，如下图：

![在这里插入图片描述](1_1_git安装/24.png)

可以通过它快速`创建新仓库（项目），克隆存在的仓库（项目），打开存在的仓库（仓库）`。

---

#### 2.3.4 Git Release Note

`Git Release Note` 就是版本说明，增加了什么功能，修复了什么 bug 之类的。



## 三、配置全局用户信息

安装完成后，`右键`打开`菜单栏`找到“Git”->“`Git Bash`”，蹦出一个类似`命令行窗口`的东西，就说明Git安装成功！

安装完成后，还需要最后一步设置，在命令行输入：

```shell
git config --global user.name "Your Name" 
git config --global user.email "email@example.com" 
```

备注：以上两步的名字和邮箱可随意配置，但最好使用自己的邮箱。

```shell
git config user.name 用于查看配置的姓名
git config user.email 用于查看配置的邮箱
```

因为Git是分布式版本控制系统，所以每个机器都必须自报家门：你的名字和Email地址。

## 四、windows上生成/添加SSH公钥

==这里使用的远程仓库是 `gitee`的==

> 在Git Bash内执行 `cd ~/.ssh` 命令，如果存在该目录，表明之前生成果SSH Key,**跳第四步**
>
> ![img](1_1_git安装图片/Center.jpeg)
>
> 在`~/.ssh`目录下有 `id_rsa`和 `id_rsa.pub`两个文件，其中`id_rsa.pub`文件里存放的即是`公钥key`。

1. 在桌面上点击右键选择`Git Bash Here`进入中端。

2. 执行以下命令

   ```shell
   #xxx@qq.com里面填自己的邮箱
   ssh-keygen -t rsa -C "xxx@qq.com"
   ```

3. 然后按**三次回车**

   ![在这里插入图片描述](1_1_git安装图片/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAQ29uY2lzaW9uLg==,size_20,color_FFFFFF,t_70,g_se,x_16.png)

4. 执行命令`cat ~/.ssh/id_rsa.pub`，得到`公钥`

   ```shell
   cat ~/.ssh/id_rsa.pub
   ```

   ![在这里插入图片描述](1_1_git安装图片/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAQ29uY2lzaW9uLg==,size_20,color_FFFFFF,t_70,g_se,x_16-16601969464222.png)

### 码云使用公钥 

1. 进入`gitee`，把**公钥**复制进去（标题会自动生成为邮箱），然后确定。

   ![在这里插入图片描述](1_1_git安装图片/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAQ29uY2lzaW9uLg==,size_20,color_FFFFFF,t_70,g_se,x_16-16601969980764.png)

2. 添加后，在终端（Terminal）中输入

   ```shell
   ssh -T git@gitee.com
   ```

3. **首次使用**需要确认并**添加主机到本机SSH可信列表**。若返回 Hi XXX! You’ve successfully authenticated, but Gitee.com does not provide shell access. 内容，则证明添加成功。

   ![在这里插入图片描述](1_1_git安装图片/3f87b28d384346e897cff9b102387d70.png)

4. 如果上一步没有成功，出现如下结果`bash: $'\302\203ssh': command not found`

   ![在这里插入图片描述](1_1_git安装图片/c0bdee367ab049e1a6af6ecf9ea28eaf.png)

   **可能是空格的问题，只需要手动输入一次即可！！！**

### GitHub使用公钥

1. 登录到GitHub，点击右上方的头像，选择settings ，点击Add SSH key，把id_rsa.pub的内容复制到里面即可。

   ​	![img](1_1_git安装图片/Center-16601978872269.jpeg)

   ​	![img](1_1_git安装图片/Center-166019791704311.jpeg)

2. 测试是否配置成功`ssh -T git@github.com`，如图即为配置成功

   ![img](1_1_git安装图片/Center-166019798366013.jpeg)

## 五、Git 优秀教程推荐

1. [廖雪峰 - Git 教程](https://www.liaoxuefeng.com/wiki/896043488029600)  [`访问量: 29656109033，新手必看`]
2. [GitHub 入门与实践](https://wwc.lanzouo.com/i4BWko0gfje) [`密码:7aik，电子书，特别棒的入门书籍`]
3. [git - 简明指南](https://rogerdudler.github.io/git-guide/index.zh.html)   [`图形化模式，简单易懂`]
4. [图解 Git](http://marklodato.github.io/visual-git-guide/index-zh-cn.html)   [`一样是图形化教程`]
5. [Git 的奇技淫巧](https://github.com/521xueweihan/git-tips)  [`GitHub 12.8k stars`]
6. [git-cheatsheeth](https://ndpsoftware.com/git-cheatsheet.html#loc=stas)  [`图形化 Git 命令的作用域`]

