## this指向

### call()------apply()------bind()

**共同点：改变this的指向**

```javascript
var age = 18;

var ojb= {
    name:"sd",
    age:17;
}

function fun(){
    console.log(this.age); 
}


fun(); //18
fun.call(ojb);//17
fun.apply(ojb);//17
fun.bind(ojb)();//17
```

**区别：体现在传递的参数上**

==call()：==里的参数必须用逗号隔开      ===》`fun.call(指向对象，参数1，参数2..........)`

==apply():==里面有参数的话，参数应该以数组的形式传入 ===》`fun.apply(指向对象，[参数1，参数2...])`

==bind()：==绑定的对象不能直接执行，只是指代该对象  ===》`fun.bind(指向对象)(参数1，参数2...)`

### call()

使用一个指定的 `this` 值和单独给出的一个或多个参数来调用一个函数。

> **注意：**该方法的语法和作用与 [`apply()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 方法类似，只有一个区别，就是 `call()` 方法接受的是**一个参数列表**，而 `apply()` 方法接受的是**一个包含多个参数的数组**。

#### 语法

```
function.call(thisArg, arg1, arg2, ...)
```

##### 参数

- `thisArg:`

  可选的。在 *`function`* 函数运行时使用的 `this` 值。请注意，`this`可能不是该方法看到的实际值：如果这个函数处于[非严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)下，则指定为 `null` 或 `undefined` 时会自动替换为指向全局对象，原始值会被包装。

- `arg1, arg2, ...`:

  指定的参数列表。

#### 返回值

使用调用者提供的 `this` 值和参数调用该函数的返回值。若该方法没有返回值，则返回 `undefined`。

#### 描述

`call()` 允许为不同的对象分配和调用属于一个对象的函数/方法。

`call()` 提供新的 **this** 值给当前调用的函数/方法。你可以使用 `call` 来实现继承：写一个方法，然后让另外一个新的对象来继承它（而不是在新对象中再写一次这个方法）。

#### 示例

##### 使用 `call` 方法调用父构造函数)

在一个子构造函数中，你可以通过调用父构造函数的 `call` 方法来实现继承，类似于 `Java` 中的写法。下例中，使用 `Food` 和 `Toy `构造函数创建的对象实例都会拥有在 `Product` 构造函数中添加的 `name` 属性和 `price` 属性,但 `category` 属性是在各自的构造函数中定义的。

```javascript
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}

function Toy(name, price) {
  Product.call(this, name, price);
  this.category = 'toy';
}

var cheese = new Food('feta', 5);
var fun = new Toy('robot', 40);
```

##### 使用 `call` 方法调用匿名函数

在下例中的 `for` 循环体内，我们创建了一个匿名函数，然后通过调用该函数的 `call` 方法，将每个数组元素作为指定的 `this` 值执行了那个匿名函数。这个匿名函数的主要目的是给每个数组元素对象添加一个 `print` 方法，这个 `print` 方法可以打印出各元素在数组中的正确索引号。当然，这里不是必须得让数组元素作为 `this` 值传入那个匿名函数（普通参数就可以），目的是为了演示 `call` 的用法。

```javascript
var animals = [
  { species: 'Lion', name: 'King' },
  { species: 'Whale', name: 'Fail' }
];

for (var i = 0; i < animals.length; i++) {
  (function(i) {
    this.print = function() {
      console.log('#' + i + ' ' + this.species
                  + ': ' + this.name);
    }
    this.print();
  }).call(animals[i], i);
}
```

##### 使用 `call` 方法调用函数并且指定上下文的 '`this`'

在下面的例子中，当调用 `greet` 方法的时候，该方法的`this`值会绑定到 `obj` 对象。

```javascript
function greet() {
  var reply = [this.animal, 'typically sleep between', this.sleepDuration].join(' ');
  console.log(reply);
}

var obj = {
  animal: 'cats', sleepDuration: '12 and 16 hours'
};

