# axios和vue-axios区别及vue-axios使用

## 一、[axios](https://so.csdn.net/so/search?q=axios&spm=1001.2101.3001.7020)和vue-axios区别

1. `axios`是基于`promise`的`HTTP库`，可以使用在`浏览器`和`node.js`中，它`不是vue的第三方插件`
2. `axios`使用的时候`不能`像vue的插件（如：`Vue-Router`、`VueX`等）通过`Vue.use()`安装插件，需要在`原型`上进行`绑定`：`Vue.prototype.$axios = axios`;
3. `vue-axios`是`axios`集成到`Vue.js`的`小包装器`，可以像`插件`一样安装:`Vue.use(vueAxios)`;

### 二、vue-axios使用

#### 1、npm安装

```cmd
npm install --save axios vue-axios

或者
npm install --save axios vue-axios  qs
```

**这里有一点需要注意：`qs `是一个增加了一些安全性的查询字符串解析和序列化字符串的库。**

#### 2、引入

```js
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios,axios);
```

#### 3、使用

##### 用法1：

```js
Vue.axios.get('url',{params:userId:1}).then(res => {}).catch(err => {});
```

##### 用法2：

```js
this.axios.get('url',{params:userId:1}).then(res => {}).catch(err => {});
```

##### 用法3：

```js
this.$http.get('url',{params:userId:1}).then(res => {}).catch(err => {});
```

==注意：使用vue的插件的写法（vue-axios）更符合vue整体的生态环境，直接写原型链会有些粗暴，
且直接写原型链你取名为`$http`，你的项目成员可能取另外的名字，维护起来比较麻烦，而统一使用vue-axios就没有太多歧义==