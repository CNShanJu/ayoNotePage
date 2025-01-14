/// <reference types="vite/client" />

// 因为.vue 文件不是一个常规的文件类型，ts 是不能理解 vue 文件是干嘛的，这一段是告诉 ts，vue 文件是这种类型的。
declare module '*.vue' {
    import { DefineComponent } from 'vue';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare module '*.ts';

// 环境变量 TypeScript的智能提示
interface ImportMetaEnv {
    readonly VITE_NODE_ENV: string; //定义提示信息 数据是只读的无法被修改
    //多个变量定义多个...
}

// interface ImportMeta {
//     readonly env: ImportMetaEnv;
// }
