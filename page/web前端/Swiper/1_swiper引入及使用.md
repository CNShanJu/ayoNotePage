## Swiper的CDN引入

```html
<!--Swiper6-8，更改数字可切换不同版本，如@8、@8.0.4，不加版本号为最新版本。-->
<link rel="stylesheet" href="https://unpkg.com/swiper@8/swiper-bundle.css">  
<link rel="stylesheet" href="https://unpkg.com/swiper@8/swiper-bundle.min.css">    
<script src="https://unpkg.com/swiper@8/swiper-bundle.js"> </script>  
<script src="https://unpkg.com/swiper@8/swiper-bundle.min.js"> </script>
<script src="https://unpkg.com/swiper@8/swiper-bundle.min.js.map"> </script>

<!--ES 模块-->
<script type="module">
  import Swiper from 'https://unpkg.com/swiper@8/swiper-bundle.esm.browser.min.js'
  const swiper = new Swiper(...)
</script>

<!--Swiper5/Swiper4，要将5.x.x改成相应的版本，如5.4.5或4.5.1版本（4无esm的CDN）-->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/5.x.x/css/swiper.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/5.x.x/css/swiper.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/5.x.x/js/swiper.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/5.x.x/js/swiper.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/5.x.x/js/swiper.esm.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/5.x.x/js/swiper.esm.bundle.js"></script>
```

## 使用教程

> 由于兼容性问题，使用的是`Swiper4`

#### 安装

```shell
npm i swiper@4
```

#### 在组件中引入

```js
import 'swiper/dist/js/swiper'
import 'swiper/dist/css/swiper.css'
import Swiper from "swiper"
```

#### 添加HTML内容

```html
<div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    
    <!-- 如果需要滚动条 -->
    <div class="swiper-scrollbar"></div>
</div>
```

#### 在`mouted`中初始化Swiper

```js
mounted() {
	new Swiper('.swiper-container', {
		//direction: 'vertical', // 垂直切换选项
		//mousewheel: true, //滚轮
		autoplay: { //自动开始
			delay: 2500, //时间间隔
			disableOnInteraction: false, //*手动操作轮播图后不会暂停*
		},
		loop: true, // 循环模式选项

    	// 如果需要分页器
		pagination: {
			el: '.swiper-pagination',
			clickable: true, // 分页器可以点击
		},

		// 如果需要前进后退按钮
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		
		// 如果需要滚动条
		scrollbar: {
			el: '.swiper-scrollbar',
		},
	}) 
},
```

> 中文网地址：https://swiper.com.cn/

## 说明

#### 初始化

|     参数名      |         类型          | 是否必填 |                      描述                      |
| :-------------: | :-------------------: | :------: | :--------------------------------------------: |
| swiperContainer | HTMLElement or string |   必选   | Swiper容器的css选择器，例如".swiper-container" |
|   parameters    |        object         |   可选   |               Swiper的个性化配置               |

```js
new Swiper(Swiper容器,Swiper的个性化配置{对象})

var mySwiper = new Swiper('.swiper-container', {
	autoplay: true,//可选选项，自动滑动
})
```

#### parameters （基础常用）个性化

|    属性名     |                             作用                             |                             案例                             |
| :-----------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| initialSlide  | 设定初始化时slide的索引。Swiper默认初始化时显示第一个slide，有时想初始化时直接显示其他slide，可以做此设置 |                       initialSlide :2,                       |
|   direction   | Swiper的滑动方向，可设置为水平方向切换(horizontal)或垂直方向切换(vertical) |                   direction : ‘vertical’,                    |
|     speed     |     切换速度，即slider自动滑动开始到结束的时间（单位ms）     |                          speed:300,                          |
|  grabCursor   | 该选项给Swiper用户提供小小的贴心应用，设置为true时，鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状。（根据浏览器形状有所不同） |                      grabCursor : true,                      |
|   parallax    | 设置为true开启Swiper的视差效果，内容在切换时更有层次感 false为关闭 true为开启 | parallax : true, [效果请看](https://www.swiper.com.cn/api/parameters/197.html) |
| roundLengths  | 如果设置为true，则将slide的宽和高取整(四舍五入)，以防止某些分辨率的屏幕上文字或边界(border)模糊。例如当你设定slidesPerView: 3的时候，则可能出现slide的宽度为341.33px，开启roundLengths后宽度取整数341px。 |                     roundLengths : true,                     |
| preloadImages |       默认为true，Swiper会强制加载所有图片后才初始化。       |                     preloadImages:false,                     |
|    cssMode    | 启用后，它将使用现代CSS Scroll Snap API。它不支持Swiper的很多功能，但可能会带来更好的性能（开启后可以用滚轮去控制切换） | cssMode:true,[里面有很多参数请看](https://www.swiper.com.cn/api/parameters/449.html) |

#### parameters （基础常用）个性化 视觉上

|           属性名            |                             作用                             |                             案例                             |
| :-------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
|       centeredSlides        |  设定为true时，active slide会居中，而不是默认状态下的居左。  |                    centeredSlides : true,                    |
|    centeredSlidesBounds     | 当设置了Active Slide居中后，还可以配合设置此参数，使得第一个和最后一个Slide 始终贴合边缘。 |                    centeredSlides : true,                    |
| centeredSlidesBounds: true, |                                                              |                                                              |
|        slidesPerView        | 设置slider容器能够同时显示的slides数量(carousel模式)。可以设置为数字（可为小数，小数不可loop），或者 'auto’则自动根据slides的宽度来设定数量。loop模式下如果设置为’auto’还需要设置另外一个参数loopedSlides。slidesPerView: 'auto’目前还不支持多行模式（当slidesPerColumn > 1） | slidesPerView : 2, //slidesPerView : ‘auto’, 根据slide的宽度自动调整展示数量。此时需要设置slide的宽度，如下style所示//slidesPerView : 3.7, |
|       slidesPerGroup        |         在carousel mode下定义slides的数量多少为一组          | slidesPerView : 3, 屏幕显示三个 slidesPerGroup : 3, 三个为一组 |
|     slidesPerGroupSkip      | 设置跳过分组。设置的前几个slide将不计入分组之内。例如总共10个slide，按3个为一组可分为4组（000，000，000，0）。如果设置了前两个跳过分组，则可分为5组（0，0，000，000，00）。 | slidesPerGroup: 3, 3个一组 slidesPerView : 3, 一屏显示三个 slidesPerGroupSkip: 4, |
|        spaceBetween         |                在slide之间设置距离（单位px）                 |                      spaceBetween : 20,                      |
|       slidesPerColumn       |              设置多行布局里面每列的slide数量。               | slidesPerView: 3,//一行显示3个 slidesPerColumn: 2,//显示2行  |
|     slidesOffsetBefore      |          设定slide与左边框的预设偏移量（单位px）。           |                  slidesOffsetBefore : 100,                   |
|      slidesOffsetAfter      |          设定slide与右边框的预设偏移量（单位px）。           |                   slidesOffsetAfter : 100,                   |