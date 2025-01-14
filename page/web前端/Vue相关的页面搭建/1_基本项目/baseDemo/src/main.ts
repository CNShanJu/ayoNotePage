import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

const app = createApp(App);

import router from '@/router/index.ts';
import store from '@/store/index';
import { defaultApi as api } from '@/http/index';

app.config.globalProperties.$request = api; //方法挂载到全局

// 将获取环境的方法挂载到vue的原型上，方便后面的使用
app.config.globalProperties.getEnv = import.meta.env;

app.use(router);
app.use(store);

app.mount('#app');

//可以连缀使用use挂载组件
//createApp(App).use(router).use(store).mount('#app');
