## Vue基础使用

### 1.vue的使用

> 下载Vue：npm i vue

1. 首先下载vue，引入vue.js
2. js中创建一个Vue对象实例
3. 通过el指定vue管理页面的边界

```html
  <!-- 引入vue.js文件 -->
   <script src="lib/vue.js"></script>
   <div id="app">
        <input v-model="message" type="text"><br>
        <h1>{{message}}</h1>
    </div>

    <!-- 下载Vue：npm i vue -->
    <script>
        var vm = new Vue({
            /**
            *   el是element的简写，用来指定vue管理页面的边界，
            *   也就是说只有包裹在 #app内部的元素，才会收到Vue的管理！！！
            */
            el: '#app',

            /**
            *   页面中用的到数据都放到data对象中
            */
            data: {
                message: '邓紫棋喜欢你'
            }

            // 写Vue可能会遇到的错误：
            // 1 注意：Vue 是以大写字母开头的，它是一个构造函数！！！
            // 2 注意：在 Vue 中，HTML属性值无法使用 {{}}！！！
            // 3 开发期间一定要使用未压缩版的Vue（开发版）
        })

        /**
        *   vm是Vue的对象实例，可以通过vm.$data.属性名获取data中的属性值，可以省略$data
        */
        console.log(vm.message)
        console.log(vm.$data.message)
        console.log(vm.message === vm.$data.message)
```

### Mustache表达式使用

> 双花括号`{{}} `就是 `mustache`语法，用于展示`data`中的内容,`mustache 中可以出现任意的 JS表达式`；

- 表达式`{{}}`只能从`数据对象`data中获取数据；
- mustache中`不能出现`语句，比如：`if () {}` /` for(var i =0 ...) {}`/ `var num = 1`;
- Mustache 语法`不能作用在 HTML 元素的属性上`；

```html
 <div id="app">
            <h1>{{ msg }}</h1>
            <p>{{ 1 + 2 }}</p>
            <p>{{ ['a', 'c', 'b'] }}</p>
            <p>{{ ['a', 'c', 'b'].join('-') }}</p>
            <p>{{ msg + ' -- 拼接内容' }}</p>
            <p>{{ age > 18 ? '成年了' : '未成年' }}</p>
            <p>{{ Math.random() }}</p>
    </div>
    <script>
        var vm = new Vue({
            el:'#app',
            data:{
                msg:'邓紫棋金鱼嘴',
                age:19
            }
        })
    </script>
```

## 指令v-使用

> 指令 (Directives) 是带有` v- 前缀`的特殊属性，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。

### **1.v-text**

> 用来设置`当前元素`的`文本内容`，相当于DOM对象的 innerText或textContent

```xml
 <div v-text='msg'></div>
```

### **2.v-html**

> `更新DOM对象的 innerHTML`

```xml
 <div v-html='htmlMsg'></div>
```

### **3.v-bind**

> 通过`v-bind`为HTML元素`绑定属性`，使用`data`中提供的数据;
> 因为 `v-bind:title` 这种使用方式很繁琐，所以，vue提供了一个简化语法 `:title`
>
> 即`v-bind:`简写为`:`

```ruby
<img v-bind:title='msg' v-bind:src='imgPath' v-bind:name='name'>
<img :title='msg' :src='imgPath' :name='name'>
```

### **4.v-on**

> `绑定事件`,**支持js所有的事件类型**，  v-on绑定的事件方法都要写在Vue实例中的`methods`对象中;
>  `v-on:`省略写 `@`

```xml
<button v-on:click='getData'>点我</button><input v-on:onfocus='getFocus'>
<button @click='getData'>点我</button><input @onfocus='getFocus'>
```

### **5.v-model**

> 在表单元素上创建`双向数据绑定`;
> `只能`用在`表单元素`中，注意：不同的表达元素，v-model的表现可能会有所不同。
>  比如：v-model操作`文本框`的`value`属性，而`复选框` v-model 就是操作其`选中状态`;

```html
<!-- 绑定的是文本框输入的内容 -->
<input type="text" v-model='msg'>
<!-- 绑定的是复选框是否选中 -->
<input type="checkbox" v-model='isCheck'>
```

### **6.v-for**

> 基于源数据多次渲染元素或模板块,不仅可以`渲染集合`List也可以`遍历对象`Obj；

```html
      <!-- v-for 遍历list集合-->
       <ul>
            <!--1.item是每一项对象
                使用 v-for 的时候提供 key 属性，以获得性能提升。
            -->
            <li v-for='item in list' :key='item.key'>
                姓名：{{item.name}} -- 年龄：{{item.age}}
            </li>

            <!--2.item 为当前项，index 为索引 -->
            <li v-for='(item,index) in list'>
                姓名：{{item.name}} -- 年龄：{{item.age}} -- 下标：{{index}}
            </li>
        </ul>

       <!-- v-for Obj对象 value,key,index顺序不能变 -->
        <ul>
            <li v-for='(value,key,index) in csObj'>
                key={{key}} -- value={{value}} -- index={{index}}
            </li>
        </ul>
```

### **7.v-bind:class和v-bind:style**

> 表达式的类型：字符串、数组、对象（重点）

```html
<!-- 可以是对象，key是类名 value是布尔值，如果是true就添加这个类，否则就不添加-->
        <h2 :class='{pink:true,green:true}'>中国惊奇先生</h2>
      <!-- 可以是数组，-->
        <h2 :class='['pink','fz','green']'>斗罗大陆</h2>
        <h2 :style="{ color: activeColor, 'font-size': fontSize + 'px' }">不良人</h2>
```

### **8.v-if**

> 根据表达式`布尔值`的真假条件`是否加载`这段代码， `true`:DOM中会`加载`这段代码，`false`:DOM中`不会加载`这段代码；

```html
 <h3 v-if='isIF'>我是v-if,是否会加载我</h3>
```

### **9.v-show**

> 根据`表达式`之`真假值`，切换元素的 `display` CSS 属性，无论`true`还是`false` DOM中`都会加载`这段代码；

```html
<h3 v-show='isShow'>我是v-show，是否会显示出来
</h3>
```

### **10.v-pre**

> 跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。

```xml
<!--测试：页面中的msg不会显示data中的内容，因为跳过了表达式编译-->
 <div v-pre>v-pre跳过编译过程 {{msg}}</div>
```

