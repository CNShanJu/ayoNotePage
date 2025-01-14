# HTML初级

## 语义标签

语义标签就是标签本身代表了一定的含义



### h4.0.1语义标签有：

p标签 h标签 img标签



`语义不强`的标签：

div：作为容器使用

## html5新增的语义标签

|  标签   |          语义          |
| :-----: | :--------------------: |
|   nav   |          导航          |
| header  |          头部          |
|  main   |   文档的主要的内容区   |
| article |        定义文章        |
|  aside  | 定义页面内容之外的内容 |
| footer  |          页脚          |

语义很强的标签，更加利于开发者以及搜索引擎对于网页的理解



### 其他标签

|          |                                                    |
| -------- | -------------------------------------------------- |
| mark     | 定义带有记号的文本                                 |
| meter    | 定义范围内的度量                                   |
| progress | 进度条  max(进度条取值范围)  value(进度条当前取值) |
| time     | 定义日期或者时间                                   |
| figure   | 规定独立流的内容                                   |

## video和audio标签

html5规定了一种通过`video`和`audio`元素来包含`音频-视频`的



### 视频

```html
<!-- 第一种写法 -->
<!-- controls控件  -->
<video src="视频路径" controls>
	当浏览器不支持视频显示该文字
</video>

<!-- 第二种写法,方便浏览器更兼容 -->
<video>
    <!-- 当浏览器支持mp4显示该选项 -->
    <source src="视频路径a.mp4" type="video/mp4"></source>
 	<!-- 当浏览器支持ogg显示该选项 -->
 	<source src="视频路径a.ogg" type="video/ogg"></source>
	当浏览器不支持视频显示该文字
</video>


```

#### 视频格式

video支持的视频格式

ogg--mp4--webm--mpeg4



#### video标签的属性

|     属性      |  属性值  |                描述                |
| :-----------: | :------: | :--------------------------------: |
|   controls    | controls | 控件，添加播放、暂停、进度条等控件 |
|      src      | 视频路径 |          要播放视频的url           |
| width、height |    px    |         设置播放窗口的宽高         |
|   autoplay    | autoplay |      视频在就绪完成后自动播放      |
|     loop      |   loop   |              循环播放              |
|     muted     |  muted   |        规定视频输出应被静音        |
|    poster     |   url    |         设置视频的封面图片         |

注：一般情况只设置宽高，让其可自动等比缩放

### 音频

```html
<!-- 第一种写法 -->
<audio src="音频路径">
	当浏览器不支持显示该文字
</audio>

<!-- 第二种写法,方便浏览器更兼容 -->
<audio>
    <!-- 当浏览器支持mp4显示该选项 -->
    <source src="视频路径a.mp4" type="video/mp3"></source>
 	<!-- 当浏览器支持ogg显示该选项 -->
 	<source src="视频路径a.ogg" type="video/ogg"></source>
	当浏览器不支持显示该文字
</audio>


```

#### audio标签属性

|   属性   |  属性值  |   描述   |
| :------: | :------: | :------: |
| autoplay | autoplay | 自动播放 |
| controls | controls |   控件   |
|   loop   |   loop   | 循环播放 |
|   src    |   url    |   路径   |
|  muted   |  muted   |   静音   |

