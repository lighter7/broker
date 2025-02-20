import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Auth/Login.vue';
import Register from '../views/Auth/Register.vue';
import UpdatePwd from '../views/Auth/UpdatePwd.vue';
import FollowStock from '../views/Main/FollowStock.vue';
import RecommendStock from '../views/Main/RecommendStock.vue';
import Profile from '../views/Main/Profile.vue';
import { useUserStore } from '../stores/user';

// 定义路由规则
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/update-pwd',
    name: 'UpdatePwd',
    component: UpdatePwd,
    meta: { requiresAuth: true }
  },
  {
    path: '/follow-stock',
    name: 'FollowStock',
    component: FollowStock,
    meta: { requiresAuth: true }
  },
  {
    path: '/recommend-stock',
    name: 'RecommendStock',
    component: RecommendStock,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    redirect: to => {
      const userStore = useUserStore();
      if (userStore.isLoggedIn) {
        return { name: 'FollowStock' };
      } else {
        return { name: 'Login' };
      }
    }
  }
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
});

// 路由守卫，验证用户是否登录
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.meta.requiresAuth &&!userStore.isLoggedIn) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;