### **11.v-once**

> 只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。

```xml
    <!--测试：在控制台通过vm对象修改msg,页面显示中的msg内容不会有变化-->
        <div v-once>v-once跳过编译过程 {{msg}}</div>
```

### **12.v-cloak**

> 页面中使用 {{}} 的时候，经历了由 {{}} -> 具体内同，这么一个过程，所以页面会造成“闪烁”
>  解决：通过添加 v-cloak 指令，配合 [v-cloak] { display: none; } 避免了页面闪烁

```html
        <div v-cloak>{{msg}}</div>
```

## 动态添加数据到data、异步更新DOM

### **1.动态添加数据到data**

> 只有`data`中的数据才是响应式的，`动态添加进来的数据默认为非响应式`

可以通过以下方式实现`动态添加数据`的`响应式`:

-  `Vue.set(object, key, value)` - 适用于`添加单个属性`
- `Object.assign()` - 适用于`添加多个属性`

### **2.异步更新DOM**

> 当`绑定的数据`发生变动时，Vue 异步执行 DOM 更新，监视所有数据改变，一次性更新DOM；

**解决方法：**

- `Vue.nextTick`
- `this.$nextTick`

```html
 <div id="app">
        <!-- 点击按钮之前data中还没有age属性 -->
        <button @click='addAge'>给data添加age</button>
        <div>名字：{{stu.name}}</div>
        <!-- 
            这里使用的表达式中的属性必须是响应式的
            只有data中的数据才是响应式的，动态添加进来的数据默认为非响应式 
        -->
        <div>年龄：{{stu.age}}</div>
        <div>性别：{{stu.sex}}</div>
    </div>

    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                msg: 'hello vue',
                stu: {
                    name: 'jack',
                }
            },
            methods: {
                addAge: function () {
                    //可以通过以下方式实现动态添加数据的响应式
                    //1.添加单个属性
                    // 第一个参数：表示要给哪个对象添加响应式属性 $data可以省略
                    // 第二个参数：表示要添加的属性名称
                    // 第三个参数：表示属性的值
                    Vue.set(this.stu, "age", 18)
                    //2.添加多个属性
                    //第一个参数：是一个空对象
                    //第二个参数：添加到哪个对象
                    //第三个参数：添加属性的对象
                    this.stu = Object.assign({},this.stu,{"name":"邓紫棋","age":18,"sex":"man"})

                    //此时打印的内容为 名字：jeck
                    //
                    //为什么呢？ Vue 异步执行 DOM 更新，监视所有数据改变，一次性更新DOM
                    console.log(this.$el.children[1].innerText)

                    //解决方法 Vue.nextTick 和 this.$nextTick 是相同的
                    //在DOM更新后，回调执行某个操作（DOM操作
                    this.$nextTick(function(){
                        console.log(this.$el.children[1].innerText)
                    })
                }
            }
        })
    </script>
```



## filter过滤器

- `作用`：`文本数据格式化` , 也就是: 将数据按照我们指定的一种格式输出
- **过滤器可以用在两个地方：**`{{}}表达式` 和 `v-bind 指令中`
- **两种过滤器：**1 `全局过滤器` 2 `局部过滤器`

### **1.全局过滤器**

- **说明：**通过全局方式创建的过滤器，在任何一个vue实例中都可以使用
- **注意：**使用全局过滤器的时候，需要先创建全局过滤器，再创建Vue实例

```html
<div>{{ dateStr | date }}</div>
<div>{{ dateStr | date('YYYY-MM-DD hh:mm:ss') }}</div>
<script>
  Vue.filter('date', function(value, format) {
    // value 要过滤的字符串内容，比如：dateStr
    // format 过滤器的参数，比如：'YYYY-MM-DD hh:mm:ss'
  })

var vm = new Vue({
})
</script>
```

### **2.局部过滤器**

- **说明：**局部过滤器是在某一个vue实例的内容创建的，只在当前实例中起作用

```html
<div>{{msg | fi("九")}}</div>
<script>
    var vm = new Vue({
            el:'#app',
            data:{
                msg:'八百个标兵奔北坡，八百个标兵奔北坡'
            },
            //2. 局部过滤器 只有在当前Vue实例中才起作用
            // 通过 filters 配置项, 来创建过滤器
            filters:{
                // content是内容，format是过滤的规则可以多个参数
                fi:function(content,format){
                    return content.replace(/八/g,format);
                }
            }
        })
</script>
```

## watch监听配置项

- **概述：**watch是一个`对象`，`键`是`需要观察的表达式`，`值`是`对应回调函数`
- **作用：**`当表达式的值发生变化后，会调用对应的回调函数完成响应的监视操作`

```html
 <div id="app">
        <input type="text" v-model='userName'>
        <p v-show='isError'>请输入4-8位字符</p>
        <input type="text" v-model='stu.age'>
    </div>
    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                userName: '',
                isError: false,
                stu: {
                    age: 10,
                }
            },
            // 通过 watch 配置项，来监视数据变化
            // 只能监视 data 中的数据，要监视的数据，作为watch的属性
            watch: {
                // 监视userName值的变化，方法名要用要监视的值的名字
                userName:function(curVal, oldVal){
                    console.log('当前值为：', curVal, '上一次值为：', oldVal);
                    if(curVal.length>=4 && curVal.length<=8){
                        this.isError = false;
                    }else{
                        this.isError = true;
                    }
                },
                // 监听对象，加上deep:true
                // 注意：如果监视对象的变化，那么，curVal 和 oldVal 是相同的，指向同一个对象
                stu:{
                    handler:function(curVal, oldVal){
                        console.log('当前值为：', curVal, '上一次值为：', oldVal);
                    },
                    deep: true
                },
                // 一般都是监听对象中的属性
                // 只需要监视某个属性的变化，而不是整个对象中所有的属性的变化
                'stu.age':function(curVal, oldVal){
                    console.log('当前值为：', curVal, '上一次值为：', oldVal);
                }
            }
        })
    </script>
```

## computed计算属性配置项

