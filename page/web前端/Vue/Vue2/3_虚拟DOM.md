# 一

## 01 前言

自从vue框架出现以来，越来越多的人们都在讨论虚拟DOM的技术，说虚拟DOM是比较高效的、不会操作DOM等等。但是我觉得我们应该从更深的层面去看到这个问题，尝试去阅读一下vue中的虚拟DOM源码，弄清楚到底它是怎么操作的。

接下我就说一下什么是虚拟DOM、为什么引入虚拟DOM以及Vue中的虚拟DOM。其实我们可能会产生一种错觉，认为Vue中才会有虚拟DOM的技术，其实React中也有，Angular中也有一种脏检查的技术，都是同样的原理。

![img](.\3_虚拟DOM\v2-6f4eaad01a0981e702ce3b64df34b45f_720w.jpg)

## 02 虚拟DOM

我们之前已经知道，操作DOM是一种昂贵的操作，到底“贵”在哪呢？这也涉及到浏览器引擎的知识，现在我们回忆一下，JavaScript是解析引擎的，页面渲染是渲染引擎的。因此不可避免地要进行两个线程之间的通信，操作越频繁，两个线程通信消耗的性能就越多。

**虚拟DOM由来**

![img](.\3_虚拟DOM\v2-78d660c40daef0f115c7a1eb25ce5209_720w.jpg)



假如我们的DOM操作不涉及到通信的话，我们大可以把DOM全部去除然后渲染一份完整的DOM树。总的来说，虚拟DOM就是为了提高页面渲染性能，是随着时代发展而诞生的产物。

**虚拟DOM的解决方式是**：通过状态生成一个虚拟节点树，然后使用虚拟节点树进行渲染。假如是首次节点的渲染就直接渲染，但是第二次的话就需要进行虚拟节点树的比较，只渲染不同的部分。

![img](.\3_虚拟DOM\v2-b2ff49f8099523dde45243985a5e3f32_720w.jpg)



**何有引入虚拟DOM**

我们知道虚拟DOM是为了提高性能，在React中是虚拟DOM比对，在Angular中是脏检查技术。但是在vue/1.0的时候还没有引入虚拟DOM技术，当时vue的检查流程跟前两者的都不一样，直接检测具体到节点的状态变化，采用更细粒度来绑定更新视图。

但是细粒度监听状态会产生大量的watcher实例，导致内存开销和依赖追踪的开销比较大。而是用低粒度会导致状态无法精确监听，所以vue 2.0 采用中等粒度方案监听，**只能监听到组件的变化，而组件的内部就使用虚拟DOM进行状态比对**，也就是DIFF算法。

**Vue的虚拟DOM**

平时我们在Vue中写html代码的时候，可以使用变量，循环等指令来编写。可以这样写的原因是Vue中有模板解析的函数，可以对html代码进行解析编译，从而转变成渲染函数，渲染函数执行后就变成了虚拟DOM节点树。

![img](.\3_虚拟DOM\v2-f0afb78679b7d1aa5ee4b0d3a6d7e2cd_720w.jpg)



当虚拟节点准备映射到视图的时候，为了避免额外的性能开销，会先和上一次的虚拟DOM节点树进行比较，然后**只渲染不同的部分**到视图中，无需改动其他的节点状态。

vNode是一个普通的JavaScript对象，保存了DOM节点需要的一些数据，比如文本节点，属性等，以DOM对象的形式表现出来。其中主要的技术就是节点比对算法patch。

![img](.\3_虚拟DOM\v2-f5adeb3c370002cf2c69ce34dff90eca_720w.jpg)



上述过程总结：

- **获取监听变化后生成的虚拟节点树**
- **与上一次虚拟DOM节点树进行比较**
- **找到差异的部分，渲染到真实的DOM节点上面**
- **更新试图**

## 04 小结

虚拟DOM技术使得我们的页面渲染的效率更高，减轻了节点的操作从而提高性能。虚拟节点树其实是一个普通JavaScript对象，新旧节点的对象比较，得出差异直接渲染页面。

