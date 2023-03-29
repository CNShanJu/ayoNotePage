# DOM

## 什么是DOM？

文档对象模型，dom描述的是一个层级的节点数，运用方法可以对节点进行增删改查的操作。



JavaScript 对象是**拥有属性和方法的数据**。



DOM中三个字母（Document Object Model）

- D（文档）:document,可以理解为整个web加载的网页文档

- O（对象）：object,可以理解为window的东西，每一个节点都是一个对象
- M（模型）：网页文档的树形结构





Document 对象是 HTML 文档的根节点。

Document 对象使我们可以从脚本中对 HTML 页面中的所有元素进行访问。

Document 对象是 Window 对象的一部分，可通过 window.document 属性对其进行访问

## 节点

在加载整个html页面的时候，web浏览器生成的一个树形的结构，用来描述页面的内部结构，

，dom将这些树形结构由节点组成

根节点：根标签 html



### 节点种类

元素节点：

属性节点：

文本节点：



在 HTML DOM (Document Object Model) 中 , 每一个元素都是 节点:

文档是一个文档节点。

所有的HTML元素都是元素节点。

所有 HTML 属性都是属性节点。

文本插入到 HTML 元素是文本节点。are text nodes。

注释是注释节点。



### 查找节点的方法

查找节点：找到某个元素（节点）

|           方法           |        描述        |
| :----------------------: | :----------------: |
|     getElementById()     |   根据ID查找节点   |
|  getElementByTagName()   | 通过节点名查找元素 |
| getElementsByClassName() |  通过类名查找元素  |
|      getAttribute()      |   获取节点的属性   |
|      setAttribute()      |   设置节点的属性   |
|    removeAttribute()     |    删除节点属性    |
|    getElementsByName     | 通过name名获取元素 |

#### getElementById()

参数：id名

日过找不到相应的元素则返回给元素的对象，如果不存在则返回null



window.onload：整个网页加载成功后执行



当我们通过这个方法来获取元素的时候，这个对象，我们可以访问`它的属性`（元素节点的属性）

|   属性    |         描述         |
| :-------: | :------------------: |
|  tagName  | 获取元素节点的标签名 |
| innerHTML |    获取元素的内容    |
| innerText |  获取元素的文本内容  |

```html
<div id="box">
    <span>xxx</span>
</div>

<script>
    var box = document.getElementById("box");
    console.log(box);
    console.log(box.tagName);
    console.log(box.innerHTML);
    console.log(box.innerText);
</script>

```

### getElementByTagName

这个方法返回的是一个类数组对象，这个数组保存具有相同元素名的节点列表。

类数组：只有length的属性

```html
<div>xx</div>
<div>xx</div>
<div>xx</div>

<span>xx</span>
<span>xx</span>
<span>xx</span>

<script>
	window.onload = function(){
        //获取所有div
        var arr = document.getElementByTagName("div");
        console.log(arr);
        //获取第三个div
        console.log(arr[2]);
        
        //获取所有元素
        var arr = document.getElementByTagName("*");
    }
</script>
```



### getAttribute("属性名称")

这个方法将获取某个元素的属性值，它和直接使用

IE7及以下不支持

```html
<div id="myBox" names="kakak" class="dbdb">
   	box
</div>
<script>
	var a = document.getElementById("myBox").getAttribute("names");
	console.log(a);
</script>
```



### setAttribute()

设置元素中的某个属性的值，它有两个参数的话，属性名和值；如果属性值本身已经存在，则会将其覆盖掉

IE7及以下不支持使用它设置class和style属性，IE8后解决，但不建议用setAttribute()来设置style和class

```html
<div id="myBox" names="kakak" class="dbdb">
   	box
</div>

<script>
	var a = document.getElementById("myBox").setAttribute("names","kk");
</script>
```



### removeAttribute()

这个方法用来删除属性，IE6不支持

### getElementsByClassName()

通过类名获取原素





## html属性

| 属性  |        描述         |
| :---: | :-----------------: |
|  id   |  元素节点的id名称   |
| title | 元素节点的title属性 |
| style |       css样式       |
| class |   css的元素的样式   |

上述四个属性，我们可以通过打点的方式直接获取，但如果是自定义的属性，就不能直接通过打点获得





## DOM节点

节点分为元素节点，属性节点，文本节点，而这些节点又有三个非常重要的属性nodeName，nodeType，nodeValue

| 节点的类型 | nodeName | nodeType |       nodeValue        |
| :--------: | :------: | :------: | :--------------------: |
|  元素节点  | 元素名称 |    1     |          null          |
|  属性节点  | 属性名称 |    2     |         属性值         |
|  文本节点  |  #text   |    3     | 文本内容（不包含null） |

```html
<div id="myBox" names="kakak" class="dbdb">
   <div>xxx</div>
   <div>xxxx</div>
</div>

<script>
	var box = document.getElementById("myBox").childNodes;
	console.log(box);
	for(var i=0;i<box.length;i++){
		if(box[i].nodeType==1){
			console.log("元素节点"+box[i].nodeName);
		}else if(box[i].nodeType==3){
			console.log("文本节点"+box[i].nodeName);
		}
	}
</script>

```

**注：空格也是节点，文本节点**

## 层次节点的属性

节点的划分层次：父节点、子节点、兄弟节点

当我们获取其中一个节点时，就可以使用层次节点的属性来获取相关的层次节点

|      属性       |                 描述                 |
| :-------------: | :----------------------------------: |
|   childNodes    |   获取当前元素节点下面的所有子节点   |
|   firstChild    |  获取当前元素节点下面的第一个子节点  |
|    lastChild    | 获取当前元素节点下面的最后一个子节点 |
|   parentNode    |         获取当前节点的父节点         |
| previousSibling |      获取当前节点前一个兄弟节点      |
|   nextSibling   |      获取当前节点下一个兄弟节点      |
|   attributes    |        获取当前节点的所有属性        |

**类数组**：通过don获取元素列表、arguments、字符串

只有length属性，无push等方法

### 节点的操作

对节点进行增删改查操作

|       属性       |             说明             |
| :--------------: | :--------------------------: |
|     write()      | 可以把任意字符串插入到文档中 |
| createElement()  |       创建一个元素节点       |
|  appendChild()   |  将员工新的节点追加到其尾部  |
| createTextNode() |       创建一个文本节点       |
|  removeChild()   |           删除节点           |
|  insertBefore()  |      在某个节点前面插入      |
|  replaceChild()  |          替换旧节点          |
|   cloneNode()    |           复制节点           |