greet.call(obj);  // cats typically sleep between 12 and 16 hours
```



##### 使用 `**call**` 方法调用函数并且不指定第一个参数（`argument`）

在下面的例子中，我们调用了 `display` 方法，但并没有传递它的第一个参数。如果没有传递第一个参数，`this` 的值将会被绑定为全局对象。

```javascript
var sData = 'Wisen';

function display() {
  console.log('sData value is %s ', this.sData);
}

display.call();  // sData value is Wisen
```

**注意：**在严格模式下，`this` 的值将会是 `undefined`。见下文。

```javascript
'use strict';

var sData = 'Wisen';

function display() {
  console.log('sData value is %s ', this.sData);
}

display.call(); // Cannot read the property of 'sData' of undefined
```

### apply()

**`apply()`** 方法调用一个具有给定`this`值的函数，以及以一个数组（或[类数组对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections#working_with_array-like_objects)）的形式提供的参数。

> **注意：**call()方法的作用和 apply() 方法类似，区别就是`call()`方法接受的是**参数列表**，而`apply()`方法接受的是**一个参数数组**。



#### 语法

```
func.apply(thisArg, [argsArray])
```

##### 参数

- `thisArg`

  必选的。在 *`func`* 函数运行时使用的 `this` 值。请注意，`this`可能不是该方法看到的实际值：如果这个函数处于[非严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)下，则指定为 `null` 或 `undefined` 时会自动替换为指向全局对象，原始值会被包装。

- `argsArray`

  可选的。一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 `func` 函数。如果该参数的值为 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null) 或 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)，则表示不需要传入任何参数。从ECMAScript 5 开始可以使用类数组对象。 [浏览器兼容性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply#browser_compatibility) 请参阅本文底部内容。

#### 返回值

调用有指定`**this**`值和参数的函数的结果。

#### 描述

在调用一个存在的函数时，你可以为其指定一个 `this` 对象。 `this` 指当前对象，也就是正在调用这个函数的对象。 使用 `apply`， 你可以只写一次这个方法然后在另一个对象中继承它，而不用在新对象中重复写该方法。

`apply` 与 [`call()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call) 非常相似，不同之处在于提供参数的方式。`apply` 使用参数数组而不是一组参数列表。`apply` 可以使用数组字面量（array literal），如 `fun.apply(this, ['eat', 'bananas'])`，或数组对象， 如 `fun.apply(this, new Array('eat', 'bananas'))`。

你也可以使用 [`arguments`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments)对象作为 `argsArray` 参数。 `arguments` 是一个函数的局部变量。 它可以被用作被调用对象的所有未指定的参数。 这样，你在使用apply函数的时候就不需要知道被调用对象的所有参数。 你可以使用arguments来把所有的参数传递给被调用对象。 被调用对象接下来就负责处理这些参数。

从 ECMAScript 第5版开始，可以使用任何种类的类数组对象，就是说只要有一个 `length` 属性和`(0..length-1)`范围的整数属性。例如现在可以使用 [`NodeList`](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList) 或一个自己定义的类似 `{'length': 2, '0': 'eat', '1': 'bananas'}` 形式的对象。

需要注意：Chrome 14 以及 Internet Explorer 9 仍然不接受类数组对象。如果传入类数组对象，它们会抛出异常。

#### 示例

##### 用 `apply` 将数组各项添加到另一个数组

我们可以使用`push`将元素追加到数组中。由于push接受可变数量的参数，所以也可以一次追加多个元素。

但是，如果`push`的参数是数组，它会将该数组作为单个元素添加，而不是将这个数组内的每个元素添加进去，因此我们最终会得到一个数组内的数组。如果不想这样呢？`concat`符合我们的需求，但它并不是将元素添加到现有数组，而是创建并返回一个新数组。 然而我们需要将元素追加到现有数组......那么怎么做好？难道要写一个循环吗？别当然不是！

`apply`正派上用场！

