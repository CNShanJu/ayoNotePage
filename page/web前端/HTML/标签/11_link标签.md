# link(外部资源链接元素)

`link标签`是**网页头部head**中的元素，在html语言中，link标签是**单独出现**的，并且可以被多次使用，该元素的用途是`与外部文件建立链接`,最常见的用途是链接样式表。



### 浏览器支持

|   元素   | Chrome |  IE  | Firefox | Safari | Opera |
| :------: | :----: | :--: | :-----: | :----: | :---: |
| `<link>` |  Yes   | Yes  |   Yes   |  Yes   |  Yes  |

在用于样式表时，`<link> 标签`得到了几乎所有浏览器的支持。但是几乎没有浏览器支持其他方面的用途。

### 定义和用法

- 定义文档与外部资源的关系。
- 最常见的用途是链接样式表。
- 只能定义在`head标签`之间

### HTML 与 XHTML 之间的差异

- 在 HTML 中，<link> 标签没有结束标签。
- 在 XHTML 中，<link> 标签必须被正确地关闭。

## 属性1.0(表格)

|                             属性                             |                              值                              |                    描述                     |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :-----------------------------------------: |
| [charset](https://www.w3school.com.cn/tags/att_link_charset.asp) |                       *char_encoding*                        |             `HTML5 中不支持。`              |
|  [href](https://www.w3school.com.cn/tags/att_link_href.asp)  |                            *URL*                             |          规定被链接文档的`位置`。           |
| [hreflang](https://www.w3school.com.cn/tags/att_link_hreflang.asp) |                       *language_code*                        |        规定被链接文档中文本的语言。         |
| [media](https://www.w3school.com.cn/tags/att_link_media.asp) |                        *media_query*                         |    规定被链接文档将被显示在什么设备上。     |
| [referrerpolicy](https://www.w3school.com.cn/tags/att_link_referrerpolicy.asp) | no-referrer<br />no-referrer-when-downgrade<br />origin<br />origin-when-cross-origin<br />unsafe-url |   规定在获取资源时要使用的引荐来源信息。    |
|   [rel](https://www.w3school.com.cn/tags/att_link_rel.asp)   | alternate<br />author<br />help<br />icon<br />licence<br />next<br />pingback<br />prefetch<br />prev<br />search<br />sidebar<br />stylesheet<br />tag |    规定当前文档与被链接文档之间的关系。     |
|   [rev](https://www.w3school.com.cn/tags/att_link_rev.asp)   |                   *reversed relationship*                    |              HTML5 中不支持。               |
| [sizes](https://www.w3school.com.cn/tags/att_link_sizes.asp) |                   height * width<br />any                    | 规定被链接资源的尺寸。仅适用于 rel="icon"。 |
| [target](https://www.w3school.com.cn/tags/att_link_target.asp) |  _blank<br />_self<br />_top<br />_parent<br />*frame_name*  |             `HTML5 中不支持。`              |
|  [type](https://www.w3school.com.cn/tags/att_link_type.asp)  |                         *MIME_type*                          |        规定被链接文档的 MIME 类型。         |

> #### MIME 类型
>
> MIME (Multipurpose Internet Mail Extensions) 是`描述消息内容类型的标准`，用来表示文档、文件或字节流的性质和格式。
>
> MIME 消息能包含文本、图像、音频、视频以及其他应用程序专用的数据。
>
> 浏览器通常使用 MIME 类型（而不是文件扩展名）来确定如何处理URL，因此 We b服务器在响应头中添加正确的 MIME 类型非常重要。如果配置不正确，浏览器可能会无法解析文件内容，网站将无法正常工作，并且下载的文件也会被错误处理。
>
> 
>
> MIME 的组成结构非常简单，由`类型`与`子类型`两个字符串`中间用 **/** 分隔`而组成，**不允许有空格**。`type` 表示`可以被分多个子类的独立类别`，`subtype` 表示`细分后的每个类型`。
>
> MIME类型**对大小写不敏感**，但是传统写法都是小写。
>
> 两种主要的 MIME 类型在默认类型中扮演了重要的角色：
>
> - **text/plain** 表示文本文件的默认值。
> - **application/octet-stream** 表示所有其他情况的默认值。
>
> 
>
> 
>
> #### 常见的 MIME 类型
>
> - 超文本标记语言文本 **.html、.html**：**text/html**
> - 普通文本 **.txt**： **text/plain**
> - RTF 文本 **.rtf**： **application/rtf**
> - GIF 图形 **.gif**： **image/gif**
> - JPEG 图形 **.jpeg、.jpg**： **image/jpeg**
> - au 声音文件 **.au**： **audio/basic**
> - MIDI 音乐文件 **mid、.midi**： **audio/midi、audio/x-midi**
> - RealAudio 音乐文件 **.ra、.ram**： **audio/x-pn-realaudio**
> - MPEG 文件 **.mpg、.mpeg**： **video/mpeg**
> - AVI 文件 **.avi**： **video/x-msvideo**
> - GZIP 文件 **.gz**： **application/x-gzip**
> - TAR 文件 **.tar**： **application/x-tar**
>
> 
>
> 
>
> | 类型          | 描述                                                         | 典型示例                                                     |
> | :------------ | :----------------------------------------------------------- | :----------------------------------------------------------- |
> | `text`        | 表明文件是普通文本，理论上是人类可读                         | `text/plain`, `text/html`, `text/css, text/javascript`       |
> | `image`       | 表明是某种图像。不包括视频，但是动态图（比如动态gif）也使用image类型 | `image/gif`, `image/png`, `image/jpeg`, `image/bmp`, `image/webp`, `image/x-icon`, `image/vnd.microsoft.icon` |
> | `audio`       | 表明是某种音频文件                                           | `audio/midi`, `audio/mpeg, audio/webm, audio/ogg, audio/wav` |
> | `video`       | 表明是某种视频文件                                           | `video/webm`, `video/ogg`                                    |
> | `application` | 表明是某种二进制数据                                         | `application/octet-stream`, `application/pkcs12`, `application/vnd.mspowerpoint`, `application/xhtml+xml`, `application/xml`, `application/pdf` |

> [MIME 类型详情链接](https://www.runoob.com/http/mime-types.html)

## 实际用法

- 要`链接一个外部的样式表`，你需要像这样在你的`<head>`中包含一个`<link>`元素：

```html
<link href="main.css" rel="stylesheet"/>
```

在这个简单的例子中，使用了 `href` 属性设置外部资源的路径，并设置 `rel` 属性的值为“`stylesheet`”(样式表)。`rel` 表示“关系 (relationship) ”，它可能是`<link>`元素其中一个关键的特性——属性值表示`<link>`项的链接方式与包含它的文档之间的关系。

- 这里有一些你经常遇到的其它类型。例如，这里是一个`网站图标`的链接：

```html
<link rel="icon" href="favicon.ico"/>
```

- 还有一些其它的与图标相关的`rel`值，主要`用于表示不同移动平台上特殊的图标类型`，例如：

```html
<link rel="apple-touch-icon-precomposed" 
      sizes="114x114"
      href="apple-icon-114.png" 
      type="image/png"/>
```

`sizes`属性表示图标大小，`type`属性包含了链接资源的 `MIME 类型`。这些属性为浏览器选择最合适的图标提供了有用的提示。

- 你也可以提供一个`媒体类型`，或者在`media`属性内部进行查询；这种资源将只在**满足媒体条件(结果为`true`)**的情况下才被加载进来。例如：

```html
<link href="print.css" rel="stylesheet" media="print"/>
<link href="mobile.css" rel="stylesheet" media="screen and (max-width: 600px)"/>
```

- `<link>`也加入了一些新的有意思的性能和安全特性。举例如下：

```html
<link rel="preload" 
      href="myFont.woff2" 
      as="font"
      type="font/woff2" 
      crossorigin="anonymous"/>
```

将`rel`设定为`preload`，表示浏览器应该`预加载`该资源 (更多细节见[使用 rel="preload"预加载内容 (en-US)](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preload)) 。`as`属性表示**获取特定的内容类**。`crossorigin`属性表示该资源**是否应该使用一个[CORS](https://developer.mozilla.org/zh-CN/docs/Glossary/CORS)请求来获取**。

**其它用法的注解：**

- `<link>`元素可以出现在[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/head)元素或者[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/body)元素中，具体取决于它是否有一个**body-ok**的[链接类型](https://html.spec.whatwg.org/multipage/links.html#body-ok)。例如，`stylesheet`链接类型是 body-ok 的，因此`<link rel="stylesheet">`允许出现在 body 中。然而，这不是一种好的可遵循的实践方式；更合理的方式是，将你的`<link>`元素从你的 body 内容中分离出来，将其放在`<head>`中。
- 当使用`<link>`为网站创建一个 favicon 时，你的网站使用内容安全策略 (Content Security Policy，CSP) 来增强它的安全性，这种策略适用于 favicon。如果你遇到 favicon 未加载的问题，验证[`Content-Security-Policy`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy)头的[`img-src` directive (en-US)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/img-src)没有在阻止对它的访问。
- HTML 和 XHTML 规范为`<link>`元素定义了一些事件处理器 (*event handler*) ，但是对于它们的使用方法不明确。
- 在 XHTML 1.0 下，例如`<link>`的空元素需要一个尾斜杠：`<link />`。
- WebTV 支持`rel`使用`next`值，用于在一个 document series 中预加载下一页。

## 属性2.0(详解)

### as

该属性仅在`<link>`元素设置了 `rel="preload"` 或者 `rel="prefetch"` 时才能使用。它规定了`<link>元素`加载的**内容的类型**，对于内容的优先级、请求匹配、正确的[内容安全策略](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)的选择以及正确的 [`Accept`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept)请求头的设置，这个属性是必需的。

|    值    |                            应用于                            |
| :------: | :----------------------------------------------------------: |
|  audio   |                        `<audio>` 元素                        |
| document |                 `<iframe>` 和 `<frame>` 元素                 |
|  embed   |                        `<embed>` 元素                        |
|  fetch   | fetch, XHRThis value also requires `<link>` to contain the crossorigin attribute. |
|   font   |                        CSS @font-face                        |
|  image   | `<img>` and `<picture>` elements with srcset or imageset attributes, SVG `<image>` elements, CSS `*-image` rules |
|  object  |                     `<object>` elements                      |
|  script  |         `<script>` elements, Worker `importScripts`          |
|  style   |       `<link rel=stylesheet>` elements, CSS `@import`        |
|  track   |                      `<track>` elements                      |
|  video   |                      `<video>` elements                      |
|  worker  |                     Worker, SharedWorker                     |

### crossorigin

此枚举属性指定在加载相关资源时是否必须使用 `CORS`。启用 `CORS 的图片` 可以在` <canvas> 元素`中`重复使用`，并`避免其被污染`. 可取的值如下：

```diff
+ anonymous
-会发起一个跨域请求 (即包含 Origin: HTTP 头). 但不会发送任何认证信息 (即不发送 cookie, X.509 证书和 HTTP 基本认证信息). 如果服务器没有给出源站凭证 (不设置 Access-Control-Allow-Origin: HTTP 头), 资源就会被污染并限制使用.

+ use-credentials
-会发起一个带有认证信息 (发送 cookie, X.509 证书和 HTTP 基本认证信息) 的跨域请求 (即包含 Origin: HTTP 头). 如果服务器没有给出源站凭证 (不设置 Access-Control-Allow-Origin: HTTP 头), 资源就会被污染并限制使用.当不设置此属性时，资源将会不使用 CORS 加载 (即不发送 Origin: HTTP 头), 这将阻止其在 <canvas> 元素中进行使用。若设置了非法的值，则视为使用 anonymous.

+ disabled
-仅对于rel="stylesheet" ，disabled 的 Boolean 属性指示是否应加载所描述的样式表并将其应用于文档。如果在加载 HTML 时在 HTML 中指定了 Disabled，则在页面加载期间不会加载样式表。相反，如果禁用属性更改为 false 或删除时，样式表将按需加载。但是，一旦加载样式表，对 Disabled 属性的值所做的更改将不再与StyleSheet.disabled 属性的值有任何关系。相反，更改此属性的值只是启用和禁用应用于文档的样式表表单。这与 StyleSheet 的 disable 属性不同；将其更改为 true 会将样式表从文档的document.styleSheets 列表中删除，并且在切换回 false 时不会自动重新加载样式表。
```

### href

此属性指定被链接资源的`URL`。URL 可以是`绝对的`，也可以是`相对的`。

### hreflang

此属性指明了`被链接资源的语言`。其意义仅供参考。可取的值参见 [BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt)。仅当设置了 `href`属性时才应设置该属性。

### importance(实验性)

指示`资源的相对重要性`。优先级提示使用以下值委托：

- **`auto`**: 表示**没有偏好**。浏览器可以使用其自己的启发式方法来确定资源的优先级。
-  **`high`**: 向浏览器指示资源具有高优先级。
- **`low`**: 向浏览器指示资源的优先级较低。

> 只有存在` rel=“preload”`或 `rel=“prefetch”`时，`importance` 属性才能用于`<link>`元素。

### integrity(实验性)

`包含行内元数据`，它是一个你`用浏览器获取的资源文件的哈希值`，以 base64 编码的方式加的密，这样用户能用它来验证一个获取到的资源，在传送时未被非法篡改，详情查看[Subresource Integrity](https://developer.mozilla.org/zh-CN/docs/Web/Security/Subresource_Integrity)。

### media

这个属性`规定了外部资源适用的媒体类型`。它的`值必须是"媒体查询"`。这个属性使得用户代理能选择最适合设备运行的媒体类型。

- **在 HTML 4 中**，该属性只能是一组以空白符作为分隔的媒体描述文字，比如"媒体类型"规定了该元素可取的属性，如 print、screen、aural、braille。**HTML5** 将该属性值扩展为任意类型的"媒体查询"，"媒体查询"将 HTML4 的属性值都包括在内。
- 不支持"**CSS3 媒体查询**"的浏览器并不会强行识别这些链接，因此别忘了设置备用 link，即那些可用于 HTML4 的 link。

### referrerpolicy(实验性)

一个字符串，指示在获取资源时使用哪个引荐来源网址：

- `'no-referrer'` 表示[`Referer`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Referer) 标头将不会发送。
- `'no-referrer-when-downgrade'` 的原始位置时不会发送任何[`Referer`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Referer)标头。如果未指定其他政策，这是用户代理的默认行为。
- `'origin'` 意味着引荐来源网址将是页面的来源，大致是方案，主机和端口。
- `'origin-when-cross-origin'` 这意味着导航到其他来源将仅限于方案，主机和端口，而在同一来源上导航将包括引荐来源网址的路径。
- `'unsafe-url'` 意味着引荐来源网址将包含来源和路径（但不包括片段，密码或用户名）。这种情况是不安全的，因为它可能会将来源和路径从受 TLS 保护的资源泄漏到不安全的来源。

### rel

此属性命名链接文档与当前文档的关系。该属性必须是`链接类型值`的用空格分隔的列表。

### sizes

这个属性定义了包含相应资源的可视化媒体中的 `icons 的大小`。它只有在`rel`包含` icon` 的`link `类型值。它可能有如下的规则。

- `any` 表示图标可以按矢量格式缩放到任意大小，例如 `image/svg+xml`。
- 一个由空白符分隔的尺寸列表。每一个都以`<width in pixels>x<height in pixels>` 或 `<width in pixels>X<height in pixels>给出。`尺寸列表中的每一个尺寸都必须包含在资源里。

> **备注：** 大多数的` icon 格式`只能`存储一个 icon`。因此绝大多数使用 `sizes`时只包含一个值。`微软的 ICO 格式`和`苹果的 ICNS 格式`都是这样，**ICO 使用得更加广泛，推荐你使用它。**
>
> - **苹果的 IOS 系统并不支持这个属性**，于是苹果的 IPhone 以及 IPad 使用`特殊的、非标准的` **link 类型值**去定义作为 Web Clip 或开始占位符：`apple-touch-icon` 和 `apple-touch-startup-icon`。

### title

属性在`<link>`元素上有特殊的语义。当用于`<link rel="stylesheet">`时，它定义了一个**首选样式表或备用样式表**。不正确地使用它可能会导致**样式表被忽略**。

### type

这个属性被用于`定义链接的内容的类型`。这个属性的值应该是像 `text/html`，`text/css `等 **MIME 类型**。这个属性**常用的用法是定义链接的样式表**，最**常用的值是表明了 CSS 的 text/css**。

# 示例

### 引入一个 css 文件

用下面的语法来引入一个 css 文件：

```html
<link href="style.css" rel="stylesheet">
```

### 提供可替换的样式表

你也可以指定"`可替换的外部样式表`"。

用户可以在浏览器菜单 "`查看` > `页面样式`" 来选择网页的样式。通过这一办法，可以用多种样式浏览网页。

```html
<link href="default.css" rel="stylesheet" title="Default Style">
<link href="fancy.css" rel="alternate stylesheet" title="Fancy">
<link href="basic.css" rel="alternate stylesheet" title="Basic">
```

### 提供用于不同用法上下文的图标

您可以在同一页面上包含指向多个不同图标的链接，浏览器将使用`rel`和`sizes` 值作为提示来选择最适合其特定上下文的图标。

```html
<!-- third-generation iPad with high-resolution Retina display: -->
<link rel="apple-touch-icon-precomposed" sizes="144x144" href="favicon144.png">

<!-- iPhone with high-resolution Retina display: -->
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="favicon114.png">

<!-- first- and second-generation iPad: -->
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="favicon72.png">

<!-- non-Retina iPhone, iPod Touch, and Android 2.1+ devices: -->
<link rel="apple-touch-icon-precomposed" href="favicon57.png">

<!-- basic favicon -->
<link rel="icon" href="favicon32.png">
```

### 通过媒体查询有条件地加载资源

您可以在`media`属性中提供媒体类型或查询; 然后，只有在媒体条件为 true 时，才会加载此资源。例如：

```html
<link href="print.css" rel="stylesheet" media="print">
<link href="mobile.css" rel="stylesheet" media="all">
<link href="desktop.css" rel="stylesheet" media="screen and (min-width: 600px)">
<link href="highres.css" rel="stylesheet" media="screen and (min-resolution: 300dpi)">
```

### 样式表加载事件

你能够通过监听发生在样式表上的事件知道什么时候样式表加载完毕。同样的，你能够通过监听`error`事件检测到是否在加载样式表的过程中出现错误。

```html
<script>
    function sheetLoaded() {
      // Do something interesting; the sheet has been loaded
    }

    function sheetError() {
      alert("An error occurred loading the stylesheet!");
    }
</script>

<link rel="stylesheet" 
      href="mystylesheet.css" 
      onload="sheetLoaded()" 
      onerror="sheetError()">
```

> **备注：** 当样式表以及它引用的部分全部加载完毕，load 事件就会在样式表应用到内容之前立即触发。

### 预加载例子

你可以在[Preloading content with rel="preload" (en-US)](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preload)找到`<link rel="preload">`的详细例子。