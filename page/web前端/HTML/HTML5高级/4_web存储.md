## 什么是 HTML5 Web 存储?

使用HTML5可以在本地存储用户的浏览数据。

早些时候,本地存储使用的是 cookie。但是Web 存储需要更加的安全与快速. 这些数据不会被保存在服务器上，但是这些数据只用于用户请求网站数据上.它也可以存储大量的数据，而不影响网站的性能.

数据以 键/值 对存在, web网页的数据只允许该网页访问使用。

## localStorage 和 sessionStorage 

### 客户端存储数据的两个对象为

- `localStorage` - 用于`长久保存`整个网站的数据，保存的数据没有过期时间，直到`手动去除`。
- `sessionStorage` - 用于`临时保存`同一窗口(或标签页)的数据，在`关闭窗口`或标签页之后将会删除这些数据。

### 检查浏览器是否支持 localStorage 和 sessionStorage:

在使用 web 存储前,应检查浏览器是否支持 localStorage 和 sessionStorage:

```js
if(typeof(Storage)!=="undefined") {
    // 是的! 支持 localStorage  sessionStorage 对象!    
    // 一些代码..... 
} else {    
    // 抱歉! 不支持 web 存储。
}
```

### localStorage 对象

localStorage 对象存储的数据没有时间限制。第二天、第二周或下一年之后，数据依然可用。

```js
// 存储
localStorage.setItem("sitename", "菜鸟教程");
 
// 查找
document.getElementById("result").innerHTML = "网站名：" +  localStorage.getItem("sitename");
```

- 使用 **key="sitename"** 和 **value="菜鸟教程"** 创建一个 localStorage 键/值对。
- 检索键值为 "sitename" 的值然后将数据插入 **id="result"** 的元素中。

**以上实例也可以这么写：**

```js
// 存储
localStorage.sitename = "菜鸟教程";
// 查找
document.getElementById("result").innerHTML = localStorage.sitename;
```

**移除 localStorage 中的 "sitename" :**

```js
localStorage.removeItem("sitename");
```

**不管是` localStorage`，还是 `sessionStorage`，可使用的API都相同，常用的有如下几个（以localStorage为例）**：

|               API               |       说明        |
| :-----------------------------: | :---------------: |
| localStorage.setItem(key,value) |     保存数据      |
|    localStorage.getItem(key)    |     读取数据      |
|  localStorage.removeItem(key)   |   删除单个数据    |
|      localStorage.clear()       |   删除所有数据    |
|     localStorage.key(index)     | 得到某个索引的key |

**提示:** 键/值对通常以`字符串`存储，你可以按自己的需要转换该格式。



#### 代码中的字符串值转换为数字类型:

下面的实例展示了用户点击按钮的次数。

```html
<p><button onclick="clickCounter()" type="button">点我！</button></p>
<div id="result"></div>
<p>点击该按钮查看计数器的增加。</p>
<p>关闭浏览器选项卡(或窗口),重新打开此页面,计数器将继续计数(不是重置)。</p>
```

```js
function clickCounter(){
	if(typeof(Storage)!=="undefined"){
		if (localStorage.clickcount){
			localStorage.clickcount=Number(localStorage.clickcount)+1;
		}else{
			localStorage.clickcount=1;
		}
		document.getElementById("result").innerHTML=" 你已经点击了按钮 " + localStorage.clickcount + " 次 ";
	}else{
		document.getElementById("result").innerHTML="对不起，您的浏览器不支持 web 存储。";
	}
}
```

## sessionStorage 对象

sessionStorage 方法针对一个 session 进行数据存储。`当用户关闭浏览器窗口后，数据会被删除`。

**创建并访问一个 sessionStorage：**

```js
if (sessionStorage.clickcount){
    sessionStorage.clickcount=Number(sessionStorage.clickcount)+1;
}
else{
    sessionStorage.clickcount=1;
}
document.getElementById("result").innerHTML="在这个会话中你已经点击了该按钮 " + sessionStorage.clickcount + " 次 ";
```

### Web Storage 开发一个简单的网站列表程序

**网站列表程序实现以下功能：**

- 可以输入网站名，网址，以网站名作为key存入localStorage；
- 根据网站名，查找网址；
- 列出当前已保存的所有网站；

