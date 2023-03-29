## HTML5中的canvas标签

**绘制图像，图形，支持2d、3d拥有自己的属性**

### 1、关于canvas的简介

1. canvas是HTML5标签，表示`画布`，canvas只是作为`图像绘制的容器`，所有的绘制工作都在脚本JavaScript内部完成。
2. canvas的作用：①绘制基础图形；②绘制文字；③图形变形和图片合成；④处理图片和视频；⑤动画实现；⑥制作小游戏等等。
3. 支持canvas的浏览器：Firefox, safari, chrome, opera, IE9等。

#### **首先来看canvas标签，在w3school中的定义如下：**

1. `<canvas> 标签`定义图形，比如图表和其他图像。
2. `<canvas> 标签`只是图形容器，您`必须使用脚本来绘制图形`。

> 是的，canvas标签只是一个图形容器真正要实现图形的绘制是需要通过js来完成的。
> 那首先作为一个html元素就有它支持的`标签属性`、`标准属性`和`事件属性`，其中标准属性和事件属性请分别查阅标准属性 &事件属性，这里说一下标签属性，canvas有两个标签属性`width`和`height`，单位都是px（像素），但是在`书写的时候并不需要书写单位`。
>
> ```html
> <canvas width="600" height="600"></canvas>
> ```
>
>  用来规定画布的宽度和高度。你也可以在标签之间写入备注信息，这些信息在不支持canvas这个标签的浏览器中就可以被用户看到。
>
> ```html
> <canvas height="600" width="400">
>     您的浏览器过低，请更换高版本再试
> </canvas>
> ```
>
> 注意：
>
> 1. 使用`<canvas>`标签时，建议要成对出现，不要使用闭合的形式。
> 2. canvas元素默认具有高宽，width： 300px，height：150px
> 3. 默认情况下 <canvas> 元素没有边框和内容

#### canvas标签的两个属性

```html
<canvas> 看起来和 <img>元素很相像，
唯一的不同就是它并没有 src 和 alt 属性。
实际上，<canvas> 标签只有两个属性—— width和height。这些都是可选的。
当没有设置宽度和高度的时候，canvas会初始化宽度为300像素和高度为150像素。
```

**画布的高宽**

1. html属性设置width height时只影响画布本身不影画布内容
2. ==css属性设置width height时不但会影响画布本身的高宽，还会使画布中的内容等比例缩放（缩放参照于画布默认的尺寸）==

注：canvas画布是一个矩形区域，里面的每一个像素都可以被控制。**应在canvas标签内设置width和height属性，不要在css里设置，避免以后canvas画出的图像变形（拉伸或者缩放）**

### 提供的API

#### 颜色、样式和阴影

