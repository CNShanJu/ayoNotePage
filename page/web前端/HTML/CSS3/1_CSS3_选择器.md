# CSS3

css3是css2升级的版本，它在css2上的基础上增加了很多强大的功能，主流浏览器都支持css3

|  前缀   | 让其兼容的浏览器 |
| :-----: | :--------------: |
| -webkit |  chrome和safari  |
|  -moz   |     firefox      |
|   -ms   |        ie        |
|   -o    |      opera       |

加前缀的目的是为了更好的兼容



## css3中的新特性

### `关系选择器~`

1. 比如h1~p ---> 选中h1标签后面的同级p元素

   ```html
   <div>
       <p>xxx</p>
       <p>xxx</p>
       <h1>xxx</h1>
       <p class="a">xxx</p>
   </div>
   
   <style>
       h1~p{
           /* class为a的p标签背景色为红色 */
          background:red; 
       }
   </style>
   
   
   ```

   

### `属性选择器`



|       选择器       |                     介绍                     |
| :----------------: | :------------------------------------------: |
|       e[att]       |          选择具有attr属性的e的元素           |
|  e[att = 'value']  |      选择具有attr且值等于value的e的元素      |
| e[att ^=  'value'] |   选择具有attr属性并值以value开头的e的元素   |
| e[att $=  'value'] |   选择具有attr属性并值以value结尾的e的元素   |
| e[att *=  'value'] | 选择所有具有attr属性并值内含有value的e的元素 |



```html
<div>
    <p class="a" title="ke">xxx</p>
    <p class="ab" title="bb">xxx</p>
    <p class="acb" title="cc">xxx</p>
    <p class="abc" title="dd">xxx</p>
    <p class="adv" title="ds">xxx</p>
    <p class="adfs" title="ac">xxx</p>
    <h1 class="d" title="ac">xxx</h1>
    <p class="d" title="ac">xxx</p>
</div>

<style>
    p[class]{
        /* 表示p标签含有class属性背景变红 */
       background:red; 
    }
    
    p[class='a']{
        /* 表示p标签的 class='a' 的背景变红 */
       background:red; 
    }
    
     p[title^='d']{
        /* 表示p标签的 title的值以d开头 的字体大小为25px */
       font-size:25px; 
    }
    
      p[title$='c']{
        /* 表示p标签的 title的值以c结尾 的字体加粗 */
       font-weight:bold; 
    }
    
     p[class*='d']{
        /* 表示p标签含有class属性值含有d的背景变蓝 */
       background:blue; 
    }
    
    
     p[class ~ ='d']{
        /* 表示p标签同级元素class值为d的标签背景变绿 */
       background:green; 
    }
</style>


```



<font>注: ~ =由于显示问题所以空格隔开，实际不能隔开，否者不生效</font>

### `伪类选择器`



|            选择器             |                             介绍                             |
| :---------------------------: | :----------------------------------------------------------: |
|       ==e:first-child==       |                `匹配父元素`中的第一个`子元素`                |
|       ==e:last-child==        |               `匹配父元素`中的最后一个`子元素`               |
|  ==e:nth-child(n/odd/even)==  |     `匹配父元素`中的    第n/为奇数/为偶数    的`子元素`      |
|        e:first-of-type        |                      `指定类型`的第一个                      |
|        e:last-of-type         |                     `指定类型`的最后一个                     |
| ==e:nth-of-type(n/odd/even)== |       `指定类型`中的    第n/为奇数/为偶数    的子元素        |
|             :root             |      `根选择器`，匹配e元素所在的文档根（html标签）元素       |
|           ==:not==            |         `否定选择器`，选中除某个元素之外的所有的元素         |
|          ==:empty==           |                    选择没有任何内容的元素                    |
|          ==:target==          | 目标选择器，匹配文档中url某个标识符的目标元素，鼠标点击后会变化 |
|          :only-child          |                  父元素中仅且只有一个子元素                  |
|         :only-of-type         |         选择一个元素它是父元素的唯一相同类型的子元素         |
|         ==:enabled==          |                       表单元素状态可用                       |
|         ==:disabled==         |                      表单元素状态不可用                      |
|         ==:checked==          |                           选中状态                           |
|          :read-only           | 用于指定只读元素的样式，元素上需要设置readonly='readonly'<br />单选框和复选框默认都是readonly |
|          :read-write          |                 用于指定元素处于非只读的状态                 |

`odd`表示`奇数 `

`even`表示`偶数`





```html
<ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>

<style>
    /* ul的第一个li */
    ul li:first-child{
        font-size：30px;
        color:red;
    }
    
    /* ul的最后一个li */
     ul li:last-child{
        font-size：40px;
        color:blue;
    }
    
    /* ul的第3个li */
     ul li:nth-child(3){
        font-size：50px;
        color:green;
    }
    
    /* ul的奇数行li */
     ul li:nth-child(odd){
        font-size：50px;
        color:yellow;
    }
</style>
```

```html
<section>
    <p></p>
	<div></div>
    <p></p>
	<p></p>
    <div></div>
    <span></span>
</section>

<style>
    /* section下的第一个div */
    section div:first-of-type{
        background:red;
    }
    
    /* section下的最后一个div */
     section div:last-of-type{
        background:blue;
    }

     /* section下的第二个p标签 */
     section p:nth-of-type(2){
        background:yellow;
    }
    
    /* section下的所有元素的第一个 */
     section :first-of-type{
        background:black;
    }
    
</style>

```





### `伪元素选择器`

​	

|    选择器     |             介绍             |
| :-----------: | :--------------------------: |
|   ::before    |  在元素的内部的前面插入内容  |
|    ::after    | 在元素的内部订单最后插入内容 |
| ::placeholder | 改变表单元素中提示文字的样式 |