```html
<div style="border: 2px dashed #ccc;width:320px;text-align:center;">     
        <label for="sitename">网站名(key)：</label>  
        <input type="text" id="sitename" name="sitename" class="text"/>  
        <br/>  
        <label for="siteurl">网 址(value)：</label>  
        <input type="text" id="siteurl" name="siteurl"/>  
        <br/>  
        <input type="button" onclick="save()" value="新增记录"/>  
        <hr/>  
        <label for="search_phone">输入网站名：</label>  
        <input type="text" id="search_site" name="search_site"/>  
        <input type="button" onclick="find()" value="查找网站"/>  
        <p id="find_result"><br/></p>  
</div>  
<br/>  
<div id="list">  
</div>  
<script>
	// 载入所有存储在localStorage的数据
	loadAll(); 	
		
    //保存数据  
    function save(){  
        var siteurl = document.getElementById("siteurl").value;  
        var sitename = document.getElementById("sitename").value;  
        localStorage.setItem(sitename, siteurl);
        alert("添加成功");
    }
    //查找数据  
    function find(){  
        var search_site = document.getElementById("search_site").value;  
        var siteurl = localStorage.getItem(search_site);  
        var find_result = document.getElementById("find_result");  
        find_result.innerHTML = search_site + "的网址是：" + siteurl;  
    }
    //将所有存储在localStorage中的对象提取出来，并展现到界面上
    function loadAll(){  
        var list = document.getElementById("list");  
        if(localStorage.length>0){  
            var result = "<table border='1'>";  
            result += "<tr><td>key</td><td>value</td></tr>";  
            for(var i=0;i<localStorage.length;i++){  
                var sitename = localStorage.key(i);  
                var siteurl = localStorage.getItem(sitename);  
                result += "<tr><td>"+sitename+"</td><td>"+siteurl+"</td></tr>";  
        }  
            result += "</table>";  
            list.innerHTML = result;  
        }else{  
            list.innerHTML = "数据为空……";  
        }  
    }      
</script>
```

**以上实例只是演示了简单的 localStorage 存储与查找，更多情况下我们存储的数据会更复杂。**





#### 使用 [JSON.stringify](https://www.runoob.com/js/javascript-json-stringify.html) 来存储对象数据

- `JSON.stringify`可以`将对象转换为字符串`。

- ```js
  var site = new Object;
  ...
  var str = JSON.stringify(site); // 将对象转换为字符串
  ```

#### 使用 `JSON.parse方法`将`字符串转换为 JSON 对象`

```js
var site = JSON.parse(str);
```

#### 完整实例

```html
<!DOCTYPE html>
<html>  
<head>  
    <meta charset="utf-8">  
    <title>HTML5本地存储之Web Storage篇</title>  
</head>  
<body>  
    <div style="border: 2px dashed #ccc;width:320px;text-align:center;">
        <label for="keyname">别名(key):</label>  
        <input type="text" id="keyname" name="keyname" class="text"/>  
        <br/>  
        <label for="sitename">网站名：</label>  
        <input type="text" id="sitename" name="sitename" class="text"/>  
        <br/>  
        <label for="siteurl">网 址：</label>  
        <input type="text" id="siteurl" name="siteurl"/>  
        <br/>  
        <input type="button" onclick="save()" value="新增记录"/>  
        <hr/>  
        <label for="search_phone">输入别名(key)：</label>  
        <input type="text" id="search_site" name="search_site"/>  
        <input type="button" onclick="find()" value="查找网站"/>  
        <p id="find_result"><br/></p>  
    </div>  
    <br/>  
    <div id="list">  
    </div>  
    <script>
    //保存数据  
    function save(){  
        var site = new Object;
        site.keyname = document.getElementById("keyname").value;
        site.sitename = document.getElementById("sitename").value;  
        site.siteurl = document.getElementById("siteurl").value;
        var str = JSON.stringify(site); // 将对象转换为字符串
        localStorage.setItem(site.keyname,str);  
        alert("保存成功");
    }  
    //查找数据  
    function find(){  
        var search_site = document.getElementById("search_site").value;  
        var str = localStorage.getItem(search_site);  
        var find_result = document.getElementById("find_result");
        var site = JSON.parse(str);  
        find_result.innerHTML = search_site + "的网站名是：" + site.sitename + "，网址是：" + site.siteurl;  
    }  
    
    //将所有存储在localStorage中的对象提取出来，并展现到界面上
	// 确保存储的 keyname 对应的值为转换对象，否则JSON.parse会报错
    function loadAll(){  
        var list = document.getElementById("list");  
        if(localStorage.length>0){  
            var result = "<table border='1'>";  
            result += "<tr><td>别名</td><td>网站名</td><td>网址</td></tr>";  
            for(var i=0;i<localStorage.length;i++){ 
                var keyname = localStorage.key(i);  
                var str = localStorage.getItem(keyname);  
                var site = JSON.parse(str);  
                result += "<tr><td>"+site.keyname+"</td><td>"+site.sitename+"</td><td>"+site.siteurl+"</td></tr>";  
            }  
            result += "</table>";  
            list.innerHTML = result;  
        }else{  
            list.innerHTML = "数据为空...";  
        }  
    }  
    </script>
</body>  
</html>
```

==实例中的 loadAll 输出了所有存储的数据，你需要确保 localStorage 存储的数据都为 JSON 格式，否则 JSON.parse(str) 将会报错。==

