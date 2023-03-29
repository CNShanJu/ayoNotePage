# 区分使用npm install、npm install --save、 npm install --save-dev

> **npm包管理器**

为了方便`携带源码`，可以在安装依赖时`--save`或`--save-dev`，把依赖记录在`package.json`中，就可以把`node_module`文件夹删除，在需要的时候`npm i`把你安装过的依赖自动下载回来

## 一、package.json和package-lock.json

### 1、package.json

- 主要用来定义项目中需要依赖的包

### 2、package-lock.json

在 `npm install`时候`生成`一份文件，用以记录`当前状态下实际安装`的各个`npm package`的`具体来源`和`版本号`。

每次执行完`npm install`之后会对应生成`package-lock`文件，该文件记录了`上一次安装`的具体的`版本号`，相当于是提供了一个参考，在出现`版本兼容性`问题的时候，就可以参考这个文件来`修改版本号`即可。

## 二、npm install的区别

**下面以`vue-router`为例**

### 1、npm install vue-router

会安装在`node_modules`目录中，**不会修改**`package.json`文件。之后把`node_modules`文件夹`删除`或者项目中没有node_modules，运行`npm install`时不会`自动安装`，因为`package.json`文件`没有记录`。

### 2、npm install vue-router --save（生产环境）

1. 会把`vue-router`包安装到`node_modules`目录中
2. 会在`package.json`的**`dependencies`属性**下添加`vue-router`
3. 之后把`node_modules`文件夹`删除`或者项目中没有node_modules，之后运行`npm install`命令时，`会自动安装vue-router`到`node_modules`目录中
4. **之后运行`npm install –production`或者注明`NODE_ENV`变量值为`production`时，**`会自动安装vue-router`到`node_modules`目录中

### 3、npm install vue-router --save-dev（开发环境）

1. 会把`vue-router`包安装到`node_modules`目录中
2. 会在`package.json`的**`devDependencies`属性**下添加`vue-router`
3.  **之后把`node_modules`文件夹`删除`或者项目中没有node_modules，之后运行`npm install`命令时，会`自动安装vue-router`到`node_modules`目录中**
4. 之后运行`npm install –production`或者注明`NODE_ENV`变量值为`production时`，`**不会自动安装**vue-router`到`node_modules`目录中

### 4、总结

- 发布到线上的叫生产环境，在本地开发的时候叫开发环境，**`--save`就是会打包到`线上`**去并且`在线上环境能用到的`，比如你`npm install `一个`vue-router`，这个在线上环境也是能用到的依赖，所以你要`--save`

- 比如`vue-loader`这个组件只需要在开发的时候编译就好，线上并不需用的到，所以就放在**开发的`--save-dev`**里就好

- **`--save`**安装的时候会在`package.json`文件中的`dependencies`属性添加模块，这个属性就是`发布时依赖的包`

- **`--save-dev`**安装的时候会在`package.json`文件中的`devDependencies`属性添加模块，这个属性就是`开发时依赖的包`

### 5、举个栗子

如果你想把`ES6`编译成`ES5`,就用到了`babel`，那么 就是`devDependencies`,`发布的时候`不需要再用`babel`了，因为打包后就是已经编译出来的`ES5`代码。
 如果用了`VUE`，由于发布之后还是依赖`VUE`，正式上线，投入使用的时候还是要用到`VUE`，所以是`dependencies`。

![img](2_npm%E5%91%BD%E4%BB%A4%E5%8C%BA%E5%88%AB/webp-16472492583032.webp)

## 三、总结

 `--save `是 `生产环境 `

` --save-dev`是`开发环境`

这是 `npm` 的`命令参数`，和 `Vue`没有关系

`--save-dev` 是作为`开发依赖`保存到 `packsge.json` 中的 `devDependencies` 中，即在`开发环境`中用到的依赖，如 `webpack`、`babel` 等用于`开发打包`的依赖，只是在`执行打包`时才会用到，开发的代码中并不包含这些依赖

`--save` 安装的则是需要在`你开发的代码`中用到的依赖，如` vue`，你需要` import Vue from vue`。

重要一点，这和vue没有半毛钱关系。这个知识点是npm的，`save-dev`是在开发过程中用到辅助开发的`工具包`，`save`是和你的`业务代码`相关的包。

## npm i 和 npm install

`npm i`仅仅是`npm install`的简写

**实际使用的区别点主要如下(windows下)：**

1. 用`npm i`安装的模块无法用`npm uninstall`删除，用`npm uninstall i`才卸载掉
2. `npm i`会帮助检测与`当前node版本最匹配的npm包版本号`，并匹配出来相互依赖的npm包应该提升的版本号
3. 部分`npm`包在当前`node`版本下无法使用，必须使用建议版本
4. 安装报错时`intall`肯定会出现`npm-debug.log` 文件，`npm i`不一定


