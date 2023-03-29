# overflow

```css
#box{
    
    width:100px;   
    height:100px;
    border:1px solid red;
    
    /* 内容超出部分隐藏 */
    overflow: hidden;
}
```

| 属性值  |                             作用                             |
| :-----: | :----------------------------------------------------------: |
| hidden  |               内容超出部分隐藏，`不出现滚动条`               |
| visible |                      对溢出内容不做处理                      |
| scroll  | 隐藏溢出容器的内容，溢出的内容可以通过滚动呈现，`无论内容是否溢出都有滚动条` |
|  auto   | 当内容没有溢出容器时不出现滚动条，当内容溢出容器时出现滚动条，`按需出现滚动条`。textarea元素的overflow默认值就是auto。 |
|  clip   | 与`hidden`一样，`clip`也被用来隐藏溢出容器的内容且不出现滚动条。不同的地方在于，`clip`是一个完全禁止滚动的容器，而`hidden`仍然可以通过编程机制让内容可以滚动。 |

## overflow解决浮动问题

同clear一样，在`浮动元素`的`父元素`里加`overflow：hidden`也可以达到`清浮动`(父元素因子元素浮动造成的高度坍塌)的效果

```html
<ul>
    <li>xxx</li>
    <li>xxx</li>
</ul>
```



```css
li{
    float:left;
}

/* 清浮动1 */
ul::after{
    content:"";
    clear:both;
    display:block;
}

/* 清浮动2 */
ul{
    overflow：hidden;
}
```