- **说明：**`计算属性`是基于它们的`依赖`进行`缓存`的，只有在它的`依赖`发生`改变`时才会`重新求值`
- **注意：**Mustache语法（{{}}）中不要放入太多的逻辑，否则会让模板过重、难以理解和维护
- **注意：**`computed`中的属性`不能`与`data`中的属性`同名`，否则会`报错`

```html
 <div id="app">
        <input type="text" v-model='num1'>+
        <input type="text" v-model='num2'>=
        <input type="text" v-model='result'>
    </div>
    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                num1: 0,
                num2: 0,
                // result: 0 计算属性名不能和data中的属性相同
            },
            // 计算属性，通过 computed 配置项来指定
            // 注意：计算属性不能与data中的属性相同！！！否则会报错
            // 特点：计算属性依赖的属性（比如：num1 和 num2）发生改变，那么计算属性就会被重新计算
            // 优势：内部使用缓存机制，如果页面中多个地方都用到了计算属性，那么计算属性只会被重新计算一次！！！
            computed: {
                result:function(){
                    return (this.num1-0)+(this.num2-0);
                }
            }
        })
    </script>

```



## 事件修饰符

- `.stop` 阻止向上冒泡 不会调用父的事件
- `.prevent` 阻止默认行为，调用 event.preventDefault()
- `.capture`捕获冒泡
- `.self` 只当事件在该元素本身触发时，才会触发事件
- `.once`  事件只触发一次

```html
 <!-- .stop 阻止向上冒泡 不会调用父的事件 -->
        <div @click='cathFather'>我是父事件修饰符
            <!-- .stop  阻止冒泡，调用 event.stopPropagation() -->
            <div @click.stop='catchSon'>我是子事件修饰符</div>
        </div>

        <!-- .prevent 阻止默认行为，调用 event.preventDefault() -->
        <a href="http://www.baidu" @click.prevent='onPrevent'>我是prevent事件</a>

        <!-- .capture捕获冒泡，
            即有冒泡发生时，有该修饰符的dom元素会先执行，如果有多个，从外到内依次执行，然后再按自然顺序执行触发的事件。
        -->
        <!-- 如果不给爷爷添加capture 点击儿子触发的顺序是 儿子、爸爸、爷爷 -->
        <!-- 给爷爷添加了capture事件后 点击儿子触发的顺序是 爷爷、儿子、爸爸 -->
        <div @click.capture='grandpa'>我是爷爷
            <div @click='father'>我是爸爸
                <div @click='son'>
                        我是儿子
                </div>
            </div>
        </div>

        <!-- .self 只当事件在该元素本身触发时，才会触发事件 -->
        <div @click.self='onSelfFather'>self事件爸爸
            <div @click='onSelfSon'>self事件儿子</div>
        </div>

        <!-- .once  事件只触发一次 -->
        <div @click.once='onOnce'>再点我一次试试</div>
```

## 键值修饰符

- **说明：**在`监听键盘事件`时，Vue 允许为 `v-on` 在`监听键盘事件`时`添加关键修饰符`

```html
   <div id="app">
        <!-- 键值修饰符 包括键盘、鼠标 -->
        <!-- 13是Enter键的code值 -->
        <input type="text" v-model='msg' @keyup.13='submit'>
        <input type="text" v-model='msg2' @keyup.enter='submit2'><br>
        <!-- 使用自定义键值修饰符 -->
        <input type="text" v-model='msg' @keyup.f2='submit'>
    </div>

    <script>
        // 自定义键值修饰符 有时候写code值是数字的时候并没有语义，所有我们给它定义一下
        Vue.config.keyCodes.f2 = 113;
        var vm = new Vue({
            el:'#app',
            data:{
                msg:'',
                msg2:''
            },
            methods:{
                submit:function(){
                    console.log('提交数据='+this.msg)
                },
                submit2:function(){
                    console.log('提交数据='+this.msg2)
                },
            }
        })
    </script>
```

## vue声明周期钩子函数

### **beforeCreate()**

- **说明：**在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用
- **注意：**此时，`无法获取 data中的数据`、`methods中的方法`
- **使用场景：**可以在这个钩子函数中开启页面加载的 loading 效果

### **created()**

- **说明：**实例已经创建好了，属性已经绑定好了，dom（没有生成）

- **注意：**这是一个常用的生命周期，`可以调用methods中的方法`、`改变data中的数据`
- **使用场景：**发送请求获取数据(ajax)

### **beforeMounted()**

- **说明：**组件将要挂载到页面中，也就是说：组件的内容还没有被挂载到页面中
- **注意：**此时，`获取不到页面中DOM元素`

### **mounted()**

- **说明：**组件已经被挂载到页面中，此时，`可以进行DOM操作了`

### **beforeUpdate()**

- **说明：**数据更新时调用，发生在`虚拟 DOM 重新渲染`和`打补丁`之前。你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。

### **udated()**

- **说明：**组件 DOM 已经更新完成（`真实的DOM`），所以你现在可以执行依赖于 DOM 的操作。

### **beforeDestroy()**

- **说明：**实例销毁之前调用。在这一步，实例仍然完全可用。
- **使用：**实例销毁之前，执行清理任务，比如：清除定时器等

### **destroyed()**

- **说明：**Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

## 自定义指令

> Vue这种MVVM模式的框架`不推荐开发人员直接手动操作DOM`,有些情况, 还是需要操作DOM的, 如果需要操作DOM, 就通过 Vue中的`自定义指令`来操作!!!

### 通过Vue.directive()方法自定义指令：

- **第一个参数:** 表示自定义指令的名称；
- **第二个参数** :表示自定义指令运行的时候, 需要执行的逻辑操作；

```js
 Vue.directive('ff1', function (el) {
            console.log(el)
 })
```

> 第二个参数还可以是一个对象，对象中是指令的钩子函数

```js
 Vue.directive('ff2', {
            // bind 和 inserted 这两个钩子函数， 都是进入页面就立即执行的
            // 区别：inserted 能获取到指令所在元素的父元素，bind 获取不到父元素
            bind(el) {
                console.log('bind', el.parentNode)
            },
            inserted(el) {
                console.log('inserted', el.parentNode)
            })}
```

#### 指令函数的入参:

