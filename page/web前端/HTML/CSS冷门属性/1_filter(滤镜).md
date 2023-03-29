# filter(滤镜)属性

[toc]

前端一般处理图片，我首先想到的就是ps。
但是，前端css的filter属性一样可以得到一些意想不到的效果（例如：图片模糊与图片饱和度）
今天我们就来挨个介绍一下这些取值产生的效果

也可以参考[菜鸟教程](https://www.runoob.com/cssref/css3-pr-filter.html)

## 前置

**filter的取值有：**

|         值          |                             说明                             |
| :-----------------: | :----------------------------------------------------------: |
|     **`none`**      |                       默认值，没有效果                       |
|    **`blur()`**     |                      给图像设置高斯模糊                      |
| **`brightness()`**  |         给图片应用一种线性乘法，使其看起来更亮或更暗         |
|  **`contrast()`**   |                       调整图像的对比度                       |
| **`drop-shadow()`** |                    给图像设置一个阴影效果                    |
|  **`grayscale()`**  |                     将图像转换为灰度图像                     |
| **`hue-rotate()`**  |                      给图像应用色相旋转                      |
|   **`invert()`**    |                         反转输入图像                         |
|   **`opacity()`**   |                      转化图像的透明程度                      |
|  **`saturate()`**   |                        转换图像饱和度                        |
|    **`sepia()`**    |                      将图像转换为深褐色                      |
|     **`url()`**     | URL函数接受一个XML文件，该文件设置了 一个SVG滤镜，且可以包含一个锚点来指定一个具体的滤镜元素。 |

## none

==默认值，没有效果==

```css
img{
  filter: none;
}
```

### 参考实例

none的效果图：
![none](1_filter(滤镜)图片/format,png.png)

## blur() 

==给图像设置高斯模糊==

```css
img{
  filter: blur(2px);
}
```

### 参考实例

blur(0px-20px)与原图的对比效果：
![blur(0px-20px)与原图的对比效果](1_filter(滤镜)图片/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8xMDQwMTM4MS0wYjI3NTg1YzMyMzJkNTdmLmdpZg.gif)

## brightness() 

==给图片应用一种线性乘法，使其看起来更亮或更暗==

|        值         |     说明     |
| :---------------: | :----------: |
|  brightness(0%)   |     全黑     |
| brightness(100%)  |   没有变化   |
| brightness(>100%) | 图片变得更亮 |

```css
img{
  filter: brightness(50%);
}
```

### 参考实例

brightness(100%~0%)与原图的对比效果：
![brightness(100%~0%)与原图的对比效果](1_filter(滤镜)图片/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8xMDQwMTM4MS02NTE3OTZiOGNkMjE4MzgxLmdpZg.gif)

## contrast()

==调整图像的对比度==

|       值        |       说明       |
| :-------------: | :--------------: |
|  contrast(0%)   |       全灰       |
| contrast(100%)  |     没有变化     |
| contrast(>100%) | 图片对比度更明显 |

```css
img{
  filter: contrast(50%);
}
```

### 参考实例

contrast(100%~0%)与原图的对比效果：
![contrast(100%~0%)与原图的对比效果](1_filter(滤镜)图片/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8xMDQwMTM4MS01MjNlZjMzNzMwYTMxODQxLmdpZg.gif)

## drop-shadow()

==给图像设置一个阴影效果==

这个取值类似于box-shadow

```css
drop-shadow(h-shadow v-shadow blur spread color)
```

|   属性   |                             描述                             | 重要性 |
| :------: | :----------------------------------------------------------: | :----: |
| h-shadow | 这是设置阴影偏移量的两个 值. 设定垂直距离.负值会使阴影出现在元素上方。 |  必须  |
| v-shadow | 这是设置阴影偏移量的两个 值. 设定水平方向距离. 负值会使阴影出现在元素左边 |  必须  |
|   blur   | 值越大，越模糊，则阴影会变得更大更淡.**不允许负值** 若未设定，默认是0 (则阴影的边界很锐利). |  可选  |
|  spread  | 正值会使阴影扩张和变大，负值会是阴影缩小.若未设定，默认是0 (阴影会与元素一样大小).<br/>***注意: Webkit, 以及一些其他浏览器 不支持第四个长度，如果加了也不会渲染。*** |  可选  |
|  color   | 若未设定，颜色值基于浏览器。在Gecko (Firefox), Presto (Opera)和Trident (Internet Explorer)中， 会应用colorcolor属性的值。另外, **如果颜色值省略，WebKit中阴影是透明的**。 |  可选  |

```css
img{
  filter: drop-shadow(2px 4px 6px #000);
}
```

### 参考实例

drop-shadow(2px 4px 6px #000)的效果图：
![drop-shadow(2px 4px 6px #000)的效果图](1_filter(滤镜)图片/format,png-16750454608655.png)

## grayscale()

==将图像转换为灰度图像==

|        值        |       说明       |
| :--------------: | :--------------: |
|  grayscale(0%)   |      无变化      |
| grayscale(100%)  |     灰度图片     |
| grayscale(>100%) | 跟100%的效果一致 |

```css
img{
  filter: grayscale(50%);
}
```

### 参考实例

grayscale(0%~100%)与原图的对比效果：
![grayscale(0%~100%)与原图的对比效果](1_filter(滤镜)图片/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8xMDQwMTM4MS0zYmRiYmQxZTkxZTg0NzE3LmdpZg.gif)

## hue-rotate()

==给图像应用色相旋转==

|         值         |               说明               |
| :----------------: | :------------------------------: |
|  hue-rotate(0deg)  |              无变化              |
| hue-rotate(180deg) |               变化               |
| hue-rotate(360deg) |              无变化              |
| hue-rotate(361deg) | 效果等同于hue-rotate(1deg)的效果 |

> `0~360deg为一个周期`

```css
img{
  filter: hue-rotate(50deg);
}
```

### 参考实例

hue-rotate(0deg~360deg)与原图的对比效果：
![hue-rotate(0deg~360deg)与原图的对比效果](1_filter(滤镜)图片/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8xMDQwMTM4MS1iNzZmMDQ1ZDg0NWMwMDk0LmdpZg.gif)

## invert()

==反转输入图像==

|      值       |       说明       |
| :-----------: | :--------------: |
|  invert(0%)   |      无变化      |
| invert(100%)  |     完全反转     |
| invert(>100%) | 跟100%的效果一致 |

```css
img{
  filter: invert(50%);
}
```

### 参考实例

invert(0%~100%)与原图的对比效果：
![invert(0%~100%)与原图的对比效果](1_filter(滤镜)图片/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8xMDQwMTM4MS0wYjEwOTMzZTdjMDFkOGQxLmdpZg.gif)

## opacity()

==转化图像的透明程度==

|       值       |       说明       |
| :------------: | :--------------: |
|  opacity(0%)   |     完全透明     |
| opacity(100%)  |      无变化      |
| opacity(>100%) | 跟100%的效果一致 |

> 该值类似于`opacity`属性

```css
img{
  filter: opacity(50%);
}
```

### 参考实例

opacity(100%~0%)与原图的对比效果：
![opacity(100%~0%)与原图的对比效果](1_filter(滤镜)图片/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8xMDQwMTM4MS1mOWQ2ZGFkNTRmZDczNmRiLmdpZg.gif)

## saturate()

==转换图像饱和度==

|       值        |     说明     |
| :-------------: | :----------: |
|  saturate(0%)   |  完全不饱和  |
| saturate(100%)  |    无变化    |
| saturate(>100%) | 更高的饱和度 |

```css
img{
  filter: saturate(50%);
}
```

### 参考实例

saturate(0%~200%)与原图的对比效果：
![saturate(0%~200%)与原图的对比效果](1_filter(滤镜)图片/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8xMDQwMTM4MS0xMGJjMjMwZTY0NGJmYjYwLmdpZg.gif)

## sepia() 

==将图像转换为深褐色==

```css
img{
  filter: sepia(0%);
}
```

### 参考实例

sepia(0%~100%)与原图的对比效果：
![sepia(0%~100%)与原图的对比效果](1_filter(滤镜)图片/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8xMDQwMTM4MS0yZjJlZDE0MDc0NGUzZTNhLmdpZg.gif)

## url()

==URL函数接受一个XML文件，该文件设置了 一个SVG滤镜，且可以包含一个锚点来指定一个具体的滤镜元素。==

> SVG滤镜资源是指以`xml文件格式`定义的svg滤镜效果集，可以通过URL引入并且通过锚点（#element-id）指定具体的一个滤镜元素
>
> 
>
> **用法：**
>
> ```css
> filter: url(svg-url#element-id)
> ```

svg-xml文件

```xml
<svg version="1.1"
     xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink"
     xmlns:ev="http://www.w3.org/2001/xml-events"
     baseProfile="full">
    <defs>
        <!-- 此处定义滤镜 -->
        <filter id="blur">
            <feGaussianBlur stdDeviation="4" result="blur"/>  
            <!-- feGaussianBlur(滤镜): 该滤镜对输入图像进行高斯模糊 -->
            <feOffset in="blur" dx="4" dy="4" result="offsetBlur"/>
            <!-- feOffset(模糊)：创建阴影效果 -->
        </filter>
    </defs>
</svg>

```

```css
img{
  filter: url("./svg.xml#blur");
}
```

### 参考实例

效果图入下：
![url.jpg](1_filter(滤镜)图片/format,png-167504627847413.png)