# css3

## css3文本与字体

### ==text-overflow==

设置当文本超出时显示状态

|   属性值   |                 描述                 |
| :--------: | :----------------------------------: |
|   *cilp*   |           表示剪切，默认值           |
| *ellipsis* |              显示省略号              |
|  *string*  | 使用给定的字符串来代表被修剪的文本。 |

```css
*{
    padding: 0px;
    margin: 0px;
    /* 超出显示省略号--->需配合以下两个属性一起使用 */
     text-overflow:ellipsis; 
     /* 不换行 */
     white-space:nowrap;
     /* 超出隐藏 */
     overflow:hidden;
}



```

### word-warp

设置文本的行文，当前行超过容器边界是否断开转行

|   属性值   |                       描述                       |
| :--------: | :----------------------------------------------: |
|   normal   |   允许内容顶开或溢出指定的容器边界。浏览器默认   |
| break-word | 内容将在边界内换行。如果需要，单词内部允许断行。 |

```html
<p class="test"> 
    This paragraph contains a very long word: 
    thisisaveryveryveryveryveryverylongword. 
    The long word will break and wrap to the 
    next line.
</p>

<style> 
    p.test
    {
      width:11em; 
      border:1px solid #000000;
      word-wrap:break-word;
    }
</style>
```



## 文本阴影(text-shadow)

|       属性值        |                  描述                   |
| :-----------------: | :-------------------------------------: |
| x-offset / h-shadow |    必需。水平阴影的位置。允许负值。     |
| y-offset / v-shadow |    必需。垂直阴影的位置。允许负值。     |
|        blur         | 可选,文本阴影模糊程度，数字越大越模糊。 |
|        color        |           可选。阴影的颜色。            |

```html
<style>
	h1 {
        text-shadow:2px 2px #FF0000;
    }
</style>

<p>
    <b>注意:</b>
    IE 9及更早版本的浏览器不支持text-shadow 属		性.
</p>
```



## @font-size

能够加载服务器的字体文件，让浏览器可以显示用户电脑没有安装的字体文件



## ==css3边框==

|             属性             |                             描述                             |
| :--------------------------: | :----------------------------------------------------------: |
|     *==border-radius==*      |                复合属性，边框四个角的圆角程度                |
|   *border-top-left-radius*   |                       边框左上圆角程度                       |
|  *border-top-right-radius*   |                       边框右上圆角程度                       |
| *border-bottom-right-radius* |                       边框右下圆角程度                       |
|  *border-top-right-radius*   |                       边框右上圆角程度                       |
|         `box-shadow`         |                        盒子的阴影效果                        |
|         border-image         |                         给边框加图片                         |
|      `background-size`       | 设置背景图片的大小，以长度值或百分百显示，也可以通过cover、contain来对图片进行缩放 |

### `box-shadow`

#### 语法

```css
box-shadow: h-shadow v-shadow blur spread color inset;
```

#### 属性参数

|   属性值   |                      描述                      |
| :--------: | :--------------------------------------------: |
| *h-shadow* |          必须，水平阴影位置，运行负值          |
| *v-shadow* |          必须，垂直阴影位置，运行负值          |
|   *blur*   |              可选，模糊程度(距离)              |
|  *spread*  |                 可选，阴影大小                 |
|  *color*   |                 可选，阴影颜色                 |
|  *inset*   | 可选，从外层的阴影（开始时）改变阴影内侧阴影， |

```html
<div></div>


<style> 
    div{
        width:300px;
        height:100px;
        background-color:yellow;
        box-shadow: 10px 10px 5px #888888;
    }
    /*
    	box-shadow:inset; 表示内阴影，及由元素边界朝元素内部走
    
    	box-shadow:outset; 外阴影，默认，阴影由元素边界朝外走，
    	值写上将导致样式无效，可理解其不存在
    */
</style>
```

### `background-size`

#### 语法

```css

background-size: length|percentage|cover|contain;

/*
	length:设置背景图片高度和宽度。第一个值设置宽度，第二个值设置的高度。
			如果只给出一个值，第二个是设置为 auto(自动)

	percentage:将计算相对于背景定位区域的百分比。第一个值设置宽度，第二
				个值设置的高度。如果只给出一个值，第二个是设置为"auto(自动)"

	cover:此时会保持图像的纵横比并将图像缩放成将完全覆盖背景定位区域的最小大小。

	contain:此时会保持图像的纵横比并将图像缩放成将适合背景定位区域的最大大小。
*/
```