|                             属性                             |                    描述                    |
| :----------------------------------------------------------: | :----------------------------------------: |
| [`fillStyle`](https://www.runoob.com/tags/canvas-fillstyle.html) | 设置或返回用于填充绘画的颜色、渐变或模式。 |
| [`strokeStyle`](https://www.runoob.com/tags/canvas-strokestyle.html) |   设置或返回用于笔触的颜色、渐变或模式。   |
| [shadowColor](https://www.runoob.com/tags/canvas-shadowcolor.html) |         设置或返回用于阴影的颜色。         |
| [shadowBlur](https://www.runoob.com/tags/canvas-shadowblur.html) |       设置或返回用于阴影的模糊级别。       |
| [shadowOffsetX](https://www.runoob.com/tags/canvas-shadowoffsetx.html) |      设置或返回阴影与形状的水平距离。      |
| [shadowOffsetY](https://www.runoob.com/tags/canvas-shadowoffsety.html) |      设置或返回阴影与形状的垂直距离。      |

|                             方法                             |                   描述                    |
| :----------------------------------------------------------: | :---------------------------------------: |
| [`createLinearGradient()`](https://www.runoob.com/tags/canvas-createlineargradient.html) |     创建线性渐变（用在画布内容上）。      |
| [createPattern()](https://www.runoob.com/tags/canvas-createpattern.html) |      在指定的方向上重复指定的元素。       |
| [createRadialGradient()](https://www.runoob.com/tags/canvas-createradialgradient.html) | 创建放射状/环形的渐变（用在画布内容上）。 |
| [addColorStop()](https://www.runoob.com/tags/canvas-addcolorstop.html) |     规定渐变对象中的颜色和停止位置。      |

#### 线条样式

|                             属性                             |                    描述                    |
| :----------------------------------------------------------: | :----------------------------------------: |
|  [lineCap](https://www.runoob.com/tags/canvas-linecap.html)  |       设置或返回线条的结束端点样式。       |
| [lineJoin](https://www.runoob.com/tags/canvas-linejoin.html) | 设置或返回两条线相交时，所创建的拐角类型。 |
| [lineWidth](https://www.runoob.com/tags/canvas-linewidth.html) |         设置或返回当前的线条宽度。         |
| [miterLimit](https://www.runoob.com/tags/canvas-miterlimit.html) |          设置或返回最大斜接长度。          |

#### 矩形

|                             方法                             |              描述              |
| :----------------------------------------------------------: | :----------------------------: |
|    [rect()](https://www.runoob.com/tags/canvas-rect.html)    |           创建矩形。           |
| [`fillRect()`](https://www.runoob.com/tags/canvas-fillrect.html) |     绘制"`被填充`"的矩形。     |
| [`strokeRect()`](https://www.runoob.com/tags/canvas-strokerect.html) |     绘制矩形（`无填充`）。     |
| [`clearRect()`](https://www.runoob.com/tags/canvas-clearrect.html) | 在给定的矩形内清除指定的像素。 |

#### 路径

|                             方法                             |                           描述                            |
| :----------------------------------------------------------: | :-------------------------------------------------------: |
|    [fill()](https://www.runoob.com/tags/canvas-fill.html)    |                  填充当前绘图（路径）。                   |
|  [stroke()](https://www.runoob.com/tags/canvas-stroke.html)  |                    绘制已定义的路径。                     |
| [`beginPath()`](https://www.runoob.com/tags/canvas-beginpath.html) |        起始一条路径，或重置当前路径。(绘制非矩形)         |
|  [moveTo()](https://www.runoob.com/tags/canvas-moveto.html)  |         把路径移动到画布中的指定点，不创建线条。          |
| [closePath()](https://www.runoob.com/tags/canvas-closepath.html) |              创建从当前点回到起始点的路径。               |
|  [lineTo()](https://www.runoob.com/tags/canvas-lineto.html)  | 添加一个新点，然后在画布中创建从该点到最后指定点的线条。  |
|    [clip()](https://www.runoob.com/tags/canvas-clip.html)    |           从原始画布剪切任意形状和尺寸的区域。            |
| [quadraticCurveTo()](https://www.runoob.com/tags/canvas-quadraticcurveto.html) |                   创建二次贝塞尔曲线。                    |
| [bezierCurveTo()](https://www.runoob.com/tags/canvas-beziercurveto.html) |                   创建三次贝塞尔曲线。                    |
|     [arc()](https://www.runoob.com/tags/canvas-arc.html)     |           创建弧/曲线（用于创建圆形或部分圆）。           |
|   [arcTo()](https://www.runoob.com/tags/canvas-arcto.html)   |                 创建两切线之间的弧/曲线。                 |
| [isPointInPath()](https://www.runoob.com/tags/canvas-ispointinpath.html) | 如果指定的点位于当前路径中，则返回 true，否则返回 false。 |

#### 转换

|                             方法                             |                       描述                       |
| :----------------------------------------------------------: | :----------------------------------------------: |
|   [scale()](https://www.runoob.com/tags/canvas-scale.html)   |            缩放当前绘图至更大或更小。            |
|  [rotate()](https://www.runoob.com/tags/canvas-rotate.html)  |                  旋转当前绘图。                  |
| [translate()](https://www.runoob.com/tags/canvas-translate.html) |          重新映射画布上的 (0,0) 位置。           |
| [transform()](https://www.runoob.com/tags/canvas-transform.html) |             替换绘图的当前转换矩阵。             |
| [setTransform()](https://www.runoob.com/tags/canvas-settransform.html) | 将当前转换重置为单位矩阵。然后运行 transform()。 |

#### 文本

|                             属性                             |                    描述                    |
| :----------------------------------------------------------: | :----------------------------------------: |
|     [font](https://www.runoob.com/tags/canvas-font.html)     |     设置或返回文本内容的当前字体属性。     |
| [textAlign](https://www.runoob.com/tags/canvas-textalign.html) |     设置或返回文本内容的当前对齐方式。     |
| [textBaseline](https://www.runoob.com/tags/canvas-textbaseline.html) | 设置或返回在绘制文本时使用的当前文本基线。 |



|                             方法                             |             描述             |
| :----------------------------------------------------------: | :--------------------------: |
| [fillText()](https://www.runoob.com/tags/canvas-filltext.html) | 在画布上绘制"被填充的"文本。 |
| [strokeText()](https://www.runoob.com/tags/canvas-stroketext.html) | 在画布上绘制文本（无填充）。 |
| [measureText()](https://www.runoob.com/tags/canvas-measuretext.html) | 返回包含指定文本宽度的对象。 |

#### 图像绘制

|                             方法                             |              描述              |
| :----------------------------------------------------------: | :----------------------------: |
| [drawImage()](https://www.runoob.com/tags/canvas-drawimage.html) | 向画布上绘制图像、画布或视频。 |

#### 像素操作

|                             属性                             |                         描述                          |
| :----------------------------------------------------------: | :---------------------------------------------------: |
| [width](https://www.runoob.com/tags/canvas-imagedata-width.html) |              返回 ImageData 对象的宽度。              |
| [height](https://www.runoob.com/tags/canvas-imagedata-height.html) |              返回 ImageData 对象的高度。              |
| [data](https://www.runoob.com/tags/canvas-imagedata-data.html) | 返回一个对象，其包含指定的 ImageData 对象的图像数据。 |



|                             方法                             |                            描述                             |
| :----------------------------------------------------------: | :---------------------------------------------------------: |
| [createImageData()](https://www.runoob.com/tags/canvas-createimagedata.html) |              创建新的、空白的 ImageData 对象。              |
| [getImageData()](https://www.runoob.com/tags/canvas-getimagedata.html) | 返回 ImageData 对象，该对象为画布上指定的矩形复制像素数据。 |
| [putImageData()](https://www.runoob.com/tags/canvas-putimagedata.html) |      把图像数据（从指定的 ImageData 对象）放回画布上。      |

#### 合成

|                             属性                             |                   描述                   |
| :----------------------------------------------------------: | :--------------------------------------: |
| [globalAlpha](https://www.runoob.com/tags/canvas-globalalpha.html) |  设置或返回绘图的当前 alpha 或透明值。   |
| [globalCompositeOperation](https://www.runoob.com/tags/canvas-globalcompositeoperation.html) | 设置或返回新图像如何绘制到已有的图像上。 |

#### 其他

|      方法      |               描述               |
| :------------: | :------------------------------: |
|     save()     |       保存当前环境的状态。       |
|   restore()    | 返回之前保存过的路径状态和属性。 |
| createEvent()  |                                  |
| `getContext()` |                                  |
|  toDataURL()   |                                  |

## 使用 JavaScript 来绘制图像

canvas 元素本身是没有绘图能力的。所有的绘制工作必须在 JavaScript 内部完成：

```html
<canvas id="myCanvas" width="200" height="100" style="border:1px solid #000000;">
     您的浏览器过低，请更换高版本再试
</canvas>

<script>
	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
	ctx.fillStyle="#FF0000";
	ctx.fillRect(0,0,150,75);
</script>
```

**实例解析:**

1. 首先，找到 <canvas> 元素

   ```js
   var c=document.getElementById("myCanvas");
   ```

2. 然后，创建 context 对象

   ```js
   var ctx=c.getContext("2d");
   ```

   getContext("2d") 对象是内建的 HTML5 对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。

3. 下面的两行代码绘制一个红色的矩形

   ```js
   ctx.fillStyle="#FF0000";
   ctx.fillRect(0,0,150,75);
   ```

   设置fillStyle属性可以是CSS颜色，渐变，或图案。fillStyle 默认设置是#000000（黑色）。

   fillRect(*x,y,width,height*) 方法定义了矩形当前的填充方式。

   









