### a标签相关伪类

```html
<a href="#">
	xxxxxx
</a>
```

```css
/* a标签未单击(访问前)的样式 */
a:link{
    
}
/* a标签单击后(被访问)的样式 */
a:visited{
    
}
/* 鼠标悬浮其上时的样式 */
a:hover{
    
}
/* a标签点击时的样式 */
a:active{
    
}

```

<span alt="modern">a标签伪类设置顺序：a:link-->a:visited-->a:hover-->a:active</span>

### 光标的样式

==cursor属性：设置光标的样式==

|  属性值   |                             作用                             |
| :-------: | :----------------------------------------------------------: |
|    url    | 需被使用的自定义光标的URL注释：请在此列表的末端始终定义一种普通的光标，以防没有由 URL 定义的可用光标。 |
| crosshair |                      光标呈现为十字线。                      |
|  pointer  |              光标呈现为指示链接的指针（一只手）              |
|   move    |                  此光标指示某对象可被移动。                  |
|   text    |                       此光标指示文本。                       |
|   wait    |          此光标指示程序正忙（通常是一只表或沙漏）。          |
|   help    |      此光标指示可用的帮助（通常是一个问号或一个气球）。      |



### 去掉ul-->li前的点

==list-style:none;==

