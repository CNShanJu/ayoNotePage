# BigInteger

[toc]

### BigInteger

在Java中，由CPU原生提供的整型最大范围是64位`long`型整数。使用`long`型整数可以直接通过CPU指令进行计算，速度非常快。

如果我们使用的整数范围超过了`long`型怎么办？这个时候，就只能用软件来模拟一个大整数。`java.math.BigInteger`就是用来表示任意大小的整数。`BigInteger`内部用一个`int[]`数组来模拟一个非常大的整数：

```java
BigInteger bi = new BigInteger("1234567890");
System.out.println(bi.pow(5)); // 2867971860299718107233761438093672048294900000
```

对`BigInteger`做运算的时候，只能使用实例方法，例如，加法运算：

```java
BigInteger i1 = new BigInteger("1234567890");
BigInteger i2 = new BigInteger("12345678901234567890");
BigInteger sum = i1.add(i2); // 12345678902469135780
```

> BigInteger add(BigInteger other) 				加 
>
> BigInteger subtract(BigInteger other)		减 
>
> BigInteger multiply(BigInteger other)		乘 
>
> BigInteger divide(BigInteger other)			除
>
> 附上一个小例子 计算`2的100次方`
>
> ```java
> public class Print {
>     public static void main(String[] args) {
>         BigInteger a=BigInteger.valueOf(2);
>         for (int i = 0; i < 100; i++) {
>             a=a.multiply(BigInteger.valueOf(2));
>         }
>         System.out.println(a);//2535301200456458802993406410752
>     }
> }
> ```

和`long`型整数运算比，`BigInteger`不会有范围限制，但缺点是速度比较慢。

也可以把`BigInteger`转换成`long`型：

```java
BigInteger i = new BigInteger("123456789000");
System.out.println(i.longValue()); // 123456789000
System.out.println(i.multiply(i).longValueExact()); // java.lang.ArithmeticException: BigInteger out of long range
```

使用`longValueExact()`方法时，如果超出了`long`型的范围，会抛出`ArithmeticException`。

`BigInteger`和`Integer`、`Long`一样，也是不可变类，并且也继承自`Number`类。因为`Number`定义了转换为基本类型的几个方法：

- 转换为`byte`：`byteValue()`
- 转换为`short`：`shortValue()`
- 转换为`int`：`intValue()`
- 转换为`long`：`longValue()`
- 转换为`float`：`floatValue()`
- 转换为`double`：`doubleValue()`

因此，通过上述方法，可以把`BigInteger`转换成基本类型。如果`BigInteger`表示的范围超过了基本类型的范围，转换时将丢失高位信息，即结果不一定是准确的。如果需要准确地转换成基本类型，可以使用`intValueExact()`、`longValueExact()`等方法，在转换时如果超出范围，将直接抛出`ArithmeticException`异常。

---

如果`BigInteger`的值甚至超过了`float`的最大范围（3.4x1038），那么返回的float是什么呢？

> 如果 `BigInteger` 的值超过了 `float` 的最大范围（3.4x10^38），则在将其转换为 `float` 类型时，会发生溢出。
>
> 在 Java 中，`float` 类型使用 IEEE 754 标准表示，它的有效位数是 24 位，所以对于超过这个范围的值，将无法准确表示。当 `BigInteger` 的值大于 `float` 能够表示的最大值时，将会得到一个特殊的浮点数值 `Float.POSITIVE_INFINITY`（正无穷大）。
>
> ```java
> import java.math.BigInteger;
> 
> public class Main {
>     public static void main(String[] args) {
>         BigInteger bigInt = new BigInteger("10").pow(1000); // 构造一个大于 float 最大值的 BigInteger
> 
>         float floatValue = bigInt.floatValue();
> 
>         System.out.println(floatValue); // 输出: Infinity
>     }
> }
> ```
>
> 上述示例中，我们构造了一个大于 `float` 最大值的 `BigInteger`，然后使用 `floatValue()` 方法将其转换为 `float` 类型。由于超过了 `float` 的范围，最终得到的结果是正无穷大（`Infinity`）。
>
> 需要注意的是，正无穷大是一个特殊的浮点数值，在数学计算中具有一些特殊的规则。在处理这样的值时，你可能需要进行额外的逻辑判断和处理。

---

### 小结

`BigInteger`用于表示任意大小的整数；

`BigInteger`是不变类，并且继承自`Number`；

将`BigInteger`转换成基本类型时可使用`longValueExact()`等方法保证结果准确。
