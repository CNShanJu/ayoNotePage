# git如何撤销commit(未push) 

## 撤销

**撤销`commit`一般用`git reset` ，语法如下：**

```java
git reset [ --mixed | --soft | --hard] [<commit ID>]
```

---

- 1.使用参数`--mixed`(默认参数)，如

```cmd
git reset --mixed <commit ID>或git reset <commit ID>
```

撤销`git commit`，撤销`git add`，`保留`编辑器改动代码

- 2.使用参数--soft，如

```git
git reset --soft<commit ID> 
```

撤销`git commit`，不撤销`git add`，`保留`编辑器改动代码

- 3.使用参数--hard，如

```cmd
#此方式非常暴力，全部撤销，慎用
git reset --hard <commit ID>
```

撤销`git commit`，撤销`git add`，`删除`编辑器改动代码

---

## 示例：

输入`git log`，我们可以看到最近的3次提交，最近一次提交是test3，最早的一次是test1，其中一大串`黄色的字母`是`commit id`（版本号）

![img](img/5_git如何撤销commit(未push)/278431-20191010194655520-566944916.png)

如果嫌输出信息太多，可加上`--pretty=oneline`参数，即 

```cmd
git log --pretty=oneline
```

![img](img/5_git如何撤销commit(未push)/278431-20191010194703860-553236175.png)

接下来，按下键盘上的`字母q`退出git日志，准备进行撤销commit

Git必须知道`当前版本`是哪个版本，在Git中，用`HEAD表示`当前版本，也就是`最新的提交commit id`，上一个版本就是`HEAD^`(或者`HEAD~1`)，上上一个版本就是`HEAD^^`(或者`HEAD~2`)，同理`往上N个版本`写`N个^`不太现实，我们写成`HEAD~100`。

现在，我们要把当前版本test3上一个版本test2，就可以使用`git reset`命令：`git reset --mixed HEAD^`，再查看日志，发现已经剩下2个commit版本了

```cmd
git reset --mixed HEAD^
```

![img](img/5_git如何撤销commit(未push)/278431-20191010194713614-1675123421-17053873597464.png)

最新的那个版本test3已经看不到了，此时你想起有一行代码写得很好，想回到test3版本看下，怎么做？

办法其实还是有的，**只要上面的命令行窗口还没有被关掉，记录还是在**，使用命令`git reset --mixed commit_id可以回退到指定的版本，比如当前例子，我们`找到那个test3的commit id是e09af7ae711e2a79c15144c1e792fb2e27d201ff，然后输入下面指令就回来了

```cmd
git reset --mixed e09af7ae711e2a79c15144c1e792fb2e27d201ff
```

![img](img/5_git如何撤销commit(未push)/278431-20191010194713614-1675123421-17053873597464.png)

版本号可以不用写全，输入前4位或更多也是可以，Git会自动去找，不能只写前一两位，因为Git可能会找到多个版本号。比如，看完test3版本的代码后，现在想回退到最初test1版本，`我们`找到那个test1的commit id是ab7b0c2b6e10a20d524156a81f6d4bc15a4ea7f3，然后输入下面指令就回来了

```cmd
git reset --mixed ab7b
```

![img](img/5_git如何撤销commit(未push)/278431-20191010194727322-2061097830.png)

最后在Git中，总是有后悔药可以吃的，Git提供了一个命令`git reflog`用来记录你的每一次命令，通过它可以查到每个`commit id`，方便你前进或者回退到指定的版本

![img](img/5_git如何撤销commit(未push)/278431-20191010194733475-658883648.png)
