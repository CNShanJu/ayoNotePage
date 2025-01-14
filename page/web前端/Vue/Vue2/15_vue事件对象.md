## vue中常用的鼠标事件、键盘事件、表单事件

咱们在写vue项目的时候,经常会用v-on或@进行事件绑定,总结一下绑定事件种类,

### 鼠标事件

|      事件名       |                             描述                             |
| :---------------: | :----------------------------------------------------------: |
|     auxclick      | A pointing device button (ANY non-primary button) has been pressed and released on an element. |
|       click       |               在元素上按下并释放任意鼠标按键。               |
|    contextmenu    |               右键点击（在右键菜单显示前触发）               |
|     dblclick      |                    在元素上双击鼠标按钮。                    |
|     mousedown     |                  在元素上按下任意鼠标按钮。                  |
|    mouseenter     |                 指针移到有事件监听的元素内。                 |
|    mouseleave     |                 指针移出元素范围外（不冒泡）                 |
|     mousemove     |                 指针在元素内移动时持续触发。                 |
|     mouseover     |          指针移到有事件监听的元素或者它的子元素内。          |
|     mouseout      |              指针移出元素，或者移到它的子元素上              |
|      mouseup      |               在元素上按下并释放任意鼠标按键。               |
| pointerlockchange |                鼠标被锁定或者解除锁定发生时。                |
| pointerlockerror  |           可能因为一些技术的原因鼠标锁定被禁止时。           |
|      select       |                        有文本被选中。                        |
|       wheel       |                     滚轮向任意方向滚动。                     |

### 键盘事件

|  事件名  |                          描述                           |
| :------: | :-----------------------------------------------------: |
| keydown  |                     按下任意按键。                      |
| keypress | 除 Shift、Fn、CapsLock 外的任意键被按住。（连续触发。） |
|  keyup   |                     释放任意按键。                      |

### 表单事件

| 事件名 |      描述      |
| :----: | :------------: |
| reset  | 点击重置按钮时 |
| submit |  点击提交按钮  |

#### 在这里总结一下input事件

##### 1. @input（或者是v-on:input）

适用于实时查询，每输入一个字符都会触发该事件。

##### 2. @keyup.enter

该事件与v-on:input事件的区别在于：input事件是实时监控的，每次输入都会调用，而@keyup.enter事件则是在pc上需要点击回车键触发，而在手机上则是需要点击输入键盘上的确定键才可触发。

##### 3. @change

该事件和enter事件相似，在手机上都是要经过触发虚拟键盘的搜索键才会触发事件。使用方式同input事件。

注：在ios手机上会出现问题:
如果要的效果是输入值不用虚拟键盘触发方法就调查询接口进行查询，这时在安卓手机上没有问题，但是在ios手机上会出现多次触发的情况。
简单的解决办法：
对input的值进行监听（watch），把原本需要绑在input框的事件在监听变化时调用。

##### 4. @blur（失焦）

要满足输入框在输入完成、移到其他地方时进行验证时，需要用到该事件，用此事件进行绑定验证方法即可。
注：如果使用mintui中的mt-field标签时，对应的blur（失焦）事件要执行时，要用@blur.native.capture=""来代替@blur。

```vue
<mt-field label="用户名" placeholder="请输入用户名" type="text" v-model="username" @blur.native.capture="testUser"></mt-field>
```

这是在网上查询的资料,自己也记录一下不全面,如果想看详细介绍的可以[点击这里](https://blog.csdn.net/zlfing/article/details/109745657),希望对你有帮助.

