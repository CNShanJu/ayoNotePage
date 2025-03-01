> 原文地址：https://blog.csdn.net/m0_68408835/article/details/134918903

# SpringBoot整合RocketMQ，高手都是这么玩的！

本文分为三部分，第一部分实现SpringBoot与RocketMQ的整合，第二部分解决在使用RocketMQ过程中可能遇到的一些问题并解决他们，第三部分介绍如何封装RocketMQ以便更好地使用。

### 1. SpringBoot整合RocketMQ

在SpringBoot中集成RocketMQ，只需要简单四步：

1. 引入相关依赖

```cobol
<dependency>
  <groupId>org.apache.rocketmq</groupId>
  <artifactId>rocketmq-spring-boot-starter</artifactId>
</dependency>
```

1. 添加RocketMQ的相关配置

```yaml
rocketmq:
    consumer:
        group: springboot_consumer_group
        # 一次拉取消息最大值，注意是拉取消息的最大值而非消费最大值
        pull-batch-size: 10
    name-server: 10.5.103.6:9876
    producer:
        # 发送同一类消息的设置为同一个group，保证唯一
        group: springboot_producer_group
        # 发送消息超时时间，默认3000
        sendMessageTimeout: 10000
        # 发送消息失败重试次数，默认2
        retryTimesWhenSendFailed: 2
        # 异步消息重试此处，默认2
        retryTimesWhenSendAsyncFailed: 2
        # 消息最大长度，默认1024 * 1024 * 4(默认4M)
        maxMessageSize: 4096
        # 压缩消息阈值，默认4k(1024 * 4)
        compressMessageBodyThreshold: 4096
        # 是否在内部发送失败时重试另一个broker，默认false
        retryNextServer: false
```

1. 使用提供的模板工具类RocketMQTemplate发送消息

```java
@RestController
public class NormalProduceController {
  @Setter(onMethod_ = @Autowired)
  private RocketMQTemplate rocketmqTemplate;
  @GetMapping("/test")
  public SendResult test() {
    Message<String> msg = MessageBuilder.withPayload("Hello,RocketMQ").build();
    SendResult sendResult = rocketmqTemplate.send(topic, msg);
  }
}
```

1. 实现RocketMQListener接口消费消息

```java
import org.apache.rocketmq.spring.annotation.RocketMQMessageListener;
import org.apache.rocketmq.spring.core.RocketMQListener;
import org.springframework.stereotype.Component;
@Component
@RocketMQMessageListener(topic = "your_topic_name", consumerGroup = "your_consumer_group_name")
public class MyConsumer implements RocketMQListener<String> {
    @Override
    public void onMessage(String message) {
        // 处理消息的逻辑
        System.out.println("Received message: " + message);
    }
}
```

以上4步即可实现SpringBoot与RocketMQ的整合，这部分属于基础知识，不做过多说明。

### 2 使用RocketMQ会遇到的问题

以下是一些在SpringBoot中使用RocketMQ时常遇到的问题，现在为您逐一解决。

#### 2.1 WARN No appenders could be found for logger

启动项目时会在日志中看到如下告警

```erlang
RocketMQLog:WARN No appenders could be found for logger (io.netty.util.internal.InternalThreadLocalMap).
RocketMQLog:WARN Please initialize the logger system properly.
```

