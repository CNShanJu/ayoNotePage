> 参考【
>
> https://blog.csdn.net/qq_69183322/article/details/140897952
>
> https://blog.csdn.net/qq_43410878/article/details/123716629
>
> 】

![img](img/1_Java_Stream%E6%B5%81/39fb94d0579a1ebdc900de287c3cbc4b.png)

# Java Stream流

## 概述

### 概述   

 Java Stream API 是 `Java 8` 及以上版本中提供的一种新特性，它支持对`集合`（Collections）进行声明式的操作。Stream API 可以用于执行`复杂的数据转换`操作，并支持`并行处理`。

java 8 是一个非常成功的版本，这个版本新增的`Stream`，配合同版本出现的 `Lambda` ，给我们操作集合（Collection）提供了极大的便利。

那么什么是`Stream`？

> `Stream`将要处理的元素集合看作一种流，在流的过程中，借助`Stream API`对流中的元素进行操作，比如：筛选、排序、聚合等。

### 知识点

**`Stream`可以由数组或集合创建，对流的操作分为两种：**

1. 中间操作，每次返回一个新的流，可以有多个。（筛选filter、映射map、排序sorted、去重组合skip—limit）
2. 终端操作，每个流只能进行一次终端操作，终端操作结束后流无法再次使用。终端操作会产生一个新的集合或值。（遍历foreach、匹配find–match、规约reduce、聚合max–min–count、收集collect）

**另外，`Stream`有几个特性：**

1. stream`不存储数据`，而是按照特定的规则对数据进行计算，一般会输出结果。
2. stream`不会改变数据源`，通常情况下会产生一个新的集合或一个值。
3. stream具有`延迟执行特性`，只有调用终端操作时，中间操作才会执行。

## Stream与传统遍历对比

几乎所有的集合（如 `Collection 接口`或` Map 接口`等）都支持`直接`或`间接`的`遍历操作`。而当我们需要对集合中的元素进行操作的时候，除了必需的**添加、删除、获取**外，最典型的就是**集合遍历**。例如：

```java
import java.util.ArrayList;
import java.util.List;
 
public class Demo1List {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("张无忌");
        list.add("周芷若");
        list.add("赵敏");
        list.add("小昭");
        list.add("殷离");
        list.add("张三");
        list.add("张三丰");
 
        List<String> listA = new ArrayList<>();
        for ( String s  : list) {
            if (s.startsWith("张"))
                listA.add(s);
        }
 
        List<String> listB = new ArrayList<>();
        for (String s: listA) {
            if (s.length() == 3)
                listB.add(s);
        }
 
        for (String s: listB) {
            System.out.println(s);
        }
    }
}

```

**循环遍历的弊端**

Java 8的Lambda更加专注于做什么（What），而不是怎么做（How），这点此前已经结合内部类进行了对比说明。

现在，仔细体会一下上例代码，可以发现：   

 for循环的语法就是“怎么做”    

for循环的循环体才是“做什么”   

 为什么使用循环？因为要进行遍历。但循环是遍历的唯一方式吗？**遍历是指每一个元素`逐一进行处理`，而并不是`从第一个到最后一个顺次处理`的循环**。前者是**目的**，后者是**方式**。

```java
import java.util.ArrayList;
import java.util.List;
 
public class Demo2Steam {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("张无忌");
        list.add("周芷若");
        list.add("赵敏");
        list.add("小昭");
        list.add("殷离");
        list.add("张三");
        list.add("张三丰");
        list.stream()
                .filter(name -> name.startsWith("张"))
                .filter(name -> name.length() == 3)
                .forEach(name -> System.out.println(name));
    }
}

```

效果显而易见。

## Stream的创建

### 集合数组创建

`Stream`可以通过集合数组创建。

通过 `java.util.Collection.stream()` 方法用集合创建流

```java
List<String> list = Arrays.asList("a", "b", "c");
// 创建一个顺序流
Stream<String> stream = list.stream();
// 创建一个并行流
Stream<String> parallelStream = list.parallelStream();
```

**输出结果**

![在这里插入图片描述](img/1_Java_Stream%E6%B5%81/6dc7bfffc1a54297ad028e9f089e1dce.png)



### 用数组创建

使用`java.util.Arrays.stream(T[] array)`方法用数组创建流

```java
int[] array={1,3,5,6,8};
IntStream stream = Arrays.stream(array);
```

### 使用`Stream`的静态方法

使用`Stream`的静态方法：`of()、iterate()、generate()`

```java
Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5, 6);

Stream<Integer> stream2 = Stream.iterate(0, (x) -> x + 3).limit(4);
stream2.forEach(System.out::println);

Stream<Double> stream3 = Stream.generate(Math::random).limit(3);
stream3.forEach(System.out::println);
```

**输出结果：**

![在这里插入图片描述](img/1_Java_Stream%E6%B5%81/b219650768dfddc127dbc8c4b3edea9b.png)

## 并行流

**stream和parallelStream的简单区分：** `stream`是`顺序流`，由主线程按顺序对流执行操作，而`parallelStream`是`并行流`，内部以多线程并行执行的方式对流进行操作，但前提是流中的数据处理没有顺序要求。例如筛选集合中的奇数，两者的处理不同之处：

![在这里插入图片描述](img/1_Java_Stream%E6%B5%81/99ff16fff2afeeb0893a969e76a7c5fe.png)

如果流中的数据量足够大，并行流可以加快处速度。

除了直接创建并行流，还可以通过`parallel()`把顺序流转换成并行流：

> ```java
> Optional<Integer> findFirst = list.stream().parallel().filter(x->x>6).findFirst();
> List<Integer> list = Arrays.asList(1, 3, 6, 8, 12, 4);
>        Optional<Integer> findFirst = list.stream().parallel().filter(x->x>6).findFirst();
>        System.out.println("使用Stream的静态方法generate：" + findFirst.get());
> ```

## Steam操作 

在使用stream之前，先理解一个概念：`Optional` 。

> `Optional`类是一个可以为`null`的容器对象。如果值存在则`isPresent()`方法会返回`true`，调用`get()`方法会返回该对象。

具体参考文章[Optional ](./2_Optional 类.md)

### 中间操作（Intermediate operations）

中间操作返回的是一个新的 **`Stream`**，可以继续进行链式调用。以下是一些常见的中间操作

#### 1）**filter**

- **`filter(Predicate<? super T> predicate)`**: 过滤元素。

示例： 过滤出列表中所有偶数。

```java
public static void main(String[] args) {
    List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6);
    List<Integer> evenNumbers = numbers.stream()
        .filter(n -> n % 2 == 0)
        .collect(Collectors.toList());
    System.out.println(evenNumbers); // 输出 [2, 4, 6]
}
```

#### **2）`map`**

- **`map(Function<? super T, ? extends R> mapper)`**: 转换每个元素到对应的结果。

示例： 将每个字符串转换为大写。

```java
public static void main(String[] args) {
    List<String> words = Arrays.asList("hello", "world");
    List<String> upperCaseWords = words.stream()
        .map(String::toUpperCase)
        .collect(Collectors.toList());
    System.out.println(upperCaseWords); // 输出 [HELLO, WORLD]
}
```

#### 3）**`flatMap`**

- **`flatMap(Function<? super T, ? extends Stream<? extends R>> mapper)`**: 将每个元素转换成另一个 **`Stream`**，然后将所有流连接成一个流。

示例：将包含单词列表的列表转换为单词流。