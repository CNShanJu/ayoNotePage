# Java基础

1990年sun microsystems公司开发的内部项目   ===》 OAK,1994年改名为Java，1995年推行

高级编程语言

sun2009年被oracle收购了(74亿美元)



#### Java三个版本：

1. `J2SE`(S: Standard  E:Edition)`基础版`，核心    ====》结算系统、桌面游戏、桌面软件
2. `J2ME`:`移动版`，现在不用了，现在用安卓/ISO（安卓也是Java语言开发的）
3. `J2EE`：`企业版`   ===》大型系统、大型网站



#### 发展历程：

java1.1  --->  java1.2 --->  java1.3 --->  java1.4



**java1.5,为了纪念重大升级：**

1. `J2SE`改名为`JAVA SE`，`J2ME`改名为`JAVA ME`，`J2EE`改名为`JAVA EE`
2. java命名改变 --->   java5、java6、java7、.......



oracle  2017年将J2EE共享给了Eclipse基金会

Eclipse基金会于`2018年`将其`更名`：J2EE  ---> `Jakarta EE(雅加达)`

所有严格意义上来说现在的JavaEE应该叫 雅加达EE



近几年由于其他语言热门程度上来了，为了提高市场竞争力，2018年官方宣布每六个月更新一次。



#### Java是跨平台语言

C/C++是不跨平台的，例如一个游戏，蜘蛛纸牌，对应window、Linux、max，你需要写三份程序语言，每份语言适应于当前系统

Java呢，只需要一次编写，处处运行



==原因：Java在运行前需要安装环境  --->` java虚拟机(JVM)`,即Java所需环境==



好处呢，还是上面那个例子，你只需要写一份蜘蛛纸牌程序，写的时候不需要考虑系统，程序会在虚拟机里运行，虚拟机会自动将Java代码变成当前系统适应的脚本



`Java能够跨平台的原因是是因为JVM不跨平台`，不同系统的JVM支持不同的系统，你下载JVM时会有window版本的JVM，Linux版本的JVM和Mac版本的JVM,不同版本的虚拟机对应不同的系统

就好比你出国旅游有翻译官，法国需要会法语的翻译官，俄国需要会俄语的翻译官，翻译官会把你说的话翻译成当地的语言，以便你在旅游期间的正常的交流



`由此可知Java开发三大步：`

1. 写代码java代码
2. 编译成class文件
3. 执行class文件



`JVM`(java virtual machine):==Java虚拟机==

`JRE`(java runtime environment)：==JVM + 核心类库==     ===》 只能运行Java程序，但不能开发

`JDK`(java development kit): ==jre + 运行环境工具==          ===》 即能运行Java程序，也能开发

jvm < jre < jdk



#### **开发人员需要下载并安装JDK**

##### 下载

jdk版本建议   ----》  `jdk_8u192`及以前版本  (免费)

原因：oracle从2019.1月以后的java版本  将进行收费，在其收费之前最新的版本是jdk_8u192，一般在学习前 用`jdk_8u192`及以前版本就可以了，90%功能都能实现，之后的版本添加的新特性并不影响平时开发使用。



##### 安装

具体过程可以自己百度一下。。。。

==注意：==

1. 安装目录只能有英文、数字或者下划线，其他都不写(例如：汉字、特殊符号、空格)，如果出现可能会出错
2. 一般安装JDK过程中会安装两遍，第一遍安装JDK，第二遍安装JRE,由于JDK内包含了JRE，所有第一遍安装完成后就可以退出安装了，安装了也没啥问题。



##### 配置环境变量（大小写不区分）

具体过程可以自己百度一下。。。。

`java_home`(需新建)：安装jdk的根目录  

`path`(已存在)：jdk的根目录\bin    ---------------------必须配置

`classpath`(需新建)：.;jdk的根目录\lib   ----------------------叫做java类路径



在配置环境变量时，在`用户变量`和`系统变量`里配置都可以,主要的`区别`是`用户变量里配置只有当前用户可以使用`，`系统变量里配置当前计算机的所有用户都可以使用`(一个操作系统可以拥有多个用户)

