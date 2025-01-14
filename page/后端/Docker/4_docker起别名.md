## 永久设置别名

进入对应的文件内

```shell
vi ~/.bashrc
```

#### 查看运行的镜像别名

```shell
alias dps='docker ps --format "table {{.ID}}\t{{.Image}}\t{{.Ports}}\t{{.Status}}\t{{.Names}}"'
```

- `docker ps` 列出当前运行的 Docker 容器。
- `--format` 选项用于自定义输出格式。
- `table` 指定输出应为表格格式。
- `{{.ID}}`、`{{.Image}}`、`{{.Ports}}`、`{{.Status}}` 和 `{{.Names}}` 是 Docker 容器的各个属性。

#### 查看所以已经安装的镜像

```shell
alias dis='docker images'
```

然后点击ESC键 输入 :wq 来退出

再输入 

```shell
source ~/.bashrc
```

如此 成功修改命令别名