```xml
        <!-- 标识放到自定义指令的后面 .表示名 -->
        <!-- 注意：如果 v-color="red" 那么，red指的值：data中的red属性 -->
        <div v-color.back=" 'blue' ">{{ msg }}</div>
        <div v-color.col=" 'red' ">{{ msg }}</div>
      Vue.directive('color', function (el, binding) {
            if (binding.modifiers.col) {
                el.style.color = binding.value
            } else {
                el.style.backgroundColor = binding.value
            }
        })
```

#### 小案例

> 案例请到[https://github.com/pengjunshan/WebPJS](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fpengjunshan%2FWebPJS%2Fblob%2Fmaster%2FVue%2Fvue%E5%9F%BA%E7%A1%80%E4%BD%BF%E7%94%A8%2F12.%E5%B0%8F%E6%A1%88%E4%BE%8B.html)中查看
>
> ![img](https:////upload-images.jianshu.io/upload_images/3735156-799df1d167356992.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)
>
> 案例

## Vue组件

> `组件是可复用的 Vue 实例`,组件分为`全局组件`和`局部组件`。因为组件是可复用的 Vue 实例，所以它们与` new Vue` 接收相同的选项，例如 `data`、`computed`、`watch`、`methods` 以及`生命周期钩子`等
>
> ==**el** 是根实例特有的属性，组件中没有。==

### 全局组件

> `全局组件`在所有的vue实例中都可以使用
>
> **注意**：先注册组件，再初始化根实例。

#### **Vue.component('name'，{配置项})**

- **第一个参数**是`组件名`
- **第二个参数**是`组件的配置项`，与Vue根实例配置项差不多
- `组件`中的`data`必须是个`函数数据`用`return`返回，`Vue`根实例中的`data`是个`对象`
- `组件`中`template`模板有两种方式，“`字符串`” “`html模板`”

```html
<body>
    <div id="app">
        <hello></hello>
    </div>

    <template id="temp">
        <div>
            <p>我是组件：{{msg}}</p>
            <button @click='fn'> 点击消灭新冠 </button>
        </div>
    </template>
    <script>

        /**
        * 第一个参数是组件名
        * 第二个参数是配置项，与Vue实例的配置几乎一样
        */
        Vue.component('hello', {
            //template是组件的模板 也就是要展示的内容
            //组件中template模板有两种方式，“字符串” “html模板”
            //方式一：字符串
            // template: `
            //     <div>
            //         <p>我是组件：{{msg}}</p>
            //         <button @click='fn'> 点击消灭新冠 </button>
            //     </div>
            // `,
            //方式二：html模板
            template: '#temp',

            //组件中的data必须是个函数数据用return返回，Vue跟实例中的data是个对象
            data() {
                return {
                    msg: '武汉加油 中国加油'
                }
            },
            methods: {
                fn() {
                    this.msg = '新冠被消灭了，中国威武'
                }
            }
        })
        var vm = new Vue({
            el: '#app',
            data: {}
        })
    </script>
</body>
```

### 局部组件

> `局部组件`，是在某一个具体的vue实例中定义的，只能在这个vue实例中使用
>
> 在`Vue实例`中使用`components`对象创建组件，`可以创建多个`组件；

```html
<body>
    <div id="app">
        <!-- hello组件 -->
        <hello></hello>
        <!-- love组件 -->
        <love></love>
    </div>

    <template id="temp">
        <div>
            <p>我是组件222：{{msg}}</p>
            <button @click='fn'> 点击消灭新冠 </button>
        </div>
    </template>

    <script>

        //1.局部组件，是在某一个具体的vue实例中定义的，只能在这个vue实例中使用
        //2.在Vue实例中使用components对象创建组件，可以创建多个组件
        //3.组件中template模板有两种方式，“字符串” “html模板”

        var vm = new Vue({
            el: '#app',
            data: {
            },
            components: {
                //hello 组件名
                'hello': {
                    //方式一 字符串
                    template: `
                        <div>
                            <p>我是组件111：{{msg}}</p>
                            <button @click='fn'> 点击消灭新冠 </button>
                        </div>
                    `,
                    data() {
                        return {
                            msg: '武汉加油 中国加油'
                        }
                    },
                    methods: {
                        fn() {
                            this.msg = '新冠被消灭了，中国威武'
                        }
                    }
                },
                'love': {
                    //方式二 引用html中的代码模板
                    template: '#temp',
                    data() {
                        return {
                            msg: '我们爱中国 爱武汉'
                        }
                    },
                    methods: {
                        fn() {
                            this.msg = '我们爱中华民族'
                        }
                    }
                }

            }
        })
    </script>
</body>
```

### 父组件传递子组件数据

- **方式：**通过`props`属性来传递数据
- **注意：**属性的值必须在组件中通过`props`属性显示指定，否则，`不会生效`
- **说明：**传递过来的`props`属性的用法与`data`属性的用法相同
- 如果传递的数据是`data`中的属性时，必须使用`v-bind`绑定属性才可以传递过去

```html
<body>
    <div id="app">
        <hello mm='中华民族万岁'></hello>
        <!-- 如果传递的数据是data中的属性时，必须使用v-bind绑定属性才可以传递过去 -->
        <!-- <hello zz='msg'></hello> -->
        <hello v-bind:zz='msg'></hello>
    </div>

    <script>

        // 父组件 传递数据给 子组件：（父组件：Vue的实例对象，子组件：hello组件）
        // 原理：通过 props 属性来传递
        // 注意：使用父组件传递的属性方式和使用data中的属性方式一样
        Vue.component('hello', {
            template: `
                <div>
                    <p>我是组件：{{msg}}</p>
                    <p v-if='mm'>我接收到父组件的内容：{{mm}}</P>
                    <p v-if='zz'>我接收到父组件的内容：{{zz}}</P>
                    <button @click='fn'> 点击消灭新冠 </button>
                </div>
            `,
            //指定props中的值，来接收父组件传递过来的值
            props:['mm','zz'],
            data() {
                return {
                    msg: '武汉加油 中国加油'
                }
            },
            methods: {
                fn() {
                    this.msg=this.msg+'-----'+(this.mm===undefined? this.zz:this.mm);
                }
            }
        })
        var vm = new Vue({
            el: '#app',
            data: {
                msg:'浙江杭州'
            }
        })
    </script>
