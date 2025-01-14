# HTML5初级

## 概述：

html5是最新修订的版本，2014年10月份w3c完成标准的制定，`html5设计的目的是为了在移动端设备上支持多媒体`

html4是在html4.0.1之后设计的一个版本



html4.0.1诞生于1999年

大部分主流浏览器都支持html5



## html新增的特性

1. 用于绘画的canvas元素
2. 用于媒体的video audio元素
3. 本地存储
4. 新增了很多的内容元素 artice footer header nav section
5. 新的表单的控件 date  time email url search



## 特点

h5并`不是新的语言`，而是html语言的第五次重大的修订版本，支持所有的主流浏览器

改变了用户和文档的交互的方式：多媒体 video audio canvas

新增了很多的新的特性：语义特性......



### 相较于html4.0.1：

**进步**：抛弃了一些不合格的常用的标记和属性，新增了很多新的标签和属性

从代码的角度而言：html5的网页结构更加的简单



### html5的优势：

html5的`目的是为了在移动端的设备上支持多媒体`，播放媒体文件时无需安装flash等等第三方插件，直接使用video或者audio这些标签就可以播放音频或者视频

### html5的文档结构

`<!DOCTYPE html>` ：声明必须位于html5文档的第一行，说明这个文档属于html5的版本




###  html5中已经移除的元素

**以下是html4.0.1元素在html5中被删除的标签**

<big></big>

font

frame

rameset

strike

applet

## HTML5新增了表单(from)的元素（<input />）

| 新增的表单元素(type) |                  作用                  |
| :------------------: | :------------------------------------: |
|        email         |      定义用于email地址的文本字段       |
|         url          | 用于url的地址输入域，会自动验证url的值 |
|        number        |               只能写数字               |
|        search        |         定义用于搜索的文本字段         |
|         tel          |         定义输入电话号码的字段         |
|         date         |              定义日期字段              |
|        mouth         |            定义日期的字段月            |
|         week         |            定义日期的字段周            |
|         time         |              定义时间字段              |
|    datetime-local    |               本地的时间               |
|        color         |            定义可选的颜色域            |

## input元素的新增的属性

|              |                                                              |
| :----------: | :----------------------------------------------------------: |
|  autofocus   |                  在页面加载时，自动获取焦点                  |
|   required   |                       表单元素不能为空                       |
| height,width |           用于定义image类型的input标签的图像的高宽           |
| min,max,step | 用于包含数字或日期的input类型的规定限定，max属性规定输入域允许的最大值，min规定输入域的最小值，step当点击改变数字时，变化的数字量 |
| placeholder  |                           提示文本                           |