```javascript
var array = ['a', 'b'];
var elements = [0, 1, 2];
array.push.apply(array, elements);
console.info(array); // ["a", "b", 0, 1, 2]
```

##### 使用`apply`和内置函数

对于一些需要写循环以遍历数组各项的需求，我们可以用`apply`完成以避免循环。

下面是示例，我们将用`Math.max`/`Math.min`求得数组中的最大/小值。

```javascript
/* 找出数组中最大/小的数字 */
var numbers = [5, 6, 2, 3, 7];

/* 使用Math.min/Math.max以及apply 函数时的代码 */
var max = Math.max.apply(null, numbers); /* 基本等同于 Math.max(numbers[0], ...) 或 Math.max(5, 6, ..) */
var min = Math.min.apply(null, numbers);

/* 对比：简单循环算法 */
max = -Infinity, min = +Infinity;

for (var i = 0; i < numbers.length; i++) {
  if (numbers[i] > max)
    max = numbers[i];
  if (numbers[i] < min)
    min = numbers[i];
}
```

注意：如果按上面方式调用`apply`，有超出JavaScript引擎参数长度上限的风险。一个方法传入过多参数（比如一万个）时的后果在不同JavaScript 引擎中表现不同。（JavaScriptCore引擎中有被硬编码的[ 参数个数上限：65536](https://bugs.webkit.org/show_bug.cgi?id=80797)）。这是因为此限制（实际上也是任何用到超大栈空间的行为的自然表现）是不明确的。一些引擎会抛出异常，更糟糕的是其他引擎会直接限制传入到方法的参数个数，导致参数丢失。比如：假设某个引擎的方法参数上限为4（实际上限当然要高得多）, 这种情况下，上面的代码执行后, 真正被传递到 `apply`的参数为 `5, 6, 2, 3` ，而不是完整的数组。

如果你的参数数组可能非常大，那么推荐使用下面这种混合策略：将数组切块后循环传入目标方法：

```javascript
function minOfArray(arr) {
  var min = Infinity;
  var QUANTUM = 32768;

  for (var i = 0, len = arr.length; i < len; i += QUANTUM) {
    var submin = Math.min.apply(null, arr.slice(i, Math.min(i + QUANTUM, len)));
    min = Math.min(submin, min);
  }

  return min;
}

var min = minOfArray([5, 6, 2, 3, 7]);
```

##### 使用apply来链接构造器

你可以使用apply来链接一个对象[构造器 (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new)，类似于Java。在接下来的例子中我们会创建一个全局[`Function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function) 对象的construct方法 ，来使你能够在构造器中使用一个类数组对象而非参数列表。

```javascript
Function.prototype.construct = function (aArgs) {
  var oNew = Object.create(this.prototype);
  this.apply(oNew, aArgs);
  return oNew;
};
```

> **注意:** 上面使用的`Object.create()`方法相对来说比较新。另一种可选的方法，请考虑如下替代方法：
>
> Using `Object.__proto__`:
>
> ```javascript
> Function.prototype.construct = function (aArgs) {
>   var oNew = {};
>   oNew.__proto__ = this.prototype;
>   this.apply(oNew, aArgs);
>   return oNew;
> };
> ```
>
> 使用闭包：
>
> ```javascript
> Function.prototype.construct = function(aArgs) {
>   var fConstructor = this, fNewConstr = function() {
>     fConstructor.apply(this, aArgs);
>   };
>   fNewConstr.prototype = fConstructor.prototype;
>   return new fNewConstr();
> };
> ```
>
> 使用 Function 构造器：
>
> ```javascript
> Function.prototype.construct = function (aArgs) {
>   var fNewConstr = new Function("");
>   fNewConstr.prototype = this.prototype;
>   var oNew = new fNewConstr();
>   this.apply(oNew, aArgs);
>   return oNew;
> };
> ```
>
> 

使用示例：

```javascript
function MyConstructor (arguments) {
    for (var nProp = 0; nProp < arguments.length; nProp++) {
        this["property" + nProp] = arguments[nProp];
    }
}

var myArray = [4, "Hello world!", false];
var myInstance = new MyConstructor(myArray); //Fix MyConstructor.construct is not a function

console.log(myInstance.property1);                // logs "Hello world!"
console.log(myInstance instanceof MyConstructor); // logs "true"
console.log(myInstance.constructor);              // logs "MyConstructor"
```

**注意：** 这个非native的`Function.construct`方法无法和一些native构造器（例如[`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date)）一起使用。 在这种情况下你必须使用[`Function.bind`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#bound_functions_used_as_constructors)方法（例如，想象有如下一个数组要用在Date构造器中： `[2012, 11, 4]`；这时你需要这样写： `new (Function.prototype.bind.apply(Date, [null].concat([2012, 11, 4])))()` – -无论如何这不是最好的实现方式并且也许不该用在任何生产环境中).

### bind()

创建一个新的函数，在 `bind()` 被调用时，这个新函数的 `this` 被指定为 `bind()` 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

#### 语法

```
function.bind(thisArg[, arg1[, arg2[, ...]]])
```

##### 参数

- `thisArg`

  调用绑定函数时作为 `this` 参数传递给目标函数的值。 如果使用[`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)运算符构造绑定函数，则忽略该值。当使用 `bind` 在 `setTimeout` 中创建一个函数（作为回调提供）时，作为 `thisArg` 传递的任何原始值都将转换为 `object`。如果 `bind` 函数的参数列表为空，或者`thisArg`是`null`或`undefined`，执行作用域的 `this` 将被视为新函数的 `thisArg`。

- `arg1, arg2, ...`

  当目标函数被调用时，被预置入绑定函数的参数列表中的参数。

#### 返回值

返回一个原函数的拷贝，并拥有指定的 **`this`** 值和初始参数。

#### 描述

**bind()** 函数会创建一个新的**绑定函数**（**bound function**，BF）。绑定函数是一个 exotic function object（怪异函数对象，ECMAScript 2015 中的术语），它包装了原函数对象。调用**绑定函数**通常会导致执行**包装函数**。
**绑定函数**具有以下内部属性：

- **[[BoundTargetFunction]]** - 包装的函数对象
- **[[BoundThis]]** - 在调用包装函数时始终作为 **this** 值传递的值。
- **[[BoundArguments]]** - 列表，在对包装函数做任何调用都会优先用列表元素填充参数列表。
- **[[Call]]** - 执行与此对象关联的代码。通过函数调用表达式调用。内部方法的参数是一个**this**值和一个包含通过调用表达式传递给函数的参数的列表。

当调用绑定函数时，它调用 **[[BoundTargetFunction]]** 上的内部方法 **[[Call]]**，就像这样 **Call(\*boundThis\*, \*args\*)**。其中，**boundThis** 是 **[[BoundThis]]**，**args** 是 **[[BoundArguments]]** 加上通过函数调用传入的参数列表。

绑定函数也可以使用 [`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) 运算符构造，它会表现为目标函数已经被构建完毕了似的。提供的 `this` 值会被忽略，但前置参数仍会提供给模拟函数。

#### 示例

##### 创建绑定函数

`bind()` 最简单的用法是创建一个函数，不论怎么调用，这个函数都有同样的 **`this`** 值。JavaScript新手经常犯的一个错误是将一个方法从对象中拿出来，然后再调用，期望方法中的 `this` 是原来的对象（比如在回调中传入这个方法）。如果不做特殊处理的话，一般会丢失原来的对象。基于这个函数，用原始的对象创建一个绑定函数，巧妙地解决了这个问题：

```javascript
this.x = 9;    // 在浏览器中，this 指向全局的 "window" 对象
var module = {
  x: 81,
  getX: function() { return this.x; }
};

module.getX(); // 81

var retrieveX = module.getX;
retrieveX();
// 返回 9 - 因为函数是在全局作用域中调用的

// 创建一个新函数，把 'this' 绑定到 module 对象
// 新手可能会将全局变量 x 与 module 的属性 x 混淆
var boundGetX = retrieveX.bind(module);
boundGetX(); // 81
```

##### 偏函数

`bind()` 的另一个最简单的用法是使一个函数拥有预设的初始参数。只要将这些参数（如果有的话）作为 `bind()` 的参数写在 `this` 后面。当绑定函数被调用时，这些参数会被插入到目标函数的参数列表的开始位置，传递给绑定函数的参数会跟在它们后面。

```javascript
function list() {
  return Array.prototype.slice.call(arguments);
}

function addArguments(arg1, arg2) {
    return arg1 + arg2
}

var list1 = list(1, 2, 3); // [1, 2, 3]

var result1 = addArguments(1, 2); // 3

// 创建一个函数，它拥有预设参数列表。
var leadingThirtysevenList = list.bind(null, 37);

// 创建一个函数，它拥有预设的第一个参数
var addThirtySeven = addArguments.bind(null, 37);

var list2 = leadingThirtysevenList();
// [37]

var list3 = leadingThirtysevenList(1, 2, 3);
// [37, 1, 2, 3]

var result2 = addThirtySeven(5);
// 37 + 5 = 42

var result3 = addThirtySeven(5, 10);
// 37 + 5 = 42 ，第二个参数被忽略
```



##### 配合 `setTimeout`

在默认情况下，使用 [`window.setTimeout()`](https://developer.mozilla.org/zh-CN/docs/Web/API/setTimeout) 时，`this` 关键字会指向 [`window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window) （或 `global`）对象。当类的方法中需要 `this` 指向类的实例时，你可能需要显式地把 `this` 绑定到回调函数，就不会丢失该实例的引用。

```javascript
function LateBloomer() {
  this.petalCount = Math.ceil(Math.random() * 12) + 1;
}

// 在 1 秒钟后声明 bloom
LateBloomer.prototype.bloom = function() {
  window.setTimeout(this.declare.bind(this), 1000);
};

LateBloomer.prototype.declare = function() {
  console.log('I am a beautiful flower with ' +
    this.petalCount + ' petals!');
};

var flower = new LateBloomer();
flower.bloom();  // 一秒钟后, 调用 'declare' 方法
```



##### 作为构造函数使用的绑定函数

**警告** :这部分演示了 JavaScript 的能力并且记录了 `bind()` 的超前用法。以下展示的方法并不是最佳的解决方案，且可能不应该用在任何生产环境中。

绑定函数自动适应于使用 [`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) 操作符去构造一个由目标函数创建的新实例。当一个绑定函数是用来构建一个值的，原来提供的 `this` 就会被忽略。不过提供的参数列表仍然会插入到构造函数调用时的参数列表之前。

```javascript
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function() {
  return this.x + ',' + this.y;
};

var p = new Point(1, 2);
p.toString(); // '1,2'

var emptyObj = {};
var YAxisPoint = Point.bind(emptyObj, 0/*x*/);

// 本页下方的 polyfill 不支持运行这行代码，
// 但使用原生的 bind 方法运行是没问题的：

var YAxisPoint = Point.bind(null, 0/*x*/);

/*（译注：polyfill 的 bind 方法中，如果把 bind 的第一个参数加上，
即对新绑定的 this 执行 Object(this)，包装为对象，
因为 Object(null) 是 {}，所以也可以支持）*/

var axisPoint = new YAxisPoint(5);
axisPoint.toString(); // '0,5'

axisPoint instanceof Point; // true
axisPoint instanceof YAxisPoint; // true
new YAxisPoint(17, 42) instanceof Point; // true
```

请注意，你不需要做特别的处理就可以创建一个和 [`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) 操作符一起使用的绑定函数。也就是说，你不需要做特别处理就可以创建一个可以被直接调用的绑定函数，即使你更希望绑定函数是用 [`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) 操作符来调用。

```javascript
// ...接着上面的代码继续的话，
// 这个例子可以直接在你的 JavaScript 控制台运行

// 仍然能作为一个普通函数来调用
// （即使通常来说这个不是被期望发生的）
YAxisPoint(13);

emptyObj.x + ',' + emptyObj.y;   //  '0,13'
```

如果你希望一个绑定函数要么只能用 [`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) 操作符，要么只能直接调用，那你必须在目标函数上显式规定这个限制。

##### 快捷调用

在你想要为一个需要特定的 **`this`** 值的函数创建一个捷径（shortcut）的时候，`bind()` 也很好用。

你可以用 [`Array.prototype.slice`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) 来将一个类似于数组的对象（array-like object）转换成一个真正的数组，就拿它来举例子吧。你可以简单地这样写：

```javascript
var slice = Array.prototype.slice;

// ...

slice.apply(arguments);
```

用 `bind()`可以使这个过程变得简单。在下面这段代码里面，`slice` 是 [`Function.prototype` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) 的 [`apply()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 方法的绑定函数，并且将 `Array.prototype` 的 [`slice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) 方法作为 **`this`** 的值。这意味着我们压根儿用不着上面那个 `apply()`调用了。

```javascript
// 与前一段代码的 "slice" 效果相同
var unboundSlice = Array.prototype.slice;
var slice = Function.prototype.apply.bind(unboundSlice);

// ...

slice(arguments);
```

## 构造函数

通过new方法也可以调用函数



### 用new运算符调用一个函数时，会经历四个步骤

1. 函数内部创建一个局部变量，是一个空的对象
2. 函数将自己的上下文指向这个空对象，所有语句中的this就是指向这个空的对象
3. 函数将指向所有的语句
4. 所有的语句执行完毕之后，函数将自动return这个对象，函数将自己的上下文返回

```javascript
function fun(){
	//var obj = {} 				 ==>由于有new，系统底层创建一个局部空变量
	this.name = "kkk";			 //==>该this指影藏的obj对象
	this.age = "14";			 //==>该this指影藏的obj对象
	//obj = {name:kkk , age:14}	 ==>obj对象被操作后的值
	//return obj				 ==>由于有new，系统底层自动返回该对象
}
var test = new fun();
console.log(test.age); //14


//上述方法fun被称作为构造函数

```

到目前为止，new可以调用函数，并且还可以返回一个对象，其实我们还可以加工以下

```javascript
function fun(a,b){
	this.name = a;			 //==>该this指影藏的obj对象
	this.age = b;			 //==>该this指影藏的obj对象
}
var test1 = new fun("sk","12");
var test2 = new fun("xm","14");
console.log(test1.age); //14


//上述方法fun被称作为构造函数

```

通过这个案例,我们知道sk和xm是不是拥有相同的属性，用new可以返回具有相同属性的对象，fun可以任务就是一个类，sk和xm是这个类的实例



==ES5没有类的概念，只有构造函数==



当一个函数被new调用时，这个就是一个构造函数，它总能返回具有相同属性群的对象，所以这个函数很神奇，像一个模具一样，总是在创造各种类似的产品



`构造函数的函数名称建议首字母大写，用于区分普通函数`



构造函数和其他函数并没有其他的区别，普通函数也可以通过new的方式来调用

`构造函数`就是一个`普通的函数`，里面可以写任意的语句，只不过`this指向的是一个空的对象`

```javascript
function fun(a,b){
	this.name = a;		
	this.age = b;
    console.log(this); 
}
var test1 = new fun("sk","12");		//fun {name: 'sk', age: '12'}
var test2 = new fun("xm","14");		//fun {name: 'xm', age: '14'}


function fun1(a,b){
	this.name = a;		
	this.age = b;
    console.log(this); 
}
var test3 = fun1("sk","12");		//Window
var test4 = fun1("xm","14");		//Window




```

