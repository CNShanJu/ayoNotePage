> 参考
> https://zhuanlan.zhihu.com/p/668454715
> https://blog.csdn.net/love7489/article/details/138968845

### 环境

java17 + springboot 3 + kafka 3

### 依赖

```xml
<dependency>
  <groupId>org.springframework.kafka</groupId>
  <artifactId>spring-kafka</artifactId>
  <version>3.0.11</version>
</dependency>

<dependency>
  <groupId>org.projectlombok</groupId>
  <artifactId>lombok</artifactId>
  <version>1.18.30</version>
</dependency>

<!--   springboot 3.x 需要加入这个， 否则会找不到       -->
<dependency>
  <groupId>org.slf4j</groupId>
  <artifactId>slf4j-api</artifactId>
  <version>2.0.9</version>
</dependency>
```

