## 前端开发三大基础知识

1. HTML: 构建页面，内容
2. CSS：美化页面
3. JS：让页面有一个交互动态效果

## JavaScript的组成(分为三个部分)

1. ECMAScript: 语法部分,比如if, for等等这些
2. DOM: 文档对象模型，主要提供操作页面节点的方法
3. BOM: 浏览器对象模型，主要提供操作浏览器相关的方法（比如控制浏览器的历史记录）

## JavaScript的特点

1. 脚本语言。JavaScript是一种解释型的脚本语言（边解释边执行），一般运行在浏览器中（后面还Node环境）

2. 学习相对简单

3. 基于对象

4. 动态性

5. 跨平台性

6. 弱类型

   ```js
       var an = 10
       var bn = '小明'
       int an = 10
       String bn = '小明'
   ```

## JS三种使用方式

1. 写在script标签体里（推荐把script标签放在body的最下面）

   ```js
     <script>
       alert('OK');    // 弹窗打印
       alert('佐助');   // 弹窗打印
     </script>
   ```

2. 写在外部的js文件中

   ![image-20211213150221510](https://gitee.com/CNsurly/personal-note-drawing-bed/raw/52c3f0807dbcc00a61addf88fccbe0f1f8097c4e/%E5%89%8D%E7%AB%AF/JS%E5%AD%A6%E4%B9%A0%E5%9B%BE/JS%E5%9F%BA%E7%A1%80/1_js%E5%9F%BA%E7%A1%80_%E5%BE%AA%E7%8E%AF_%E6%95%B0%E7%BB%84/image-20211213150221510.png) 

   ```js
     // 引入外部的js文件, 当使用script标签引入了外部的js文件后，标签本里边就不能再写JS
     <script src="./js/index.js"></script>
   ```

3. 写在标签行内中

   ```html
     <!-- onclick是一个点击事件，表示点击后就执行 -->
     <h1 onclick="alert('你点击了...')">佐助与鸣人的爱情故事...</h1>
   ```

## JS的打印输出

1. alert弹窗打印

   ```js
       // 弹窗打印
       alert(100);
       alert('佐助');
   ```

2. console.log控制台打印

   ```js
       // 控制台打印(可以打印多个值, 以逗号隔开)
       console.log('你好啊JS')
       console.log('你好啊JavaScript')
       console.log('你好啊', 100, 200)
   ```

3. prompt弹窗输入

   ```js
       // 弹窗输入
       console.log(prompt('请输入内容'))
   ```

4. 页面输出打印

   ```js
       // 在页面输出打印
       document.write('卡卡西老师')
       document.write('<h1 style="color: red">卡卡西老师</h1>')
   ```

## JS注释

在JS中分为两种注释，单行注释与多行注释

单行注释：//

多行注释：/*  */

```js
// 这里注释的内容(单行注释, vscode快捷键 ctrl + /)

/*
      这里注释的内容（多行注释, ctrl + shift + /）
      ...
    */
```

## JS变量

1. 定义变量（使用var操作符）

   ```js
       // 定义变量
       var username;
   ```

2. 变量赋值（使用=赋值）

   ```js
       // 变量赋值(等号左边的是变量名，右边的变量值)
       username = 'JS';
       console.log('姓名', username)
   ```

3. 定义变量初始化赋值

   ```js
       // 定义变量的同时，初始化赋值
       var age = 90;
       console.log('年龄', age);
       age = 200;
       console.log('年龄', age);
   ```

4. 定义多个变量

   ```js
       // 通过一条语句来定义多个变量
       // var age = 100;
       // var sex = '男';
       var age = 100, sex = '男';
   ```

5. 变量的默认值

   ```js
       // 如果一个变量没有赋值，则它会有一个默认值：为undefined
       var dogName;
       console.log(dogName);
   ```

6. 不使用var来定义变量（不推荐）

   ```js
       // 在JS中不使用var，可以定义变量，但必需要有初始值（也不推荐这么用）
       run = "跑步";
       console.log(run);
   ```

7. 定义重复的变量名（不推荐）

   ```js
       // 在JS中可以重复定义相同的变量名，后定义的会覆盖前面的（不建议这么做，要避免）
       var username = "小明";
       console.log(username);
       var username = "小光";
       console.log(username);
   ```

## 标识符

1. **标识符**：标识符是指变量，函数名，参数名，或者属性名；（我们自己定义的名称）

2. **标识符的命名规则：**

   a. 标识符的第一个字符必须是字母，下划线，美元符号；

   b. 但是他其它的字符可以是字母，下划线，美元符号，数字；

   c. javascript中是区分大小写的，

   d. 不能把关键字，保留字作为标识符；

   e. javascript中的命名规范,一般使用驼峰法来命名		比如：var nameString = "小明";

3. **驼峰命名法：**第一个单词首字母小写，后面的每一个单词首字母大写（比如userAge，getUserList）

4. **关键字** ：关键字是指  javascript已经使用了的词；           例如：var、for、if这些

5. **保留字** ：保留字是指  在以后可能会成为关键字的词；

## 字面量

1. 字面量（也可以叫做直接量），就是程序中直接使用的数据值；等号右边的都可以认为是字面量

2. 字面量可以分为：字符串字面量(string literal )、数组字面量(array literal)，对象字面量(object literal)，函数字面量(function literal) 等等

   ```js
       // 比如这里的'小明'就是一个字面量，它可以赋值给一个变量，也可以直接使用打印输出
       var username = '小明';
       console.log(username)
       console.log('小明')
   ```

## 运算符

### 加减乘除，取模运算

```js
    var num1 = 100;
    var num2 = 200;

    // 加法运算
    var num3 = num1 + num2
    console.log('num3', num3);

    // 减法运算
    var num4 = num1 - num2;
    console.log('num4', num4);

    // 乘法运算
    var num5 = num1 * num2;
    console.log('num5', num5);

    // 除法运算
    var num6 = num1 / num2;
    console.log('num6', num6);


    // 取模运算（取余运算）
    // %前面的数小于后面的数，则取模的结果等于前面数本身
    // %前面的数大于或者等于后面的数，则取余数
    var an = 105;
    var bn = 5;
    var cn = an % bn;
    console.log(cn);
```

### 累加、累减相关

```js
    // 累加
    var an = 10;
    an += 20;   // 等同于：an = an + 20;
    console.log(an);

    // 累减
    var bn = 100;
    bn -= 30;   // 等同于：bn = 100 - 30
    console.log(bn);

    // 累乘
    var n1 = 3;
    n1 *= 2;    // 等同于：n1 = n1 * 2
    console.log(n1)

    // 累除
    var n2 = 6;
    n2 /= 3;    // 等同于：n2 = n2 / 3
    console.log(n2)


    var n3 = 6;
    n3 %= 5;    // 等同于：n3 = n3 % 5
    console.log(n3)
```

### ++ 与 --操作

1. ++ 表示自加1；-- 表示自减1

   ```js
       // ++表示在原本的基础上，累加(自加)1
       var n1 = 6;
       n1++;
       console.log(n1)
   
       // --表示在原本的基础上，累减(自减)1
       var n2 = 10;
       n2--;
       console.log(n2)
   ```

2. ++在后, 则先运算，后自加（--同理）

   ```js
       var n3 = 3;
       // 如果++在后, 则先运算，后自加
       var n4 = n3++;      
       console.log(n4, n3)	// 打印3  4
   ```

3. ++在前, 则先自加，再运算（--同理）

   ```js
       var n3 = 3;
       // 如果++在前, 则先自加，再运算
       var n4 = ++n3;         
       console.log(n4, n3);	// 打印4  4
   
   
       // --在前与在后，与++同理
       var n5 = 7;
       n6 = n5--;
       console.log(n6) // 打印7
   ```

### 关系运算符

注意：对于关系符，返回的只有两个值，就是true或者false

```js
    // <  小于号
    // <= 小于等于

    // >  大于号
    // >= 大于等于

    // == 等于（一个等号表示赋值，两个等号表示是否相同）
    // != 不等于

    var age1 = 12;
    var age2 = 30;

    // 对于关系符，返回的只有两个值，就是true或者false
    // false表示假（不成立）
    // true表示真（成立）
    console.log(age1 > age2)    // 打印false			这里的意思是 age1 大于 age2
    console.log(age1 < age2)    // 打印true

    console.log(12 != 17)       // 打印true
    console.log(17 != 17)       // 打印false

    console.log(17 == 17)       // 打印true
    console.log(12 == 17)       // 打印false
```

### 逻辑运算符

1. （ && ）逻辑与；可以理解成并且的意思；两边的条件需要全部成立才为true,只要一个不成立就为false
2. （ || ） 逻辑或；可以理解或者的意思；两边只要有一个条件成立就这true,如果两个条件全部不成立则为false
3. （ ! ） 逻辑非；表示取反，true就变成false；false就变成true

```js
    // && 逻辑与(可以理解成并且的意思，两边的条件需要全部成立才为true,只要一个不成立就为false)
    var age = 12;
    var s1 = age > 10 && age < 5;
    console.log(s1)     // 打印false

    var s2 = age > 10 && age < 20;
    console.log(s2)     // 打印true


    // || 逻辑或(可以理解或者的意思, 两边只要有一个条件成立就这true,如果两个条件全部不成立则为false)
    var price = 30;
    var s3 = price < 50 || price > 100;
    console.log(s3)   // 打印true

    var s4 = price > 100 || price < 20;
    console.log(s4)   // 打印false



    // ! 逻辑非(表示取反，true就变成false, false就变成true)
    var s5 = !(price > 100 || price < 20);
    console.log(s5)   // 打印true
```

### 逻辑运算符相关应用一

1. 逻辑与只要一个为假，则直接为false, 所以只要第一个条件不成立，则后面的判断就不执行

   ```js
       var age = 12;
       // 逻辑与只要一个为假，则直接为false, 所以只要第一个条件不成立，则后面的判断就不执行
       age > 13 && console.log('佐助') 	// 不执行打印
       age < 13 && console.log('佐助') 	// 执行打印
   ```

2. 逻辑或只要有一个为真，则直接为true, 所以只要第一个条件成立，则后面的判断就不执行

   ```js
       // 逻辑或只要有一个为真，则直接为true, 所以只要第一个条件成立，则后面的判断就不执行
       var price = 30
       price < 100 || console.log('鸣人')  // 不执行打印
       price > 40 || console.log('鸣人123')// 执行打印
   ```

### 逻辑运算符相关应用二

`注意：`在数字中0与NaN表示false；其它数字都表示true

1. （&&）逻辑与如果第一个条件为true,则返回第二个条件值

   ```js
       // 逻辑与如果第一个条件为true,则返回第二个条件值
       // var s1 = true && false;
       var s1 = true && 10;
       console.log(s1)        // 打印10
   ```

2. （&&）逻辑与如果第一个条件为不成立时，则直接返回第一个条件值

   ```js
       // 逻辑与如果第一个条件为不成立时，则直接返回第一个条件值
       // var s2 = false && true;
       var s2 = 0 && true;
       console.log(s2)               // 打印0
   ```

3. （||）逻辑或如果第一个条件不成立, 则直接返回第二个条件值

   ```js
       // 逻辑或如果第一个条件不成立, 则直接返回第二个条件值
       // var s3 = false || true;
       var s3 = false || 10;
       console.log(s3)				// 打印10
   ```

4. （||）逻辑或如果第一个条件成立，则直接返回第一个条件值

   ```js
       // 逻辑或如果第一个条件成立，则直接返回第一个条件值
       // var s4 = true || false;
       var s4 = 10 || false;
       console.log(s4)				// 打印10
   ```

## 数据类型

### 数据类型

1. 数据类型

   ​	首先要弄清楚数据是什么？比如一个人的个人信息，姓名，年龄，性别等这些就是数据；但是数据也是不同的，比如姓名一般就是汉字（字符串），年龄就是数字（数值），

   ​	所以数据也会有不同的类型

2. 数据类型可以分为两种：基本数据类型、引用数据类型

   ```js
       // 简单类型、基本类型
       var username = '王二小'   // 字符串数据类型(String类型)(在JS中所有的单引号或者双引号都是字符串)
       var age = 26             // 数值类型(Number类型)
       var isOk = true          // 布尔类型（Boolean类型）（只有两个值true/false）
       var dogName = undefined  // undefined类型（只有undefined一个值）
       var dog = null           // null类型（只有一个值）
   
   
       // 对象类型（复杂类型、引用类型）
       var obj = new Object();
   ```

### 数值(Number)类型

1. Infinity特殊值：表示 无穷大

   ```js
       var num = 2e+328
       console.log(num)              // Infinity  无穷大
   ```

2. 数值的最大值 与 最小值

   ```js
       console.log(Number.MAX_VALUE) // 最大值
       console.log(Number.MIN_VALUE) // 最小值
   ```

3. NaN值

   - NaN值与任何值做数学运算，结果都为NaN
   - NaN值不等于任何值，包括它自己
   - 可以通过isNaN()来判断一个值是不是等于NaN, 如果等于NaN，则返回true, 否则返回false

   ```js
       // NaN值，一个特殊值，属于Number类型（表示不是一个数字）
       // 1.NaN值与任何值做数学运算，结果都为NaN
       // 2.NaN值不等于任何值，包括它自己
       // 3.可以通过isNaN()来判断一个值是不是等于NaN, 如果等于NaN，则返回true, 否则返回false
       var an = NaN;
       var s1 = an * 10;
       console.log(s1)             // 打印NaN
       console.log(10 == 10)       // 打印true
       console.log(NaN == NaN)     // 打印false
       console.log(an == NaN)      // 打印false
       console.log(isNaN(an))      // 打印true
   ```

4. JS在一些运算时，特别是小数运算运算时，有可能出现数度不准确的情况（注意下就行）

   ```js
       // JS在一些运算时，特别是小数运算运算时，有可能出现数度不准确的情况
       var num1 = 0.1 + 0.2;
       console.log(num1 == 0.3)
   ```

### 字符串类型

JS中字符串都以单引号或者双引号来表示；所以在JS中所有的单引号或者双引号都是字符串

1. 字符串拼接（拼接返回结果一样是一个字符串）

   ```js
       // 字符串拼接
       var n1 = '12';
       var n2 = '20';
       var n3 = 10;
       // 当+运算时，如果有一个运算值为字符串，则拼接（拼接返回结果一样是一个字符串）
       console.log(n1 + n2);   // 打印1220
       console.log(n1 + n3);   // 打印1210
   ```

2. 字符串嵌套变量

   ```js
       // 字符串嵌套变量
       var age = 90
       console.log("小明已经" + age + "岁了，老男人了")
   ```

3. 字符串嵌套字符串

   ```js
       // 字符串嵌套字符串
       // 如果外面是单引号，则里面写双引号
       // 如果外面是双引号，则里面写单引号
       document.write("<h1 style='color: red'>佐助与鸣人的爱情结束了...</h1>")
   ```

4. 字符串转义符

   反斜杠（ \ ） 表示一个转义符

   ```js
       var s1 = "佐助与\"鸣人\"的爱情故事..."
       console.log(s1)
   
       var s2 = "小樱\n与雏田..."
       console.log(s2)
   
       var s3 = "卡卡西\t\t\t\t\t老师"
       console.log(s3)
   ```

5. 字符串长度

   ```js
       var str = '佐助与鸣人爱情故  事';
       var num = str.length  // 字符串的长度
       console.log(num)
   ```

### Null类型

```js
    // Null类型
    // 这个类型只有一个值，就是null值; 它表示空
    // 它指向一个空的地址
    var an = '';    	// 空串, 空字符串不等于null
    var bn = null;
```

### undefined类型

1. 如果一个变量没有赋值，则默认值为undefined
2. 注意：undefined == null 结果为true
3. undefined类型只有一个值，就是undefined值

```js
    // undefined类型
    // 只有一个值，就是undefined值
    // 如果一个变量没有赋值，则默认值为undefined
    // 注意：undefined == null  结果为true

    var an;
    console.log(an)                   // 打印undefined
    console.log(undefined == null)    // 打印true
    console.log(undefined === null)   // 打印false
```

### Boolean有两个值

1. true 转换数字 等于 1
2. false 转换数字 等于 0

```js
    // Boolean有两个值
    // 只有两个值：true/false
    var flag = true;
    flag = !flag;
    console.log(flag) // 打印false
```

## 类型转换

### 其它类型转换成Boolean类型

`注意：`Boolean(值)函数可以把值转换成一个true或者false

![image-20211215174743089](https://gitee.com/CNsurly/personal-note-drawing-bed/raw/52c3f0807dbcc00a61addf88fccbe0f1f8097c4e/%E5%89%8D%E7%AB%AF/JS%E5%AD%A6%E4%B9%A0%E5%9B%BE/JS%E5%9F%BA%E7%A1%80/1_js%E5%9F%BA%E7%A1%80_%E5%BE%AA%E7%8E%AF_%E6%95%B0%E7%BB%84/image-20211215174743089.png) 

1. Number类型中0和NaN转换Boolean为false;  其它全为true

   ```js
       // Number类型中0和NaN转换Boolean为false; 其它全为true
       var s1 = Boolean(10)
       console.log(s1)
       var s1 = Boolean(0)
       console.log(s1)
       var s1 = Boolean(NaN)
       console.log(s1)
   ```

2. 所有的非空字符串转换Boolean为true; 其它全为false

   ```js
       // 所有的非空字符串转换Boolean为true; 其它全为false
       var s1 = Boolean('佐助')
       console.log(s1)
       var s1 = Boolean('')
       console.log(s1)
   ```

3. null类型Boolean为false

   ```js
       // null类型Boolean为false
       var s1 = Boolean(null)
       console.log(s1)
   ```

4. undefined类型Boolean为false

   ```js
       // undefined类型Boolean为false
       var s1 = Boolean(undefined)
       console.log(s1)
   ```

### 其它类型转换成String类型

1. 把其它的值 + '' 可以返回一个字符串类型

   ```js
       // 方法：把其它的值 + '' 就可以返回一个字符串类型
       var num1 = 100 + '';        // 会转换成：'100'
       console.log(num1 + 20)
       var num2 = NaN
       console.log(num2 + '佐助')   // NaN佐助
   ```

2. 调用toString()也会返回字符串

   ```js
       // 调用toString()也会返回字符串
       var num3 = 50;
       console.log(num3.toString())
   ```

3. String(值) 会把值转换成一个字符串，然后返回

   ```js
       // String(值) 会把值转换成一个字符串，然后返回
       var s1 = String(null)
       var s1 = String(100)
       console.log(s1)
   ```

### 其它类型转换成Number类型

1. 利用减、乘、除数学运算，可以隐式的字符串转换成数字; 

   ```js
       // 利用减、乘、除数学运算，可以隐式的字符串转换成数字; 
       // 因为做这些运算时，系统会尝试着把运算符两边的运算值转换成数字; 
       // 如果转换失败，则为NaN
       var s1 = '10' - 0;
       var s1 = '10' * 1;
       var s1 = '10' / 1;
       var s1 = '佐助' - 0;
       console.log(s1);
   ```

2. Boolean值成数字时，true会变成1；false会变成0

   ```js
       // Boolean值成数字时，true会变成1；false会变成0
       var s1 = true + 10;
       console.log(s1);
       var s1 = false * 10;
       console.log(s1);
   ```

3. Number(值)把里边的值。转换成一个Number类型(显示转换)

   ```js
       // Number(值)把里边的值。转换成一个Number类型(显示转换)
       var s1 = Number('佐助')
       console.log(s1)   // 打印NaN
       var s1 = Number(undefined)
       console.log(s1)   // 打印NaN
       var s1 = Number(null)
       console.log(s1)   // 打印0
   ```

4. parseInt(字符串)

   - parseInt( )函数返回一个Number类型值，为一个整数
   - parseInt(字符串); 从字符串的第一个字符串开始，挨个提取里边的数字，直到碰到非数字的字符就停止
   - 如果第一个字符就不是一个数字，则返回NaN

   ```js
       // parseInt(字符串); 从字符串的第一个字符串开始，挨个提取里边的数字，直到碰到非数字的字符就停止；返回一个Number类型值
       // parseInt(字符串)返回的是一个整数
       // 如果第一个字符就不是一个数字，则返回NaN
       var s1 = parseInt('12.7')
       console.log(s1)
       var s1 = parseInt('100佐助')
       console.log(s1)
       var s1 = parseInt('佐助100')
       console.log(s1)
   ```

5. parseFloat(字符串)

   parseFloat()与parseInt()的作用基本一样；但是parseFloat()可以提取小数

   ```js
       // parseFloat()与parseInt()的作用基本一样
       // parseInt()取整数
       // parseFloat()可以小数
       var s2 = parseFloat('13.2')
       console.log(s2)  // 打印13.2
   ```

## typeof关键词

1. typeof 它可以返回数据 的 数据类型

2. 用法一：typeof  值

3. 用法二：typeof ( 值 )

4. `注意：`typeof只能检测出基本的数据类型值（比如number, string），不能检测出具体属于哪个类

   ```js
       // typeof: 它可以返回值数据类型
       var an = 10;
       var an = '佐助';
       var an = true;
       var an = undefined;
       // null值表示空（一个空对象）   object对象的意思
       var an = null;
       console.log(typeof an)
       var s1 = 100
       console.log(typeof s1 == 'number')
       console.log(typeof s1 == 'string')
   
       // 其它的写法
       console.log(typeof (s1))
   
       // 注意：typeof只能检测出基本的数据类型值，不能检测出具体属于哪个类
   ```

## 全等（===）

`===表示全等`；`!==表示不全等`

1. `===`与`!==`比较的值的同时，还需要比较数据类型

   ```js
       // ===与!==比较的值的同时，还需要比较数据类型
       var s1 = '10'
       var n1 = 10;
       console.log(s1 === n1)  // 打印false
       console.log(s1 !== n1)  // 打印true
   ```

2. `==`与`!=`只会比较值，不会比较数据类型

   ```js
       // ==与!=只会比较值，不会比较数据类型
       var s1 = '10'
       var n1 = 10;
       console.log(s1 == n1)   // 打印true
       console.log(s1 != n1)   // 打印false
   ```

## 流程控制

 流程就代码的执行流程；

流程控制：控制代码的执行流程

### if语句

语法：if (条件) { 条件成立时才会执行大括号 }

```js
    var age = 20;
    // if (条件) { 条件成立时才会执行大括号 }

    if (age > 100) {
      console.log('佐助')
    }

    if (age < 40) {
      console.log('小樱')
    }

    console.log('鸣人')
```

### else if语句

1. else if语句：需要放在if语句或者其它else if语句的后面，和if语句成为一个整体

2. 语法：

   ```js
         语法：
         if(条件){
           代码一
         }else if(条件){
           代码二
         }
         // 如果上面的条件不成立，则会判断下面else if条件
         // 只要碰到条件成立，则停止整体的判断
   ```

3. 示例

   ```js
       // else if语句：需要放在if语句或者其它else if语句的后面，和if语句成为一个整体
       /* 
         语法：
         if(条件){
           代码一
         }else if(条件){
           代码二
         }
         如果上面的条件不成立，则会判断下面else if条件
         只要碰到条件成立，则停止整体的判断
       */
       var price = 20;
       if (price > 60) {
         console.log('好多钱')
       } else if (price > 30) {
         console.log('一般般')
       } else if (price > 10) {
         console.log('能活着')
       } else if (price > 0) {
         console.log('活不下了...')
       }
   ```


### else语句

1. else语句需要放在if语句 或者 else if语句的后面，形成一个整体

2. else语句它不需要条件，如果上面所以有的条件都不成立，则就直接执行else大括号里边代码

   ```js
       // else语句；
       // else语句需要放在if语句 或者 else if语句的后面，形成一个整体
       // else语句它不需要条件，如果上面所以有的条件都不成立，则就直接执行else大括号里边代码
       var age = 10;
       if (age > 100) {
         console.log('age的值大于100')
       } else if (age > 20) {
         console.log('age的值大于20')
       } else {
         console.log('以上条件都不成立')
       }
   
       var price = 10;
       if (price > 20) {
         console.log('价格大于20')
       } else {
         console.log('价格不大于20')
       }
   ```

### if语句问题

1. 在if语句中，如果大括号中只有一条语句，则大括号可以不写；但是如果有多条语句时，则大括号必需写

2. 建议把大括号写上（代码的层次会清楚些）

   ```js
       var age = 8;
       if (age < 10) {
         age += 10;
         age %= 2;
       } else age -= 10
   
       console.log(age)
   ```

### 关于判断问题

1. 条件最终产生的结果是一个Boolean值（true / false）；

2. 所以在if条件判断时，不一定得大于、小于、等于这些条件；可以直接去判断某一个值，这时会自动隐匿的把值转换成一个Boolean值

   ```js
   	// 在判断时，是可以去直接判断一个值的，因为在判断时，会尝试着把这个值转成Boolean
       var sex = 0;
       if (sex) {
         console.log('男男')
       } else {
         console.log('女女')
       }
   
   
       // 1表示男，0表示女
       var sex = 0;
       var s1 = sex ? '男' : '女'
       console.log(s1)
       // var s1 = sex == 1 ? '男' : '女'
   	
   
   	// 条件恒成立
       if(true){}
   ```

   

### 三目运算符

1. 三目运算 可以理解为就是一个简单的相当一个 if(){   }   else{    }语句

2. 语法：条件 ? 值1 : 值2；      （如果条件成立，则返回冒号前面的值；如果条件不成立，则返回冒号后面的值）

   ```js
   	// if语句
   	var age = 12;
       var s1 = age < 18 ? "没成年..." : "老男人..."
       console.log(s1)
   	
   	// 三目运算
   	var age = 120;
       if (age < 18) {
         console.log("没成年...")
       } else {
         console.log("老男人...")
       }
   ```

3. 三目运算符嵌套

   ```js
       // 三目运算写法
   	var price = 20;
       var s1 = price > 60 ? "好多钱" : price > 30 ? "一般般" : "穷得死"
       console.log(s1)
   
   	// if语句写法
   	var price = 20;
       if (price > 60) {
         s1 = "好多钱"
       } else {
   
         if (price > 30) {
           s1 = "一般般"
         } else {
           s1 = "穷得死"
         }
       }
   ```

### switch语句

switch语句：会判断变量是否等于某个`case值`，如果等于则执行相应`case下面相应的代码`

default：如果上面所有的条件都不成立，则直接执行default中的代码

1. 语法

   ```js
       /* 
         switch语句：会判断变量是否等于某个值，如果等于则执行下面相应的代码
         default：如果上面所有的条件都不成立，则直接执行default中的代码
         语法：
           switch (变量) {
             case 值1:
               代码1...
               break;
             case 值2:
               代码2...
               break;
             default: {
               代码4
             }
           }
       */
   ```

2. 示例代码

   ```js
       var col = 'green'
       switch (col) {
         case 'red':
           console.log('红色')
           break;    // 表示跳出的意思（跳出当前switch语句）
         case 'blue':
           console.log('蓝色')
           break;
         case 'green':
           console.log('绿色')
           break;
         default: {
           console.log('啥也不是...')
         }
       }
   ```

### 随机数

1. `Math.random()`     会生成一个[0,1)；`包含0，但不包含1`

   ```js
       // 随机数（生成一个随机数）
       // Math.random() 会生成一个[0,1)；包含0，但不包含1
       var v1 = Math.random()
       console.log(v1)
   
   
       // 请生成一个0-100之间的随机数[0, 100)
       var v1 = Math.random() * 100
       console.log(v1)
   
   
       // 请生一个80到100之间的随机数
       var v1 = Math.random() * 20 + 80
       console.log(v1)
   
   
       // 请生一个80到100之间的随机整数(不包含100)
       // parseInt会直接去掉小数部分
       var v1 = parseInt(Math.random() * 20 + 80)
       console.log(v1)
   
   
   
       // 请生一个80到100之间的随机整数(且包含100)
       var v1 = parseInt(Math.random() * 21 + 80)
       console.log(v1)
   ```


### for循环

**什么是循环执行：**就是重复的执行某一段代码，比如重复打印输出100名“天天向上”

1. for循环语法

   ```js
   for(初始化变量; 判断条件; 改变变量表达式){  
       如果条件成立，则要执行的代码  
   }
   
   for (var i = 0; i < 3; i++) {
       console.log("天天向上...")
   }
   
   // 注意：
   // 		1、初始化变量只会在for最开始执行一次
   // 		2、中间的判断只要成立，就立刻执行大括号中的代码
   // 		3、大括号中的代码执行完成后，就又返回改变变量(比如i++)，然后再判断（以此进行循环）
   // 		4、直到条件不成立时，就循环结束了
   //      5、小括号里边的分号必需要写
   ```

2. 其它示例

   ```js
       // 从小到大打印数字 0 到 100
   	for (var i = 0; i < 100; i++) {
         console.log(i)
       }
   
       // 变量从大到小进行改变
       for (var i = 5; i > 0; i--) {
         console.log(i)
       }
   
   
       // 每加2 
       for (var i = 0; i < 100; i += 2) {
         console.log(i)
       }
   
   
       // 把变量的改变放在里边
       for (var i = 0; i < 10;) {
         console.log(i)
         i++
       }
   
   
       // 也可以变量定义到外面
       var i;
       for (i = 0; i < 10; i++) {
         console.log(i)
       }
   ```

### 死循环

一个循环语句，如果它的判断条件恒成立，则就会死循环

```js
    // 死循环（如果条件恒成立，就会死循环，一直循环不会结束）
    for (var i = 0; i < 10000;) {	// 这里的i因为一直等于0，导致条件永远成立
      console.log(i)
    }
```

### 嵌套for循环

嵌套for循环简单说，就是在一个for循环中再写入其它的for循环，形成嵌套

1. 语法

   ```js
   for (外循环的初始变量; 外循环的条件; 外循环的操作表达式) {
       for (内循环的初始变量; 内循环的条件; 内循环的操作表达式) {  
          .......;
      }
   }
   
   // 嵌套for循环
   // 可以在for循环的里边再写一个for循环
   // 外面的循环每次进来，就执行里边的for循环(重新执行)
   for (var i = 0; i < 3; i++) {
       for (var k = 0; k < 2; k++) {
           console.log('天天向上')			// 总共这里会打印 6 次
       }
   }
   // 注意：外for循环 与 里for循环定义的初始化变量不要重名
   ```

2. 其它示例

   ```js
       // 在控制中输入打印3行3列😘
       var str = '';
       for (var i = 0; i < 3; i++) {
         for (var j = 0; j < 3; j++) {
           str += '😘'
         }
         str += '\n'
       }
       console.log(str)
   
   
   
       /*
       打印以下图形
         😘😘😘😘😘 
         😘😘😘😘
         😘😘😘
         😘😘
         😘
       */
       var str = ''
       for (var i = 0; i < 5; i++) {
         for (var j = i; j < 5; j++) {
           str += '😘'
         }
         str += '\n'
       }
       console.log(str)
   
   
       /* 
       打印九九乘法表
         1*1=1
         1*2=2  2*2=4
         1*3=3  2*3=6  3*3=9
       */
       var str = ""
       for (var i = 1; i <= 3; i++) {
         // 每次重新执行，就是新的一行
         for (var j = 1; j <= i; j++) {
           str += + j + "*" + i + "=" + i * j + "\t"
         }
         // 每一行结束后，则添加一个\n进行换行
         str += '\n'
       }
       console.log(str)
   ```
   

### break与continue关键词

1. break关键词：表示跳出（可以用于跳出循环，相当于提前结束循环）

   ```js
       // break关键词：表示跳出
       for (var i = 0; i < 10; i++) {
         // 判断i是否等于5
         if (i == 5) {
           break;  // break；会跳出当前的for循环，相当于提前结束当前的for循环
         }
         console.log(i)
       }
   ```

2. continue关键词：表示跳过本次循环，直接进入一下次循环，continue不会结束循环

   ```js
       // continue表示跳过本次循环,注意本次循环continue下面的内容不执行，但continue上面的内容还是一样会执行
       for (var i = 0; i < 10; i++) {
         if (i == 5) {
           continue; // continue表示跳过本次循环，直接进入一下次循环，continue不会结束for循环
         }
         console.log(i)
       }
   ```

### while循环

1. 语法：while(条件){ 条件成立时要执行的代码... }

2. 执行流程：

   - 判断条件，条件成立就马上执行大括号中代码
   - 大括号中代码执行完，则返回再次判断，条件成立则再次执行大括号（依此循环）
   - 直到条件不成立，循环就结束

   ```js
       var i = 0
       while (i < 10) {
         console.log(i)
         i++     // i++保证成立在某一个时候不成立
       }
   
       // while循环如果条件一开始就不成立，则一次都不会执行
       while (i > 10) {
         console.log('佐助....')
       }
   ```

### do while循环

1. 语法：do{ 要执行的代码 } while( 条件 )

2.  do while执行流程：

   - 最开始会先执行大括号，执行完后再判断，判断成立马上再执行大括号
   - 大括号每次执行完，就返回再判断
   - 直到条件不成立就结束循环

   ```js
       var k = 0
       do {
         console.log(k)	// 不管下面的条件一开始是否成立，这里都会先执行一次
         k++
       } while (k > 10)
   ```

## 数组

​    数组就是一组数据的集合体，数组里边的每一个数据我们叫做元素，可以通过下标(从0开始)获取数组元素；数组一般就用于存储多个数据

### 数组的定义

1. 通过字面量的形式定义数据（就是一个中括号）

   - 注意：数组中的元素，以逗号隔开
   - 注意：数组中的元素，可以是任意类型的值

   ```js
       var arr01 = ['小明', '小红', '小花', 100, 200, true, false];
       console.log(arr01)
   ```

2. 通过new Array()来定义

   ```js
       // 通过new Array()来定义
       // var arr02 = new Array()
       var arr02 = new Array('小明', '小红', '小花')
       console.log(arr02)
   ```

### length属性

数组的length属性：它可以表示数组的长度（就是数组中元素的个数）

1. length属性表示 数组的长度

2. 数组中length属性是可以改变的，它只要改变，数组中的元素个数也会改变

3. 如果数组的变为0，则数组中的元素会清空（这也是清空数组元素的一种方式）

   ```js
       var arr = ['佐助', '鸣人', '小樱', '雏田', '姐姐']
       console.log(arr.length)     // 打印5
   
   	// 数组中length属性是可以改变的，它只要改变，数组中的元素个数也会改变
       arr.length = 100
       console.log(arr.length)
       console.log(arr)
   
       arr[99] = '第100个元素'
       console.log(arr)
   
       arr.length = 1;
       console.log(arr)
   
       // 如果数组的变为0，则数组中的元素会清空（这也是清空数组元素的一种方式）
       arr.length = 0;
       console.log(arr)
   ```

### 数组的下标

获取数组中的元素？

1. 通过下标去获取数组元素，数组中的下标从0开始，第1个元素下标为0，第2个元素下标为1，第3个元素下标为2；依此类推

   ```js
       // 获取数组元素的写法：arr[下标]
       console.log(arr[0])
       console.log(arr[3])
       console.log(arr[4])
   ```

2. 修改数组元素（通过下标获取元素，然后再重新赋值）

   ```js
       // 修改数组元素（通过下标获取元素，然后再重新赋值）
   	arr[2] = 100
       console.log(arr, arr[2])
   ```

### 循环遍历数组

1. 通过for循环可以很轻松的获取到数组中的每一个元素

   ```js
       var arr = ['佐助', '鸣人', '小樱', '雏田', '姐姐', "OK", "小明", "小红"]
       // console.log(arr[0])
       // console.log(arr[1])
       // console.log(arr[2])
       // console.log(arr[3])
       // console.log(arr[4])
       // console.log(arr[5])
       // console.log(arr[6])
       // console.log(arr[7])
   
   
       // 数组中最大的下标 == 数组元素的个数 - 1 == arr.length - 1
       // 通过循环来遍历获取数组中的每一个元素
       for (var i = 0; i < 8; i++) {
         console.log(arr[i])
       }
   
       // 写法一
       for (var i = 0; i < arr.length; i++) {
         console.log(arr[i])
       }
   
       // 写法二
       for (var i = 0; i <= arr.length - 1; i++) {
         console.log(arr[i])
       }
   ```

### 数组下标操作问题

1. 使用下标获取元素时，如果下标超出了最大下标，则会获取到一个undefined值

   ```js
       var arr = ['佐助', '鸣人', '小樱', '雏田', '姐姐', "OK", "小明", "小红"]
       // 使用下标获取元素时，如果下标超出了最大下标，则会获取到一个undefined值
       console.log(arr[8])		// 打印undefined值
   ```

2. 如果给数组一个超出了最大下标的元素赋值，则会改变数组的长度，这时超出去的下标做为最大下标

   ```js
       // 如果给数组一个超出了最大下标的元素赋值，则会改变数组的长度，这时超出去的下标做为最大下标
       arr[99] = '第100个元素'
       console.log(arr)			
       console.log(arr.length)		// 打印100
   ```

   



























































