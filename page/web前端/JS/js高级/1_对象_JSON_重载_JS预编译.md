## 什么是对象

对象在js中有`狭义对象`和`广义对象`

**狭义对象**就` {}  ` 这种字面量的形式定义的对象，他是一组属性元素的集合

```javascript
var obj = {
    name:"xm",
    age:12,
    sex:"男"
}
//上面这个对象，表示的是一个人，它里面有三个属性，除了这三个属性就没有任何的东西了


//如果我们现在不用对象，用一个数组存储一组值
var person = ["xm",12,"男"]


//综上所述，对象就是一组值和语义的封装
```

**广义对象**也是一个对象，里面有属性又有方法

*`dom元素`*也是一个对象，因为可以给这个dom元素添加属性

```html
<div id="box">
    
</div>


<script>
	var box = document.getElementById("box");
    box.name = "xm";
    box.age = 22;
    console.log(box.name,box.age);
    //输出 xm 22 ==》说明自定义属性name和age添加成功，表示box是一个对象
</script>

```

==`任意可以添加属性,并且能够访问这些属性的元素都是对象`==

*`数组`*也是一个对象

*`方法(函数)`*也是一个对象

```javascript
function test(){
    
}
test.name = "xm";
console.log(test.name);
```



*`正则表达式`*也是一个对象



==即系统内置的所有引用类型，都是对象，因为他们都能够添加自定义的属性，并且能够访问这些属性==

Array 、function(){}、Object、Math、Date、Number、String、Boolean



==那什么不是对象呢？==就是系统的基本类型值（`原始数据类型`）



## 对象和json的区别

json就是js对象的表示法，是js对象的==严格子集==     

==》

1. `  json对象的key值必须加双引号`
2. `json对象没有赋值("即等号 =")`





### **为什么json对象的key必须要加双引号呢？**

json是一种数据交换格式，他是负责HTML和PHP等后台语言的信息交互格式，PHP可以从数据库得到数据，组件成json数据，前端通过ajax得到后，解析json渲染页面。

所有的语言都要求json的key值必须加引号，不然会报错，json天生是为了通讯而生的



### json提供了很多的方法

|       方法        | 描述                                                         |
| :---------------: | ------------------------------------------------------------ |
|   JSON.parse();   | 将字符串转化为JSON的对象(==json形式的字符串的key值必须是`双引号`，否者报错==) |
| JSON.stringify(); | 将一个JSON的对象格式转换成JSON的字符串                       |

```javascript
var str = "{'name':'xm'}"; //错误写法，key值name不是双引号，JSON.parse();方法会报错

var str0 = '{"name":"xm"}';
var str1 = JSON.parse(str0);//str0必须是一种json字符串格式
console.log(str1);


```



> js对象的key值可以加引号，可以不加引号，就下面情况，`key值必须加引号`
>
> 1. ```javascript
>    var obj = { 
>        2016:365 
>    }
>    console.log(obj.2016)//报错，key值2016必须加引号
>          
>    ///////////////////////////////////////////////////////
>    var obj = { 
>        "2016":365 
>    }
>    console.log(obj.2016);
>    
>    
>    ```
>
> 2. ```javascript
>    var obj = { 
>        name:365 
>    }
>    console.log(obj["name"]) //使用中括号提值key必须加引号
>    
>    ```
>
>    
>
> `注：上述引号可以是单引号，可以是双引号`

#### JSON.parse()

用来解析JSON字符串，构造由字符串描述的JavaScript值或对象。提供可选的 **reviver** 函数用以在返回之前对所得到的对象执行变换(操作)。

##### 语法

```javascript
JSON.parse(text[, reviver])
```

###### 参数

`text:`要被解析成JSON值的字符串

`reviver(可选):`转换器, 如果传入该参数(函数)，可以用来修改解析生成的原始值，调用时机在 parse 函数返回之前。

##### 异常

