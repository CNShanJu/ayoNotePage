# React入门

[toc]

![img](1_1_React入门/25e2d59e76234f2d82345da450c9ad84tplv-k3u1fbpfcp-zoom-in-crop-mark1304000.awebp)

## 前言

现在最热门的前端框架，毫无疑问是 [`React`](https://facebook.github.io/react/) 。

上周，基于 `React` 的 [`React Native`](https://facebook.github.io/react-native/) 发布，结果一天之内，就获得了 5000 颗星，受瞩目程度可见一斑。

`React `起源于 `Facebook` 的内部项目，因为该公司对市场上所有 [JavaScript MVC 框架](https://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html)，都不满意，就决定自己写一套，用来架设 [Instagram](https://instagram.com/) 的网站。做出来以后，发现这套东西很好用，就在2013年5月[开源](https://facebook.github.io/react/blog/2013/06/05/why-react.html)了。

由于 `React` 的设计思想极其独特，属于革命性创新，性能出众，代码逻辑却非常简单。所以，越来越多的人开始关注和使用，认为它可能是将来 `Web `开发的主流工具。

这个项目本身也越滚越大，从最早的`UI引擎`变成了一整套前后端通吃的 `Web App 解决方案`。衍生的 `React Native` 项目，目标更是宏伟，希望用写` Web App` 的方式去写 `Native App`。如果能够实现，整个互联网行业都会被颠覆，因为同一组人只需要写一次 UI ，就能同时运行在服务器、浏览器和手机（参见[《也许，DOM 不是答案》](https://www.ruanyifeng.com/blog/2015/02/future-of-dom.html)）。

## React 

`React` 是一个用于`构建用户界面`的`JavaScript库`。

- **用做UI：** 许多人把`React`当做`MVC`设计模式中的`视图(view)`，当把`React`成为你的技术掌握之后， 它可以很轻松应用于一个小功能的项目。
- **虚拟DOM：**`React`用一个”`虚拟DOM`”实现了超高的性能，配合`nodeJS`也可以实现在服务端的渲染，不存在耗时的浏览器dom渲染。
- **数据流：**` React`是一种`减少引用数据流`的实现方式，并且比传统的方式`更容易实现数据绑定`。

## 环境搭建

```shell
#安装工具
npm install -g create-react-app 
#创建项目
create-react-app + 项目名称 
#启动项目
npm start 
```

> 对于初学者而言，最快的方法是在HTML中引用CDN提供的JavaScript库:
>
> ```html
> <!-- react.js ==> React 的核心库 -->
> <script src="https://unpkg.com/react@17/umd/react.production.min.js" rel="external nofollow" ></script>
> <!-- react-dom.js ==> 提供与 DOM 相关的功能 -->
> <script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js" rel="external nofollow" ></script>
> <!-- Browser.js / babel.js ==> 将 JSX 语法转为 JavaScript 语法 -->
> <script src="https://unpkg.com/babel-standalone@6/babel.min.js" rel="external nofollow" ></script>
> ```
>
> `react.js`文件是创建React元素和组件的核心文件，
>
> `react-dom.js`文件用来把React组件渲染为DOM，此文件依赖于`react.js`文件，需在其后被引入。
>
> > 1. 一个称作`react-with-addons.js`的文件可以代替react.js使用，它包含了一系列有用的模块.
> > 2. 不要把HTML的`<body>`当做React渲染的根元素，记住要渲染在`<body>`里一个具有id的`<div>`里，这使得React有自己的独立空间，而不用担心如果其他因素如果需要操作`<body>`里的子元素会影响React的使用。

## 设计思想

在`React`的官方博客中明确阐述了` React `**不是一个 MVC 框架**，而是一个**用于构建组件化 UI 的库**，是一个**前端界面开发工具**。所以顶多算是` MVC 中的 V（view）`。React 并没有重复造轮子，而是有很多颠覆性的创新，具体的特性如下：

- 声明式的直观的编码方式
- 简化可复用的组件

## JSX写法

JSX就是` Javascript `和` XML `结合的一种格式。React 发明了 JSX，利用 HTML 语法来创建**虚拟 DOM**。当遇到`<`，**JSX 就当 HTML 解析**，遇到`{`就**当 JavaScript 解析**。

> React不一定需要使用JSX，但是它使代码更可读，写它感觉像写HTML。
>
>  React中包含一种简单的变换，它允许将JSX转换为本地JavaScript，供浏览器进行使用。
>
> ` 没有转换的JSX是不能直接在本地浏览器上运行的`。

## 组件写法

### 1、class 类式组件

```react
import React from 'react'
import { Component} from 'react'
class Hello extends React.Component {
//将来 生命周期
    render() {        
        return (
            <div>111111
              <ul>
                  <li>1111</li>
                  <li>2222</li>
                    <Child1/>
                    <Child2/>
                    <Child3/>
              </ul>
            </div>
        )
    }
}
//Component ===>React.Component  下面的 可以直接被引入
class Child1 extends Component{
    render(){
        return <div>child1</div>
    }
}
```

### 2、function 函数式组件

**`React16.8` 之前， `函数式组件` `不支持`状态**
**`React16.8` 之后， `React Hooks`  `支持`状态和属性**

```react
function Child2(){
    return  (<div>child2
        <span>22222</span>
    </div>)
   
}
const Child3=()=><div>child3</div>
export default Hello
```

## 事件的四种写法

**写法一：** **代码量少**的情况，可直接在标签里面写

```react
// 获取到输入框的value值
	 <input type = 'text' ref = 'mytext' />
			<button onClick={() => {
				console.log('onclick', this.refs.mytext)
			}}>add</button>
```

**写法二**：**方便传参**，改变this执行

```react
{/* 注意这里不能加小括号 触发的时候会自动调用 。如果加小括号 ，= 函数返回值再调用*/}
<button onClick={this.handleAdd2.bind(this)}>add2</button>
	//写在 render 外面
  handleAdd2(){
        console.log('click22222', this.refs.mytext.value)
    }
```

**写法三：箭头函数** 无法传参，但是毕竟方便

```react
<button onClick={this.handleAdd3}>add3</button>
handleAdd3=()=>{
        console.log(this.refs.mytext.value)
    }
```

**写法四：组合写法**

```react
<button onClick={() => {
                    this.handleAdd3('aaa','bbbb')
                }}>add4</button>
handleAdd3=(x,y)=>{
        console.log(x,y,'click22222', this.refs.mytext.value)
    }
```

**输入框改变获取输入框的值：**

```react
<input type="test" onChange={(evt)=>{
       console.log(evt.target.value)
}}/>
```

**赋值给输入框**

```react
value={this.state.mytext}
```

## 改变this指向

### bind call apply区别

**call：**可以传入多个参数,改变this指向后立刻调用函数  
**apply：**可以传入数组 ，改变this指向后立刻调用函数  
**bind：**改变this指向后,可以传入多个参数，返回的是函数 不会立即调用

```react
var obj1={
    name:'obj1',
    getName(){
        console.log(this.name)
    }
}
var obj2 = {
    name: 'obj2',
    getName() {
        console.log(this.name)
    }
}
// obj1.getName()//obj1

// 改变this指向，立即指向方法
// obj1.getName.call(obj2,'aaa','bbbb','cccc')//obj2
//obj1.getName.apply(obj2,['aaa','bbb','ccc'])//obj2

// 改变this指向，但是需要手动执行方法
//obj1.getName.bind(obj2,'aaa','bbb','ccc')()
```

### 初始化状态和修改状态

React 把组件看成是一个状态机（State Machines）。通过与用户的交互，实现不同状态，然后渲染 UI，让用户界面和数据保持一致。 React 里，只需更新组件的 state，然后根据新的 state 重新渲染用户界面（不要操作 DOM）。

### 状态的两种写法（state）

第一种完整写法：

```react
export default class App extends Component {
    constructor() {
    super()
    this.state = {
         myname:'4567'
    }
  }
    render() {
        return (
            <div>
                {this.state.myname}
            </div>
        )
    }
}
```

第二种简写：这个写法 state 也是定义在了 constructor 中

```react
export default class App extends Component {
    state = {
        myname:'4567'
    }
    render() {
        return (
            <div>
                {this.state.myname}
            </div>
        )
    }
}
```



### 修改状态（setState）

#### 同步过程

```react
<button onClick={this.handkeClick}>click</button>
   //直接修改状态
    handkeClick=()=>{
        this.setState({
            myname:'xiaoming',
            myage:'18'
        })
    }
```



#### 异步过程

**第一种写法：**
**接收两个参数：**
第一个参数是对象，修改的状态值
第二个参数 能够等待dom树更新完之后执行

```react
 this.setState({
             myname:'xiaoming'
         },()=>{
             console.log('1',this.state.myname)
         })
//之后发生什么？
//1.虚拟dom创建
//2.diff对比
```

**第二种写法：**
可以获取到上个状态值(prevState) 必须有返回值

```react
//1. 简写
this.setState((prevState)=>({
            count: prevState.count+1
        }))
// 2. 完整写法
this.setState((prevState)=>{{
            count: prevState.count+1
        }})
```

**setState 何时同步，何时异步，为什么会这样, React 如何去控制同步异步?**
想了解的可以看这篇[React 中setState更新state何时同步何时异步？](https://link.juejin.cn?target=https%3A%2F%2Fwww.jianshu.com%2Fp%2F799b8a14ef96)

## 遍历

**写法一：**

```react
{  this.state.datalist.map(item => <li key={item}>{item}</li>) }
```

**写法二：**

```react
 var newlist = this.state.datalist.map(item => <li key={item}>{item}</li>)
 {newlist} //使用变量
```

## 通信

### 父传子 通过属性（props）

**父：**

```react
//需要 {} 包住才是 js  不然是字符串
<Navbar mytitle='home' myshow={false}></Navbar>
```

子：可以直接通过this.props.属性名获取

```react
{this.props.mytitle}
```

#### 属性简写:

```react
var obj={
            mytitle:'测试',
            myshow:false
        }
  <Navbar {...obj}></Navbar>
```



#### 属性验证

Navbar.propTypes 可以访问到

```react
    import MyPropTypes from 'prop-types'; //提供验证数据类型的方法,必须交给MyPropTypes模块方法进行处理验证
    class Navbar extends Component {
      static propTypes = {
        myshow: MyPropTypes.bool,
      };
    }
```

#### 默认属性

```react
static defaultProps = {
        myshow: true
    }
```

### 子传父 通过事件

**父：传了一个回调函数过去**

```react
<Navbar onEvent={() => {
	this.setState({
		isShow: !this.state.isShow
	})
}}></Navbar>
```

**子 :收到这个回调函数之后 直接调用**

```react
<button onClick={this.handleClick}>hide/show</button>
handleClick = () => {
	this.props.onEvent()
}
```

### Ref

**Ref** 你可以用来绑定到 render() 输出的任何组件上。
这个特殊的属性允许你引用 render() 返回的相应的支撑实例（ backing instance ）。这样就可以确保在任何时间总是拿到正确的实例。
**父组件**：可一获取到Input组件的实例，并且对他内部的状态值进行修改

```react
<Input ref='mytext' />
	<button onClick={
		this.handleClick
	}>add</button>

handleClick = () => {
	console.log(this.refs.mytext.state.mytext)// 拿到值    
	this.refs.mytext.reset() // 清空输入框
}

```

**子组件**：

```react
class Input extends Component {
	state = {
		mytext: ''
	}
	reset = () => {
		this.setState({
			mytext: ''
		})
	}
<div>
	<div>others input</div>
	<input value={this.state.mytext} type='text' style={{ background: 'yellow' }} onChange={(ev) => {
		this.setState({
			mytext: ev.target.value
		})

```



### 发布订阅模式

**自己写一个发布订阅模式来传递信息**
**事件总线:**用来观察订阅者和发布者，如果发现发布者发送了信息，将信息立刻发送给订阅者

```react
	const EventChannel = {
		list: [],
		subscribe(callback) {
			this.list.push(callback)
		},
		dispatch(data) {
			this.list.forEach(item => {
				item(data)
			})
		}
	}

```

**订阅者**：把自身的回调存储在事件总线,事件总线遍历调用 发布者调用发布方法可以传入发布者自身的参数  订阅者即可获取到

```react
	class Child3 extends Component {
	// 创建成功 ，dom挂载完成
	componentDidMount() {
		observer.subscribe((data) => {
			console.log('child3定义的callback', data)
		})
		// console.log('componentDidMount', '调用订阅方法', observer.subscribe())
	}
	render() {
		return <div style={{ background: 'blue' }}>我是微信用户</div>
	}
}
class Child3 extends Component {
	// 创建成功 ，dom挂载完成
	componentDidMount() {
		observer.subscribe((data) => {
			console.log('child3定义的callback', data)
		})
		// console.log('componentDidMount', '调用订阅方法', observer.subscribe())
	}
	render() {
		return <div style={{ background: 'blue' }}>我是微信用户</div>
	}
}

```

**发布者:**调用事件总线的发布方法 
**发布方法**：把订阅者的回调遍历出来 然后调用 遍历中间可以传入自己的参数  

```react
class Child2 extends Component {
    render() {
        return <div style={{ background: 'red' }}>公众号发布者
        <button onClick={this.handleClick}>发布</button>
        </div>
    }
    handleClick=()=>{
        EventChannel.dispatch('child2的问候')
    }
}

```



### context 通信

**基地:**提供自己的状态  以及修改状态的方法
基地代码：

```react
export default class App extends Component {
        state = {
            text: '私人服务'
        }
        changeState=(data)=>{
            this.setState({
                text: data
            })
        }
    render() {
        return (
            <GlobalContext.Provider value={{
                sms: '短信服务',
                call: '电话服务',
                text: this.state.text,
                changeState:this.changeState
            }}>
                <div>
                    <Child1></Child1>
                </div>
            </GlobalContext.Provider >
        )
    }
}

```

**通信者:**调用基地修改的方法，传入自己的信息

```react
class Child2 extends Component {
    render() {
        return <GlobalContext.Consumer>
            {context => (
                <div style={{ background: 'blue' }}>child2--{context.call}
                    <button onClick={() => this.handClick(context)}>child2通信</button>
                </div>
            )
            }
        </GlobalContext.Consumer>
    }
    handClick = (context) => {
        context.changeState('来自child2的问候')
        console.log(context)
    }
}

```

**其他通信者**:一旦状态改变了 ，可以马上获取到

```react
class Child1 extends Component {
    render() {
        return <GlobalContext.Consumer>
            {context => (
                <div style={{ background: 'yellow' }}>child1--{context.text}</div>
            )
            }
        </GlobalContext.Consumer>
    }
}

```



## 生命周期

一个组件会按照顺序依次经历以下的三个阶段：初始化阶段、运行中阶段、销毁阶段
其中的三个生命周期即将被废弃，不建议使用，增加了两个新的生命周期替代~

### 初始化阶段

#### componentWillMount  

render 之前最后一次修改状态的机会，在渲染前调用,在客户端也在服务端，
即将被废弃，不建议使用，17版本之后必须加上 UNSAFE_ 才可以工作（UNSAFE_componentWillMount），
**废弃理由：**
在 ssr 中这个方法将会被多次调用，所以会重复触发多遍，同时在这里如果绑定事件，将无法解绑，导致内存泄漏，变得不够安全高效逐步废弃

```react
UNSAFE_componentWillMount(){
        console.log('componentWillMount','ajax',)
    }

```

#### render

只能访问 this.props 和 this.state，不允许修改状态和 dom，在生命周期中会被多次调用。

#### componentDidMount

成功 render 并渲染完成真实 dom 之后触发，可以修改 dom, 一般请求数据会写在这个生命周期

```react
 componentDidMount() {
        console.log('componentDidMount', 'ajax 绑定')
        fetch("/test.json").then(res=>res.json()).then(res=>{
            console.log(res.data)
            this.setState({
                list: res.data.films
            })
        })
    }

```



### 运行中阶段

#### componentWillReceiveProps  

父组件修改属性触发（子组件使用） 会走多次 可以在这里获取到id 
即将被废弃，不建议使用，17版本之后必须加上 UNSAFE_ 才可以工作（UNSAFE_componentWillReceiveProps）
**废弃理由：**
外部组件多次频繁更新传入多次不同的props，会导致不必要的异步请求
这个生命周期有新的生命周期替换—— **getDerivedStateFromProps **  可以看后面的介绍~

```react
   // 会走多次 可以在这里获取到id  更新  mount 只会走一次
    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps')
        console.log('获取到ajax数据', nextProps.myname)
    }

```



#### shouldComponentUpdate

**返回 false 会阻止 render 调用 **
可以做性能调优函数 可以获取到新的状态和老的状态然后对比状态，如果状态没有改变不重新渲染

```react
  shouldComponentUpdate(nextProps, nextState) {
        // 性能调优函数 //新的状态和老的状态
        console.log('shouldComponentUpdate',this.state.myname,nextState.myname)
        if (this.state.myname !== nextState.myname){
            return true //返回 true 会自动渲染 这个是手动自己去对比 dom 是否发生改变再去调用 render
          // react有自动优化能力 —— PureComponent(看后面~)  
        }
            return false   //false 不会重新渲染
    }

```



#### componentWillUpdate  

不允许修改属性和状态，会被触发多次，即将被废
**废弃理由：**
更新前记录 DOM 状态，可能会做一些处理，与 componentDidUpdate 相隔时间如果太长，会导致状态不可信，有新的生命周期—— **getSnapshotBeforeUpdate 替换**

```react
UNSAFE_componentWillUpdate(){
        console.log('componentWillUpdate')
    }

```

#### render

只能访问 this.props 和 this.state，不允许修改状态和 dom，在生命周期中会被多次调用

#### componentDidUpdate

在组件完成更新后立即调用，在初始化时不会被调用，可以修改dom

### 销毁阶段

#### componentWillUnmount

在组件从 DOM 中移除之前立刻被调用,在删除组件之前进行清理操作，比如计时器和事件监听器。

### 新增加的两个生命周期

#### getDerivedStateFromProps  

**同步作用:**
1.可以改老状态  
2.不管是初始化 或者更新  都可以拿到父组件属性

```react
componentWillReceiveProps(nextProps) //改变才会获取到属性
// 里面不能用this 必须用static  
  static getDerivedStateFromProps(nextprops, state) {  
  //初始化属性 和更新属性都可以获取到
        document.title = nextprops.mytitle
        console.log(nextprops, state)
        return null //状态不改变
        return {
             myname: state.myname.substring(0, 1).toUpperCase()
         } //返回一个新的状态  可以在次修改状态
    }

```

**异步作用：**
在getDerivedStateFromProps 中不可以做ajax请求，必须和其他生命周期配合使用

```react
componentDidMount() {
        console.log('发ajax', this.state.myid)
    }
    // componentWillReceiveProps() {
    //     console.log('发ajax')
    // }
    static getDerivedStateFromProps(nextprops, state) {
        console.log('getDerivedStateFromProps','获取到id值', nextprops.id)
        return {
            myid:  nextprops.id
        }
    }

```

#### getSnapshotBeforeUpdate

**可以在更新之前获取到状态**

```react
   //data 接收到了getSnapshotBeforeUpdate的返回值
    componentDidUpdate(prevProps, prevState,data) {
        console.log('componentDidUpdate', data)
    }
    // 在render 生命之后  在已经更新完之前 可以准确获取 返回之后的状态  
    // componentDidUpdate第三个参数可以获取到这个值
    getSnapshotBeforeUpdate = (prevProps, prevState) => {
        console.log('getSnapshotBeforeUpdate','获取滚动条的位置')
        return {
            y:100
        }
    }

```

## React 中性能优化的方案

### 1、shouldComponentUpdate

**手动控制**组件自身或者子组件是否需要更新，尤其子组件非常多的情况，不适合这个方案

### 2、PureComponent  

PureComponent 是 React 提供的**自动优化** ，会帮你比较新的 props 跟 旧的 props ，
取决于值是否相等（值相等，或者对象含有相同的属性、且属性值相等），决定 shouldComponentUpdate 返回true 或者 false，从而决定要不要呼叫 render function
**优点：**可以减少重复生命周期的执行 会自动对比虚拟dom等
**缺点：**如果你的state 或者 props '永远都会变'，那 PureComponent 并不会更加快，因为 shallowEqual 也需要花时间，组件如果需要实时更新 可以用 shouldComponentUpdate  

```react
import React, { Component, PureComponent } from 'react'
export default class App extends PureComponent {}
```

## 插槽

this.props.children  获取到的是内容数组
**Child 组件:**

```react
const Child = (props)=>{
    return <div>
        child--{props.children}
    </div>
}
```

**使用这个组件：**

```react
export default function App() {
    return (
        <div>
             {/* 插槽 */}
            <Child>
                <li>11111</li>
                <li>222222</li>
            </Child>
        </div>
    )
}
```

## 路由

**安装:**

```shell
cnpm i  --save  react-router-dom
```

HashRouter模式下 多次点相同路径会被警告 
**解决方案**： 换成history模式  ： BrowserRouter
**写法：**
**react-router-dom 4.5 版本写法一致:**

```react
// 
import {
HashRouter as Router, //路由外层需要包裹的组件  hash模式
// BrowserRouter(后端配置 history 模式)
Route ,//每个路由组件都需要此组件
}from 'react-router-dom'
import React from 'react'
import Home from '../views/home/Home'
import Login from '../views/login/Login'
// class BlogRouter extends Comment{
// }

```

**函数式组件写法：**

```react
const BlogRouter=()=>(
    <Router>
    <Route path='/home' component={Home}/>
    <Route path='/login' component={Login}/>
    </Router>
)
export default BlogRouter
app.js
import BlogRouter from './router'
class App extends Component{
  render(){
    return(
      <div>
        <BlogRouter/>
      </div>
    )
  }
}
export default App;

```



### 嵌套路由

**嵌套路由两种写法：**
1.在父组件中直接写：

```react
import { Route} from 'react-router-dom'
import Right from './Right'
import Role from './Role'
export default class Manage extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li>权限列表</li>
                    <li>角色列表</li>
                    <Route path='/right-manage/right' component={Right} />
                    <Route path='/right-manage/roles' component={Role} />
                </ul>
            </div>
        )
    }
}

```

1. 在路由中写：

```react
import Manage from '../views/rightmanage/Manage'
import Right from '../views/rightmanage/Right'
import Role from '../views/rightmanage/Role'
 <Route path='/right-manage' render={()=>
            (<Manage>
                    <Switch>
                <Route path='/right-manage/rights' component={Right} />
                <Route path='/right-manage/roles' component={Role} />
                <Redirect from='/right-manage' to='/right-manage/roles' />
                    </Switch>
            </Manage>)
    }/>


```

**在父组件中留坑：**

```react
{this.props.children}
```

### 路由重定向

**一定要包 Switch ** 一旦匹配上就不会再继续匹配 会直接跳出

```react
import {
    Route,
    Redirect,//重定向
    Switch//匹配到第一个符合条件路径的组件，就停止了
} from 'react-router-dom'
export default class DashBorad extends Component {
    render() {
        return (
            <div>
                <div>顶部导航栏</div>
                <Switch>                  
                    {/* 重定向 */}
                    <Redirect from='/' to='/home' exact />
                    <Route path='*' component={Notfind} />
                </Switch>
            </div>
        )
    }
}

```



### 跳转页面

**路由渲染跳转：**

```react
<Route path='/artic-manege/preview/:myid' component={Prebiew} />
```

**编程式跳转页面:**

```react
this.props.history.push(`/artic-manege/preview/${id}`)
```

**获取到传递的值：**

```react
this.props.match.params.myid
```

## 高阶组件(withRouter)

高阶组件，获取低阶组件，生成高阶组件 **可以实现路由包裹跳转清空**等
有些组件没有被 router 包围，会获取不到会有 this.props ，可以用高阶组件进行包裹，然后获取其this.props

```react
import {withRouter} from 'react-router' //路由
//获取到 this.props 跳转至 home
this.props.history.push('/home')
export default withRouter(SideMenu)
```



## 获取不到 this.props 解决方案

除了用高阶组件的方法，还可以用**父组件传递this.props给子组件**
**父组件：**

```react
annahistory={this.props.history}
```

**子组件：**

```react
this.props.kerwinhitory.push(obj.key)
```

## Redux

Redux 主要用作应用状态的管理，即 Redux 用一个单独的常量状态树（对象）保持这一整个应用的状态，这个对象不能直接被改变。如果一些数据变化了，一个新的对象就会被创建（使用 action 和 reducers ）
Redux 的工作流程：

![img](1_1_React入门/50a1d30830e247e48922ae69520d3874tplv-k3u1fbpfcp-zoom-in-crop-mark1304000.awebp)

### 同步写法

**store.js 文件：**

```react
import {createStore} from 'redux'//createStore 方法创建一个store回想
// 创建一个reducer ，
//'修改状态'（接收老状态，修改的值，深复制之后，再返回一个新的状态）
const reducer=(prevState={
    // 设置一个初始值
    iscollapsed:false
},action)=>{
    console.log(action)
    // 深复制一份新的把action里面获取的值 返回出去
    var newstate={...prevState}
    newstate.iscollapsed=payload  
    return newstate
}//只要状态已返回，会自动更新
const store=createStore(reducer)
export default store
```

**发布者（发布自己的状态）**

```react
store.dispatch({
            type:'mysideMenuCollapsed',
            payload: iscollapsed
        });//store 在action里面可以获取到发布者的值
```

**订阅者（做出改变者，要获取新的状态）**

```react
componentDidMount() {
        // 订阅  注意一定要取消订阅
       this.unscribe= store.subscribe(()=>{
           //store.getState() 这个可以获取到新的状态
            console.log('有人通知我更新了',store.getState())
            this.setState({
                collapsed: store.getState().iscollapsed
            })
        })
    }
     componentWillUnmount(){
    // 取消订阅
    this.unscribe()
   }
```



### 异步写法 

**异步 action 中间件**

#### 1、redux-Thunk

redux-thunk可以在actionCreator中返回一个函数，将函数执行，并传入dispatch和getState两个参数给这个函数，我们可以在任意时候dispatch
**store.js:**

```react
import { createStore ,applyMiddleware} from 'redux'//createStore 方法创建一个store回想
import reduxThunk from 'redux-thunk'
// 创建一个reducer ，
//'修改状态'（接收老状态，修改的值，深复制之后，再返回一个新的状态）
const reducer = (prevState = {
    // 设置一个初始值
    roleList:[]//角色侧边导航数据
}, action) => {
    
    let { type, payload } = action
    switch (type) {
        case 'setRoleList':
        // 深复制 不能在prevState（老状态上直接修改）需要返回一个新的状态
            var newstate = { ...prevState }
            newstate.roleList= payload  
            return newstate
            default :
            return prevState
    }
}//只要状态已返回，会自动更新
// 默认 action 只能是普通对象{type:''}
// 创建store 顺便应用中间件thunk 如果action是函数,我来处理
const store = createStore(reducer,applyMiddleware(reduxThunk))
export default store
```

**订阅者和发布者案例：**
**role.js：**

```react
actionCreater = () => {
        // middleware  解决异步处理redux-thunk redux-promise
        return (dispatch) => {
            axios.get("http://localhost:8000/roles").then(res => {
                console.log(res.data)
                // 自己决定什么时候发送
                dispatch({
                    type: 'setRoleList',
                    payload: res.data
                })
            })
        }
    }
    componentDidMount() {
        if (store.getState().roleList.length == 0) {
            //发ajax
            store.dispatch(this.actionCreater())
        } else {
            console.log('使用缓存', store.getState().roleList)
            this.setState({
                datalist: store.getState().roleList
            })
        }
        //数据改变了 订阅获取到新的数据
        this.unscribe = store.subscribe(() => {
            console.log("请求数据结束", store.getState().roleList)
            this.setState({
                datalist: store.getState().roleList
            })
        })
    }
    componentWillUnmount() {
        // 取消订阅
        this.unscribe()
    }
```

#### 2、redux-promise

redux-promise可以在actionCreator中返回一个promise对象，他会等待成功后将成功后的结果派发出去
**store.js**

```react
import reduxPromise from 'redux-promise'
import { createStore, applyMiddleware } from 'redux'//createStore 方法创建一个store回想
const reducer = (prevState = {
    // 设置一个初始值
    rightList: [],//角色侧边导航数据
}, action) => {
    console.log(action)
    // 深复制
    let { type, payload } = action
    switch (type) {
        case 'setRightsList':
            var newstate = { ...prevState }
            newstate.rightList = payload  
            return newstate
        default:
            return prevState
    }
}//只要状态已返回，会自动更新
const store = createStore(reducer, applyMiddleware(reduxPromise))
export default store
```

**订阅者和发布者案例：**
**role.js：**

```react
actionCreater = () => {
        // 返回一个promise对象
        return axios.get("http://localhost:8000/rights").then(res => {
            return {
                type: 'setRightsList',
                payload: res.data
            }
        })
    }
    componentDidMount() {
        if (store.getState().rightList.length == 0) {
            //发ajax
            store.dispatch(this.actionCreater()).then(data=>{
                this.setState({
                    datalist: store.getState().rightList
                })
            })
        } else {
            console.log('使用缓存', store.getState().rightList)
            this.setState({
                datalist: store.getState().rightList
            })
        }
    }
```



### 核心API-Reducer

Reducer保证是纯函数
**纯函数**
1.对外界没有副作用的函数
2.同样的输入,得到同样的输出

```react
var myname='anna'
function test(myname){
myname='xiaoming'
}
test(myname)
```

**非纯函数:**

```react
var myname='anna'
function test(){
myname='xiaoming'
}
test()
```

**拆分**
可以将 Reduer 按照业务模块去拆分
**store.js**

```react
import { createStore, applyMiddleware ,combineReducers} from 'redux'//createStore 方法创建一个store回想
import reduxThunk from 'redux-thunk'
import reduxPromise from 'redux-promise'
import collapseReducer from './reducers/collapseReducer'
import rightListReducer from './reducers/rightListReducer'
import roleListReducer from './reducers/roleListReducer'
const reducer = combineReducers({
    iscollapsed: collapseReducer,
    roleList: roleListReducer,
    rightList: rightListReducer
})
const store = createStore(reducer, applyMiddleware(reduxThunk, reduxPromise))
export default store
collapseReducer
const collapseReducer = (prevState = false, action) => {
    let { type, payload } = action
    switch (type) {
        case 'sideMenuShow':
            return payload
        default:
            return prevState
    }
}
export default collapseReducer
```

**roleListReducer.js**

```react
const roleListReducer = (prevState =[], action) => {
    let { type, payload } = action
    switch (type) {
        case 'setRoleList':
            var newstate = { ...prevState }
            newstate = payload
            return newstate
        default:
            return prevState
    }
}//只要状态已返回，会自动更新
export default roleListReducer
```

## React-Redux

**同步写法**
**app.js**

```react
import { Provider } from  'react-redux'
import store  from './redux/store
<Provider  store={store}>
        <BlogRouter/>
</Provider >

```

**发布者**
把方法映射成属性用
第一个参数是商量好的那个属性传给孩子
第二个参数把方法映射成属性用

```react
import { connect } from 'react-redux'
const mapStateToprops=()=>{
return {
}
} //state 映射成属性用
const mapDispathToProps={
  actionCreator:(iscollapsed)=>{
        return {
            type: 'sideMenuShow',
            payload: iscollapsed
        }
    }
} 
export default withRouter(connect(mapStateToprops,mapDispathToProps)(TopHeader))
```

**订阅者接收**

```react
import { connect } from 'react-redux'
const mapStateTopprops=(state)=>{
    return {
        iscollapsed:state.iscollapsed
    }//约定isCollapsed 属性
}
export default withRouter(connect(mapStateTopprops)(SideMenu))
```

**异步**

```react
if (this.props.datalist.length == 0) {
     //直接调用改方法 会把状态传递给redux
           this.props.setList()
        }  
//订阅者 state 中可以获取到redux中的状态
const mapStateToprops = (state) => {
    return {
        datalist:state.rightList
    }
} //state 映射成属性用
//会自动传递给redux
const mapDispathToProps = {
    setList : () => {
        // 返回一个promise对象
        return axios.get("http://localhost:8000/rights").then(res => {
            // 自己决定什么时候发送
            return {
                type: 'setRightsList',
                payload: res.data
            }
        })
    }
  }
// } //把方法映射成属性用
export default connect(mapStateToprops,mapDispathToProps)(Right)
```



## Redux和React-Redux关系

![img](1_1_React入门/a7bedb95775e4bb5acc3876549ebc995tplv-k3u1fbpfcp-zoom-in-crop-mark1304000.awebp)

## mobx

Mobx是一个功能强大，上手非常容易的状态管理工具。

### 1、box方法

只能观察 简单数据类型

```react
store.js
import { observable } from 'mobx'
const store = observable.box(true)  
export default store
// 传播者
import store from '../../mobx/store'
 store.set(false)
 // 接收者
 import store from '../../mobx/store'
import {  autorun } from 'mobx'
  autorun(() => {
            console.log(store.get())
        })
```



### 2、map方法

观察复杂数据类型

```react
const store = observable.map({
isshow:true,
list:[],
roleList:[],
rightList:[]
})
 store.set('isshow',false)
```

**mobx 优点：**

1. mobox写法上更偏向于oop
2. mobox 对一份数据直接进行修改操作，不需要始终返回一个新的数据
3. mobox 并非单一的 store。可以多 store
4. redux 默认以 javaScript 原生对象形式存储数据，而 mobx 可以用来观察对象

**mobx 缺点**：
mobx提供的约定及模板代码很少，代码编写很自由，如果不做一些约定，比较容易导致团队代码风格不统一
相关中间件很少，逻辑层业务整合式问题
**遇到的bug**
**第一个bug:**
** ![img](1_1_React入门/099487924c3243eda96a8579e8eaaabftplv-k3u1fbpfcp-zoom-in-crop-mark1304000.awebp) **
**解决方案：**
取消观察

```react
this.cancel = autorun(() => {
            this.setState({
                code: store.get('isshow')
            }
 //取消观察
        componentWillUnmount() {
        this.cancel()//取消观察
    }
```

**第二个bug:**
** ![img](1_1_React入门/66b5fa3b96bc4cab833c9b01e4fe9bf2tplv-k3u1fbpfcp-zoom-in-crop-mark1304000.awebp)**
**解决方案：**
网速很慢的时候数据没有回来 ajax请求的数据没有回来

```react
componentWillUnmount() {
        this.setState=()=>{}
        console.log('列表销毁','取消ajax')
    }
```

## React Hooks

*Hook* 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

### useState写法

```react
import React,{useState}from 'react'
export default function App() {
    const [name, setName] = useState('anna')//初始值[状态，改变状态的方法]
    const [age, setAge] = useState('12')//初始值[状态，改变状态的方法]
    return (
        <div>
            app-{name}-{age}
            <button onClick={()=>{
                setName('xiaoming')
                setAge('18')
            }}>click</button>
        </div>
    )
}
```



### 获取ref

```react
import React, { useState, useRef }from 'react'
const mytext = useRef(null)
<input type='text' onChange={(ev)=>{
                settext(ev.target.value)
            }}  ref={mytext}/>
```



### 点击事件

```react
<button onClick={() => handleDeleClick(index)}>dele</button>
 const handleDeleClick=(index)=>{
        console.log(index)
        var newlist=[...list]
        newlist.splice(index,1)
        setlist(newlist)
    }
```

### 替代复杂的生命周期(useEffect)

**格式: useEffect(处理函数，[依赖]）**
如果依赖传的是一个空数组，相当于 componentWillMount ， 挂载前，只执行一次
如果第二个参数不传，代表任何状态改变，都会重新执行

```react
    useEffect(()=>{
    },[])
```

** 更新： [依赖] 只有依赖改变的时候 才会执行一次**

```react
   // age 更新会重新执行
    useEffect(()=>{
        console.log('创建或更新')
    },[age])
```

**创建/销毁**  

```react
   useEffect(() => {
        var id=setInterval(() => {
            console.log(111)
        }, 1000);
        console.log('创建')
        return () => {
            // cleanu
            clearInterval(id)
            console.log('销毁')
        }
    }, [])
```

### 获取props

```react
export default function Prebiew(props) {}
```

### useCallback 提高运行效率

防止因为组件重新渲染，导致方法被重新创建，提高性能

```react
const test=useCallback(
        () => {
            console.log(text)
        },
        [text]
    )//闭包,缓存函数，提高性能
    test()
```

### useReducer和useContext

在 hooks 中提供了的 useReducer 功能，可以增强 ReducerDemo 函数提供类似 Redux 的功能，引入 useReducer 后，useReducer 接受一个 reducer 函数作为参数，reducer 接受两个参数一个是 state 另一个是 action 。然后返回一个状态 count 和 dispath，count 是返回状态中的值，而 dispatch 是一个可以发布事件来更新 state 的
**reducer.js**

```react
const reducer = (prevstate, action) => {
    let { type, payload } = action
    switch (type){
        case "Change_text":
            // 深复制
        return {
            ...prevstate, text: payload
        }
         case "Change_list":
            // 深复制
        return {
            ...prevstate, list: payload
        }
    }
    return prevstate
}
export default reducer

```

**index.js （GlobalContext ）**

```react
index.js （GlobalContext ）
import React from 'react'
const GlobalContext = React.createContext()
export default GlobalContext
```

**app.js**

```react
import GlobalContext from './store/index'
import reducer from './store/reducer'
import React ,{useReducer,useContext}from 'react'
 const App=() =>{
    // 表示reducer 传入初始值  代表reducer管理这些状态
     const [state, dispatch] = useReducer(reducer, {
         isShow: true,
         list: [],
         text: "我是公共的状态"
     })  //[公共的状态，改变公共状态的方法]
    return <GlobalContext.Provider value={{
            state,
            dispatch
        }}> 
            <Child1/>
        </GlobalContext.Provider>
} 
//获取到app传来的信息 state可以直接获取到 dispatch 可以进行修改状态
const Child1=()=>{
    let { state, dispatch } = useContext(GlobalContext) //不需要consumer
    // console.log(useContext(GlobalContext))
    return <div>
    //同步：
        child1-{state.text}<button   onClick={()=>{
            dispatch({type:'Change_text',
            payload:'child1111111'
        })
        }}>click</button>
    </div>
   // 异端:
        axios.get("http://localhost:8000/users").then(res=>{
            console.log(res.data)
                dispatch({
                    type: 'Change_list',
                    payload: res.data
                })
            })
}
```

### 自定义Hooks

**当我们想在两个函数之间共享逻辑时，可以把它提取到第三个函数中**
**必须以'use'开头吗？**
必须如此。这个约定非常重要，不遵循的话，由于无法判断某个函数是否包含其内部  Hook 的调用，React 将无法自动检测你的Hooks 是否违反了Hook的规则

```react
//为preview 组件提供数据
const usePrebiewDate = (props)=>{
    const [title, settitle] = useState('')
    const [content, setcontent] = useState('')
    const [category, setcategory] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:8000/articles/${props.match.params.myid}`).then(res => {
            console.log(res.data)
            let { title, category, content } = res.data
            settitle(title);
            setcontent(content);
            setcategory(category);
        })
        return () => {
        }
    }, [props])
    return {
        title,
        content,
        category
    }
}
   let { title, content, category}= usePrebiewDate(props)
```

## 实战 

文章管理的后台管理系统——[地址](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fhalfsouli%2FKnowledgeSummary%2Ftree%2Fmaster%2FReact%2FReact-BasicGrammar%2FReact-demo-one)
 关于项目一些逻辑会后续再更新~ 以上内容如果存在一些疑问的地方可以联系我~ 看到会及时回复 ![img](1_1_React入门/579e9e8962504935a6f47a30edaf3735tplv-k3u1fbpfcp-zoom-in-crop-mark1304000.awebp) ![img](1_1_React入门/dfa19a0ea8684b5d9909c874136f7a75tplv-k3u1fbpfcp-zoom-in-crop-mark1304000.awebp)


作者：陌上千尘
链接：https://juejin.cn/post/6869328999659601934
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。