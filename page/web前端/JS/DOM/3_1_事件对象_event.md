## 事件对象

事件处理三部分组成

**对象(dom).事件处理函数 = 函数**

```html
<button id="btn">
    
</button>

<script>
	var btn = document.getElementById("btn");
    btn.onclick = function(){
        alter("xxx");
    }
</script>

```

btn一定是一个dom对象

onclick绑定鼠标的点击事件

function匿名函数就是要被执行的函数

```html
<button id="btn">
    
</button>

<script>
	var btn = document.getElementById("btn");
    
    btn.onclick = box;//box不需要加()
    
    function box(){
        alter("xxx");
    }
    
    
</script>
```



## this关键字和上下文

上下文：值的是指向哪个对象

```html
<input type="text" id="inp">

<script>
	var inp = document.getElementById("inp");
    inp.onclick = function(){
        alter(this);//this指向inp对象
    }
</script>
```

`谁触发的，他的上下文(this的指向)就是谁`

上下文：与this关键字有关 是调用当前可执行代码的引用
this总是指向调用这个的方法的对象
js里的this 通常是当前函数的拥有者
this 是js的一个关键字 代表函数运行时自动生成的一个内部对象 只能在函数内部使用

- 作为对象的方法
  this在方法内部，this就指向调用这个方法的对象
- 函数的调用
  this指向执行环境中的全局对象（浏览器->window nodejs->global）
- 构造函数
  this所在的方法被实例对象所调用，那么this就指向这个实例对象

更改上下文方法(更改this指向的内容,可方便地实现继承)：
call(list);
apply(array);
根据call()、apply()改变上下文this指向的特性,也可以方便实现继承

```javascript
function Pet(words){
    this.words = words
    this.speak = function(){
        console.log(this.words)
    }
}

function Dog(words){
    Pet.call(this, words)
    // Pet.apply(this, arguments)
}

var dog = new Dog('wang!')

dog.speak()
```

## 事件对象

==当你触发某个事件时，会产生一个事件对象，这个事件对象`包含着所有与事件对象有关的信息` ==》`事件类型`，`坐标`，`事件源`等等。==

事件对象：我们一般称为`event对象`，这个对象是浏览器通过函数的参数的方式传递给这个函数，我们验证一下，在执行函数的时候，是否得到隐藏的参数

```html

<script>
	function add(a,b,c,d){
        console.log(arguments);
        console.log(arguments[0]);
        //arguments.callee(); //递归，自己调用自己
        console.log(arguments.length); //结果5，为实际传入参数的个数
        console.log(arguments.callee.length);//结果4，为add方法设置的形参个数
    }
    
    add(1,2,3,4,8);
    //arguments类数组，用来存储所有参数
</script>
```

```html
<input type="text" id="inp">

<script>
    inp.onclick = function(event){
       console.log(event);
        console.log(event.type);
        console.log(event.target);
    }
    //结果是个类数组，里面包含的type属性代表元素的事件类型；target代表事件目标元素
    
    
    
    //上述代码会有兼容问题
    inp.onclick = function(event){
        //解决兼容问题
       var e = event||window.event;
        console.log(e);
        console.log(e.type);
        console.log(e.target);
    }
</script>
```

![image-20211216163048669](.\4_.assets\image-20211216163048669.png)

### 鼠标事件

只有在鼠标按钮被点击的时候才会触发click事件

#### button属性

|  值  |    说明    |
| :--: | :--------: |
|  0   | 鼠标左按键 |
|  1   |  鼠标滚轮  |
|  2   |  鼠标右键  |

值为event集合对象里的button属性



### 可视区和屏幕的坐标

|  属性   |              说明               |
| :-----: | :-----------------------------: |
| clientX | 可视区x的坐标，距离左边框的位置 |
| clientY | 可视区y的坐标，距离上边框的位置 |
| screenX | 屏幕x的坐标，距离屏幕左边的位置 |
| screenY | 屏幕Y的坐标，距离屏幕上边的位置 |
|  pageX  |      距离页面左边框的距离       |
|  pageY  |      距离页面上边框的距离       |

## event对象集合图

![案例图](.\4_.assets\image-20211216170558545.png)

