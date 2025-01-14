# springboot整合MongoDB

## 1.环境配置

### 1.1 创建springboot项目

创建方式有2种，一种是直接使用开发工具创建，我这里使用官网的方式来创建，登陆[创建的网页](https://start.spring.io/)（这种方式非适合工具连不上网络的在别处创建好在导入）
主要的配置：

- Project：Maven
- Language：Java
- Spring Boot：2.7.12 (SNAPSHOT) （aliyun的maven没有就在导入后改为2.2.2.RELEASE）
- Packaging：Jar
- Java：8
    右边依赖可以不选择，关系不大
    ![在这里插入图片描述](img/2_springboot整合MongoDB/a759272a574685180b9e7bd809ae7307.png)

### 1.2 引入maven依赖

使用开发工具导入1.1创建好的工程，打开pom文件，添加mongodb依赖,完整的项目依赖

```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-web</artifactId>
</dependency>

<dependency>
	<groupId>org.projectlombok</groupId>
	<artifactId>lombok</artifactId>
	<optional>true</optional>
</dependency>
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-test</artifactId>
	<scope>test</scope>
</dependency>

<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-data-mongodb</artifactId>
</dependency>
```

### 1.3 配置连接

> 详细可以参考官网说明
> https://docs.spring.io/springboot/docs/current/reference/html/data.html#data.nosql.mongodb.connecting

方式一：

```yaml
spring:
  data:
    mongodb:
      uri: mongodb://root:123456@192.168.3.11:27017/mydb?authSource=admin
```

方式二：

```yaml
spring:
  data:
    mongodb:
      database: mydb
      host: 192.168.3.11
      port: 27017
      username: root
      password: 123456
      authentication-database: admin
```

### 1.4 使用时

通过上面的配置，就可以使用内置的操作模板对象

```java
import org.springframework.data.mongodb.core.MongoTemplate;
    @Autowired
    private MongoTemplate mongoTemplate;
```

### 1.5 测试例子

可以利用springboot的[单元测试](https://so.csdn.net/so/search?q=单元测试&spm=1001.2101.3001.7020)进行编写例子

```java
package com.example.mongodb;

import com.mongodb.client.MongoCollection;
import org.bson.Document;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;

@SpringBootTest
class MongodbDemoApplicationTests {
    @Autowired
    private MongoTemplate mongoTemplate;
    @Test
    void contextLoads() {
    }
    @Test
    void collectionExists() {
        String collectionName = "springboot";
        boolean collectionExists = mongoTemplate.collectionExists(collectionName);
        if (!collectionExists) {
            MongoCollection<Document> collection = mongoTemplate.createCollection(collectionName);
            System.out.println(collection.toString());
        } else {
            System.out.println(collectionName + "is exists");
        }
    }
}
```

运行结果

```sh
...
2023-05-14 16:09:00.389  INFO 17800 --- [           main] org.mongodb.driver.connection            : Opened connection [connectionId{localValue:2, serverValue:11}] to 192.168.3.11:27017
com.mongodb.client.internal.MongoCollectionImpl@43fd77d8
2023-05-14 16:09:00.454  INFO 17800 --- [extShutdownHook] org.mongodb.driver.connection            : Closed connection [connectionId{localValue:2, serverValue:11}] to 192.168.3.11:27017 because the pool has been closed.
2023-05-14 16:09:00.457  INFO 17800 --- [extShutdownHook] o.s.s.concurrent.ThreadPoolTaskExecutor  : Shutting down ExecutorService 'applicationTaskExecutor'

Process finished with exit code 0
```

上面的结果显示我们已经使用了内置的模板创建了一张表，我们去到客户端验证一下

```bash
mydb> show tables
springboot
mydb> 
```

## 2.内置的注解

  springboot的整合不仅为我们提供了一个操作的模板，还给我们提供了方便操作的注解，如 `@Document`、`@Id`、`@Field` 和 `@Transient`。这些注解可以帮助将 Java 对象映射为 MongoDB 中的文档数据，并且进行不同层次的数据访问和操作。

- @Document 是用来标识一个类对应 MongoDB 中的一个`文档`，通常用在类的定义上。这个注解有两个属性，value 和 collection，用来指定操作的数据库和集合名称。通过该注解，可以将一个 Java 类与一个 MongoDB 文档建立映射关系。
- @Id 是用来标识一个成员变量或方法作为 MongoDB 文档的` _id 属性`。该注解可以应用于 Java 对象中的一个成员变量或者 getter 方法上。如果在类中没有标注 @Id 注解，则 MongoDB 会自动为该文档生成一个 _id 属性。标注了 @Id 注解的成员变量或方法必须为 String、ObjectId 或 [BigInteger](https://so.csdn.net/so/search?q=BigInteger&spm=1001.2101.3001.7020) 类型。
- @Field 是用来标识一个成员变量或方法对应 MongoDB 文档中的一个`key-value`对。这个注解有两个属性，name 和 value，可以用来指定在文档中 key 的名称。如果没有指定 name 属性，则默认使用成员变量名作为 key 的名称。该注解可以应用于 Java 对象中的一个成员变量或者 getter 方法上。
- @[Transient](https://so.csdn.net/so/search?q=Transient&spm=1001.2101.3001.7020) 是用来指定一个成员变量`不参与MongoDB 文档的序列化`。这个注解可以应用于 Java 对象中的一个成员变量或者 getter 方法上。被标注了 @Transient 注解的成员变量或方法不会保存到数据库中。

  这些注解可以让我们在使用 MongoDB 数据库时更加方便和灵活。在使用这些注解时，应该需要注意对应的数据类型和注解的属性，以便正确地映射 Java 对象和 MongoDB 文档之间的关系。

## 2. 综合的例子

这里就不一一例举说明每个api，只提供一个综合的例子进行使用，

### 2.1 创建一个java实体

创建一个`User`的对象实体，同时通过`@Document("user")`会映射到mongodb中的’user’集合中；`@Field("uname")`将实体的`name`映射到mongodb的字段时`uname`;`@Transient`将`address`不持久化到mongodb中

```java
package com.example.mongodb.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

@Document("user")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    private Integer id;

    @Field("uname")
    private String name;

    @Field
    private int age;

    @Field
    private Double height;

    @Field
    private Date entryDay;

    @Transient
    private String address;


}
```

### 2.2 添加文档

添加文档有两种，一种时如果id存在则更新的`save`方法，另外一种时id存在则抛出异常的`insert`方法，我们应该根据实际情况选择具体的插入方法。

```java
@Test
    void insertOneDocument() {
        String collectionName = "springboot";
        User user = new User();
        user.setId(1);
        user.setName("Tom");
        user.setAge(19);
        user.setHeight(178.50);
        user.setEntryDay(new Date());
        user.setAddress("beijing");
        //save添加文档 - 如果id存在则更新数据
        User save = mongoTemplate.save(user, collectionName);
        System.out.println(save);
        //insert 添加文档 - 如果id存在则失败抛出异常
        //User insert = mongoTemplate.insert(user, collectionName);
        //System.out.println(insert);
    }
```

插入数据后还发现，内置的操作模板帮我多添加了一个`_class`字段到mongodb中，参考后面的2.6可以配置除去该内置字段

```
mydb> db.springboot.find()
[
  {
    _id: 1,
    uname: 'Tom',
    age: 19,
    height: 178.5,
    entryDay: ISODate("2023-05-14T08:35:01.607Z"),
    _class: 'com.example.mongodb.entity.User'
  }
]
```

> *批量插入见2.3例子*

### 2.3 查询文档

在查询前，先批量插入数据

```java
@Test
    void insertManyDocument() {
        String collectionName = "springboot";
        List<User> users = new ArrayList<>();
        for(int i=0;i<10;i++){
            users.add(new User(10+i,"name-"+i,10+i,172.0+i,new Date(),"beijing-"+i));
        }
        //插入多行数据
        Collection<User> collection = mongoTemplate.insert(users, collectionName);
        System.out.println(collection.size());
    }
```

#### 2.3.1 查询所有文档

```java
    @Test
    void findAll() {
        String collectionName = "springboot";
        List<User> userList = mongoTemplate.findAll(User.class, collectionName);
        if (userList.size() > 0) {
            userList.forEach(System.out::println);
        }
    }
```

结果显示

```bash
...
User(id=1, name=Tom, age=19, height=178.5, entryDay=Sun May 14 16:35:01 CST 2023, address=null)
User(id=2, name=Jerry, age=20, height=175.5, entryDay=Sun May 14 16:46:41 CST 2023, address=null)
User(id=10, name=name-0, age=10, height=172.0, entryDay=Sun May 14 16:56:17 CST 2023, address=null)
User(id=11, name=name-1, age=11, height=173.0, entryDay=Sun May 14 16:56:17 CST 2023, address=null)
User(id=12, name=name-2, age=12, height=174.0, entryDay=Sun May 14 16:56:17 CST 2023, address=null)
User(id=13, name=name-3, age=13, height=175.0, entryDay=Sun May 14 16:56:17 CST 2023, address=null)
User(id=14, name=name-4, age=14, height=176.0, entryDay=Sun May 14 16:56:17 CST 2023, address=null)
User(id=15, name=name-5, age=15, height=177.0, entryDay=Sun May 14 16:56:17 CST 2023, address=null)
User(id=16, name=name-6, age=16, height=178.0, entryDay=Sun May 14 16:56:17 CST 2023, address=null)
User(id=17, name=name-7, age=17, height=179.0, entryDay=Sun May 14 16:56:17 CST 2023, address=null)
User(id=18, name=name-8, age=18, height=180.0, entryDay=Sun May 14 16:56:17 CST 2023, address=null)
User(id=19, name=name-9, age=19, height=181.0, entryDay=Sun May 14 16:56:17 CST 2023, address=null)
Process finished with exit code 0
```

#### 2.3.2 根据_id查询

```java
    @Test
    void findById() {
        String collectionName = "springboot";
        User user = mongoTemplate.findById(1, User.class, collectionName);
        System.out.println(user);
    }
```

查询结果

```bash
...
User(id=1, name=Tom, age=19, height=178.5, entryDay=Sun May 14 16:35:01 CST 2023, address=null)

Process finished with exit code 0
```

#### 2.3.3 返回匹配的第一个文档

```java
import org.springframework.data.mongodb.core.query.Query;
@Test
    void findFirst() {
        String collectionName = "springboot";
        User user = mongoTemplate.findOne(new Query(), User.class, collectionName);
        System.out.println(user);
    }
```

查询结果

```bash
...
User(id=1, name=Tom, age=19, height=178.5, entryDay=Sun May 14 16:35:01 CST 2023, address=null)

Process finished with exit code 0
```

#### 2.3.4 单条件查询

查询年龄大于等于20的数据

```java
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
    @Test
    void findBySimpleQuery() {
        String collectionName = "springboot";
        Query query = new Query(Criteria.where("age").gte(20));
        User user = mongoTemplate.findOne(query, User.class, collectionName);
        System.out.println(user);
    }
```

查询结果

```bash
User(id=2, name=Jerry, age=20, height=175.5, entryDay=Sun May 14 16:46:41 CST 2023, address=null)

Process finished with exit code 0
```

后续都会使用内置封装的`Criteria`对象进行条件查询

#### 2.3.5 多条件查询

查询年龄大于15并且身高大于170的数据

```java
@Test
    void findByAndQuery() {
        String collectionName = "springboot";
        Criteria ageCriteria = Criteria.where("age").gt(15);
        Criteria heightCriteria = Criteria.where("height").gt(170.0);
        //组装两个and条件
        Criteria andCriteria = new Criteria();
        andCriteria.andOperator(ageCriteria,heightCriteria);
        //封装成query
        Query query = new Query(andCriteria);
        List<User> userList = mongoTemplate.find(query, User.class, collectionName);
        if (userList.size() > 0) {
            userList.forEach(System.out::println);
        }
    }
```

查询结果

```bash
...
User(id=1, name=Tom, age=19, height=178.5, entryDay=Sun May 14 16:35:01 CST 2023, address=null)
User(id=2, name=Jerry, age=20, height=175.5, entryDay=Sun May 14 16:46:41 CST 2023, address=null)
User(id=16, name=name-6, age=16, height=178.0, entryDay=Sun May 14 16:56:17 CST 2023, address=null)
User(id=17, name=name-7, age=17, height=179.0, entryDay=Sun May 14 16:56:17 CST 2023, address=null)
User(id=18, name=name-8, age=18, height=180.0, entryDay=Sun May 14 16:56:17 CST 2023, address=null)
User(id=19, name=name-9, age=19, height=181.0, entryDay=Sun May 14 16:56:17 CST 2023, address=null)

Process finished with exit code 0
```

#### 2.3.6 条件查询加上排序和分页

在2.3.5的基础之上添加排序（age从大到小，height从小到大）和分页（返回第一页，每页2行数据）

```java
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
@Test
    void findByComplexQuery() {
        String collectionName = "springboot";
        Criteria ageCriteria = Criteria.where("age").gt(15);
        Criteria heightCriteria = Criteria.where("height").gt(170.0);
        //组装两个and条件
        Criteria andCriteria = new Criteria();
        andCriteria.andOperator(ageCriteria,heightCriteria);
        //封装成query
        Query query = new Query(andCriteria);

        //排序 age从大到小，height从小到大
        List<Sort.Order> orders = new ArrayList<>();
        orders.add(Sort.Order.desc("age"));
        orders.add(Sort.Order.asc("height"));
        query.with(Sort.by(orders));
        //分页 第一页，每页2行数据
        query.with(PageRequest.of(0, 2));
        List<User> userList = mongoTemplate.find(query, User.class, collectionName);
        if (userList.size() > 0) {
            userList.forEach(System.out::println);
        }
    }
```

查询结果

```bash
...
User(id=2, name=Jerry, age=20, height=175.5, entryDay=Sun May 14 16:46:41 CST 2023, address=null)
User(id=1, name=Tom, age=19, height=178.5, entryDay=Sun May 14 16:35:01 CST 2023, address=null)

Process finished with exit code 0
```

#### 2.3.7 使用json查询

json查询即在客户端执行的语句
客户端查询

```bash
mydb> db.springboot.find({$and:[{age:{$gte:15}},{height:{$lte:178}}]})
[
  {
    _id: 2,
    uname: 'Jerry',
    age: 20,
    height: 175.5,
    entryDay: ISODate("2023-05-14T08:46:41.242Z")
  },
  {
    _id: 15,
    uname: 'name-5',
    age: 15,
    height: 177,
    entryDay: ISODate("2023-05-14T08:56:17.988Z")
  },
  {
    _id: 16,
    uname: 'name-6',
    age: 16,
    height: 178,
    entryDay: ISODate("2023-05-14T08:56:17.988Z")
  }
]
mydb> 
```

转化成json查询

```java
	@Test
    void findByJsonQuery() {
        String collectionName = "springboot";
        String json = "{$and:[{age:{$gte:15}},{height:{$lte:178}}]}";
        Query query = new BasicQuery(json);
        List<User> userList = mongoTemplate.find(query, User.class, collectionName);
        if (userList.size() > 0) {
            userList.forEach(System.out::println);
        }
    }
```

查询结果

```bash
...
User(id=2, name=Jerry, age=20, height=175.5, entryDay=Sun May 14 16:46:41 CST 2023, address=null)
User(id=15, name=name-5, age=15, height=177.0, entryDay=Sun May 14 16:56:17 CST 2023, address=null)
User(id=16, name=name-6, age=16, height=178.0, entryDay=Sun May 14 16:56:17 CST 2023, address=null)

Process finished with exit code 0
```

### 2.4 更新文档

2.4.1 更新匹配到的第一行数据

```java
import com.mongodb.client.result.UpdateResult;
import org.springframework.data.mongodb.core.query.Update;
    @Test
    void updateOneByQuery() {
        String collectionName = "springboot";
        Criteria idCriteria = Criteria.where("id").is(1);
        Update update = new Update();
        update.set("age", 20);
        UpdateResult result = mongoTemplate.updateFirst(new Query(idCriteria), update, User.class, collectionName);
        System.out.println(result.toString());
    }
```

更新结果

```bash
...
AcknowledgedUpdateResult{matchedCount=1, modifiedCount=1, upsertedId=null}

Process finished with exit code 0
```

2.4.2 更新匹配到的所有数据

```java
import com.mongodb.client.result.UpdateResult;
import org.springframework.data.mongodb.core.query.Update;
	@Test
    void updateManyByQuery() {
        String collectionName = "springboot";
        Criteria ageCriteria = Criteria.where("age").is(20);
        Update update = new Update();
        update.set("age", 25);
        UpdateResult result = mongoTemplate.updateMulti(new Query(ageCriteria), update, User.class, collectionName);
        System.out.println(result.toString());
    }
```

更新结果

```bash
...
AcknowledgedUpdateResult{matchedCount=2, modifiedCount=2, upsertedId=null}

Process finished with exit code 0
```

2.4.3 匹配更新时查找不到则插入

```java
	@Test
    void updateOrInsertOneByQuery() {
        String collectionName = "springboot";
        Criteria idCriteria = Criteria.where("id").is(666);
        Update update = new Update();
        update.setOnInsert("name", "test");
        update.setOnInsert("id", 666);
        UpdateResult result = mongoTemplate.upsert(new Query(idCriteria), update, User.class, collectionName);
        System.out.println(result.toString());
    }
```

匹配结果

```bash
...

Process finished with exit code 0
```

使用客户端查询发现数据被新增了

```bash
mydb> db.springboot.find({_id:666})
[ { _id: 666, uname: 'test' } ]
mydb> 
```

### 2.5 删除文档

#### 2.5.1 查询并删除

删除id为666的数据

```java
	@Test
    void deleteByQuery() {
        String collectionName = "springboot";
        Criteria idCriteria = Criteria.where("id").is(666);
        DeleteResult deleteResult = mongoTemplate.remove(new Query(idCriteria), User.class, collectionName);
        System.out.println(deleteResult.toString());
    }
```

执行结果

```bash
AcknowledgedDeleteResult{deletedCount=1}

Process finished with exit code 0
```

#### 2.5.2 删除所有

删除所有就是构造一个空的Query对象

```java
	@Test
    void deleteAllQuery() {
        String collectionName = "springboot";
        DeleteResult deleteResult = mongoTemplate.remove(new Query(), User.class, collectionName);
        System.out.println(deleteResult.toString());
    }
```

也可以使用删除集合的方法,更加推荐这种，高效

```bash
	@Test
    void dropCollection() {
        String collectionName = "springboot";
        mongoTemplate.dropCollection(collectionName);
    }
```

### 2.6 删除内置的_class字段

构造出DefaultMongoTypeMapper，把typeKey设置为null

```java
package com.example.mongodb.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.core.convert.*;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;

@Configuration
public class ProjectConfig {
    @Bean
    MappingMongoConverter mappingMongoConverter(
            MongoDatabaseFactory mongoDatabaseFactory,
            MongoMappingContext context, MongoCustomConversions conversions) {
        DbRefResolver dbRefResolver = new DefaultDbRefResolver(mongoDatabaseFactory);
        MappingMongoConverter myMappingMongoConverter =
                new MappingMongoConverter(dbRefResolver, context);
        myMappingMongoConverter.setCustomConversions(conversions);
        //构造出DefaultMongoTypeMapper，把typeKey设置为null
        myMappingMongoConverter.setTypeMapper(new DefaultMongoTypeMapper(null));
        return myMappingMongoConverter;
    }
}
```

测试添加一行数据

```java
@Test
    void insertOneDocument() {
        String collectionName = "springboot";
        User user = new User();
        user.setId(2);
        user.setName("Jerry");
        user.setAge(20);
        user.setHeight(175.50);
        user.setEntryDay(new Date());
        user.setAddress("beijing");
        //save添加文档 - 如果id存在则更新数据
        User save = mongoTemplate.save(user, collectionName);
        System.out.println(save);
    }
```

登陆客户端查询

```bash
mydb> db.springboot.find()
[
  {
    _id: 1,
    uname: 'Tom',
    age: 19,
    height: 178.5,
    entryDay: ISODate("2023-05-14T08:35:01.607Z"),
    _class: 'com.example.mongodb.entity.User'
  },
  {
    _id: 2,
    uname: 'Jerry',
    age: 20,
    height: 175.5,
    entryDay: ISODate("2023-05-14T08:46:41.242Z")
  }
]
```

## 3. 总结

  本文介绍了使用Spring Boot整合MongoDB实现数据操作的方法，包括环境准备、连接配置、以及实现数据操作。通过本文的学习，可以熟悉在Spring Boot中使用MongoDB的方法，从而在实际项目中更加灵活和高效地实现数据操作。
