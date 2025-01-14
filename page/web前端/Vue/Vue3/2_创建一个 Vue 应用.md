## 创建一个 Vue 应用

### 应用实例

每个 Vue 应用都是通过 `createApp` 函数创建一个新的 **应用实例**：

```js
import { createApp } from 'vue'

const app = createApp({
  /* 根组件选项 */
})
```

我们传入 `createApp` 的对象实际上是一个组件，每个应用都需要一个“`根组件`”，其他组件将作为其子组件。

如果你使用的是`单文件组件`，我们可以直接从另一个文件中导入根组件。

```js
import { createApp } from 'vue'
// 从一个单文件组件中导入根组件
import App from './App.vue'

const app = createApp(App)
```

### 挂载应用

应用实例必须在调用了 `.mount()` 方法后才会渲染出来。该方法接收一个“`容器`”参数，可以是一个实际的 `DOM 元素`或是一个 `CSS 选择器`字符串：

```html
<div id="app"></div>
```

```js
app.mount('#app')
```

应用根组件的内容将会被渲染在`容器`元素里面。容器元素自己将**不会**被视为应用的一部分。

`.mount()` 方法应该始终在**整个应用配置和资源注册完成后**被调用。同时请注意，不同于其他资源注册方法，它的返回值是`根组件实例`而非`应用实例`。

#### DOM 中的根组件模板

根组件的模板通常是组件本身的一部分，但也可以直接通过在挂载容器内编写模板来单独提供：

```html
<div id="app">
  <button @click="count++">{{ count }}</button>
</div>
```

```js
import { createApp } from 'vue'

const app = createApp({
  data() {
    return {
      count: 0
    }
  }
})

app.mount('#app')
```

当根组件没有设置 `template` 选项时，Vue 将自动使用容器的 `innerHTML` 作为模板。

DOM 内模板通常用于无构建步骤的 Vue 应用程序。它们也可以与服务器端框架一起使用，其中根模板可能是由服务器动态生成的。

### 应用配置

应用实例会暴露一个 `.config` 对象允许我们配置一些应用级的选项，例如定义一个应用级的错误处理器，用来捕获所有子组件上的错误：

```js
app.config.errorHandler = (err) => {
  /* 处理错误 */
}
```

应用实例还提供了一些方法来注册应用范围内可用的资源，例如注册一个组件：

```js
app.component('TodoDeleteButton', TodoDeleteButton)
```

这使得 `TodoDeleteButton` 在应用的任何地方都是可用的。

确保在挂载应用实例之前完成所有应用配置！
