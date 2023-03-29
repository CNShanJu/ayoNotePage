# vuex数据处理

[toc]

## sessionStorage存储JSON数据

```js
// 设置
sessionStorage.setItem('testStorageData',JSON.stringify({
	key1 : '454454',
	key2 : '8989898989',
}))

// 调用
var testStorageData = JSON.parse(sessionStorage.getItem('testStorageData'));
testStorageData.key1
testStorageData.key2
```

## Vuex数据持久化存储

### 方案一：vuex-persistedstate

- 安装插件

```bash
yarn add vuex-persistedstate
#或
npm install --save vuex-persistedstate
#或
npm install vuex-persistedstate --save
```

- 使用方法

```javascript
import Vuex from "vuex";
// 引入插件
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const state = {};
const mutations = {};
const actions = {};

const store = new Vuex.Store({
	state,
	mutations,
	actions,
  /* vuex数据持久化配置 */
	plugins: [
		createPersistedState({
      // 存储方式：localStorage、sessionStorage、cookies
			storage: window.sessionStorage,
      // 存储的 key 的key值
			key: "store",
			render(state) {
        // 要存储的数据：本项目采用es6扩展运算符的方式存储了state中所有的数据
				return { ...state };
			}
		})
	]
});

export default store;
```

- vuex中**module**数据的持久化存储

```javascript
/* module.js */
export const dataStore = {
  state: {
    data: []
  }
}
 
/* store.js */
import { dataStore } from './module'
 
const dataState = createPersistedState({
  paths: ['data']
});
 
export new Vuex.Store({
  modules: {
    dataStore
  },
  plugins: [dataState]  //// 注册plugin
});
```

**注意事项：**

1. **storage**为存储方式，可选值为**localStorage**、**sessionStorage**和**cookies**；
2. **localStorage**和**sessionStorage**两种存储方式可以采用上述代码中的写法，若想采用**cookies**坐位数据存储方式，则需要另外一种写法；
3. **render**接收一个函数，返回值为一个对象；返回的对象中的键值对既是要持久化存储的数据；
4. 若想持久化存储部分数据，请在**return**的对象中采用**key：value**键值对的方式进行数据存储，**render**函数中的参数既为**state**对象。

### 方案二：vuex-persist

- **安装插件**

```bash
yarn add vuex-persist
// 或
npm install --save vuex-persist
复制代码
```

- **使用方法**

```javascript
import Vuex from "vuex";
// 引入插件
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);
//  初始化
const state = {
	userName:'admin'
};
const mutations = {};
const actions = {};
// 创建实例
const vuexPersisted = new VuexPersistence({
	storage: window.sessionStorage,
  render:state=>({
  	userName:state.userName
    // 或
    ...state
  })
});

const store = new Vuex.Store({
	state,
  actions,
  mutations,
  // 数据持久化设置
  plugins:[vuexPersisted]
});

export default store;
复制代码
```

- 属性方法

| **属性值**      | **数据类型**                                                 | **描述**                                                     |
| --------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| key             | string                                                       | 将状态存储在存储中的键。默认: 'vuex'                         |
| storage         | Storage (Web API)<br />【可传localStorage, sessionStorage, localforage 或者你自定义的存储对象.】 | 接口必须要有get和set. 默认是: window.localStorage            |
| saveState       | function(key, state[, storage])                              | 如果不使用存储，这个自定义函数将保存状态保存为持久性。       |
| restoreState    | function (key[, storage]) => state                           | 如果不使用存储，这个自定义函数处理从存储中检索状态           |
| reducer         | function (state) => object                                   | 将状态减少到只需要保存的值。默认情况下，保存整个状态。       |
| filter          | function (mutation) => boolean                               | 突变筛选。看mutation.type并返回true，只有那些你想坚持写被触发。所有突变的默认返回值为true。 |
| modules         | string[]                                                     | 要持久化的模块列表。                                         |
| asyncStorage    | boolean                                                      | Denotes if the store uses Promises (like localforage) or not (you must set this to true when suing something like localforage)***Default: false*** |
| supportCircular | boolean                                                      | Denotes if the state has any circular references to itself (state.x === state)***Default: false*** |

### 总结

上述两种方案都可以实现vuex数据持久化存储。方案一是我在实际开发过程中用到的，方案二是在Github上看到的，综合来说，两者都可以时间最终的需求，而且都有对应的案例Demo可以参考。相比来说方案一在GitHub上的start数要高于方案二。 请结合实际情况选择符合自己的方案！

## vuex 加密保存

### 方案一

- 安装secure-ls

  ```sh
  npm i secure-ls
  ```

- 使用

```js
//在store.js中写入一下代码
import SecureLS from "secure-ls";
var ls = new SecureLS({
  encodingType: "aes",
  isCompression: false,
  encryptionSecret: "你的key"
});
import config from "@/config";
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: "存在localstorage里面的名称",
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      }
    })
  ],
  state:{},
  mutations:{},
  actions:{}
```

### 方案二

- 在项目中安装CryptoJS

  ```sh
  npm install crypto-js
  ```

- 在需要加密或解密的文件中引入crypto-js

  ```js
  import CryptoJS from "crypto-js";
  ```

- 加密代码

  ```js
  let cipherText = CryptoJS.AES.encrypt("1", "secretkey123").toString();
  //要存储的值 //加密的秘钥（解密的时候必须要根据秘钥才能解密） 
  localStorage.setItem("token", cipherText);//本地存储
  
  ```

- 解密代码

  ```js
  var tk = localStorage.getItem("token");//把存储的值取出
  var bytes = CryptoJS.AES.decrypt(tk, "secretkey123");
  //要解密的值   //解密的秘钥（必须与加密的秘钥一直）
  var originalText = bytes.toString(CryptoJS.enc.Utf8);//解密操作
  console.log(originalText)//1
  ```

  

## vuex模块防止页面刷新数据丢失

- store配置

  ```js
  // 为了发请求，需要有一个vue实例
  import Vue from 'vue'
  const that = new Vue()
  
  
  const state = {
      navList: [],
  };
  
  const getters = {
  
  };
  
  const mutations = {
      getNavList: (state, info) => {
          state.navList = info;
      },
  }
  
  const actions = {
      async getNavList({
          commit
      }, menu) {
          let res = await that.$axios.getNavList()
          commit("getNavList", res.data)
      },
  };
  
  export default {
      namespaced: true,
      state,
      mutations,
      actions,
      getters
  }
  ```

  

- 使用

  ```js
   created() {
          /**
           * 注意由于数组是引用数据类型，所以 [] 不等于 [] ，这里转换成字符串进行比较
           * 若vuex中的menuArr不是初始值，就再次发请求重新获取菜单栏的数据
           * 加一个判断算是优化吧，不加的话，用户登录的时候会发一次，首页组件加载的时候也会发一次请求。
           * 即减少请求的发送次数
           */
          // 获取所有的菜单
          if (JSON.stringify(this.$store.state.Main.navList) == "[]") {
              this.$store.dispatch("Main/getNavList");
          }
      },
  ```

  