此时我们只需要在启动类中[设置环境变量](https://so.csdn.net/so/search?q=设置环境变量&spm=1001.2101.3001.7020) `rocketmq.client.logUseSlf4j` 为 true 明确指定RocketMQ的日志框架

```java
@SpringBootApplication
public class RocketDemoApplication {
    public static void main(String[] args) {
        /*
         * 指定使用的日志框架，否则将会告警
         * RocketMQLog:WARN No appenders could be found for logger (io.netty.util.internal.InternalThreadLocalMap).
         * RocketMQLog:WARN Please initialize the logger system properly.
         */
        System.setProperty("rocketmq.client.logUseSlf4j", "true");
        SpringApplication.run(RocketDemoApplication.class, args);
    }
}
```

同时还得在[配置文件](https://so.csdn.net/so/search?q=配置文件&spm=1001.2101.3001.7020)中调整日志级别，不然在控制台会一直看到broker的日志信息

```yaml
logging:
 level:
   RocketmqClient: ERROR
    io:
     netty: ERROR
```

#### 2.2 不支持LocalDate 和 LocalDateTime

在使用Java8后经常会使用`LocalDate/LocalDateTime`这两个时间类型字段，然而RocketMQ原始配置并不支持Java时间类型，当我们发送的实体消息中包含上述两个字段时，消费端在消费时会出现如下所示的错误。

比如生产者的代码如下：

```java
@GetMapping("/test")
public void test(){
  //普通消息无返回值，只负责发送消息⽽不等待服务器回应且没有回调函数触发。
  RocketMessage rocketMessage = RocketMessage.builder().
    id(1111L).
    message("hello,world")
    .localDate(LocalDate.now())
    .localDateTime(LocalDateTime.now())
    .build();
  rocketmqTemplate.convertAndSend(destination,rocketMessage);
}
```

消费者的代码如下：

```less
@Component
@RocketMQMessageListener(consumerGroup = "springboot_consumer_group",topic = "consumer_topic")
public class RocketMQConsumer implements RocketMQListener<RocketMessage> {
    @Override
    public void onMessage(RocketMessage message) {
        System.out.println("消费消息-" + message);
    }
}
```

消费者开始消费时会出现类型转换异常错误`Cannot construct instance of java.time.LocalDate`，错误详情如下：



![图片](img/3_Springboot高级整合/3a992aed43f0b532b2f8093b54a81026.png)

image-20230322163904100

原因：RocketMQ内置使用的转换器是**RocketMQMessageConverter**，转换Json时使用的是MappingJackson2MessageConverter，但是这个转换器不支持时间类型。

解决办法：需要自定义消息转换器，将MappingJackson2MessageConverter进行替换，并添加支持时间模块

```java
@Configuration
public class RocketMQEnhanceConfig {
    /**
     * 解决RocketMQ Jackson不支持Java时间类型配置
     * 源码参考：{@link org.apache.rocketmq.spring.autoconfigure.MessageConverterConfiguration}
     */
    @Bean
    @Primary
    public RocketMQMessageConverter enhanceRocketMQMessageConverter(){
        RocketMQMessageConverter converter = new RocketMQMessageConverter();
        CompositeMessageConverter compositeMessageConverter = (CompositeMessageConverter) converter.getMessageConverter();
        List<MessageConverter> messageConverterList = compositeMessageConverter.getConverters();
        for (MessageConverter messageConverter : messageConverterList) {
            if(messageConverter instanceof MappingJackson2MessageConverter){
                MappingJackson2MessageConverter jackson2MessageConverter = (MappingJackson2MessageConverter) messageConverter;
                ObjectMapper objectMapper = jackson2MessageConverter.getObjectMapper();
                objectMapper.registerModules(new JavaTimeModule());
            }
        }
        return converter;
    }
}
```

#### 2.3 RockeMQ环境隔离

在使用RocketMQ时，通常会在代码中直接指定消息主题(topic)，而且开发环境和测试环境可能共用一个RocketMQ环境。如果没有进行处理，在开发环境发送的消息就可能被测试环境的消费者消费，测试环境发送的消息也可能被开发环境的消费者消费，从而导致数据混乱的问题。

为了解决这个问题，我们可以根据不同的环境实现自动隔离。通过简单配置一个选项，如dev、test、prod等不同环境，所有的消息都会被自动隔离。例如，当发送的消息主题为`consumer_topic`时，可以自动在topic后面加上环境后缀，如`consumer_topic_dev`。

那么，我们该如何实现呢？

可以编写一个配置类实现BeanPostProcessor，并重写postProcessBeforeInitialization方法，在监听器实例初始化前修改对应的topic。

> BeanPostProcessor是Spring框架中的一个接口，它的作用是在Spring容器实例化、配置完bean之后，在bean初始化前后进行一些额外的处理工作。
>
> 具体来说，BeanPostProcessor接口定义了两个方法：
>
> - postProcessBeforeInitialization(Object bean, String beanName): 在bean初始化之前进行处理，可以对bean做一些修改等操作。
> - postProcessAfterInitialization(Object bean, String beanName): 在bean初始化之后进行处理，可以进行一些清理或者其他操作。
>
> BeanPostProcessor可以在应用程序中对Bean的创建和初始化过程进行拦截和修改，对Bean的生命周期进行干预和操作。它可以对所有的Bean类实例进行增强处理，使得开发人员可以在Bean初始化前后自定义一些操作，从而实现自己的业务需求。比如，可以通过BeanPostProcessor来实现注入某些必要的属性值、加入某一个对象等等。

实现方案如下：

1. 在配置文件中增加相关配置

```yaml
rocketmq:
 enhance:
   # 启动隔离，用于激活配置类EnvironmentIsolationConfig
   # 启动后会自动在topic上拼接激活的配置文件，达到自动隔离的效果
   enabledIsolation: true
   # 隔离环境名称，拼接到topic后，topic_dev，默认空字符串
   environment: dev
```

1. 新增配置类，在实例化消息监听者之前把topic修改掉

```java
@Configuration
public class EnvironmentIsolationConfig implements BeanPostProcessor {
   @Value("${rocketmq.enhance.enabledIsolation:true}")
    private boolean enabledIsolation;
    @Value("${rocketmq.enhance.environment:''}")
    private String environmentName;
    /**
     * 在装载Bean之前实现参数修改
     */
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        if(bean instanceof DefaultRocketMQListenerContainer){
            DefaultRocketMQListenerContainer container = (DefaultRocketMQListenerContainer) bean;
       //拼接Topic
            if(enabledIsolation && StringUtils.hasText(environmentName)){
                container.setTopic(String.join("_", container.getTopic(),environmentName));
            }
            return container;
        }
        return bean;
    }
}
```

1. 启动项目可以看到日志中消息监听的队列已经被修改了

```cobol
2023-03-23 17:04:59.726 [main] INFO  o.a.r.s.support.DefaultRocketMQListenerContainer:290 - running container: DefaultRocketMQListenerContainer{consumerGroup='springboot_consumer_group', nameServer='10.5.103.6:9876', topic='consumer_topic_dev', consumeMode=CONCURRENTLY, selectorType=TAG, selectorExpression='*', messageModel=CLUSTERING}
```

### 3. RocketMQ二次封装

在解释为什么要二次封装之前先来看看RocketMQ官方文档中推荐的最佳实践

1. 消息发送成功或者失败要打印消息日志，用于业务排查问题。
2. 如果消息量较少，建议在消费入口方法打印消息，消费耗时等，方便后续排查问题。
3. RocketMQ 无法避免消息重复（Exactly-Once），所以如果业务对消费重复非常敏感，务必要在业务层面进行去重处理。可以借助关系数据库进行去重。首先需要确定消息的唯一键，可以是msgId，也可以是消息内容中的唯一标识字段，例如订单Id等。

**上面三个步骤基本每次发送消息或者消费消息都要实现，属于重复动作。**

接下来讨论的是**在RocketMQ中发送消息时选择何种消息类型最为合适。**

在RocketMQ中有四种可选格式：

1. 发送Json对象
2. 发送转Json后的String对象
3. 根据业务封装对应实体类
4. 直接使用原生MessageExt接收。

对于如何选择消息类型，需要考虑到**消费者在不查看消息发送者的情况下，如何获取消息的含义**。因此，在这种情况下，使用第三种方式即根据业务封装对应实体类的方式最为合适，也是大多数开发者在发送消息时的常用方式。

有了上面两点结论以后我们来看看为什么要对RocketMQ二次封装。

#### 3.1 为什么要二次封装

按照上述最佳实践，一个完整的消息传递链路从生产到消费应包括 **准备消息、发送消息、记录消息日志、处理发送失败、记录接收消息日志、处理业务逻辑、异常处理和异常重试** 等步骤。

虽然使用原生RocketMQ可以完成这些动作，但每个生产者和消费者都需要编写大量重复的代码来完成相同的任务，这就是需要进行二次封装的原因。我们希望通过二次封装，**生产者只需准备好消息实体并调用封装后的工具类发送，而消费者只需处理核心业务逻辑，其他公共逻辑会得到统一处理。** 

在二次封装中，关键是找出框架在日常使用中所涵盖的许多操作，以及区分哪些操作是可变的，哪些是不变的。以上述例子为例，实际上只有生产者的消息准备和消费者的业务处理是可变的操作，需要根据需求进行处理，而其他步骤可以固定下来形成一个模板。

当然，本文提到的二次封装不是指对源代码进行封装，而是针对工具的原始使用方式进行的封装。可以将其与Mybatis和Mybatis-plus区分开来。这两者都能完成任务，只不过Mybatis-plus更为简单便捷。

#### 3.2 实现二次封装

实现二次封装需要创建一个自定义的starter，这样其他项目只需要依赖此starter即可使用封装功能。同时，在自定义starter中还需要解决文章第二部分中提到的一些问题。

代码结构如下所示：



![图片](img/3_Springboot高级整合/587952094579615ad1e48432afe82f2c.png)

image-20230403160031944

##### 3.2.1 消息实体类的封装

```java
/**
 * 消息实体，所有消息都需要继承此类
 */
@Data
public abstract class BaseMessage {
    /**
     * 业务键，用于RocketMQ控制台查看消费情况
     */
    protected String key;
    /**
     * 发送消息来源，用于排查问题
     */
    protected String source = "";
 
    /**
     * 发送时间
     */
    protected LocalDateTime sendTime = LocalDateTime.now();
 
    /**
     * 重试次数，用于判断重试次数，超过重试次数发送异常警告
     */
    protected Integer retryTimes = 0;
}
```

后面所有发送的消息实体都需要继承此实体类。

##### 3.2.2 消息发送工具类的封装

```java
@Slf4j
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class RocketMQEnhanceTemplate {
    private final RocketMQTemplate template;
 
    @Resource
    private RocketEnhanceProperties rocketEnhanceProperties;
 
    public RocketMQTemplate getTemplate() {
        return template;
    }
 
    /**
     * 根据系统上下文自动构建隔离后的topic
     * 构建目的地
     */
    public String buildDestination(String topic, String tag) {
        topic = reBuildTopic(topic);
        return topic + ":" + tag;
    }
 
    /**
     * 根据环境重新隔离topic
     * @param topic 原始topic
     */
    private String reBuildTopic(String topic) {
        if(rocketEnhanceProperties.isEnabledIsolation() && StringUtils.hasText(rocketEnhanceProperties.getEnvironment())){
            return topic +"_" + rocketEnhanceProperties.getEnvironment();
        }
        return topic;
    }
 
    /**
     * 发送同步消息
     */
    public <T extends BaseMessage> SendResult send(String topic, String tag, T message) {
        // 注意分隔符
        return send(buildDestination(topic,tag), message);
    }
 
 
    public <T extends BaseMessage> SendResult send(String destination, T message) {
        // 设置业务键，此处根据公共的参数进行处理
        // 更多的其它基础业务处理...
        Message<T> sendMessage = MessageBuilder.withPayload(message).setHeader(RocketMQHeaders.KEYS, message.getKey()).build();
        SendResult sendResult = template.syncSend(destination, sendMessage);
        // 此处为了方便查看给日志转了json，根据选择选择日志记录方式，例如ELK采集
        log.info("[{}]同步消息[{}]发送结果[{}]", destination, JSONObject.toJSON(message), JSONObject.toJSON(sendResult));
        return sendResult;
    }
 
    /**
     * 发送延迟消息
     */
    public <T extends BaseMessage> SendResult send(String topic, String tag, T message, int delayLevel) {
        return send(buildDestination(topic,tag), message, delayLevel);
    }
 
    public <T extends BaseMessage> SendResult send(String destination, T message, int delayLevel) {
        Message<T> sendMessage = MessageBuilder.withPayload(message).setHeader(RocketMQHeaders.KEYS, message.getKey()).build();
        SendResult sendResult = template.syncSend(destination, sendMessage, 3000, delayLevel);
        log.info("[{}]延迟等级[{}]消息[{}]发送结果[{}]", destination, delayLevel, JSONObject.toJSON(message), JSONObject.toJSON(sendResult));
        return sendResult;
    }
}
```

这里封装了一个消息发送类，实现了日志记录以及自动重建topic的功能（即生产者实现环境隔离），后面项目中只需要注入RocketMQEnhanceTemplate来实现消息的发送。

##### 3.2.3 消费者的封装

```java
@Slf4j
public abstract class EnhanceMessageHandler<T extends BaseMessage> {
    /**
     * 默认重试次数
     */
    private static final int MAX_RETRY_TIMES = 3;
 
    /**
     * 延时等级
     */
    private static final int DELAY_LEVEL = EnhanceMessageConstant.FIVE_SECOND;
 
 
    @Resource
    private RocketMQEnhanceTemplate rocketMQEnhanceTemplate;
 
    /**
     * 消息处理
     *
     * @param message 待处理消息
     * @throws Exception 消费异常
     */
    protected abstract void handleMessage(T message) throws Exception;
 
    /**
     * 超过重试次数消息，需要启用isRetry
     *
     * @param message 待处理消息
     */
    protected abstract void handleMaxRetriesExceeded(T message);
 
 
    /**
     * 是否需要根据业务规则过滤消息，去重逻辑可以在此处处理
     * @param message 待处理消息
     * @return true: 本次消息被过滤，false：不过滤
     */
    protected boolean filter(T message) {
        return false;
    }
 
    /**
     * 是否异常时重复发送
     *
     * @return true: 消息重试，false：不重试
     */
    protected abstract boolean isRetry();
 
    /**
     * 消费异常时是否抛出异常
     * 返回true，则由rocketmq机制自动重试
     * false：消费异常(如果没有开启重试则消息会被自动ack)
     */
    protected abstract boolean throwException();
 
    /**
     * 最大重试次数
     *
     * @return 最大重试次数，默认5次
     */
    protected int getMaxRetryTimes() {
        return MAX_RETRY_TIMES;
    }
 
    /**
     * isRetry开启时，重新入队延迟时间
     * @return -1：立即入队重试
     */
    protected int getDelayLevel() {
        return DELAY_LEVEL;
    }
 
    /**
     * 使用模板模式构建消息消费框架，可自由扩展或删减
     */
    public void dispatchMessage(T message) {
        // 基础日志记录被父类处理了
        log.info("消费者收到消息[{}]", JSONObject.toJSON(message));
 
        if (filter(message)) {
            log.info("消息id{}不满足消费条件，已过滤。",message.getKey());
            return;
        }
        // 超过最大重试次数时调用子类方法处理
        if (message.getRetryTimes() > getMaxRetryTimes()) {
            handleMaxRetriesExceeded(message);
            return;
        }
        try {
            long now = System.currentTimeMillis();
            handleMessage(message);
            long costTime = System.currentTimeMillis() - now;
            log.info("消息{}消费成功，耗时[{}ms]", message.getKey(),costTime);
        } catch (Exception e) {
            log.error("消息{}消费异常", message.getKey(),e);
            // 是捕获异常还是抛出，由子类决定
            if (throwException()) {
                //抛出异常，由DefaultMessageListenerConcurrently类处理
                throw new RuntimeException(e);
            }
            //此时如果不开启重试机制，则默认ACK了
            if (isRetry()) {
                handleRetry(message);
            }
        }
    }
 
    protected void handleRetry(T message) {
        // 获取子类RocketMQMessageListener注解拿到topic和tag
        RocketMQMessageListener annotation = this.getClass().getAnnotation(RocketMQMessageListener.class);
        if (annotation == null) {
            return;
        }
        //重新构建消息体
        String messageSource = message.getSource();
        if(!messageSource.startsWith(EnhanceMessageConstant.RETRY_PREFIX)){
            message.setSource(EnhanceMessageConstant.RETRY_PREFIX + messageSource);
        }
        message.setRetryTimes(message.getRetryTimes() + 1);
 
        SendResult sendResult;
 
        try {
            // 如果消息发送不成功，则再次重新发送，如果发送异常则抛出由MQ再次处理(异常时不走延迟消息)
            sendResult = rocketMQEnhanceTemplate.send(annotation.topic(), annotation.selectorExpression(), message, getDelayLevel());
        } catch (Exception ex) {
            // 此处捕获之后，相当于此条消息被消息完成然后重新发送新的消息
            //由生产者直接发送
            throw new RuntimeException(ex);
        }
        // 发送失败的处理就是不进行ACK，由RocketMQ重试
        if (sendResult.getSendStatus() != SendStatus.SEND_OK) {
            throw new RuntimeException("重试消息发送失败");
        }
 
    }
}
```



使用模版设计模式定义了消息消费的骨架，实现了日志打印，异常处理，异常重试等公共逻辑，消息过滤（查重）、业务处理则交由子类实现。

##### 3.2.4 基础配置类

```java
@Configuration
@EnableConfigurationProperties(RocketEnhanceProperties.class)
public class RocketMQEnhanceAutoConfiguration {
 
    /**
     * 注入增强的RocketMQEnhanceTemplate
     */
    @Bean
    public RocketMQEnhanceTemplate rocketMQEnhanceTemplate(RocketMQTemplate rocketMQTemplate){
        return new RocketMQEnhanceTemplate(rocketMQTemplate);
    }
 
    /**
     * 解决RocketMQ Jackson不支持Java时间类型配置
     * 源码参考：{@link org.apache.rocketmq.spring.autoconfigure.MessageConverterConfiguration}
     */
    @Bean
    @Primary
    public RocketMQMessageConverter enhanceRocketMQMessageConverter(){
        RocketMQMessageConverter converter = new RocketMQMessageConverter();
        CompositeMessageConverter compositeMessageConverter = (CompositeMessageConverter) converter.getMessageConverter();
        List<MessageConverter> messageConverterList = compositeMessageConverter.getConverters();
        for (MessageConverter messageConverter : messageConverterList) {
            if(messageConverter instanceof MappingJackson2MessageConverter){
                MappingJackson2MessageConverter jackson2MessageConverter = (MappingJackson2MessageConverter) messageConverter;
                ObjectMapper objectMapper = jackson2MessageConverter.getObjectMapper();
                objectMapper.registerModules(new JavaTimeModule());
            }
        }
        return converter;
    }
 
 
    /**
     * 环境隔离配置
     */
    @Bean
    @ConditionalOnProperty(name="rocketmq.enhance.enabledIsolation", havingValue="true")
    public EnvironmentIsolationConfig environmentSetup(RocketEnhanceProperties rocketEnhanceProperties){
        return new EnvironmentIsolationConfig(rocketEnhanceProperties);
    }
 
}
```

```java

public class EnvironmentIsolationConfig implements BeanPostProcessor {
    private RocketEnhanceProperties rocketEnhanceProperties;
 
    public EnvironmentIsolationConfig(RocketEnhanceProperties rocketEnhanceProperties) {
        this.rocketEnhanceProperties = rocketEnhanceProperties;
    }
 
 
    /**
     * 在装载Bean之前实现参数修改
     */
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        if(bean instanceof DefaultRocketMQListenerContainer){
 
            DefaultRocketMQListenerContainer container = (DefaultRocketMQListenerContainer) bean;
 
            if(rocketEnhanceProperties.isEnabledIsolation() && StringUtils.hasText(rocketEnhanceProperties.getEnvironment())){
                container.setTopic(String.join("_", container.getTopic(),rocketEnhanceProperties.getEnvironment()));
            }
            return container;
        }
        return bean;
    }
}
```

```java
@ConfigurationProperties(prefix = "rocketmq.enhance")
@Data
public class RocketEnhanceProperties {
 
    private boolean enabledIsolation;
 
    private String environment;
}
```



#### 3.3 封装后的使用

##### 3.3.1 引入依赖

```xml
<dependency>
   <groupId>com.jianzh5</groupId>
   <artifactId>cloud-rocket-starter</artifactId>
</dependency>
```

##### 3.3.2 自定义配置

```yaml
rocketmq:
 ...
 enhance:
  # 启动隔离，用于激活配置类EnvironmentIsolationConfig
   # 启动后会自动在topic上拼接激活的配置文件，达到自动隔离的效果
   enabledIsolation: true
    # 隔离环境名称，拼接到topic后，topic_dev，默认空字符串
    environment: dev
```

##### 3.3.3 发送消息

```java
@RestController
@RequestMapping("enhance")
@Slf4j
public class EnhanceProduceController {
 
    //注入增强后的模板，可以自动实现环境隔离，日志记录
    @Setter(onMethod_ = @Autowired)
    private RocketMQEnhanceTemplate rocketMQEnhanceTemplate;
 
    private static final String topic = "rocket_enhance";
    private static final String tag = "member";
 
    /**
     * 发送实体消息
     */
    @GetMapping("/member")
    public SendResult member() {
        String key = UUID.randomUUID().toString();
        MemberMessage message = new MemberMessage();
        // 设置业务key
        message.setKey(key);
        // 设置消息来源，便于查询
        message.setSource("MEMBER");
        // 业务消息内容
        message.setUserName("Java日知录");
        message.setBirthday(LocalDate.now());
 
        return rocketMQEnhanceTemplate.send(topic, tag, message);
    }
}
```

注意这里使用的是封装后的模板工具类，一旦在配置文件中启动环境隔离，则生产者的消息也自动发送到隔离后的topic中。

##### 3.3.4 消费者

```cobol

```

为了方便消费者对RocketMQ中的消息进行处理，我们可以使用EnhanceMessageHandler来进行消息的处理和逻辑的处理。

消费者实现了RocketMQListener的同时，可以继承EnhanceMessageHandler来进行公共逻辑的处理，而核心业务逻辑需要自己实现`handleMessage`方法。 如果需要对消息进行过滤或者去重的处理，则可以重写父类的filter方法进行实现。这样可以更加方便地对消息进行处理，减轻开发者的工作量。