</body>
```

### 子组件传递父组件数据

- **方式：**父组件给子组件传递一个函数，由子组件调用这个函数
- **说明：**借助vue中的自定义事件（v-on:cunstomFn="fn"）
- $emit()：触发事件

```html
<body>
    <div id="app">
        <p>{{msg}}</p>
        <hello @pfn='parentFn'></hello>
    </div>
    <template id="temp">
        <div>
            <p>我是组件：{{msg}}</p>
            <button @click='sonFn'> 点击消灭新冠 </button>
        </div>
    </template>
    <script>
        //组件传递 子》父
        //1.由父组件定义一个方法，通过@pfn传给子组件
        //2.子组件通过$emit方法把数据传递给父组件定义的方法

        Vue.component('hello', {
            template: '#temp',
            data() {
                return {
                    msg: '武汉加油 中国加油'
                }
            },
            methods: {
                sonFn() {
                    //通过$emit方法传递数据给父组件的方法，参数可以为多个
                    this.$emit('pfn', '新冠被消灭了，中国威武', '测试')
                }
            }
        })

        var vm = new Vue({
            el: '#app',
            data: {
                msg: '标题'
            },
            methods: {
                parentFn(data, data2) {
                    this.msg = data;
                    console.log(data2)
                }
            },
        })
    </script>
</body>
```

### 非父子组件传递数据

- 可以使用一个`空的 Vue 实例`作为`事件总线bus`
- **A组件传递B组件数据** 
  1. `B`先通过`bus.$on`绑定事件，
  2. `A`通过`bus.$emit`方法调用`B绑定的事件方法`
- `$on`和`$emit`都是`bus`调用的

```html
<body>
    <div id="app">
        <aaa></aaa>
        <bbb></bbb>
    </div>
    <script>
        //可以使用一个空的 Vue 实例作为事件总线
        var bus = new Vue()
        //A组件传递B组件数据 1.B先通过bus.$on绑定事件，2.A通过bus.$emit方法调用B绑定的事件方法
        //$on和$emit都是bus调用的
        var vm = new Vue({
            el: '#app',
            data: {},
            components: {
                aaa: {
                    template: `
                        <div>
                            <h3>我是组件AA</h3>
                            <button @click='fn'> 点我传给B数据 </button>
                        </div>
                    `,
                    data() {
                        return {
                            msg: 'A组件'
                        }
                    },
                    methods: {
                        fn() {
                            bus.$emit('bfn', '组件A说：你好组件B')
                        }
                    }

                },
                bbb: {
                    template: `
                        <div>
                            <h3>我是组件BB</h3>
                            <p>{{msg}}</p>
                        </div>
                    `,
                    data() {
                        return {
                            msg: '我在等待数据...'
                        }
                    },
                    created() {
                        //绑定事件 接收数据，当进入页面时走到这个钩子函数后就自动绑定事件了
                        bus.$on('bfn', data => {
                            this.msg = data
                        })
                    }
                }
            }
        })
    </script>
</body>
```

### 组件中插槽使用

> 有时在使用组件的时候希望往组件中加入其它内容，在组件中通过插槽`<slot></slot>`来接收内容。
>
> ==插槽内可以包含任何模板代码，包括 HTML，甚至其它的组件；==



```html
<body>
  <div id="app">
    <hello>
      <p>赶走新冠</p>
    </hello>
  </div>

  <template id="temp">
    <div>
      <p>{{msg}}</p>
      <slot></slot>
      <slot></slot>
    </div>
  </template>

  <script>

    //当组件渲染的时候，<slot></slot> 将会被替换为"赶走新冠"。插槽内可以包含任何模板代码
    //可以有多个插槽
    Vue.component('hello',{
      template:'#temp',
      data(){
        return{
          msg:'武汉加油 中国加油'
        }
      }
    })
    var vm = new Vue({
      el: '#app',
      data: {
        msg:'赶走新冠'
      }
    })
  </script>
</body>
```

### vue中ref使用

> 使用`ref注册后`  可以使用`this.$refs`获取`当前DOM对象`
>
> 必须在`mounted()钩子函数之后`才可以获取DOM对象；
>
> `元素`和`组件`都可以使用ref注册；

```html
<body>
    <div id="app">
        <!-- 使用ref注册后  可以使用this.$refs.pp获取当前DOM对象 -->
        <p ref='pp'>哈喽，大家好</p>

        <!-- 组件也可以 -->
        <hello ref="ho"></hello>
    </div>

    <script>
        var vm = new Vue({
            el: '#app',
            components: {
                hello: {
                    template: `<h1>大家好</h1>`,
                    data() {
                        return {
                            msg: 'hello message'
                        }
                    },
                    methods: {
                        fn() {
                            console.log("触发了事件11111")
                        }
                    }
                }
            },
            mounted() {
                console.log(this.$refs.pp)
                this.$refs.pp.style.color = 'red';

                console.log(this.$refs.ho.msg)
                this.$refs.ho.fn()
            }
        })
    </script>
</body>
```

## vue-router路由

### 路由基本使用

1. 在当前文件夹下执行`npm init`、`npm init -y`初始化package.json
2. 然后执行`npm i -s vue`、`npm i -s vue-router`安装vue和vue-router
3. 在`node_modules`下找到`vue`和`vue-router`中的`js`并引入到项目中
4. 创建组件
5. 创建路由对象，并配置路由
6. 在`Vue实例`中`关联router`
7. 路由入口
8. 路由出口

```html
<body>
    <div id="app">
        <!-- 6.路由入口 -->
        <router-link to='/home'>首页</router-link>
        <router-link to='/me'>我的</router-link>
        <!-- 7.路由出口 -->
        <router-view></router-view>
    </div>
    <script src="./node_modules/vue/dist/vue.js"></script>
    <script src="./node_modules/vue-router/dist/vue-router.js"></script>
    <script>
        //首先先安装vue和vue-router
        //1.在当前文件夹下执行npm init、npm init -y初始化package.json
        //2.然后执行npm i -s vue、npm i -s vue-router安装vue和vue-router
        //3.在node_modules下找到vue和vue-router中的js并引入到项目中
        //4.先创建两个组件
        const Home = Vue.component('home', {
            template: `<h1>我是Home组件</h1>`
        })
        const Me = Vue.component('me', {
            template: `<h1>我是Me组件</h1>`
        })
        //5.创建路由对象
        const router = new VueRouter({
            routes: [
                { path: '/home', component: Home },
                { path: '/me', component: Me }
            ]
        })
        var vm = new Vue({
            el: '#app',
            data: {},
            //将vue和router
            router: router
        })
    </script>
