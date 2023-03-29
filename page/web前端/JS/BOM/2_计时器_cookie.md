## 定时器

| 方法                           | 描述                                                         |
| ------------------------------ | ------------------------------------------------------------ |
| `setInterval`(function(){},ms) | `无限循环执行操作`，毫秒不写浏览器有默认的，一般默认0.3秒；<br />function(){}为要执行的操作，ms表示要执行操作的间隔毫秒数 |
| clearInterval(定时器变量名);   | 清除定时器                                                   |
| setTimeout(function(){},ms)    | 延时器，间隔多久后执行该方法内要执行的操作，`只执行一次`     |

```js
var myVar;
function myFunction(){
    myVar=setTimeout(function(){alert("Hello")},3000);
}

function myStopFunction(){
    clearTimeout(myVar);
}
```



## cookies

`用来存储本地数据`

`以键值对的形式存储`

例如：

usename=admin



### 通过js的方式`创建cookie`

**js可以用document.cookie数据创建	读取	删除cookie**

```javascript
document.cookie = "usename=admin";

document.cookie = "usename=456";

//本地存储的cookie只有usename=456，因为usename同名，前面的值被后面的替换掉了
```

**还可以添加有效的时间，若未设置，默认在浏览器关闭时就会自动删除cookie**

```javascript
document.cookie = "usename=admin;expires=Fri 24 Dec 2021 20:00:00 UTC";
```

*expires表示有效时间*

**通过path参数，可以告诉浏览器属于的路径，默认情况下cookie属于当前页面**

```javascript
document.cookie = "usename=admin;expires=Fri 24 Dec 2021 20:00:00 UTC;path=/";
```

### 通过js`读取cookie`

```java
var x = document.cookie;//获取cookie
console.log(x);

//返回的x是个字符串对象
```

### js方式`删除cookie`

删除cookie的时候不需要指定cookie的值

直接把expires表示有效时间设置为过去的时间

```javascript
document.cookie = "usename=admin;expires=Fri 10 Dec 2021 20:00:00 UTC;path=/";
```

### 封装cookie

```html
		<button id="btn1" >设置</button>
		<button id="btn2" >删除cookie</button>
		<button id="btn3" >获取</button>
		
		<script>
		  window.onload=function(){
			  var btn1=document.getElementById("btn1");
			  var btn2=document.getElementById("btn2");
			  var btn3=document.getElementById("btn3");
			  btn1.onclick=function(){
				  setCookie('hobby','cy',7)
				  
			  }
			  
			  btn2.onclick=function(){
			  	removecookie('username')	 			  
			  }
			  
			  btn3.onclick=function(){
			  		var r=getCookie("age");
					console.log(r);			  
			  }
		  }
		  
          //获取cookie
		  function getCookie(cname){
			  var c=document.cookie;
			  var ca=c.split("; ");
			  // console.log(ca);
			  for(var i=0;i<ca.length;i++){
				  var c=ca[i];
				  var index=c.indexOf("=");
				  if(index!=-1){
					  if(cname==c.substring(0,index)){
						  return c.substring(index+1);
					  }
				  }
			  }
		  }
		
		
		 // 设置cookie
		 function setCookie(cname,cvalue,exdays){
			 // document.cookie="username=sk;expires=Fri 28 December 2021 20:00:00 UTC;path=/";
			 var d=new Date();
			  d.setTime(d.getTime()+(exdays*24*60*60*1000));  
			  // Fri Dec 31 2021 09:47:30 GMT+0800 (中国标准时间)
			 var expires="expires="+d;
			 document.cookie=cname+"="+cvalue+";"+expires+";path=/"
		 }
		 
         //删除cookie
		 function removecookie(cname){
			 setCookie(cname,1,-1)
		 }
		 
		 
		 
		
		
		</script>
```

