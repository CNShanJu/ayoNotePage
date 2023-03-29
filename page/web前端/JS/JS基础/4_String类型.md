## String类型

### 数据类型分为两种：

- 原始数据类型：string 、number 、boolean、 nudefined 、null

- 引用数据类型：Array、Date 、Function 、Error 、Object 、Math 、String 、Number 、Boolean



### 内置对象：

已经定义好的，由浏览器厂商已经实现的标准的对象，内置对象中专门封装了专门操作数据的常用的api(方法  属性)

#### 内置对象有哪些

Array、Date 、Function 、Error 、Object 、Math 、String 、Number 、Boolean





##### 内置对象中有特殊的类型

**包装对象：String 、Number 、Boolean（专门封装原始数据类型String、Number、Boolean），提供了对数据常用的内置类型**



##### 为什么要有包装类型？

只有对象才有方法

只要对原始数据类型进行操作的时候，程序就会调用特定的方法去进行操作，方法一旦调用完，包装对象就会自动销毁。



### String类型

#### 创建一个字符串有两种方式

1. 字面量形式   --->  var a = "123";(栈中)
2. 通过new这个关键字创建字符串对象  ---> var str = new String();  (堆中) 



##### new关键字：

- 只要看到new就一定是在堆中创建对象
- 只要看到new就一定是创建一个==对象(Object类型)==



#### String类型的API

- **length属性**：字符串的长度，即字符的个数

```javascript
var a = "12345";
alter(a.length);

//length是属性，所以没有括号

for（var i = 0;i<a.length;i++）{
    alter(a[i]);
}
//类数组：只有length属性，没有数组方法
```

- **str = str.toLocaleLowerCase();/toLowerCase()**   	：英文字符都转小写
- **str = str.toUpperCase(); **    											   ：英文字符都转大写
- **var char = str.charAt(index);**		         			          ：获取指定位置字符

- **var num = str.charCodeAt(index);**                          ：获取指定位置的Unicode编码

#### 字符串四大操作方法

###### 1.查找字符串

```javascript
var index = str.indexOf("要查找的字符")；
//index指的是字符所在的下标，如果没有找到，则返回-1

var index2 = str.indexOf("要查找的字符",from);
//from指定从哪个位置开始查找

var index3 = str.lastIndexOf("要查找的字符",from);
//字符从后面往前开始找
```

###### 替换关键字

```javascript
str.replace(reg[正则表达式],"新值")
```

###### 获取字符串、截取字符串

```javascript
var substr = str.slice(开始位置，长度)；

var substr = str.subString(开始位置，长度)；

//两种方法用法基本一致，slice()方法可以使用 负数(即截取从字符串最后开始)
```

###### 分隔符

```javascript
var a = "123";
var c = a.split("分割符");

//使用指定的分割符对字符串进行拆分，字符串转换为数组

```