若传入的字符串不符合 JSON 规范，则会抛出 [`SyntaxError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError) 异常。

##### 实例

```javascript
JSON.parse('{}');              // {}
JSON.parse('true');            // true
JSON.parse('"foo"');           // "foo"
JSON.parse('[1, 5, "false"]'); // [1, 5, "false"]
JSON.parse('null');            // null
```

##### 使用reviver函数

如果指定了 `reviver` 函数，则解析出的 JavaScript 值（解析值）会经过一次转换后才将被最终返回（返回值）。更具体点讲就是：解析值本身以及它所包含的所有属性，会按照一定的顺序（从最最里层的属性开始，一级级往外，最终到达顶层，也就是解析值本身）分别的去调用 `reviver` 函数，在调用过程中，当前属性所属的对象会作为 `this` 值，当前属性名和属性值会分别作为第一个和第二个参数传入 `reviver` 中。如果 `reviver` 返回 `undefined`，则当前属性会从所属对象中删除，如果返回了其他值，则返回的值会成为当前属性新的属性值。

当遍历到最顶层的值（解析值）时，传入 `reviver` 函数的参数会是空字符串 `""`（因为此时已经没有真正的属性）和当前的解析值（有可能已经被修改过了），当前的 `this` 值会是 `{"": 修改过的解析值}`，在编写 `reviver` 函数时，要注意到这个特例。（这个函数的遍历顺序依照：从最内层开始，按照层级顺序，依次向外遍历）

```javascript
JSON.parse('{"p": 5}', function (k, v) {
    if(k === '') return v;     // 如果到了最顶层，则直接返回属性值，
    return v * 2;              // 否则将属性值变为原来的 2 倍。
});                            // { p: 10 }

JSON.parse('{"1": 1, "2": 2,"3": {"4": 4, "5": {"6": 6}}}', function (k, v) {
    console.log(k); // 输出当前的属性名，从而得知遍历顺序是从内向外的，
                    // 最后一个属性名会是个空字符串。
    return v;       // 返回原始属性值，相当于没有传递 reviver 参数。
});

// 1
// 2
// 4
// 6
// 5
// 3
// ""
```

##### JSON.parse()不允许使用逗号结尾

```javascript
// both will throw a SyntaxError
JSON.parse("[1, 2, 3, 4, ]");
JSON.parse('{"foo" : 1, }');
```

#### JSON.stringify();

将一个 JavaScript 对象或值转换为 JSON 字符串，如果指定了一个 replacer 函数，则可以选择性地替换值，或者指定的 replacer 是数组，则可选择性地仅包含数组指定的属性。

```javascript
console.log(JSON.stringify({ x: 5, y: 6 }));
// expected output: "{"x":5,"y":6}"

console.log(JSON.stringify([new Number(3), new String('false'), new Boolean(false)]));
// expected output: "[3,"false",false]"

console.log(JSON.stringify({ x: [10, undefined, function(){}, Symbol('')] }));
// expected output: "{"x":[10,null,null,null]}"

console.log(JSON.stringify(new Date(2006, 0, 2, 15, 4, 5)));
// expected output: ""2006-01-02T15:04:05.000Z""
```

##### 语法

```javascript
JSON.stringify(value[, replacer [, space]])
```

###### 参数

- `value`

  将要序列化成 一个 JSON 字符串的值。

- `replacer` 可选

  如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理；如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中；如果该参数为 null 或者未提供，则对象所有的属性都会被序列化。

- `space` 可选

  指定缩进用的空白字符串，用于美化输出（pretty-print）；如果参数是个数字，它代表有多少的空格；上限为10。该值若小于1，则意味着没有空格；如果该参数为字符串（当字符串长度超过10个字母，取其前10个字母），该字符串将被作为空格；如果该参数没有提供（或者为 null），将没有空格。

- 返回值

  一个表示给定值的JSON字符串。

##### 异常

- 当在循环引用时会抛出异常[`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError) ("cyclic object value")（循环对象值）
- 当尝试去转换 [`BigInt`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt) 类型的值会抛出[`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError) ("BigInt value can't be serialized in JSON")（BigInt值不能JSON序列化）.

[具体描述点这里](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

## 定义对象的方法(难点)

主要考虑到this的指向问题(上下文)



**对象中定义的方法其实就是这个对象的特殊属性**

```javascript
var obj = {
    name:"xm",
    age:12,
    sayhello:function(){
        console.log("hello")
    }
}

obj.sayHello();
```



**我们要研究函数的上下文，所谓上下文就是指函数里面的this指向的问题**

1. `谁调用的，this就指向谁`

   ```javascript
   var obj = {
       name:"xm",
       age:12,
       sayhello:function(){
           console.log(this.name);
       }
   }
   obj.sayHello();//xm ==》obj调用，this指obj
   
   ////////////////////////////////////////////////////////////////////
   
   var a = 200;
   function fun(){
       var a = 100;
       console.log(this.a)
   }
   fun(); //200  ==》this指window(所有的全局变量都是window的属性)
   ```

   

2. - 如果一个函数直接通过圆括号掉用，函数的上下文就是window的对象(同第一个规律一致，只是平时window都是省略不写)。

   - 所有的全局变量的都是window的属性，而函数内部的变量不是window的属性，不是任何东西的属性，它就是一个变量而已

   - 函数fun()的上下文是什么？不是看它如何定义，而是要看它被谁调用，如果fun()直接调用，则其上下文就是window

3. 函数如果作为一个对象的方法，对象的打点调用，函数的上下文就是这个对象

   ```javascript
   function fun(){
       var a = 888;
       console.log(this.a);
   }
   
   var obj = {
       "a":123,
       "b":456,
      	"c":fun;
   }
   
   obj.c(); //123  ==》obj调用，this指obj
   ```

   

4. 函数如果是事件处理函数，函数的上下文就是触发这个事件的对象

5. 如果是定时器里的函数，上下文就是window的对象

   

   ```html
   <style>
       #box{
           width:200px;
           height:200px;
       }
   </style>
   
   <div id="box">
       点我变色
   </div>
   
   <script>
   	var box = document.getElementById("box");
       
       box.onclick = function(){
           var needBg = this;
           setTimeOut(function(){
               this.style.background = "red"; //报错，this指向window，window没有style属性
               needBg.style.background = "red";//box点击后一秒，其背景变为红色
           },1000)
       }
       
       
   </script>
   ```

6. 数组的元素是一个函数，函数被数组索引调用，this就是值这个数组

   ```javascript
   var arr = {
   		"a": 123,
   		"b": 456,
   		"c": {
   			"a":789,
   			"b":112,
   			"c":fun
   	}
   }
   
   function fun() {
   	console.log(this.a);
   }
   
   arr["c"].c(); //789
   
   
   ```

   

   

​	

**arguments:是一个类数组(只有length的属性)，专门用来接收参数**

```javascript
function fun(a,b,c,d,e){
    console.log(arguments);
    console.log(arguments[0]); //88
    console.log(arguments.length); //实际参数长度 ==》3
    console.log(arguments.callee); //这个方法本身
    console.log(arguments.callee.length);	//形参的个数 ==》5
}

