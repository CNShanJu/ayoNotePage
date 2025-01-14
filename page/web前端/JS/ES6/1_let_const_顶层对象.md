[toc]



## ES6

ECMAScript 6.0（以下简称 ES6）是 JavaScript 语言的下一代标准，已经在 2015 年 6 月正式发布了。它的目标，是使得 JavaScript 语言可以用来编写复杂的大型应用程序，成为企业级开发语言。

> 是js的5.1的版本之后的下一代标准

Node.js 是 JavaScript 的服务器运行环境（runtime）。它对 ES6 的支持度更高。除了那些默认打开的功能，还有一些语法功能已经实现了，但是默认没有打开。使用下面的命令，可以查看 Node.js 默认没有打开的 ES6 实验性语法。

```markdown
// Linux & Mac
`node --v8-options | grep harmony`
// Windows
`node --v8-options | findstr harmony
```

### NodeJs 检查对ES6 支持程度

1. 检查本地是否安装Node.js

   `node -v`

2.  检查是否安装taobao cnpm(包管理工具)

   `cnpm -v`

3.  安装es-checker

   `cnpm install -g es-checker`

4. 检查Node.js 支持ES 6的程度

   `es-checker`

## let命令

ES6 新增了`let`命令，用来`声明变量`。它的用法类似于`var`，但是所声明的变量，只在`let`命令所在的代码块内有效。

let是es6新增的语法，用来声明变量，它的用法和var一样的，但是有所区别：

1. let有块级作用域
2. let不存在变量提升
3. let不能重复声明
3. 暂时性死区

### let有块级作用域

```js
{
  let a = 10;
  var b = 1;
}
congsole.log(a); // 报错  ReferenceError: a is not defined.
congsole.log(b);  // 1
```

上面代码在代码块之中，分别用`let`和`var`声明了两个变量。然后在代码块之外调用这两个变量，结果`let`声明的变量报错，`var`声明的变量返回了正确的值。这表明，`let`声明的变量只在它所在的代码块有效。

`for`循环的计数器，就很合适使用`let`命令。

#### 示例

```js
var a = [];
for(var i = 0; i < 10; i++) {
	a[i] = function() {
		console.log(i);
	};
}
a[6]();				//10
console.log(i);		//10
```

上面代码中，变量`i`是`var`命令声明的，在全局范围内都有效，所以全局只有一个变量`i`。每一次循环，变量`i`的值都会发生改变，而循环内被赋给数组`a`的函数内部的`console.log(i)`，里面的`i`指向的就是全局的`i`。也就是说，所有数组`a`的成员里面的`i`，指向的都是同一个`i`，导致运行时输出的是最后一轮的`i`的值，也就是 10。

```js
var a = [];
for(let i = 0; i < 10; i++) {
	a[i] = function() {
		console.log(i);
	};
}
a[6]();			//6
console.log(i); // ReferenceError: i is not defined
```

上面代码中，计数器`i`只在`for`循环体内有效，在循环体外引用就会报错。

使用`let`，声明的变量仅在块级作用域内有效，最后输出的是 6。

> 另外，`for`循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。
>
> ```js
> for (let i = 0; i < 3; i++) {
>   let i = 'abc';
>   console.log(i);
> }
> ```
>
> 上面代码正确运行，输出了 3 次`abc`。这表明函数内部的变量`i`与循环变量`i`不在同一个作用域，有各自单独的作用域。

### let不存在变量提升

`var`命令会发生“变量提升”现象，即变量可以在声明之前使用，值为`undefined`。这种现象多多少少是有些奇怪的，按照一般的逻辑，变量应该在声明语句之后才可以使用。

为了纠正这种现象，`let`命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。

```js
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;


// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```

上面代码中，变量`foo`用`var`命令声明，会发生变量提升，即脚本开始运行时，变量`foo`已经存在了，但是没有值，所以会输出`undefined`。变量`bar`用`let`命令声明，不会发生变量提升。这表示在声明它之前，变量`bar`是不存在的，这时如果用到它，就会抛出一个错误。

### 不允许重复声明

`let`不允许在`相同作用域内`，重复声明同一个变量。

```js
// 报错
function func() {
  let a = 10;
  var a = 1;
}
```

```js
// 报错
function func() {
  let a = 10;
  let a = 1;
}
```

因此，不能在函数内部重新声明参数。

```js
function func(arg) {
  let arg;
}
func() // 报错
```

```js
function func(arg) {
  {
    let arg;
  }
}
func() // 不报错
```

### 暂时性死区

只要`块级作用域内`存在`let`命令，它所声明的变量就“绑定”（binding）这个区域，`不再受外部的影响`。

```js
var tmp = 123;
if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
```

