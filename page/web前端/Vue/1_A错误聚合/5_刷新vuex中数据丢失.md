## 问题描述

首先，关于 `页面刷新vuex中数据丢失问题`，其实换种方式去描述就是：`页面刷新vuex中的数据又初始化问题`

个人愚见：**`vuex的数据并不是弄丢了，而是初始化了，回到初始值，回到原点了`**

---

`vuex`可以理解为是一个`公共的空间`，`所有的组件`都可以`共享`这个空间的`状态数据`，大家都可以（修改or读取）这个空间的数据，但是，这个`空间的数据状态是有初始值`的

**举例页面上的菜单数据信息，因为菜单信息需要存储在vuex中，作为全局的共用共享的数据。**

- `state`仓库中有一个`menuArr`，`初始值为一个空数组`，这个空数组存放的就是后端传递过来的动态菜单的数组数据
- 访问项目`初始页面为登录页`，用户`登录成功`以后，会发请求获取后端返回的动态菜单的数据，然后把这个`数据`存放在`vuex`中的`state`中的`menuArr`里面，同时进行页面跳转到项目首页
- 这时，页面上的`左侧菜单栏组件`读取`vuex`中的`menuArr`数据并渲染出来，用户就可以正常操作了。但是！
- 当用户一`刷新`的时候（比如在首页刷新），`路由不会变`，还是在首页。但是：`无论是 .vue组件中的data中的数据，还是vuex中的state中的数据，都会回归到初始状态。`
- 所以`vuex`中的`menuArr`数组又会`变成空数组`，又`因为vue是响应式的`，当`menuArr`为空数组的时候，`左侧菜单栏组件`就渲染不出来东西，所以就没了，所以看着就像：`页面刷新数据丢失`

分析清楚了问题产生的原因，接下来就是想办法去解决。

---

## 解决方案一 本地存储一份

### login页面

在`login.vue`组件中的`登录`中我们去`触发action`，请求的接口可以写在action里面，也可以写在组件里面。这里因为需要复用action，所以请求我就写在action里面了。

```vue
/* login.vue页面 */
<template>
  <div class="loginBox">
    <el-button type="primary" @click="loginIn">点击登录</el-button>
  </div>
</template>

<script>
export default {
  name: "CodeLogin",
  methods: {
    loginIn() {
      this.$store.dispatch("naviBar/getMenu") // 通知action去发请求
      this.$router.push({ path: "/" }) // 跳转到首页
    },
  },
};
</script>
```

### vuex中的naviBar模块

```js
/* vuex中的naviBar模块 */

// 为了发请求，需要有一个vue实例
import Vue from 'vue'
const that = new Vue()

/* vuex数据刷新丢失，解决方案一，本地存一份*/
const naviBar = {
    state: {
        menuArr: JSON.parse(sessionStorage.getItem('menuArr')) ? JSON.parse(sessionStorage.getItem('menuArr')) : []
    },
    mutations: {
        setMenu(state, payload) {
            state.menuArr = payload
        },
    },
    actions: {
        async getMenu({ commit }, menu) {
            let res = await that.$api.getMenuData()
            console.log('菜单数据', res);
            sessionStorage.setItem('menuArr', JSON.stringify(res.data)) // 本地存储一份
            commit("setMenu", res.data) // 提交mutation
        },
    },
    namespaced: true
}
export default naviBar
```

在需要使用`vuex`中的数据的地方，也就是`home.vue`首页的地方，直接使用`计算属性`取到相应`vuex`数据，在`html`中使用即可。`computed: { menuArr(){ return this.$store.state.naviBar.menuArr } }`

### 方案分析

此方案解决了问题，但是`如果用户手动把浏览器的Application中的sessionstorage中存储vuex的数据清空，用户一刷新还是会丢失，左侧的菜单还是会没了`。

> 路人甲：用户会这样操作吗，黑人问号？

所以我们就考虑使用第二种方式，当页面刷新的时候，再重新发一次请求即可（不使用浏览器存储了）

## 解决方案一 页面刷新重发请求

login.vue页面不用动

### vuex中的naviBar模块

页面刷新重发请求，vuex就不需要写太复杂了。

```js
// 为了发请求，需要有一个vue实例
import Vue from 'vue'
const that = new Vue()

/* vuex数据刷新丢失，解决方案二，再重新发请求 */
const naviBar = {
    state: {
        menuArr: []
    },
    mutations: {
        setMenu(state, payload) {
            state.menuArr = payload
        },
    },
    actions: {
        async getMenu({ commit }, menu) {
            let res = await that.$api.getMenuData()
            commit("setMenu", res.data)
        },
    },
    namespaced: true
}
export default naviBar
```

### 外层页面重发请求

注意是外层视图，这个根据vue项目的视图结构去选择位置。我在home.vue中书写，因为这个页面也需要使用到vuex中的menuArr数据，也是外层视图

```js
export default {
  name: "Home",
  created() {
    /* 
      注意由于数组是引用数据类型，所以 [] 不等于 [] ，这里转换成字符串进行比较
      若vuex中的menuArr不是初始值，就再次发请求重新获取菜单栏的数据
      加一个判断算是优化吧，不加的话，用户登录的时候会发一次，首页组件加载的时候也会发一次请求。
      即减少请求的发送次数
     */
    if (JSON.stringify(this.$store.state.naviBar.menuArr) == "[]") {
      this.$store.dispatch("naviBar/getMenu");
    }
  },
  computed: {
    menuArr() {
      return this.$store.state.naviBar.menuArr;
    },
  },
  ...
};
```

### 方案分析

这中方案实现了效果，也减少了本地存储的使用，不过增加了请求和次数。和上一种方案比较，各有优缺点，具体用那种看业务。

## 其他方案

还可以使用插件包去解决，比如 vuex-persistedstate 等...