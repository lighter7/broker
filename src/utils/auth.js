import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user.js';

// 后端 API 基础地址
console.log(import.meta.env.VITE_SERVER_BASE_URL); 
const API_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL; 
//'http://127.0.0.1:8800'; //process.env.VITE_SERVER_BASE_URL;

// 创建 Axios 实例
const service = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000
});

// 定义空闲时间阈值（1 小时，单位：毫秒）
const IDLE_TIME_THRESHOLD = 1 * 60 * 60 * 1000;
let idleTimer;

// 重置空闲计时器
const resetIdleTimer = () => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
        handleLogout();
    }, IDLE_TIME_THRESHOLD);
};

// 处理登出逻辑
const handleLogout = () => {
    console.log('handleLogout'); 
    const router = useRouter();
    const userStore = useUserStore();
    ElMessageBox.alert('由于长时间未操作，您已登出', '提示', {
        confirmButtonText: '确定',
        callback: () => {
            userStore.logout();
            router.push({ name: 'Login' });
        }
    });
};

/// 添加请求拦截器
service.interceptors.request.use(
    (config) => {
        console.log('添加请求1'); 
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        resetIdleTimer();
        return config;
    },
    (error) => {
        console.log('添加请求2'); 
        console.log(error); 
        return Promise.reject(error);
    }
);

// 添加响应拦截器
service.interceptors.response.use(
    (response) => {
        console.log('添加响应拦截器1'); 
        resetIdleTimer();
        return response;
    },
    (error) => {
        console.log('添加响应拦截器2'); 
        console.log(error); 
        const { response } = error;
        if (response && response.status === 401) {
            handleLogout();
        }
        return Promise.reject(error);
    }
);

// // 用户相关请求
// const userApi = {
//     register: (data) => service.post('/user/register', data),
//     login: (data) => service.post('/user/login', data),
//     updatePassword: (data) => service.post('/user/update_password', data),
//     logout: () => service.post('/user/logout')
// };

// // 股票相关请求
// const stockApi = {
//     getStockList: () => service.get('/stock/list'), // 假设的接口
//     getStockDetail: (id) => service.get(`/stock/detail/${id}`) // 假设的接口
// };

// // 评论相关请求
// const reviewApi = {
//     addReview: (data) => service.post('/review/add', data), // 假设的接口
//     getReviews: () => service.get('/review/list') // 假设的接口
// };

export { service };