注：java语言是区分大小写的



###### 验证

window + R  ==》 cmd  ==》java -version，若出现版本号则表示配置成功

`能验证`的主要原因是环境变量里的`path配置`，`java -version`这个命令会在path的环境变量里一直查找一个叫`java.exe`的可执行文件，根据`jdk的根目录\bin`这个目录找到里面的可执行文件`java.exe`，然后执行它,`-version`表示执行的参数。

`java类路径`需要配置的原因是：Java代码分两部分，一份是自己写的，一份是别人写的，例如入排序、安全、算法等一些常用的功能，别人已经配置好了，配置里的`.`表示自己写的，分号后面写的路径是官方写的常用的一些功能代码存储的位置，需要用到的时候直接调用就行了。



#### Java开发三大步

1. 写代码，文件后缀为`.java`

   > 假设当前文件为  `test.java`  文件目录为`E:\File\work\test.java`
   >
   > ```java
   > public class test1 {
   >     public static void main(String[] args) {
   >         System.out.println("xxxx");//输出语句
   >     }
   > }
   > 
   > //除输出语句，其他语句为固定写法   ====》	语义结构化
   > ```

   

2. 编译为`.class文件`，即字节码文件(相当于二进制，计算机可以直接执行)  === (要编译需

   cmd进入要到当前文件目录里)

   > - cmd进入命令提示符
   >
   > - 当前目录在C盘，文件目录在E盘，不同盘符，通过`e：`回车进入E盘
   >
   > - 在E盘下，通过`cd File`进入下一级目录File(若想回到盘符目录里的上一级，直接`cd ..`返回上一级目录)，也可以直接在当前文件所在的目录位置前加`cmd空格`回车直接进入
   >
   >   ![image-20211231114624807](https://gitee.com/CNsurly/personal-note-drawing-bed/raw/master/Java/%E5%AD%A6%E4%B9%A0%E5%9B%BE/1_java%E5%9F%BA%E7%A1%80+%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/image-20211231114624807.png)
   >
   > - 编译命令 `javac 文件名.java`,即cmd里输入`javac test.java ` 进行编译，编译完成后文件的同目录下会出现同名的字节文件,即`test.class`
   >
   > 

3. 执行编译文件

   > cmd命令`java 文件名`，即`java test`,注意这里不需要后缀名
   >
   > 
   >
   > 即使最后删除了test.java文件，只要test.class还存在，`java 文件名`依然可以输出Hello World，因为程序执行的是编译文件

   

   



##### 实际效果

![image-20211231115644212](https://gitee.com/CNsurly/personal-note-drawing-bed/raw/master/Java/%E5%AD%A6%E4%B9%A0%E5%9B%BE/1_java%E5%9F%BA%E7%A1%80+%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/image-20211231115644212.png)

![image-20211231115851416](https://gitee.com/CNsurly/personal-note-drawing-bed/raw/f6ef5ce7eda1093d3d10f6e1de98a1f288fe01ac/Java/%E5%AD%A6%E4%B9%A0%E5%9B%BE/1_java%E5%9F%BA%E7%A1%80+%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/image-20211231115851416.png)

![image-20211231115940160](https://gitee.com/CNsurly/personal-note-drawing-bed/raw/f6ef5ce7eda1093d3d10f6e1de98a1f288fe01ac/Java/%E5%AD%A6%E4%B9%A0%E5%9B%BE/1_java%E5%9F%BA%E7%A1%80+%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/image-20211231115940160.png)

![image-20211231120105314](E:\Other\Note\Java\java基础\1_0.assets\image-20211231120105314.png)

![image-20211231120416558](https://gitee.com/CNsurly/personal-note-drawing-bed/raw/f6ef5ce7eda1093d3d10f6e1de98a1f288fe01ac/Java/%E5%AD%A6%E4%B9%A0%E5%9B%BE/1_java%E5%9F%BA%E7%A1%80+%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/image-20211231120105314.png)