fun(88,44,55);

```

重载：函数名相同，里面的参数不一致

js的语法不支持重载，但是可以通过arguments模拟重载

```javascript
// 重载:函数名相同，只是里面的参数不一样而已
// js的语法不支持重载，但是我们可以通过arguments这个对象模拟的实现重载的功能
function add(a, b) {
	if(arguments.length==1){
		console.log(a);
	}else if(arguments.length==2){
		console.log(a+b);
	}
}
add(3);
add(3,4);
```





==注：谁调用就指向谁只适用于es5（put函数）==





## js预编译

### js数据类型与提升

js数据类型基本上有两种：`基本数据类型`和`引用数据类型`。

#### 1.基本数据类型

基本数据类型存储在栈区，基本上分为`五种基本数据数据类型`：

```html
number： 内存空间中就存储了一个数据，数据没有最大值和最小值
```

```html
string:字符串，通常用" "或者’ '将内容包裹起来，可以进行嵌套，但是单引号里面不能使用单引号，双引号里面不能使用双引号
```

```html
boolean:布尔类型，只有两个值true和false。在判断条件里面，除了0,''," ",null,undefined为判断结果为false，其他判断结果均为true
```

```html
undefined:没有定义，一般指的是参数没有进行定义。定义=声明+赋值。例如 var a = 3;定义指的是var a = 3;声明指的是：var a; 赋值指的是：a = 3;
```

```html
null:表示一个空对象指针，一般检测null会返回object对象。
```

#### 2.引用数据类型

引用数据类型一般存储在堆区

```html
object:对象，一般对象包括多个数值对。obj={name:"yezi",age:18};

