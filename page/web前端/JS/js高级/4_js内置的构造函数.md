**面向对象的思想：自己管理自己**

**优点：**

1. 提高了代码的重用性
2. 提高了代码的可维护性
3. 提高了代码的逻辑性



### js面向对象的内置的构造函数

#### Object函数

系统的内置的构造函数，直接通过new的方式，返回一个空的对象，可以给这个空的对象添加属性。



`字面量形式产生的对象都是Object的实例化对象`

```javascript
var obj = {}   //字面量形式，Object的实例化对象
var obj = new Object();  //Object的实例化对象
```



`Object.prototype是所有对象的原型链的终点`



#### Function函数

`系统内置的构造函数`，实际上所有的function字面量的形式方法，`都是它的实例`

#### ==Function和Object之间的原型链的关系==

1. `任何函数`都是`Function的实例`，`Object也是`Function的实例
2. `Function`自己`也是自己`的实例
3. `任何对象`都是`Object的实例`

![84d8810caa3349e989a3a6c1de44f52a~tplv-k3u1fbpfcp-zoom-1.image (1904×1342) (byteimg.com)](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/84d8810caa3349e989a3a6c1de44f52a~tplv-k3u1fbpfcp-zoom-1.image)

### Array函数

任何字面量形式的数组，都是Array的实例

### Number函数

用number系统内置的构造函数的对象也可以用于计算

```javascript
var a = new Number(3);
console.log(a + 4) //7

//但是不能用于判断
var b = new Number(0);
var c = new Number(1);
if(b){
   console.log("ok") //输出ok
}
if(c){
   console.log("ok") //输出ok
}
//即new出来的Number无论结果为什么都会通过判断，不能当做boolean值，因为if里的判断对Number类型只做判断其是否存在
```



### String函数

任何字面量形式的字符串，都是String的实例

### Boolean函数

任何字面量形式的布尔类型，都是Boolean的实例

==只要是系统的内置对象，任何字面量创造的形式，都是其实例==

### *RegExp(正则表达式)函数*



