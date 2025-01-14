## hover伪类

作用：当光标移入元素时，该样式才生效

```css
div{
    width:500px;
    height:500px;
    background-color:gold;
    
    /* 过渡 */
    transition:10s;
}

/* 当光标移入时，div花10秒样式变成高100，宽100，颜色为红 */
div:hover{
    width:100px;
    height:100px;
    background-color:red;
}
```

