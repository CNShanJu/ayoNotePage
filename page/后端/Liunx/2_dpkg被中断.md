当你在运行 `sudo apt-get upgrade` 时遇到 “E: dpkg 被中断，您必须手工运行 ‘sudo dpkg --configure -a’” 的错误，说明系统的包管理器出现了问题，需要手动修复。请按照以下步骤操作：

### 1. 运行 dpkg 命令

打开终端并输入以下命令：

```
sudo dpkg --configure -a
```

这个命令会尝试配置所有未完成的安装或设置。

### 2. 检查是否有锁文件

如果上一步仍然无法解决问题，可能是因为有锁文件存在。你可以检查并删除这些锁文件：

```
sudo rm /var/lib/dpkg/lock
sudo rm /var/lib/dpkg/lock-frontend
```

### 3. 清理未完成的安装

接下来，运行以下命令来清理未完成的包：

```
sudo apt-get install -f
```

这个命令将会尝试修复依赖关系并安装缺失的包。

### 4. 更新和升级

完成上述步骤后，你可以再次更新和升级你的系统：

```
sudo apt-get update
sudo apt-get upgrade
```

### 5. 重启

如果一切顺利，建议重启系统以确保所有更改生效：

```
sudo reboot
```