上面代码中，存在全局变量`tmp`，但是块级作用域内`let`又声明了一个局部变量`tmp`，导致后者绑定这个块级作用域，所以在`let`声明变量前，对`tmp`赋值会报错。

ES6 明确规定，如果区块中存在`let`和`const`命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

总之，在代码块内，使用`let`命令声明变量之前，该变量都是不可用的。这在语法上，称为“`暂时性死区`”（temporal dead zone，简称 `TDZ`）。

```js
if (true) {
  // TDZ开始
  tmp = 'abc'; // ReferenceError
  console.log(tmp); // ReferenceError
  let tmp; // TDZ结束
  console.log(tmp); // undefined
  tmp = 123;
  console.log(tmp); // 123
}
```

上面代码中，在`let`命令声明变量`tmp`之前，都属于变量`tmp`的“死区”。

“暂时性死区”也意味着`typeof`不再是一个百分之百安全的操作。

```js
typeof x; // ReferenceError
let x;
```

上面代码中，变量`x`使用`let`命令声明，所以在声明之前，都属于`x`的“死区”，只要用到该变量就会报错。因此，`typeof`运行时就会抛出一个`ReferenceError`。

作为比较，如果一个变量根本没有被声明，使用`typeof`反而不会报错。

```js
typeof undeclared_variable // "undefined"
```

上面代码中，`undeclared_variable`是一个不存在的变量名，结果返回“undefined”。所以，在没有`let`之前，`typeof`运算符是百分之百安全的，永远不会报错。现在这一点不成立了。这样的设计是为了让大家养成良好的编程习惯，变量一定要在声明之后使用，否则就报错。

有些“死区”比较隐蔽，不太容易发现。

```js
function bar(x = y, y = 2) {
  return [x, y];
}
bar(); // 报错
```

上面代码中，调用`bar`函数之所以报错（某些实现可能不报错），是因为参数`x`默认值等于另一个参数`y`，而此时`y`还没有声明，属于“死区”。如果`y`的默认值是`x`，就不会报错，因为此时`x`已经声明了。

```js
function bar(x = 2, y = x) {
  return [x, y];
}
bar(); // [2, 2]
```

另外，下面的代码也会报错，与`var`的行为不同。

```js
// 不报错
var x = x;
// 报错
let x = x;
// ReferenceError: x is not defined
```

上面代码报错，也是因为暂时性死区。使用`let`声明变量时，只要变量在还没有声明完成前使用，就会报错。上面这行就属于这个情况，在变量`x`的声明语句还没有执行完成前，就去取`x`的值，导致报错”x 未定义“。

ES6 规定暂时性死区和`let`、`const`语句不出现变量提升，主要是为了减少运行时错误，防止在变量声明前就使用这个变量，从而导致意料之外的行为。这样的错误在 ES5 是很常见的，现在有了这种规定，避免此类错误就很容易了。

> 总之，暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

## const 命令

1. `const`声明一个只读的常量。一旦声明，常量的值就不能改变。
2. 对于`const`来说，只声明不赋值，就会报错。
3. `const`的作用域与`let`相同：==只在声明所在的块级作用域内有效==。
4. `const`声明的`常量也是不提升`，同样存在`暂时性死区`，只能在声明的位置后面使用。
5. 与`let`一样不可重复声明

```js
const PI = 3.1415;
PI // 3.1415
PI = 3;
// TypeError: Assignment to constant variable.
```

上面代码表明改变常量的值会报错。

`const`声明的变量不得改变值，这意味着，`const`一旦声明变量，就必须立即初始化，不能留到以后赋值。

```js
const foo;
// SyntaxError: Missing initializer in const declaration
```

上面代码表示，对于`const`来说，只声明不赋值，就会报错。

`const`的作用域与`let`命令相同：只在声明所在的块级作用域内有效。

```js
if (true) {
  const MAX = 5;
}
MAX // Uncaught ReferenceError: MAX is not defined
```

`const`命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。

```js
if (true) {
  console.log(MAX); // ReferenceError
  const MAX = 5;
}
```

上面代码在常量`MAX`声明之前就调用，结果报错。

`const`声明的常量，也与`let`一样不可重复声明。

```js
var message = "Hello!";
let age = 25;
// 以下两行都会报错
const message = "Goodbye!";
const age = 30;
```

### 本质

`const`实际上保证的，并不是变量的值不得改动，而是`变量指向的那个内存地址所保存的数据不得改动`。对于`简单类型的数据`（数值、字符串、布尔值），`值`就保存在变量指向的那个内存地址，因此`等同于常量`。但对于`复合类型的数据`（主要是对象和数组），变量指向的内存地址，保存的只是`一个指向实际数据的指针`，`const`只能保证这个`指针是固定`的（即总是指向另一个固定的地址），`至于它指向的数据结构是不是可变的，就完全不能控制了`。因此，==将一个`对象声明`为`常量`必须非常小心==。

