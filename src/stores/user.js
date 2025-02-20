import { defineStore } from 'pinia';
import { getUserInfo } from '../api/auth';

// 使用 Pinia 定义用户状态管理
export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    // token: null, // 确保初始值为 null
    token: localStorage.getItem('token') || null,
    userInfo: null
  }),
  actions: {
    // 登录操作
    async login(token) {
      this.isLoggedIn = true;
      this.token = token; 
      localStorage.setItem('token', token);
      try {
        const response = await getUserInfo();
        this.userInfo = response.data;
      } catch (error) {
        console.error('获取用户信息失败:', error);
      }
    },
    // 注销操作
    logout() {
      this.isLoggedIn = false;
      this.token = null;
      this.userInfo = null;
      localStorage.removeItem('token');
    },
    // 更新用户信息
    updateUserInfo(userInfo) {
      this.userInfo = userInfo;
    },
  }
});