</body>
```

### 重定向、高亮

> 当第一次打开页面时，想要`默认打开一个路由`，就可以使用`路由中的重定向`；
>
> `按钮的高亮样式`不是我们喜欢的，可以使用`linkActiveClass`来`自定义高亮元素的类名`，然后再设置css样式就可以了；

```html
<script>
    //5.创建路由对象
        const router = new VueRouter({
            routes: [
                //如果当前路径是'/'就redirect重定向 默认home组件
                { path: '/', redirect: '/home' },
                { path: '/home', component: Home },
                { path: '/me', component: Me }
            ],
            // 修改默认高亮的a标签的类名
            // 如果是配合第三方组件库来实现菜单高亮，此时，只需要将类名设置为 第三方组件的类名即可
            linkActiveClass: 'now'
        })
</script> 
 <style>
        /* .router-link-exact-active, */
        /* .router-link-active { */
        .now {
            color: hotpink;
            font-size: 30px;
            text-decoration: none;
        }
    </style>
```

### 路由传参方式

> 有时候`多个路由`都打开`同一个组件`，可以通过给`组件`传`不同的参数`展示`不同的内容`就可以了
>
> 通过路由打开不同组件传参也是一样的

#### **导航分为两种**

- `声明式导航`(router-link)
- `编程式导航`($router.push)

##### **声明式导航(`router-link`)**

- `to字符串`：只能传递字符串
- `:to对象`：可以传递对象,可以通过name、path方式

##### **编程式导航(`$router.push`)**

- this.![router.push(name,params);通过name跳转的状态栏里看不到参数类似post;组件通过](https://math.jianshu.com/math?formula=router.push(name%2Cparams)%3B%E9%80%9A%E8%BF%87name%E8%B7%B3%E8%BD%AC%E7%9A%84%E7%8A%B6%E6%80%81%E6%A0%8F%E9%87%8C%E7%9C%8B%E4%B8%8D%E5%88%B0%E5%8F%82%E6%95%B0%E7%B1%BB%E4%BC%BCpost%3B%E7%BB%84%E4%BB%B6%E9%80%9A%E8%BF%87)route.params获取参数;
- this.![router.push(path,query);通过path跳转的状态栏里可以看到参数类似get;组件通过](https://math.jianshu.com/math?formula=router.push(path%2Cquery)%3B%E9%80%9A%E8%BF%87path%E8%B7%B3%E8%BD%AC%E7%9A%84%E7%8A%B6%E6%80%81%E6%A0%8F%E9%87%8C%E5%8F%AF%E4%BB%A5%E7%9C%8B%E5%88%B0%E5%8F%82%E6%95%B0%E7%B1%BB%E4%BC%BCget%3B%E7%BB%84%E4%BB%B6%E9%80%9A%E8%BF%87)route.query获取参数;

**监听路由变化**

> 在组件中通过watch对象中监听路由的变化$route(to, from) {}，在这里可进行监听数据变化 进行网络请求等等；

**详细使用方式请看下面代码**

```html
<body>
    <div id="app">
        <!-- 通过to字符串 -->
        <router-link to="/home/1001">1001号赛车</router-link>
        <router-link to="/home/1002">1002号赛车</router-link>
        <!-- 通过$router.push{} -->
        <a @click='fn'>1003号赛车</a>
        <a @click='fn1'>1004号赛车</a>
        <!-- 通过:to对象 -->
        <router-link :to="{ name:'Home',params:{id:1005,title:'pjs'}}">1005</router-link>
        <router-link :to="{ path:'/home',query:{id:1006,title:'pjs'}}">1006</router-link>

        <router-view></router-view>
    </div>

    <script>
        //导航分为两种：1.声明式导航(router-link)  2.编程式导航($router.push)
        //1.通过to字符串
        //2.$router.push{}
        //3.通过:to对象

        //通过name跳转的状态栏里看不到参数类似post，通过path跳转的状态栏里可以看到参数类似get
        //通过$route.params或$route.query来获取参数
        const Home = Vue.component('home', {
            template: `
                <div>
                    <h1 v-if='$route.params.id'>欢迎来到主页面{{ $route.params.id}}</h1>
                    <h1 v-if='$route.query.id'>欢迎来到主页面{{ $route.query.id}}</h1>
                </div>
            `,
            //监听路由变化，获取参数进行操作
            watch: {
                 //只要路由发生的变化就会执行这个方法，to 跳转的目的地， from 从哪里来
                $route(to, from) {
                    //在这里可进行监听数据变化 进行网络请求
                    console.log(to)
                    console.log(from)
                    console.log(to.params.id)
                    console.log(to.query.id)
                }
            }
        })

        const router = new VueRouter({
            routes: [
                { path: '/home/:id', component: Home },
                { path: '/home', name: 'Home', component: Home }
            ]
        })

        var vm = new Vue({
            el: '#app',
            router,
            methods: {
                fn() {
                    this.$router.push({
                        name: 'Home',//找到routes里匹配到name为Home
                        params: {
                            id: 1003,
                            title: 'pjs'
                        }
                    })
                },
                fn1() {
                    this.$router.push({
                        path: '/home',
                        query: {
                            id: 1004,
                            title: 'pjs'
                        }
                    })
                }
            }
        })
    </script>
