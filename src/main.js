import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { useUserStore } from './stores/user';
import "@/assets/styles/variables.scss";
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import store from './store'; 
import { service } from './utils/auth.js';
 


const app = createApp(App);
 
const pinia = createPinia();
app.use(pinia);

app.config.globalProperties.$http = service;

app.use(router);

app.use(store); // 使用 Vuex store

// app.use(ElementPlus);
app.use(ElementPlus, {
    locale: zhCn
});

// 检查用户是否已登录
const userStore = useUserStore();
console.log('main.js1')
console.log(userStore.token)
if (userStore.token && userStore.token !== 'undefined') { 
    userStore.login(userStore.token);
}
console.log('main.js2')

// 全局错误处理
app.config.errorHandler = (err, vm, info) => {
    console.error('全局错误捕获:', err, info);
    // 这里可以添加将错误信息记录到本地日志的逻辑
    // 例如调用之前定义的 logError 函数
    // import { logError } from './utils/log';
    // logError(err);
};


app.mount('#app');