vue的状态侦测只能到某一个组件上面，这是基于性能的考虑而得出的方案。组件内部通过diff算法来比对，从而渲染试图。

vue中通过模板来描述状态与试图之间的映射关系，把模板编译成渲染函数然后得到虚拟DOM节点树，最后使用虚拟节点树渲染页面。



# 二

## 为什么需要虚拟DOM

前面我们从零开始写了一个简单的类Vue框架，其中的模板解析和渲染是通过Compile函数来完成的，采用了文档碎片代替了直接对页面中DOM元素的操作，在完成数据的更改后通过appendChild函数将真实的DOM插入到页面。

虽然采用的是文档碎片，但是操作的还是真实的DOM。

而我们知道操作DOM的代价是昂贵的，所以vue2.0采用了虚拟DOM来代替对真实DOM的操作，最后通过某种机制来完成对真实DOM的更新，渲染视图。

`所谓的虚拟DOM，其实就是用JS来模拟DOM结构，把DOM的变化操作放在JS层来做，尽量减少对DOM的操作（个人认为主要是因为操作JS比操作DOM快了不知道多少倍，JS运行效率高）。然后对比前后两次的虚拟DOM的变化，只重新渲染变化了的部分，而没有变化的部分则不会重新渲染。`

比如我们有如下的DOM结构。![image-20220310183852586](.\3_虚拟DOM\image-20220310183852586.png)

我们完全可以用JS对象模拟上面的DOM结构，模拟后就会变成下面的这种结构。![image-20220310183926465](.\3_虚拟DOM\image-20220310183926465.png)

必须要注意一点的是：JS模拟的DOM结构并没有模拟所有DOM节点上的属性、方法（因为DOM节点本身的属性非常多，这也是DOM操作耗性能的一个点），而是只模拟了一部分和数据操作相关的属性和方法。

## vue虚拟DOM的用法

Vue在2.0版本引入了vdom。其vdom是基于snabbdom库所做的修改。snabbdom是一个开源的vdom库。

snabbdom的主要作用就是将传入的JS模拟的DOM结构转换成虚拟的DOM节点。

先通过其中的h函数将JS模拟的DOM结构转换成虚拟DOM之后，再通过其中的patch函数将虚拟DOM转换成真实的DOM渲染到页面中。

为了保证页面的最小化渲染，snabbdom引入了Diff算法，通过Diff算法找出前后两个虚拟DOM之间的差异，只更新改变了的DOM节点，而不重新渲染为改变的DOM节点。

在这里我不打算分析snabbdom的源码来解释到底snabbdom是怎么干成这件事的（主要是现阶段没到那个水平，哈哈。再者已经有很多同学做过类似的分析，相关链接附在文章末尾）。

我会从snabbdom的使用角度来看Vue中的虚拟DOM是如何完成视图渲染的。

我们先看一下**snabbdom中两个核心API的功能**。

- h()函数：将传入的JS模拟的DOM结构模板转换成vnode。（vnode是一个纯JS对象）

- patch()函数：将虚拟的DOM节点渲染到页面中。

我们提供一个实例来看一下snabbdom的实际作用。

![image-20220310184152388](.\3_虚拟DOM\image-20220310184152388.png)

### 思路分析：

- 我们先通过h函数创建一个虚拟DOM节点，通过patch函数将虚拟DOM渲染到页面。

- 点击btn按钮时，更新ul#list列表的数据，改变了第二个li元素的值并且新增了一个li元素，第一个li元素的值并没有改变。我们再次通过patch函数将更新后的数据渲染到页面上。可以看到只有第二个和第三个li发生了更新，而第一个li由于没有改变，并没有重新渲染。

![](.\3_虚拟DOM\cdd748c81b3b686ce319738e5f34197c-0.gif)

vue中的模板解析和渲染的核心就是：通过类似snabbdom的h()和patch()的函数，先将模板解析成vnode，如果是初次渲染，则通过patch(container,vnode)将vnode渲染至页面，如果是二次渲染，则通过patch(vnode,newVnode)，先通过Diff算法比较原vnode和newVnode的差异，以最小的代价重新渲染页面。