```js
const foo = {};
// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123
// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only
```

上面代码中，常量`foo`储存的是一个地址，这个地址指向一个对象。不可变的只是这个地址，即不能把`foo`指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性。

**下面是另一个例子。**

```js
const a = [];
a.push('Hello'); // 可执行
a.length = 0;    // 可执行
a = ['Dave'];    // 报错
```

上面代码中，常量`a`是一个数组，这个数组本身是可写的，但是如果将另一个数组赋值给`a`，就会报错。

**如果真的想`将对象冻结`，应该使用`Object.freeze`方法。**

```js
const foo = Object.freeze({});
// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123;
```

上面代码中，常量`foo`指向一个冻结的对象，所以添加新属性不起作用，严格模式时还会报错。

**除了将对象本身冻结，`对象的属性`也应该`冻结`。下面是一个将对象彻底冻结的函数。**

```js
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
```

## ES6 声明变量的六种方法

**ES5** 只有两种声明变量的方法：`var`命令和`function`命令。

**ES6** 除了添加`let`和`const`命令，

后面章节还会提到，另外两种声明变量的方法：`import`命令和`class`命令。

==所以，ES6 一共有 6 种声明变量的方法。==

## 顶层对象的属性

顶层对象，在`浏览器环境`指的是`window`对象，在` Node` 指的是`global`对象。`ES5` 之中，`顶层对象的属性`与`全局变量`是`等价`的。

```js
window.a = 1;
a // 1
a = 2;
window.a // 2
```

上面代码中，顶层对象的属性赋值与全局变量的赋值，是同一件事。

顶层对象的属性与全局变量挂钩，被认为是 JavaScript 语言最大的设计败笔之一。这样的设计带来了几个很大的问题，`首先是没法在编译时就报出变量未声明的错误，只有运行时才能知道`（因为全局变量可能是顶层对象的属性创造的，而属性的创造是动态的）；其次，`程序员很容易不知不觉地就创建了全局变量`（比如打字出错）；最后，`顶层对象的属性是到处可以读写的，这非常不利于模块化编程`。另一方面，`window`对象有实体含义，指的是浏览器的窗口对象，`顶层对象是一个有实体含义的对象，也是不合适的`。

ES6 为了改变这一点，一方面规定，为了保持兼容性，`var`命令和`function`命令`声明的全局变量`，`依旧是顶层对象的属性`；另一方面规定，`let`命令、`const`命令、`class`命令`声明的全局变量`，`不属于顶层对象的属性`。也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。

```js
var a = 1;
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
window.a // 1
let b = 1;
window.b // undefined
```

上面代码中，全局变量`a`由`var`命令声明，所以它是顶层对象的属性；全局变量`b`由`let`命令声明，所以它不是顶层对象的属性，返回`undefined`。

### globalThis 对象

JavaScript 语言存在一个`顶层对象`，它`提供全局环境`（即`全局作用域`），所有代码都是在这个环境中运行。但是，`顶层对象在各种实现里面是不统一的`。

- `浏览器`里面，顶层对象是`window`，但 Node 和 Web Worker 没有`window`。
- `浏览器`和 `Web Worker` 里面，`self`也指向顶层对象，但是 `Node` 没有`self`。
- `Node` 里面，顶层对象是`global`，但`其他环境都不支持`。

==同一段代码为了能够在各种环境，都能取到顶层对象，现在一般是使用`this`变量，但是有局限性。==

- `全局环境`中，`this`会返回顶层对象。但是，`Node 模块`和 `ES6 模块`中，`this`返回的是`当前模块`。
- 函数里面的`this`，如果`函数不是作为对象的方法运行，而是单纯作为函数运行`，`this`会指向顶层对象。但是，`严格模式`下，这时`this`会返回`undefined`。
- 不管是严格模式，还是普通模式，`new Function('return this')()`，`总是会返回全局对象`。但是，如果`浏览器用了 CSP`（Content Security Policy，内容安全策略），那么`eval`、`new Function`这些方法都可能无法使用。

**综上所述，很难找到一种方法，可以在所有情况下，都取到顶层对象。下面是两种勉强可以使用的方法。**

```js
// 方法一
(typeof window !== 'undefined'
   ? window
   : (typeof process === 'object' &&
      typeof require === 'function' &&
      typeof global === 'object')
     ? global
     : this);
// 方法二
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};
```

[ES2020](https://github.com/tc39/proposal-global) 在语言标准的层面，引入`globalThis`作为顶层对象。也就是说，任何环境下，`globalThis`都是存在的，都可以从它拿到顶层对象，指向全局环境下的`this`。

垫片库[`global-this`](https://github.com/ungap/global-this)模拟了这个提案，可以在所有环境拿到`globalThis`。