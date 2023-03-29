## BOM定义

dom是一套操作HTML标签的api(接口	方法	属性)；==》有标准

bom是一套操作浏览器的api；==》没有标准



## 常见的bom对象

|   对象    |                             描述                             |
| :-------: | :----------------------------------------------------------: |
|  window   |             代表整个浏览器的窗口，它是顶级的对象             |
| naviagtor | 代表浏览器当前的信息，通过这个对象我们可以获取用户在使用什么浏览器 |
| location  |                     浏览器当前地址的信息                     |
|  history  |                       浏览器的历史记录                       |
|  srceen   |                         用户屏幕信息                         |

### window

是js的全部的对象，一个window对象就是一个独立的窗口

所有的全局变量都是window下面的属性

```javascript
var a = "hello";
console.log(a);
console.log(window.a);
console.log(window);
```

==window对象代表根节点==

![image-20211223111224001](.\1_.assets\image-20211223111224001.png)

#### window提供了很多的人机交互的方法

##### ==对js的代码进行调试==

|    方法    |    描述    |
| :--------: | :--------: |
|  alter();  |   提示框   |
| confirm(); | 选择提示框 |
| prompt();  | 输入提示框 |

##### ==打开和关闭窗口==

###### window.open();  

可以打开一个窗口

**语法**

```javascript
window(url,name,featrues,replace);

//url:表示新窗口的url，若未填，打开空页面
//name：声明新窗口的名称
//featrues：声明要显示的浏览器的特征
```

**featrues属性**

|            属性            |          描述          |
| :------------------------: | :--------------------: |
|        height/width        |     文档显示的宽高     |
|          left/top          |     显示的x，y坐标     |
|  toolbar = yes\|no\|1\|0   | 是否显示浏览器的工具栏 |
| scrollbars = yes\|no\|1\|0 | 是否显示浏览器的滚动条 |
| location =  yes\|no\|1\|0  | 是否显示浏览器的地址栏 |

**案例**

```html
<button id="btn" onclick="btn()">
	xxxxxxxxxx
</button>
		
<script>
	function btn(){
	window.open("./原生js局部刷新.html","_blank","width=100px,height=200px,top=200px,left=600px")
	}  
        //_black   表示打开一个新的窗口
        //_self    表示当前窗口打开
    }
</script>

```

###### window.close()

关闭窗口

`window.closed`属性可以`检测当前窗口是否关闭`，如果`关闭`则返回`true`，如果`没有关闭则`返回`false`



### location

获取当前文档的url相关的信息

#### 属性

|   属性   |                   说明                    |
| :------: | :---------------------------------------: |
|   href   |              完整的url的地址              |
| protocol | 获取地址的协议，比如  `http：`，包含冒号  |
|   host   | 主机名和端口部分，比如`www.baidu.cn:8080` |
| hostname |     主机名(域名)，比如`www.baidu.cn`      |
|   port   |                 获取端口                  |
| pathname |             获取url的路径部分             |
|  search  |       查询的参数部分，包含前面的？        |
|   hash   |              获取锚点，包含#              |

##### 案例

```javascript
//   http://127.0.0.1:5500/RankingList.html

console.log(window.location.href); // http://127.0.0.1:5500/RankingList.html
console.log(window.location.protocol);// http:
console.log(window.location.host);	  //127.0.0.1:5500
console.log(window.location.hostname); //127.0.0.1
console.log(window.location.port);	   //5500


location.href = "./2.html";//可以实现页面跳转

```

#### js获取地址里的请求参数

```javascript
// http://127.0.0.1:8848/2105/Bom/bom%20day01/2.html?name=sk&age=18&sex=nv
function queryString() {
	var q = location.search.substring(1);
	var a = q.split("&");
	var o = {};
	for (var i = 0; i < a.length; i++) {
		var n = a[i].indexOf('=');
		if (n == -1) {
			continue;
		}
		ar v1 = a[i].substring(0, n); //截取等号前面的参数的名字
		var v2 = a[i].substring(n + 1); //截取等号后的参数值
		o[v1] = v2;
	}
		return o;
}
			
var obj = queryString();
console.log(obj);
console.log(obj.name);
// for(var i in obj){
//  console.log(i+"="+obj[i])
// }
```



#### 方法

|   方法    | 描述                                                         |
| :-------: | ------------------------------------------------------------ |
| reload()  | 重新加载当前页面                                             |
| replace() | 重新加载一个新的文档无效为它创建一个新的历史记录，也就是在浏览器的历史列表中，新文档就替换当前的文档，这样就不能通过单击返回按钮返回当前的文档 |

### history

history里存储了页面跳转的历史记录

|           方法           | 描述                                                         |
| :----------------------: | ------------------------------------------------------------ |
|  window.history.back()   | 在历史记录中后退                                             |
| window.history.forward() | 在历史记录中前进                                             |
| window.history.go(index) | 指定历史记录点，`index`为`正数`表示`前进`，`负数`表示`后退`，`0`表示`刷新`，例如：index为2时，表示前进两个页面，为1时，相当于window.history.forward()。 |

### screen

用户屏幕的信息，可以检测用户屏幕硬件的配置，利用这个对象可以优化程序设计，提升用户体验。

```javascript
console.log(window.screen);
console.log(window.screen.width);
console.log(window.screen.height);
```



### navigator(了解即可)

获取浏览器相关的基本信息

比如：浏览器的名称、版本等





> 所有  window.xxxx   开头的操作，window都可以省略不写
