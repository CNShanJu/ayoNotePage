# VMware和VirtuaBox之间虚拟机相互转换

 VirtualBox 和 VMware 使用不同的虚拟机格式，不过他们都支持标准的开放式[虚拟化](https://so.csdn.net/so/search?q=虚拟化&spm=1001.2101.3001.7020)格式。将已经存在的虚拟机转换为 OVF/OVA 格式就可以导入其他的虚拟机程序。

### 导出VMware中的虚拟机

- 导出开放式格式.ovf的虚拟机

![image](img/VMware和VirtuaBox之间虚拟机相互转换/91de4163fdc33408e69e35ec360af6b1.jpeg)

![image.png](img/VMware和VirtuaBox之间虚拟机相互转换/8c569d250d93885b89c347f572f55e4f.png)

- 至此导出操作完成

![image.png](img/VMware和VirtuaBox之间虚拟机相互转换/46eebeb37fced6a4ea0eee1bfa3ccda8.png)

### 导入虚拟机到VirtualBox

- 将.ovf格式的虚拟机导入到VirtualBox中

![image](img/VMware和VirtuaBox之间虚拟机相互转换/f928a0eda7f81f14155f346cb125ddc3.jpeg)

![image](img/VMware和VirtuaBox之间虚拟机相互转换/28fd917f2667bb1462788d01b04b0d9a.jpeg)

![image](img/VMware和VirtuaBox之间虚拟机相互转换/3f22abfa01c6bec138be1dfb453faf68.jpeg)

#### 问题记录

##### 网络问题

**桥接模式**

- 迁移完成后，打开虚拟机，执行ifconfig命令发现网卡名称与我们配置的网卡名称不一致，最简单的解决办法是重命名我们配置的网卡信息与ifconfig中的名称一致即可。

**NAT模式**

- VirtualBox如果实现VM Ware中的访问模式，需要配置两个网卡，将当前的网卡指定为（host-only）模式，在新建一个nat网卡即可。

### VirtualBox转化为VMware

使用Virtualbox转化就简单很多了，可以直接导出。

前提：

 虚拟机处于关机状态。

转化：

###### 1.确定关机状态

![外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-dc5iuRKn-1622539852458)](img/VMware和VirtuaBox之间虚拟机相互转换/df184777e4bac37928aec146800a74e3.png)

显示为关机。

###### 2.选择导出虚拟机

![image-20210601110819242](img/VMware和VirtuaBox之间虚拟机相互转换/7f07a70828af0e8701034054e15fc83d.png)

![image-20210601111023628](img/VMware和VirtuaBox之间虚拟机相互转换/5c54225b4f1c14fc34608c1d35fcd5f0.png)

###### 3.使用VMware找到文件打开即可
