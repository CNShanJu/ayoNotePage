[Vue学习心得----新手如何学习Vue（转载） - 飞翔的蜗牛~ - 博客园 (cnblogs.com)](https://www.cnblogs.com/fxwoniu/p/11359273.html)

[toc]



## 前端三大框架

==**Web前端三大主流框架都是`Angular`、`React`、`Vue`。**==

1. **Angular（基于MVC）**

   > Angular原名angularJS诞生于2009年，之前我们都是用jquery开发，自从angular的出现让我们有了新的选择，它最大的特点是把后端的一些开发模式移植到前端来实现，如MVC、依赖注入等。

2. **React**

   > React，facebook出品，正式版推出是在2013年，比angular晚了4年，但得益于其创新式的VirtualDOM，性能上碾压angularJS，一经推出，火的一塌糊涂。 特点很多，VirtualDOM、JSX、Diff算法等，支持ES6语法，采用函数式编程，门槛稍高，但也更灵活，能让开发具有更多可能性。

3. **Vue（基于MVVM）**

   > Vue作为最后推出的框架（2014年），`借鉴了前辈angular和react的特点`（如VirtualDOM、双向数据绑定、diff算法、响应式属性、组件化开发等）并做了相关优化，使其使用起来更加方便，更容易上手，比较少适合初学者。

### Vue特点

**vue比较好学习**

1. 轻量化的
2. 容易上手，学习成本比较低
3. 吸取了两家之长
4. 有计算属性
5. 组件化、模块化：项目已经模块化开发了。
6. 单页面的开发：==只有一个页面==。
7. 其他的功能：ajax、路由。

## 什么是Vue？

1. Vue.js（读音 /vjuː/, 类似于 view） 是一套`构建用户界面的渐进式框架`。
2. Vue 只关注`视图层`， 采用自底向上增量开发的设计。
3. Vue 的目标是通过尽可能简单的 API 实现`响应的数据绑定`和`组合的视图组件`。

## vue核心概念

vue的核心概念是‘`数据驱动`’，假如我们需要切换view层，我们应该修改的是数据。

传统的js想改变一个dom的元素的时候，必须操作dom，进而去改变这个元素。

vue只需要改变数据，通过指令，进而改变视图。



## MVVM模式

**vue的源码基于MVVM模式开发的**

1. `M` ==>  model(业务模型 用来处理数据)
2. `V` ==>  view(用户的界面)
3. `VM`  ==>  viewModel(观察者)

### 它们三者之间的关系

1. 当`数据`发生`变化`，`viewModel`观察到了这种变化，通过`view`更新。
2. 当`view`发生`变化`的时候，`viewModel`观察到这种变化，通过`model`更新。

![image-20220309181625901](.\1_\image-20220309181625901.png)

![image-20220309181727912](.\1_\image-20220309181727912.png)

> **兼容性的问题：**
>
> **vue不支持`ie8以下`的版本，因为vue使用ie8无法模拟的ecmascript的特征。**

## Vue3 安装

### 1、独立版本

我们可以在 Vue.js 的官网上直接下载最新版本, 并用 **<script>** 标签引入。

[引入地址](https://unpkg.com/vue@3.2.31/dist/vue.global.js)

**引入 Vue：**

```js
<!-- 开发环境版本，包含了有帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
```

**或者：**

```js
<!-- 生产环境版本，优化了尺寸和速度 -->
<script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
```

### 2、使用 CDN 方法

以下推荐国外比较稳定的两个 CDN，国内还没发现哪一家比较好，目前还是建议下载到本地。

- **Staticfile CDN（国内）** : https://cdn.staticfile.org/vue/3.0.5/vue.global.js

  ```html
  <script src="https://cdn.staticfile.org/vue/3.0.5/vue.global.js"></script>
  
  <div id="hello-vue" class="demo">
    {{ message }}
  </div>
  
  <script>
  const HelloVueApp = {
    data() {
      return {
        message: 'Hello Vue!!'
      }
    }
  }
  
  Vue.createApp(HelloVueApp).mount('#hello-vue')
  </script>
  ```

  

- **unpkg**：https://unpkg.com/vue@next, 会保持和 npm 发布的最新的版本一致。

  ```html
  <script src="https://unpkg.com/vue@next"></script>
  
  <div id="hello-vue" class="demo">
    {{ message }}
  </div>
  
  <script>
  const HelloVueApp = {
    data() {
      return {
        message: 'Hello Vue!!'
      }
    }
  }
  
  Vue.createApp(HelloVueApp).mount('#hello-vue')
  </script>
  ```

- **cdnjs** : https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.5/vue.global.js

  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.5/vue.global.js"></script>
  
  <div id="hello-vue" class="demo">
    {{ message }}
  </div>
  
  <script>
  const HelloVueApp = {
    data() {
      return {
        message: 'Hello Vue!!'
      }
    }
  }
  
  Vue.createApp(HelloVueApp).mount('#hello-vue')
  </script>
  ```

  

### 3、NPM 方法

由于 npm 安装速度慢，本教程使用了淘宝的镜像及其命令 cnpm，安装使用介绍参照：[使用淘宝 NPM 镜像](https://www.runoob.com/nodejs/nodejs-npm.html#taobaonpm)。

npm 版本需要大于 3.0，如果低于此版本需要升级它：

```cmd
# 查看版本
npm -v
2.3.0

#升级 npm
cnpm install npm -g

# 升级或安装 cnpm
npm install cnpm -g
```

在用 Vue.js 构建大型应用时推荐使用 cnpm 安装，cnpm 能很好地和 Webpack 或 Browserify 模块打包器配合使

```
# 最新稳定版
cnpm install vue@next
```

### 命令行工具

Vue.js 提供一个官方命令行工具，可用于`快速搭建大型单页应用`。

对于 Vue 3，你应该使用 npm 上可用的 Vue CLI v4.5 作为 @vue/cli。要升级，你应该需要`全局`重新安装最新版本的 @vue/cli：

```
# 全局安装 vue-cli
yarn global add @vue/cli

# 或
cnpm install -g @vue/cli
```

安装完后查看版本:

```
vue --version
@vue/cli 4.5.11
```

然后在 Vue 项目中运行：

```
vue upgrade --next
```

**注意：**vue-cli 3.x 和 vue-cli 2.x 使用了相同的 vue 命令，如果你之前已经安装了 vue-cli 2.x，它会被替换为 Vue-cli 3.x。

#### 创建项目

##### 第一步npm安装

首先：先从nodejs.org中下载nodejs



![img](.\1_vue概念及安装打包\webp-164690587172541.webp)双击安装，在安装界面一直Next

![img](.\1_vue概念及安装打包\webp-164690588517845.webp)



![img](.\1_vue概念及安装打包\webp-164690590732547.webp)



![img](.\1_vue概念及安装打包\webp-164690592032449.webp)

直到Finish完成安装。

打开控制命令行程序（CMD）,检查是否正常

![img](.\1_vue概念及安装打包\webp-164690593177051.webp)

###### 使用淘宝NPM镜像

大家都知道国内直接使用npm 的官方镜像是非常慢的，这里推荐使用淘宝 NPM 镜像。

```cmd
#淘宝镜像安装cnpm
npm install -g cnpm --registry=https://registry.npm.taobao.org

#安装nrm
cnpm install -g nrm

#安装yarn
cnpm install -g yarn

#安装vue-cli
cnpm install -g @vue/cli
```

> **`vue ui`不能启动，没有反应**
>
> 原因：版本太低
> 版本低于3时没有ui功能
>
> 1. 卸载老版本 `npm uninstall vue-cli -g`
> 2. 下载新版本`npm install @vue/cli -g`
> 3. 启动命令`vue ui`



这样就可以使用cnpm 命令来安装模块了：

##### 第二步项目初始化 

1.第一步：**安装vue-cli**

```cmd
cnpm install vue-cli -g    //全局安装 vue-cli
```

![img](.\1_vue概念及安装打包\webp-164690602533653.webp)

**查看vue-cli是否成功，不能检查vue-cli,需要检查vue**

![img](.\1_vue概念及安装打包\webp-164690604938855.webp)

选定路径，新建vue项目，这里我是在桌面上新建了sun文件夹，cd目录路径

下面我一项目名为sell新建vue项目

##### cli2 创建项目

###### 方法一

> **注意：**Vue.js 不支持 IE8 及其以下 IE 版本。

1. **打开cmd 命令进入到创建VUE项目文件夹下**

   举例：在 E盘 VueProject文件夹里创建项目

   ```cmd
   cd E:\VueProject
   e:
   ```

   ![ ](.\1_vue概念及安装打包\20200723112807820.png)

2. **使用 cmd 命令创建项目，命令如下，举例：创建一个名为 vuedemo01的 VUE项目。**

   ```
   vue init webpack vuedemo01
   ```

3. **创建 VUE 项目中，选择一些数据**

   ```cmd
   Project name ：项目名称 （ 默认为上方项目名，可自定义）
   Project description：项目描述（默认为：A Vue.js Project）
   Author：作者
   Vue build：构建VUE （这里我选的是 standalone）
   Install vue-riuter：YES
   Use ESLint to lint your code：开始为NO
   Set upunit tests：NO
   Setup e2e tests with Nightwatch：NO
   Should we run npm install for you after the project has been create：这里我选的是最后一个
   ```

   ![ ](.\1_vue概念及安装打包\20200723113554387.png)

   

   ###### **使用VUE配置创建的项目**

   1. 使用 VSCode 打开 vuedemo01 文件夹

      打开 [VSCode](https://so.csdn.net/so/search?q=VSCode&spm=1001.2101.3001.7020) 软件，在左上角菜单栏上打开文件夹。

   2. **进入项目文件夹的终端**

      打开终端的两种方式：

      - 右击需要打开终端的文件夹，选择 **打开终端**；
      - 在菜单栏找到 **终端**（下方图片②处），选择 **新终端**。

      VScode 右下方会打开个终端窗口，参考下方图片③处：

      ==注意：该文件夹下需要有 `package.json` 文件。==

      ![ ](.\1_vue概念及安装打包\watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L00xMjM0dXk=,size_16,color_FFFFFF,t_70-16469049342444.png)

   3. **在终端中安装npm**

      在刚才打开的终端上**配置 npm** ,输入下方命令码，出现下方图片显示安装成功。

      ```cmd
      npm install
      ```

      ![ ](.\1_vue概念及安装打包\watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L00xMjM0dXk=,size_16,color_FFFFFF,t_70-16469049290632.png)

   4. **查看 项目启动命令**

      打开 **package.json** 文件（下方图片①处） ，找到**启动项目命令**（下方图片②处）。

      ![ ](.\1_vue概念及安装打包\watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L00xMjM0dXk=,size_16,color_FFFFFF,t_70.png)

   5. **在终端上输入启动项目命令**

      在终端（上方图片③处）上输入启动项目命令，我这里命令是 **npm run dev**。

   6. **使用浏览器查看项目**

      按住Ctrl+ 点击链接（1-2 步骤5启动项目后生成的链接） ，浏览器会打开该链接。

      <img src=".\1_vue概念及安装打包\watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L00xMjM0dXk=,size_16,color_FFFFFF,t_70-16469051719518.png" style="zoom: 150%;" />

	至此，项目已经完成创建！！！

<img src=".\1_vue概念及安装打包\2020073009170412.gif#pic_center" alt="开心" style="zoom:50%;" />

###### 方法二

> vue create  ”项目名称“

![](.\1_vue概念及安装打包\webp-164690565697628.webp)

我这里选择第一项 回车后直接初始化项目，也可以选择`最后一项` Manually select features `自行选择配置`

> 一般初学者不建议最后一项

![img](.\1_vue概念及安装打包\webp-164690576499135.webp)

这里与cli2的运行方式不太一样 由 npm run dev 变成npm run serve ,当然这也可以设置，可以根据自己习惯配置。

选择Manually select features可自己选择配置，看个人项目需求

空格键是选中与取消，A键是全选

![img](.\1_vue概念及安装打包\webp-164690577280137.webp)

TypeScript 支持使用 TypeScript 书写源码

Progressive Web App (PWA) Support PWA 支持。

Router 支持 vue-router 。

Vuex 支持 vuex 。

CSS Pre-processors 支持 CSS 预处理器。

Linter / Formatter 支持代码风格检查和格式化。

Unit Testing 支持单元测试。

E2E Testing 支持 E2E 测试。

###### 装好后，启动 

cd hello-world // 进入到项目根目录

npm run serve // 启动项目

Vue CLI >= 3 和旧版使用了相同的 vue 命令，所以 Vue CLI 2 (vue-cli) 被覆盖了。如果你仍然需要使用旧版本的 vue init 功能，你可以全局安装一个桥接工具：

![img](.\1_vue概念及安装打包\webp-164690578020239.webp)

### Vite (推荐)

Vite 是一个 web 开发构建工具，由于其原生 ES 模块导入方式，可以实现闪电般的冷服务器启动。

通过在终端中运行以下命令，可以使用 Vite 快速构建 Vue 项目，语法格式如下：

```
npm init @vitejs/app <project-name>
```

创建项目 runoob-vue3-test2：

```
$  cnpm init @vitejs/app runoob-vue3-test2
```

运行项目:

```
$ cd runoob-vue3-test2
$ cnpm install
$ cnpm run dev
> runoob-vue3-test2@0.0.0 dev /Users/tianqixin/runoob-test/vue3/runoob-vue3-test2
> vite

[vite] Optimizable dependencies detected:
vue

  Dev server running at:
  > Local:    http://localhost:3000/
```

打开 **http://localhost:3000/**，显示如下：

![img](https://www.runoob.com/wp-content/uploads/2021/02/62FB6F27-456F-46CF-8892-93D6A3E6F341.jpg)

## Vue3 项目打包

打包 Vue 项目使用以下命令：

```
cnpm run build
```

执行以上命令，输出结果如下：

![img](https://www.runoob.com/wp-content/uploads/2021/08/BC87CFF3-5FE5-4146-B9CC-48779A04BDA0.jpeg)

执行完成后，会在 Vue 项目下会生成一个 **dist** 目录，该目录一般包含 index.html 文件及 static 目录，static 目录包含了静态文件 js、css 以及图片目录 images（如果有图片的话）。

![img](https://www.runoob.com/wp-content/uploads/2021/08/2681A4D7-6268-401E-B958-C9FE7F33B32A.jpg)

如果直接双击打开 index.html，在浏览器中页面可能是空白了，要正常显示则需要修改下 index.html 文件中 js、css 文件路径。

例如我们打开 dist/index.html 文件看到 css 和 js 文件路径是绝对路径：

```html
<link href=/static/css/app.33da80d69744798940b135da93bc7b98.css rel=stylesheet>
<script type=text/javascript src=/static/js/app.717bb358ddc19e181140.js></script>
...
```

我们把 js、css 文件路径修改为相对路径：

```html
<link href=static/css/app.33da80d69744798940b135da93bc7b98.css rel=stylesheet>

<script type=text/javascript src=static/js/app.717bb358ddc19e181140.js></script>
...
```

这样直接双击 dist/index.html 文件就可以在浏览器中看到效果了。
