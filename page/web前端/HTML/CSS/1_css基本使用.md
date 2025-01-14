## 语法格式_选择器



<span style="color:red;">语法：</span>

​	==选择标签(标签/class名/id名){==

​			==css的属性名：属性值，==

​	==}==

```html
<h1>
    行行行
</h1>

<!-- 两个同名id css的样式都会变绿，但是id的唯一性建议同一个页面不能有同名的id -->
<h1 id="hzz">
	窝窝窝
</h1>
<h1 id="hzz">
	可怜
</h1>

<!-- 两个同名class 可以同名-->
<h1 class="hyy">
	撒大声地
</h1>
<h1 class="hyy">
	asdsfa
</h1>

<!-- css样式写在style标签里 style标签一般放在head标签里 -->
<style>
    /* 意思为找到h1标签修改字体颜色为绿色（标签选择器） */
    h1{
        color:red;
    }
    
    /* #表示id，意思为找到id名为hzz的标签修改字体颜色为绿色（id选择器） */
    #hzz{
        color:green;
    }
    
     /* .表示class，意思为找到class名为hyy的标签修改字体颜色为绿色（类选择器） */
    .hyy{
        color:green;
    }
    
    /* *表示通配符(页面所有元素)，意思是将页面所有标签的背景色设为黄色 */
    *{
       background-color:yellow; 
    }
</style>


```



1.`标签选择器`直接作用用HTML标签

2.`id选择器`作用于同名的id 的标签

3.`类选择器`作用于同名的class 的标签

4.`*选择器`（`通配符`）作用于所有的标签



##### css属性名

直接获取页面标签来设置其样式

```css
/* 直接获得页面所有的p标签为其设置样式 */
p{
    /* 文字颜色，值可以用颜色对应的英语单词，也可以用颜色的16位进制，或者RGB形式 */
    color:yellow;
    /* 文字大小 */
    font-size:24px;
    /* 文字的粗细，值可以为数字(100、200、300....900),也可以为bold(600) */
    font-weight:bold;
    /* 字体，优先使用第一个字体*/
    font-family: 黑体,宋体;
}
```

