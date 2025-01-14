# 原生ajax

## ajax

Asynchronous JavaScript + XML（异步JavaScript和XML）

其本身不是一种新技术，而是一个在 2005年被Jesse James Garrett提出的新术语，用来描述一种使用现有技术集合的‘新’方法，包括: [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) 或 [XHTML](https://developer.mozilla.org/en-US/docs/Glossary/XHTML),  [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS), [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript), [DOM](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model), [XML](https://developer.mozilla.org/en-US/docs/Web/XML), [XSLT](https://developer.mozilla.org/en-US/docs/Web/XSLT), 以及最重要的 [`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)。当使用结合了这些技术的AJAX模型以后， 网页应用能够快速地将增量更新呈现在用户界面上，而不需要重载（刷新）整个页面。这使得程序能够更快地回应用户的操作。

> asynchrouous js and xml
>
> 异步js和xml异步请求的技术，用来提升用户的体验。
>
> **异步：**在同一段时间可以做其他的事情。
>
> **同步：**按部就班一件一件事情做

尽管X在Ajax中代表XML, 但由于[JSON](https://developer.mozilla.org/zh-CN/docs/Glossary/JSON)的许多优势，比如更加轻量以及作为Javascript的一部分，目前JSON的使用比XML更加普遍。JSON和XML都被用于在Ajax模型中打包信息。

> *js任务队列：同步任务和异步的任务（宏任务 微任务）*

### 作用：

通过在后台与服务器进行少量的数据交换，ajax可以使网页实现异步的更新，这意味着可以不重新加载整个网页的情况下，对网页的局部进行更新。



### ajax的核心对象：

异步的js的对象`xmlhttprequest(xhr)`

#### 如何创建xmlhttprequest的核心对象

`IE5.5  6` ==>   ==>` new ActiveXobject("Microsoft.XMLHttp")`

`IE 7 8 9以上 及 主流浏览器` ==> ==>`new xmlhttprequest()`

```html
<script>
	window.onload = function(){
        var xhr = getXhr();
        console.log(xhr);
    }

    //创建xmlhttprequest核心对象(处理兼容问题)
    function getXhr(){
        var xhr = null;
        if(window.XMLHttpRequest){
            xhr = new XMLHttpRequest();
        }else{
            xhr = new ActiveXobject("Microsoft.XMLHttp");
        }
        return xhr;
    }
</script>



```

> **注意：**`XMLHttpRequest` 构造函数并不仅限于 XML 文档。它之所以使用“XML”开头是因为在它诞生之时，原先用于异步数据交换的主要格式便是XML。

发送一个 HTTP 请求，需要创建一个 `XMLHttpRequest` 对象，打开一个 URL，最后发送请求。当所有这些事务完成后，该对象将会包含一些诸如响应主体或 [HTTP status](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) 的有用信息。

### ajax提供的方法或属性

|       方法或属性        |         描述         | 值描述                                                       |
| :---------------------: | :------------------: | ------------------------------------------------------------ |
|         abort()         |       取消请求       |                                                              |
|    open(method,url)     |       创建请求       |                                                              |
|         send()          |       发送请求       |                                                              |
| getAllResponseHeaders() | 获取响应的所有http头 |                                                              |
|   setRequestHeader()    |   设置请求的消息头   |                                                              |
|      `readystate`       |     `请求的状态`     | 0 ---》尚未初始化<br>1 ---》正在发送请求<br/>2 ---》请求完成<br/>3 ---》正在接收数据<br/>4 ---》数据接收成功 |

#### open(method,url,async)创建请求

==menthod：==表示请求方式 get/post

==url：==服务器的请求地址

==async：==Boolean类型，false表示同步，true表示异步，默认异步

> 通过 `XMLHttpRequest` 生成的请求可以有两种方式来获取数据，异步模式或同步模式。请求的类型是由这个 `XMLHttpRequest` 对象的 [open()](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/open) 方法的第三个参数`async`的值决定的。如果该参数的值为 `false`，则该 `XMLHttpRequest`请求以同步模式进行，否则该过程将以异步模式完成。

#### send(body)发送请求

==body：==请求的参数

`如果是get请求时候，body为null   ==》send(null)  ,请求参数应该写在url后面`

> 请求地址  ？请求参数的name名=参数值  &   请求参数name名=参数值

`当请求为post时，body为其具体请求参数，body格式要根据具体的情况去定，body有可能是字符串，也有可能是一个json对象`



##### 什么时候用get请求，什么时候用post请求

1. 提交大量的数据的时候  ==>  post
2. 安全性来说post请求更安全



### status

有服务器返回的状态码

200：请求成功

404：资源未找到

500：服务器内部错误



> 注：xhr是否与服务器进行成功的请求响应数据必须满足以下的条件
>
> 1. xhr.readystate == 4
> 2. xhr.status == 200



### readystate

```javascript
onreadystatechange = function(){}

//当请求状态发生改变时，会触发这个事件，回调函数
```

> responseText ：服务器响应文本
>
> responseXml：服务器返回的xml的文本





> xmlhttprequest提供的很多属性、方法和事件
>
> 属性：readystate 、status 、responseText、responseXml
>
> 方法：open(请求的方式，url，异步还是同步)、
>
> ​				send()：发送请求、
>
> ​				abort()：取消请求
>
> 事件：onreadystatechange



### 发送异步请求步骤(get请求)

1. 获取核心的对象
2. 创建请求
3. 设置回调函数
4. 发送请求

#### 案例

```html
<button onclick="getInfo()">
	点我
</button>
		
<script>
	//创建xmlhttprequest核心对象(处理兼容问题)
	function getXhr() {
		var xhr = null;
		if(window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else {
			xhr = new ActiveXobject("Microsoft.XMLHttp");
		}
			return xhr;
	}
			
function getInfo(){
	var xhr = getXhr();
	xhr.open("GET","http://47.56.173.44/shopdemo/public/index.php/addons/xshop/product/getHomeProducts",true);
	xhr.onreadystatechange=function(){//onreadystatechange方法先后顺序不受影响
    if(xhr.readyState==4 && xhr.status==200){
        	var myString = xhr.responseText;
        	//string对象转换为json对象
        	var data = JSON.parse(myString);
        	console.log(data);
    	}
     xhr.send(null);
	}
}
   
</script>
```

### 发送异步请求步骤(post请求)

1. 获取核心的对象 xhr
2. 创建请求
3. 创建请求消息头
4. 设置回调函数
5. 发送请求

#### 案例

```javascript
 window.onload=function(){
			   var xhr=getxhr();
			   		   xhr.open("POST",'http://47.56.173.44/shopdemo/public/index.php/addons/xshop/nav');
			   xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
			   xhr.onreadystatechange=function(){
				    if(xhr.readyState==4&&xhr.status==200){
						console.log(xhr.responseText);
						
						
					}
				   
			   }
			   xhr.send({nav_type: [0, 1, 2]})
			   
			   
			   
		   }
		   
		   function getxhr(){
		   			   var xhr=null;
		   			   if(window.XMLHttpRequest){
		   				  xhr=new XMLHttpRequest();
		   			   }else{
		   				   xhr=new ActiveXObject("Microsoft.XMLHttp")
		   			   }
		   			   return xhr;
		   }
		
```