array:数组。arr = [1,2,3,4,5],中间用逗号隔开，下标从0开始计数，例如arr[1] = 2。
```



### 预编译

JavaScript 是一门脚本语言，其可以`不经过编译而直接运行`（这点与 Java 不同，Java 需要编译之后才能运行），但是 JavaScript 存在一个预编译的问题。



**预编译分为`全局预编译`和`局部预编译`**

- 全局预编译发生在`页面加载完成时执行`

- 而局部预编译发生在`函数执行的前一刻`。

> 1. JavaScript 脚本的运行由两个阶段组成：**预编译阶段** 和 **执行阶段**，先进行预编译，再执行语句；
>
> 2. 预编译，简单理解，就是在内存中开辟一块空间，用来存放变量和函数。在 JavaScript 中，JavaScript 会在内存中为使用 <code>var</code> 关键字声明的变量和使用 <code>function</code> 关键字声明的函数开辟一块空间，用来存放使用这两者声明的变量和函数；
>
> 3. 在预编译时，<code>function</code> 的优先级比 <code>var</code> 高，如：
>
>    ```javascript
>    function a(){};
>    var a = 1;
>    ```
>
>    此时 <code>a</code> 的类型是 <code>function</code>，而不是 <code>number</code>；
>
> 4. ==***注意：预编译时并不会对变量进行赋值（即不会进行初始化），变量赋值是在 JavaScript 脚本执行阶段进行的。***==

#### ***js运行三步曲***

1. 语法分析
2. ==预编译==
3. 解释执行



##### ***==全局预编译==的3个步骤：***

1. 创建GO对象（Global Object）全局对象。
2. 找变量声明，将变量名作为GO属性名，值为undefined
3. 查找函数声明，作为GO属性，值赋予函数体

 

##### ***==局部预编译==的4个步骤***

1. 创建AO对象（Activation Object）执行期上下文。
2. 找形参和变量声明，将变量和形参名作为AO属性名，值为undefined
3. 将实参值和形参统一。
4. 在函数体里面找函数声明，值赋予函数体。



#### 实例

[JavaScript - 预编译 - 简书 (jianshu.com)](https://www.jianshu.com/p/a91cddc5c705)

[02-数据类型和提升（内含js相关案例）_沈川希的博客-CSDN博客](https://blog.csdn.net/weixin_45344023/article/details/107391465)

[03-js提升与闭包练习题_沈川希的博客-CSDN博客_js闭包练习题](https://blog.csdn.net/weixin_45344023/article/details/107428647)



```javascript
var a;
function fun(){}
function abc(){}
function a(){}
console.log(a);
var a = 100;
console.log(a);

//全局预编译的3个步骤：

//1.创建GO对象（Global Object）全局对象。
//GO={}

//2.找变量声明，将变量名作为GO属性名，值为undefined
//GO={a:undefined}

//3查找函数声明，作为GO属性，值赋予函数体
//GO={a:function(){},fun:function(){},abc:function(){}}


//结果：ƒ a() {}     100
```



### 总结：

总之，要理解预编译，只要弄清两点：**变量/函数声明** 与 **变量赋值**。在预编译阶段，只进行 **变量/函数声明**，不会进行变量的初始化（即变量赋值，所有变量的值都是 <code>undefined</code>）；**变量赋值** 是在执行阶段才进行的。

