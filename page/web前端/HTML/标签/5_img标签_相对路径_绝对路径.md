> ### <span style="color:red;">img标签</span>
>
> <span style="color:blue">图片标签，在页面显示一个图片</span>

​					

**语法：**

​					

```html
<img src="图片路径" alt="当图片显示失败时的文字" title="当光标悬浮在图片上时显示的文字" width="设置图片宽度" height="设置图片高度"/>
```



**<span style="font-size:20px;color:red;">ps</span>**：width和height的值可以不带例如px或em的单位，当只设置其中一个属性时，另外一个会自动等比缩放



### <span style="color:red;">相对路径--绝对路径</span>

###### <span style="color:blue">绝对路径：目标文件在硬盘上的真实路径（最精确路径）</span>

举个栗子：找到文件，右键点击后打开属性，我把喜欢的封面'cover1.jpg'储存在了路径_C:\Users\80975\OneDrive\Desktop\cover_
那么C:\Users\80975\OneDrive\Desktop\cover\cover1.jpg 就是绝对路径

```html
<!-- 用 / 或 \ 都可以 -->
<img src="C:\Users\80975\OneDrive\Desktop\cover\cover1.jpg" alt="cover1">
```



###### <span style="color:blue">相对路径：相对于当前文件位置的路径</span>

以下为建立路径所使用的几个特殊符号，及其所代表的意义。

**"<span style="color:red;">./</span>"：代表目前所在的目录。**

**"<span style="color:red;">../</span>"：代表上一层目录。**

**以"<span style="color:red;">/</span>"开头：代表根目录。**



**<span style="color:red;font-size:24px;">优缺点：</span>**

1、**绝对路径的优点**

  A、如果有人抄袭你的网站内容，里面的链接还会指向你的网站，有些抄袭的人比较懒，根本不会去改内容。其实也不局限于被抄袭，如果有人将你的网页保存到本地电脑中，里面的链接、图片、css、以及js仍然会连接到你的网站。

  B、如果网页位置改变，里面的链接还是指向正确的URL。

2、**绝对路径的缺点**：

  A、在编码编写时不方便使用绝对路径，因为链接应该指向真正的域名而不是开发站点。

 

*<u>相对路径的优缺点和绝对路径几乎相反</u>*。

3、**相对路径的优点**：

  A、容易移动内容，可以整个目录移动。

  B、测试方法比较灵活，本机测试时比较方便。

 

4、**相对路径的缺点**：

  A、部分内容页面换了位置时，链接容易失效。

  B、容易被人大面积采集抄袭。