</body>
```

### 路由嵌套-子路由

- 路由是可以嵌套的，即：路由中又包含子路由
- 规则：父组件中包含 router-view，在路由规则中使用 children 配置
- 使用children里配置子路由，子路由的path里不需要加/符号了

```html
<body>
    <div id="app">
        <router-link to='/home'>首页</router-link>
        <router-link to='/user'>我的</router-link>
        <router-view></router-view>
    </div>

    <script>

        //路由是可以嵌套的，即：路由中又包含子路由
        //规则：父组件中包含 router-view，在路由规则中使用 children 配置
        const Home = Vue.component('home', {
            template: `
                <div>
                    <router-link to='/home/cartA'>买车</router-link>
                    <router-link to='/home/cartB'>卖车</router-link>
                    <router-view></router-view>
                </div>
            `
        })
        const CartA = {
            template: `<h3>买什么样的车？</h3>`
        }
        const CartB = {
            template: `<h3>卖什么样的车？</h3>`
        }
        const User = Vue.component('user', {
            template: `
                <div>
                    这里是个人信息
                </div>
            `
        })
        const router = new VueRouter({
            routes: [
                {
                    path: '/home', component: Home,
                    //使用children里配置子路由，子路由的path里不需要加/符号了
                    children: [
                        {
                            path: 'cartA',
                            component: CartA
                        },
                        {
                            path:'cartB',
                            component:CartB
                        }
                    ]
                },
                { path: '/user', component: User }
            ]
        })
        var vm = new Vue({
            el: '#app',
            router
        })
    </script>
</body>
```

## vuex

> Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。意思就是所有组件共同操作一份数据，都可以对它进行增删改查。
>  属性|作用
>  :---:|:---:
>  State|共享数据都存在这里
>  Mutation|更改State中数据的唯一方法，同步操作

Action|异步操作Mutation来更改State中的数据
 Getter|基于state的派生状态，可理解为组件中的计算属性

### State

1.安装vuex npm i -s vuex
 2.创建store对象
 3.把vue和store进行关联
 4.使用$store.state中的数据

```xml
<body>
    <div id="app">
        <!-- 4.使用$store.state中的数据 -->
        <h1>{{this.$store.state.name}}</h1>
    </div>
    <script>
        //1.安装vuex npm i -s vuex
        //2.创建store对象
        let store = new Vuex.Store({
            /**
            *   state中可以存储任何类型的值
            */
            state: {
                name: '邓紫棋'
            }
        })
        let vm = new Vue({
            el: '#app',
            data: {},
            //3.把vue和store进行关联
            store,
            mounted() {
                //可以获取store对象
                console.log(this.$store)
            }
        })
    </script>
</body>
```

![img](https:////upload-images.jianshu.io/upload_images/3735156-7bac355c4d38d857.png?imageMogr2/auto-orient/strip|imageView2/2/w/517/format/webp)

state使用

#### Mutation

> mutation是更改store中状态的唯一方法,vuex中规定只能通过提交mutation的方式去更改store中的状态,store.commit()方法更改数据。

- 无参数

```kotlin
//调用方 只传一个方法名
this.$store.commit('changeName')
//接收方 默认第一个参数是state，无参接收
 changeName(state) {
            state.name = '张韶涵'
            }
```

- 载荷提交，只能提交一个参数

```kotlin
//调用方，第一个参数：方法名，第二个参数：参数
this.$store.commit('changeName',this.msg)
//接收方
 changeName(state, name) {
                    state.name = name ? name : '张韶涵';
                }
```

- 载荷对象提交

```kotlin
//调用方，传递一个对象
               this.$store.commit('changeName',{
                   name:this.msg
               })
//接收方
                changeName(state, payload) {
                    state.name = payload.name ;
                    state.sex = payload.sex//给state新增一个属性
                }
```

- 纯对象风格提交 type值是方法名



```kotlin
//提交一个纯对象当做参数，type值为方法名
                    this.$store.commit({
                        type: 'changeName',
                        name: this.msg,
                        sex: '男'
                    })
//接收方
                changeName(state, payload) {
                    state.name = payload.name ;
                    state.sex = payload.sex//给state新增一个属性
                }
```

- 案例

```html
<body>
    <div id="app">
        <!-- 组件AAA和组件BBB共同操作$store.state中的数据 -->
        <!-- 比我们之前学的组件之间通讯更加方便 -->
        <AAA></AAA>
        <BBB></BBB>
    </div>
    <script>
        /**
        *  mutation是更改store中状态的唯一方法
        *  vuex中规定只能通过提交mutation的方式去更改store中的状态
        *  store.commit()更改数据
        */
        let store = new Vuex.Store({
            state: {
                name: '邓紫棋'
            },

            /**
            *   mutations对象中自定义方法来操作state中的数据
            *   并且每个方法会接受 state 作为第一个参数
            *   注意：Store对象中写mutations；Mutation 必须是同步函数
            */
            mutations: {
                //不接收参数
                changeName(state) {
                    state.name = '张韶涵'
                },
                //只接收一个参数
                changeName(state, name) {
                    state.name = name ? name : '张韶涵';
                },
                //接收参数对象
                changeName(state, payload) {
                    state.name = payload.name ? payload.name : '张韶涵';
                    state.sex = payload.sex//给state新增一个属性
                }
            }
        })

        //创建两个组件
        const AAA = Vue.component('aaa', {
            template: `
                <div>
                    <!-- 4.使用$store.state中的数据 -->
                    <h1>{{this.$store.state.name}}</h1>
                    <h2>{{this.$store.state.sex}}</h2>
                </div>
            `
        })
        const BBB = Vue.component('bbb', {
            template: `
                <div>
                    <input type="text" placeholder="请输入姓名" v-model='msg'>
                    <input type="button" value="确定" @click='change'>
                </div>
            `,
            data() {
                return {
                    msg: ''
                }
            },
            methods: {
                change() {
                    //1.无参数
                    // this.$store.commit('changeName')

                    //2.载荷提交，只能提交一个参数
                    // this.$store.commit('changeName',this.msg)

                    //3.载荷对象提交
                    // this.$store.commit('changeName',{
                    //     name:this.msg
                    // })

                    //4.纯对象风格提交 type值是方法名
                    this.$store.commit({
                        type: 'changeName',
                        name: this.msg,
                        sex: '男'
                    })
                }
            }
        })
        let vm = new Vue({
            el: '#app',
            //把vue和store进行关联
            store
        })
    </script>
