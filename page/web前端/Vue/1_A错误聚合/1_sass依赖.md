# SASS

[toc]



## 说明

Sass提供了许多内置模块，这些模块包含有用的功能（以及偶尔的mixin）。可以像使用任何用户定义的样式表一样向这些模块加载[`@use`规则](https://sass-lang.cn/documentation/at-rules/use)，并且可以[像其他任何模块成员一样](https://sass-lang.cn/documentation/at-rules/use#loading-members)调用它们的功能。所有内置模块URL均以其开头`sass:`表示它们是Sass本身的一部分。

> 在引入Sass模块系统之前，所有Sass功能始终在全球可用。许多函数仍然具有全局别名（这些都在其文档中列出）。Sass团队不鼓励使用它们，并最终将它们弃用，但目前它们仍可与旧版本的Sass和LibSass（尚不支持模块系统）兼容。
>
> 某些[功能](https://sass-lang.cn/documentation/modules#global-functions)甚至在新的模块系统中也*仅*在全局范围内可用，这是因为它们具有特殊的评估行为（[`if()`](https://sass-lang.cn/documentation/modules#if)）或因为它们在内置CSS函数之上添加了额外的行为（[`rgb()`](https://sass-lang.cn/documentation/modules#rgb)和[`hsl()`](https://sass-lang.cn/documentation/modules#hsl)）。这些将不会被弃用，可以自由使用。

```css
@use "sass:color";

.button {
  $primary-color: #6b717f;
  color: $primary-color;
  border: 1px solid color.scale($primary-color, $lightness: 20%);
}
```

### Sass提供了以下内置模块：

- 该[`sass:math`模块](https://sass-lang.cn/documentation/modules/math)提供对[数字](https://sass-lang.cn/documentation/values/numbers)进行[运算的](https://sass-lang.cn/documentation/values/numbers)功能。
- 该[`sass:string`模块](https://sass-lang.cn/documentation/modules/string)使组合，搜索或拆分[字符串](https://sass-lang.cn/documentation/values/strings)变得容易。
- 该[`sass:color`模块](https://sass-lang.cn/documentation/modules/color)根据现有[颜色](https://sass-lang.cn/documentation/values/colors)生成新[颜色](https://sass-lang.cn/documentation/values/colors)，从而轻松构建颜色主题。
- 该[`sass:list`模块](https://sass-lang.cn/documentation/modules/list)使您可以访问和修改[列表中的](https://sass-lang.cn/documentation/values/lists)值。
- 该[`sass:map`模块](https://sass-lang.cn/documentation/modules/map)可以查找与[map中](https://sass-lang.cn/documentation/values/maps)的键关联的值，等等。
- 该[`sass:selector`模块](https://sass-lang.cn/documentation/modules/selector)提供对Sass强大的选择器引擎的访问。
- 该[`sass:meta`模块](https://sass-lang.cn/documentation/modules/meta)公开了Sass内部工作的细节。

> 详细请参考：[内建模块_Sass 中文网 (sass-lang.cn)](https://sass-lang.cn/documentation/modules)

### SCSS

`SCSS` 是 `Sass 3` 引入新的语法，其语法完全兼容 `CSS3`，并且继承了` Sass` 的强大功能。也就是说，任何标准的 CSS3 样式表都是具有相同语义的有效的 SCSS 文件，[官方解释](https://link.juejin.cn?target=http%3A%2F%2Fsass.bootcss.com%2Fdocs%2Fscss-for-sass-users%2F)。

传统的css文件缺失变量等概念，导致需要书写的重复的代码很多。我写JS的习惯是遇见重复的代码就要思考是否可以抽出来写成一个可复用的方法，但css中不存在变量函数等概念，这时我发现的一个`css的预编译利器——scss`。

> **具体参考：**
>
> [scss快速入门 - 掘金 (juejin.cn)](https://juejin.cn/post/6844903859010158600)
>
> [SCSS之基础全解 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/157686527)

==个人认为scss最大的好处就是能将css属性设置为变量，这样让css一键更换主题成为可能。==

### 案例

1. **安装npm的sass模块**

   > sass和scss本质上是同一个东西，只是scss更加语义化，语法一看就会，一般没毛病的人不会考虑使用sass语法

   **模块安装，执行**

   - ==npm install node-sass --save-dev==
   - ==npm install sass-loader --save-dev==

2. **添加皮肤文件theme.scss**

   ![image-20220314103219751](.\1_sass依赖\image-20220314103219751.png)

3.  **theme.scss添加了几个颜色变量**

   ![image-20220314103420593](.\1_sass依赖\image-20220314103420593.png)

4. **Vue文件里使用theme.scss的参数**

   ![image-20220314103512230](.\1_sass依赖\image-20220314103512230.png)

5. **效果**

   ![image-20220314103540773](.\1_sass依赖\image-20220314103540773.png)



## Vue报错

![image-20220314103631723](.\1_sass依赖\image-20220314103631723.png)

 报错引用：

![img](.\1_sass依赖\962554-20211003175502040-976477138.png)

### 解决方案

通过`vue-cli`脚手架的`vue create`命令创建了项目，想在项目中使用`sass预处理器`，通过[vue cli官网](https://cli.vuejs.org/zh/guide/css.html#预处理器)如下介绍

> Vue CLI 项目天生支持`PostCSS、CSS Modules 和包含 Sass、Less、Stylus`在内的[预处理](https://so.csdn.net/so/search?q=预处理&spm=1001.2101.3001.7020)器。

> 你可以在创建项目的时候选择预处理器 (Sass/Less/Stylus)。如果当时没有选好，内置的 webpack仍然会被预配置为可以完成所有的处理。你也可以`手动安装相应的 webpack loader`：
>
> ```cmd
> # Sass
> npm install -D sass-loader sass
> 
> # Less
> npm install -D less-loader less
> 
> # Stylus
> npm install -D stylus-loader stylus
> ```

#### 处理方式

**分别执行命令，安装Sass模块**

```cmd
npm i node-sass -D

npm i sass-loader -D
```

#### Sass模块过高报错

==注意：Sass直接安装，会自动安装为最新版本，可能会导致版本过高项目无法启动==

![](.\1_sass依赖\962554-20211003141045090-170783957.png)

##### 解决方案1

首先找到`package.json`文件
将以下两个依赖拷贝进入`devDependencies`中：

```cmd
"sass": "1.26.2",
"sass-loader": "^7.3.1",
```

然后`npm install` 即可，版本是固定的，最好别搞太高，因为[Vue](https://so.csdn.net/so/search?q=Vue&spm=1001.2101.3001.7020)-cli向下兼容的能力挫的一批叼遭

![image-20220314104900289](.\1_sass依赖\image-20220314104900289.png)

##### 解决方案2

###### 操作方案一：

1. 卸载原版本： `npm uninstall node-sass`
2. 安装低版本： `npm install node-sass@4.14.1`
3. 运行：`yarn serve`

###### 操作方案二:

1. 先卸载已经安装的`sass-loader`：`cnpm uninstall sass-loader`

2. 重新安装指定版本的sass-loader：

   ```cmd
   #cnpm i sass-loader@10.1.0 --save-dev
   
   或者
   
   #cnpm i sass-loader@10.1.0 -D
   ```

3. 重新跑项目：`yarn serve`

## vscode下vue的SASS的css嵌套语法报错

![image-20220315170927412](1_sass%E4%BE%9D%E8%B5%96/image-20220315170927412.png)

**<font>手动将其改为vue即可</font>**

![image-20220315171057977](1_sass%E4%BE%9D%E8%B5%96/image-20220315171057977.png)
