# CSS样式分类

### 行内样式

样式可以写在标签里面,这样的一种写法叫==行内样式==

```html
<!-- 行内样式只对标签内的内容生效 -->
<h1 style="color:red;font-size:100px">
    小米小红
</h1>
```

### 内部样式

样式写在style标签里我们称作为==内部样式==

```html
<!-- 样式写在style标签里我们称作为内部样式 -->
<style>
    h1{
        color:red;
    }
</style>
```

### 外部样式

样式写在外部css文件里，通过link标签导入，叫做==外部样式==

```html
<!-- index.html文件 -->


<!-- 方法1 -->
<!-- 需要将rel的属性值设置为stylesheet，对浏览器进行声明，否者css样式将不生效 -->
<head>
    <link rel="stylesheet" href="css样式表文件路径">
</head>



<!-- 方法二 -->
<style>
    /*
    	通过@import引入外部样式-->好处是@impot下面还能接着写样式
    	注：@import必须放在最上面位置，否者无效
    */
	@import url("css样式表文件路径");
    
    h1{
        background-color: gold;
    }
</style>
```

```css
/* index.css文件 */
h1{
    color:red;
}
```



## 其他说明

#### 内部样式		

​		一般不建议将样式写在标签里面(遵循代码分离原则)，

​		但在一些情况，像样式比较少，还是能够接受的



#### 内部样式

​		优点：可以写在html文件中

​		缺点：如果样式代码比较多，会导致HTML文件比较大，不利于代码的维护



#### 外部样式

​		外部样式时工作中比较常用的一种方式（代码分离）



#### ==@import与link的区别==

		1. ==link是一个标签，一个html标签==
  		2. ==@import是css2.1版本中的css语法==
  		3. link的兼容性要比@import好，因为@import属于css2.1特有，对于不兼容的css2.1的浏览器来说是无效的
  		4. 使用link标签的css文件会先加载到页面，再进行编译显示
  		5. @import导入的css文件，客户端显示HTML结构，再把css文件加载到网页中