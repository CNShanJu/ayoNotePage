import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default ({ mode }) =>
    defineConfig({
        plugins: [vue()],
        // 自定义模式变量开头, 如：以 APP_ 开头
        // envPrefix: 'APP_',
        resolve: {
            //配置别名
            alias: {
                '@': resolve('./src'),
            },
        },
        base: './', // 打包路径
        server: {
            port: 4490, // 服务端口号
            open: true, // 服务启动时是否自动打开浏览器
            cors: true, // 允许跨域
            proxy: {
                '/TargetServic': {
                    target: loadEnv(mode, process.cwd()).VITE_APP_URL, // 使用环境变量指定目标服务器的地址
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''), // 可选项，用于重写请求路径
                },
            },
        },
    });
