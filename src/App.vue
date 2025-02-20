<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { useUserStore } from './stores/user';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(ElementPlus);

// 检查用户是否已登录
const userStore = useUserStore();   
onMounted(() => {
  if (userStore.token && userStore.token !== 'undefined') {
    console.log('Initializing login check...');
    userStore.login(userStore.token);
  }
}); 

app.mount('#app');
</script>

<style scoped>
/* 可添加全局样式 */
</style>