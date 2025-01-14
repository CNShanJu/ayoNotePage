## 响应式布局

根据不同的屏幕尺寸，去设置不同的样式

### css3多媒体查询(@media)

多媒体查询由多种媒体组成，可以包含一个或多个表达式，表达式根据条件是否成立返回 true 或 false。

```css
@media not|only mediatype and (expressions) {
    CSS 代码...;
}

```

#### mediatype的属性值

|   值   |              描述              |
| :----: | :----------------------------: |
|  all   |    用于所有的多媒体类型设备    |
| print  |           用于打印机           |
| screen | 用于电脑屏幕、平板、智能手机等 |
| speech |         用于屏幕阅读器         |

##### 实例

###### 在屏幕可视窗口尺寸小于 480 像素的设备上修改背景颜色:

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"> 
<title>菜鸟教程(runoob.com)</title> 
<style>
body {
    background-color: pink;
}

@media screen and (max-width: 480px) {
    body {
        background-color: lightgreen;
    }
}
</style>
</head>
<body>

<h1>重置浏览器窗口查看效果！</h1>
<p>如果媒体类型屏幕的可视窗口宽度小于 480 px ，背景颜色将改变。</p>

</body>
</html>
```

###### 在屏幕可视窗口尺寸大于 480 像素时将菜单浮动到页面左侧

```html
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta charset="utf-8"> 
<title>菜鸟教程(runoob.com)</title> 
<style>
div.example {
  background-color: yellow;
  padding: 20px;
}

@media screen and (max-width: 600px) {
  div.example {
    display: none;
  }
}
</style>
</head>
<body>

<h2>屏幕可视尺寸小于 600 px 时，隐藏以下元素。</h2>

<div class="example">我是会隐藏的元素。</div>

<p>重置浏览器大小，查看效果。</p>

</body>
</html>


```

## BootStrap

前端的开发的框架，基于html css js，<font title="blue">响应原理基于css3的媒体查询</font>，不管你的屏幕有多大，它都把你的屏幕分成12列

### 为什么要学习

1. 方便、内置组件
2. 开源（免费）
3. 兼容性好，主流浏览器都支持