</body>
```

![img](https:////upload-images.jianshu.io/upload_images/3735156-46e377f77e8f06bb.png?imageMogr2/auto-orient/strip|imageView2/2/w/706/format/webp)

组件通过mutation修改共享数据

### Action

> mutation中规则上是不允许异步操作的,于是vuex为我们提供了action。anctions对象中自定义方法来操作mutations,并且每个方法会接受 context 作为第一个参数,context对象与store对象具有相同的方法和属性;action 与 mutation 除了使用了异步操作和调用mutation，其它使用并无差别 ;

- 异步更新数据

```tsx
                    //action事件的触发同样可以使用载荷和对象两种方式,其它方式就不写了和mutations方式一样
                    this.$store.dispatch({
                        type:'changeNameAsync',//Store.anctions中的方法名
                        name: this.msg,
                        sex: '男'
                    })
 actions: {
                //接收数据 延迟一秒提交数据
                changeNameAsync(context, payload) {
                    //异步操作
                    setTimeout(() => {
                        context.commit('changeName',payload)
                    }, 1000)
                }
            }
            mutations: {
                //接收参数对象
                changeName(state, payload) {
                    state.name = payload.name ;
                    state.sex = payload.sex//给state新增一个属性
                }
            }
```

- 案例

```xml
<body>
    <div id="app">
        <AAA></AAA>
        <BBB></BBB>
    </div>
    <script>
        /**
        *  anction--异步更改状态
        *  mutation中规则上是不允许异步操作的,于是vuex为我们提供了action。
        *  store.dispatch() 方法触发
        */
        let store = new Vuex.Store({
            state: {
                name: '邓紫棋'
            },

            /**
            *   mutations只能同步执行
            */
            mutations: {
                //接收参数对象
                changeName(state, payload) {
                    state.name = payload.name ? payload.name : '张韶涵';
                    state.sex = payload.sex//给state新增一个属性
                }
            },
            /**
            *   anctions对象中自定义方法来操作mutations,并且每个方法会接受 context 作为第一个参数;
            *   context对象与store对象具有相同的方法和属性
            *   action 与 mutation 除了使用了异步操作和调用mutation，其它使用并无差别 
            */
            actions: {
                //接收数据
                changeNameAsync(context, payload) {
                    //异步操作
                    setTimeout(() => {
                        context.commit({
                            type: 'changeName',
                            name: payload.name,
                            sex: '男'
                        })
                    }, 1000)
                }
            }
        })

        //创建两个组件
        const AAA = Vue.component('aaa', {
            template: `
                <div>
                    <!-- 4.使用$store.state中的数据 -->
                    <h1>{{this.$store.state.name}}</h1>
                    <h2>{{this.$store.state.sex}}</h2>
                </div>
            `
        })
        const BBB = Vue.component('bbb', {
            template: `
                <div>
                    <input type="text" placeholder="请输入姓名" v-model='msg'>
                    <input type="button" value="确定" @click='change'>
                </div>
            `,
            data() {
                return {
                    msg: ''
                }
            },
            methods: {
                change() {
                    //action事件的触发同样可以使用载荷和对象两种方式,其它方式就不写了和mutations方式一样
                    this.$store.dispatch({
                        type:'changeNameAsync',//Store.anctions中的方法名
                        name: this.msg
                    })
                }
            }
        })
        let vm = new Vue({
            el: '#app',
            store
        })
    </script>
</body>
```

![img](https:////upload-images.jianshu.io/upload_images/3735156-1bb9c077d8bc7f10.png?imageMogr2/auto-orient/strip|imageView2/2/w/709/format/webp)

action延迟提交数据

### getter

> getters类似Vue实例中的计算属性，当绑定的属性发生变化后才会重新计算;每个方法都默认接收state参数。

- getters使用

```kotlin
//在getters下创建一个getName方法，默认接收state，此方法和计算属性用法一样，当state中的name发生改变时会重新计算这个方法return结果
            getters:{
                getName(state){
                    let myName='';
                    if(state.name === '彭俊山'){
                        myName = '你是最帅的！'
                    }
                    return state.name + myName;
                }
            }
//在A组件中使用getters下的getName属性，当B组件修改了state中的name后A组件中h2数据也会变化
<h2>{{this.$store.getters.getName}}</h2>
```

- 案例



```html
<body>
    <div id="app">
        <AAA></AAA>
        <BBB></BBB>
    </div>
    <script>
        let store = new Vuex.Store({
            state: {
                name: '邓紫棋'
            },
            mutations: {
                //接收参数对象
                changeName(state, payload) {
                    state.name = payload.name ? payload.name : '张韶涵';
                }
            },
            /**
            *   getters类似Vue实例中的计算属性，当绑定的属性发生变化后才会重新计算
            *   每个方法都默认接收state参数
            */
            getters:{
                getName(state){
                    let myName='';
                    if(state.name === '彭俊山'){
                        myName = '你是最帅的！'
                    }
                    return state.name + myName;
                }
            }
        })

        //创建两个组件
        const AAA = Vue.component('aaa', {
            template: `
                <div>
                    <!-- 使用$store.state中的数据 -->
                    <h1>{{this.$store.state.name}}</h1>
                    <!-- 使用$store.getters中的属性 -->
                    <h2>{{this.$store.getters.getName}}</h2>
                </div>
            `
        })
        const BBB = Vue.component('bbb', {
            template: `
                <div>
                    <input type="text" placeholder="请输入姓名" v-model='msg'>
                    <input type="button" value="确定" @click='change'>
                </div>
            `,
            data() {
                return {
                    msg: ''
                }
            },
            methods: {
                change() {
                    //纯对象风格提交 type值是方法名
                    this.$store.commit({
                        type: 'changeName',
                        name: this.msg
                    })
                }
            }
        })
        let vm = new Vue({
            el: '#app',
            store
        })
    </script>
</body>
```

![img](https:////upload-images.jianshu.io/upload_images/3735156-ae75344b34e3a726.png?imageMogr2/auto-orient/strip|imageView2/2/w/709/format/webp)

使用getters接收数据

### vuex刷新页面store数据丢失

> 当刷新页面后，store中的数据都会丢失；将store的数据存储在storage里，由于vue多为单页面应用，且每次重新打开页面需要保持数据为空 所以这里我们不选用localstorage，用sessionStorage会话机制;



```html
<script>
            created() {
                //在页面加载时读取sessionStorage里的状态信息
                if (sessionStorage.getItem("store")) {
                    this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
                }

                //在页面刷新时将vuex里的信息保存到sessionStorage里
                window.addEventListener("beforeunload", () => {
                    sessionStorage.setItem("store", JSON.stringify(this.$store.state))
                })
            }
</script>
```



作者：艾曼大山
链接：https://www.jianshu.com/p/72332db06a23
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