## 颜色

​	rgba(红，绿，蓝，透明度)；

​	a：值为0到1



### ==渐变色彩==

[渐变](https://blog.csdn.net/shangyanaf/article/details/120973029)

#### 线性渐变==linear-gradient==

##### 语法

```css
background-image:linear-gradient(角度/to，颜色，颜色  开始渐变的位置, ......)；

background-image:linear-gradient(),linear-gradient()...;
```

##### 实例

```css
div{
    width:500px;
    height:500px;
    
    /* 线性渐变  从右边开始，红色到黄色渐变，到蓝色渐变，蓝色占渐变区域50% */
    background-image:linear-gradient(to right,red,yellow，blue 50%);
    
   	  /*基本用法*/
            background-image: linear-gradient(red, yellow, blue, green);
            background-image: linear-gradient(rgba(255, 0, 0, .2), yellow, blue, green);
 
     /*控制颜色渐变的方向
         to right -- 从左向右
         to top -- 从下到上
         to left -- 从右到左
         to bottom --- 从上到下（默认值）
      */
      background-image: linear-gradient(to right, red, yellow, blue, green);
      background-image: linear-gradient(to top, red, yellow, blue, green);
      background-image: linear-gradient(to left, red, yellow, blue, green);
      background-image: linear-gradient(to bottom, red, yellow, blue, green);
 
 
     /*0deg = to top -- 从下到上*/
     background-image: linear-gradient(0deg, red, yellow, blue, green);
     /*基于0度顺时针旋转45deg*/
     background-image: linear-gradient(45deg, red, yellow, blue, green);
     /*基于0度逆时针旋转45deg*/
     background-image: linear-gradient(-45deg, red, yellow, blue, green);
 
 
     /*设置过渡颜色的起始位置*/
     /*从过渡起始位置50px开始让红色和黄色之间产生颜色渐变效果*/
     background-image: linear-gradient(to right, red 50px, yellow, blue, green);
     background-image: linear-gradient(to right, red 50px, yellow 50px, blue, green);
     background-image: linear-gradient(to right, red 50px, yellow 50px, yellow 100px, blue, green);
}

```

#### 径向渐变==radial-gradient==

##### 语法

```css
background-image: radial-gradient([形状 大小 at(位置)],开始颜色，......,终止颜色);
```

##### 实例

```css
 .box {
            margin: 100px 0 0 100px;
            width: 400px;
            height: 200px;
 
            background-image: radial-gradient(red, blue);
 
            /*控制形状
                circle - 圆形的渐变效果
                ellipse - 椭圆的渐变效果（默认值）
            */
            background-image: radial-gradient(circle, red, blue);
            background-image: radial-gradient(ellipse, red, blue);
 
            /*控制圆心的位置
                at x y
            */
 
            background-image: radial-gradient(ellipse at 50px 50px, red, blue);
 
            background-image: radial-gradient(ellipse at top, red, blue);
 
            background-image: radial-gradient(ellipse at 50% 0, red, blue);
 
            background-image: radial-gradient(ellipse at 50% 100%, red, blue);
 
            background-image: radial-gradient(ellipse at center, red, blue);
 
 
            /*修改渐变的半径
              默认：基于元素宽度的1/2作为其水平及垂直半径
            */
            background-image: radial-gradient(circle 20px at center, red, blue);
 
            background-image: radial-gradient(20px 80px at center, red, blue);
 
 
        }

```



## ==css3的过渡效果（transtion）==

可以实现动画效果

`transtion过渡`，有四个属性，分别为`属性名称`，`过渡所需要的时间`，`时间曲线`，`延迟时间`；

### 语法

```css
transition: property duration timing-function delay;

/* transition为复合属性 */
```

### 分开式属性

|             属性             |                             描述                             |
| :--------------------------: | :----------------------------------------------------------: |
|     transition-property      | 规定设置过渡效果的 CSS 属性的名称。`all`则表示该元素的所有属性 |
|     transition-duration      |              规定完成过渡效果需要多少秒或毫秒。              |
| `transition-timing-function` |                  规定速度效果的速度时间曲线                  |
|       transition-delay       |                    定义过渡效果开始时间。                    |

#### 时间曲线的属性值`transition-timing-function`：


|           值            |                             描述                             |
| :------------------------: | :----------------------------------------------------------: |
|linear|规定以相同速度开始至结束的过渡效果（等于 cubic-bezier(0,0,1,1)）。|
|ease|规定慢速开始，然后变快，然后慢速结束的过渡效果（cubic-bezier(0.25,0.1,0.25,1)）。|
|ease-in|规定以慢速开始的过渡效果（等于 cubic-bezier(0.42,0,1,1)）。|
|ease-out|规定以慢速结束的过渡效果（等于 cubic-bezier(0,0,0.58,1)）。|
|ease-in-out|规定以慢速开始和结束的过渡效果（等于 cubic-bezier(0.42,0,0.58,1)）。|
|cubic-bezier(n,n,n,n)|在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值。|

### 实例

````html
<!DOCTYPE html>
<html>
<head>
<style> 
div
{
width:100px;
height:100px;
background:blue;
transition:width 2s;
transition-timing-function:linear;
/* Firefox 4 */
-moz-transition:width 2s;
-moz-transition-timing-function:linear;
/* Safari and Chrome */
-webkit-transition:width 2s;
-webkit-transition-timing-function:linear;
/* Opera */
-o-transition:width 2s;
-o-transition-timing-function:linear;
}

div:hover
{
width:300px;
}
</style>
</head>
<body>

<div></div>

<p>请把鼠标指针移动到蓝色的 div 元素上，就可以看到过渡效果。</p>

<p><b>注释：</b>本例在 Internet Explorer 中无效。</p>

</body>
</html>
````

## ==操作元素位置属性transform==

允许你将元素旋转，缩放，移动，倾斜等。

### 语法

```css
transform: none|transform-functions;
```



### 属性值

|                              值                              |                  描述                   |
| :----------------------------------------------------------: | :-------------------------------------: |
|                             none                             |            定义不进行转换。             |
|               matrix(*n*,*n*,*n*,*n*,*n*,*n*)                |    定义 2D 转换，使用六个值的矩阵。     |
| matrix3d(*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*,*n*) | 定义 3D 转换，使用 16 个值的 4x4 矩阵。 |
|                       `translate(x,y)`                       |        `定义 2D 转换。位置偏移`         |
|                   translate3d(*x*,*y*,*z*)                   |             定义 3D 转换。              |
|                       translateX(*x*)                        |       定义转换，只是用 X 轴的值。       |
|                       translateY(*y*)                        |       定义转换，只是用 Y 轴的值。       |
|                       translateZ(*z*)                        |     定义 3D 转换，只是用 Z 轴的值。     |
|                       `scale(x[,y]?)`                        |          `定义 2D 缩放转换。`           |
|                     scale3d(*x*,*y*,*z*)                     |           定义 3D 缩放转换。            |
|                         scaleX(*x*)                          |    通过设置 X 轴的值来定义缩放转换。    |
|                         scaleY(*y*)                          |    通过设置 Y 轴的值来定义缩放转换。    |
|                         scaleZ(*z*)                          |  通过设置 Z 轴的值来定义 3D 缩放转换。  |
|                       `rotate(angle)`                        |   `定义 2D 旋转，在参数中规定角度。`    |
|                rotate3d(*x*,*y*,*z*,*angle*)                 |             定义 3D 旋转。              |
|                       rotateX(*angle*)                       |        定义沿着 X 轴的 3D 旋转。        |
|                       rotateY(*angle*)                       |        定义沿着 Y 轴的 3D 旋转。        |
|                       rotateZ(*angle*)                       |        定义沿着 Z 轴的 3D 旋转。        |
|                   `skew(x-angle,y-angle)`                    |  `定义沿着 X 和 Y 轴的 2D 倾斜转换。`   |
|                        skewX(*angle*)                        |      定义沿着 X 轴的 2D 倾斜转换。      |
|                        skewY(*angle*)                        |      定义沿着 Y 轴的 2D 倾斜转换。      |
|                       perspective(*n*)                       |      为 3D 转换元素定义透视视图。       |

## ==动画animation==

### 概念

`animation`属性是一个简写属性，用于设置六个动画属性：

- `animation-name`-->规定需要绑定到选择器的 keyframe 名称。
- `animation-duration`-->规定完成动画所花费的时间，以秒或毫秒计。
- `animation-timing-function`-->规定动画的速度曲线。
- `animation-delay`-->规定在动画开始之前的延迟。
- `animation-iteration-count`-->规定动画应该播放的次数。
- `animation-direction`-->规定是否应该轮流反向播放动画。



==注：==请始终规定 animation-duration 属性，否则时长为 0，就不会播放动画了。

### 语法

```css
animation: name duration timing-function delay iteration-count direction;
```

### ==animation-name==

为 `@keyframes `动画定义的名称。

#### 语法

```
animation-name: keyframename|none;
```

| 值             | 描述                                         |
| -------------- | -------------------------------------------- |
| *keyframename* | 规定需要绑定到选择器的 keyframe 的名称。     |
| none           | 规定无动画效果（可用于覆盖来自级联的动画）。 |



#### ==keyframes定义和用法==

通过 @keyframes 规则，您能够创建动画。

创建动画的原理是，将一套 CSS 样式逐渐变化为另一套样式。

在动画过程中，您能够多次改变这套 CSS 样式。

以`百分比`来规定`改变发生的时间`，或者`通过关键词` `"from" `和 `"to"`，`等价于 0% 和100%`。

`0% 是动画的开始时间`，`100% 动画的结束时间`。

为了获得最佳的浏览器支持，您应该始终定义 0% 和 100% 选择器。

==注释：==请使用动画属性来控制动画的外观，同时将动画与选择器绑定。

```css
@keyframes animationname {keyframes-selector {css-styles;}}
```

#### 案例

```html
<div></div>

<style> 
    div{
        width:100px;
        height:100px;
        background:red;
        position:relative;
        animation:mymove 5s infinite;
        -moz-animation:mymove 5s infinite; /* Firefox */
        -webkit-animation:mymove 5s infinite; /* Safari and Chrome */
        -o-animation:mymove 5s infinite; /* Opera */
    }

    @keyframes mymove{
        from {top:0px;}
        to {top:200px;}
    }

    @-moz-keyframes mymove {/* Firefox */
        from {top:0px;}
        to {top:200px;}
    }

    @-webkit-keyframes mymove { /* Safari and Chrome */
        from {top:0px;}
        to {top:200px;}
    }

    @-o-keyframes mymove{ /* Opera */
        from {top:0px;}
        to {top:200px;}
    }
</style>


```

### ==animation-duration==

`属性定义动画完成一个周期所需要的时间，以秒或毫秒计`

#### 语法

```css
animation-duration: time;
```

|   值   |                            描述                            |
| :----: | :--------------------------------------------------------: |
| *time* | 规定完成动画所花费的时间。默认值是 0，意味着没有动画效果。 |

### ==animation-timing-function==

`速度曲线用于使变化更为平滑。`

#### 语法

```css
animation-timing-function: value;
```

animation-timing-function 使用名为三次贝塞尔（Cubic Bezier）函数的数学函数，来生成速度曲线。您能够在该函数中使用自己的值，也可以预定义的值：

|              值               |                             描述                             |
| :---------------------------: | :----------------------------------------------------------: |
|            linear             |                 动画从头到尾的速度是相同的。                 |
|             ease              |        默认。动画以低速开始，然后加快，在结束前变慢。        |
|            ease-in            |                       动画以低速开始。                       |
|           ease-out            |                       动画以低速结束。                       |
|          ease-in-out          |                    动画以低速开始和结束。                    |
| cubic-bezier(*n*,*n*,*n*,*n*) | 在 cubic-bezier 函数中自己的值。可能的值是从 0 到 1 的数值。 |

### ==animation-delay==

`定义动画何时开始。`

值以秒或毫秒计。

==提示：==允许负值，-2s 使动画马上开始，但跳过 2 秒进入动画。

#### 语法

```css
animation-delay: time;
```

### ==animation-iteration-count==

`属性定义动画的播放次数。`

#### 语法

```css
animation-iteration-count: n|infinite;
```

| 值       | 描述                     |
| -------- | ------------------------ |
| *n*      | 定义动画播放次数的数值。 |
| infinite | 规定动画应该无限次播放。 |

### ==animation-direction==

`属性定义是否应该轮流反向播放动画。`

如果 animation-direction 值是 "`alternate`"，则动画`会在奇数次数（1、3、5 等等）正常播放`，而`在偶数次数（2、4、6 等等）向后播放`。

==注释：==如果把动画设置为只播放一次，则该属性没有效果。

#### 语法

```css
animation-direction: normal|alternate;
```

| 值        | 描述                       |
| --------- | -------------------------- |
| normal    | 默认值。动画应该正常播放。 |
| alternate | 动画应该轮流反向播放。     |

