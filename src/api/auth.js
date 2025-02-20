import axios from 'axios';
import { ElMessage } from 'element-plus'; // 引入 ElMessage 用于错误提示
// import * as bcrypt from 'bcryptjs'; // 使用 bcrypt.js 进行密码加密
// import { useStore } from 'vuex';
import * as bcrypt from 'bcryptjs';
import { service } from '../utils/auth.js';

// 定义盐值复杂度（必须与服务端一致）
const saltRounds = 10; 

// 密码加密函数
export async function encryptPassword(password) {
  try {
    // 去除密码前后的空格
    const trimmedPassword = password.trim();
    
    // 生成盐值
    const salt = await bcrypt.genSalt(saltRounds);
    
    // 生成密码哈希
    const hashedPassword = await bcrypt.hash(trimmedPassword, salt);
    
    return hashedPassword;
  } catch (error) {
    console.error('密码加密失败:', error);
    throw error;
  }
}

// // 使用 bcrypt 加密密码
// const saltRounds = 10; // 密钥复杂度
// // 密码加密示例
// export async function encryptPassword(password) {
//   try {
//     // 生成盐值（salt），建议盐值复杂度为 10-12 轮 
//     const salt = await bcrypt.genSalt(saltRounds); // 生成盐值
//     const hashedPassword = await bcrypt.hash(password, salt); // 生成密码哈希

//     // console.log('密码哈希:', hashedPassword);
//     return hashedPassword;
//   } catch (error) {
//     console.error('密码加密失败:', error);
//     throw error;
//   }
// }

// 获取服务器基础 URL
const baseURL = import.meta.env.VITE_SERVER_BASE_URL;

// // 登录接口
// export const login = async () => {
//   try {
//       const response = await userApi.login(); 
//   } catch (error) {
//       handleNetworkError(error); 
//       throw error; // 继续抛出错误，以便调用处可以进一步处理
//   }
// };

// 登录接口
export const login = (data) => {
  return service.post(`/user/login`, data)
  // .then(() => { 
  //       store.dispatch('updateUsername', data.username); 
  //       // 其他逻辑
  //   })
   .catch(error => {
      handleNetworkError(error); 
      throw error; // 继续抛出错误，以便调用处可以进一步处理
    });
};

// 注册接口
export const register = (data) => {
  return service.post(`/user/register`, data)
   .catch(error => {
      handleNetworkError(error);
      throw error;
    });
};

// 修改密码接口
// export const updatePassword = async (data) => {
export const updatePassword = (data) => {
  return service.post(`/user/update_password`, data)
  // return service.post(`/user/update_password`, data, {
  //   // headers: {
  //   //   Authorization: `Bearer ${localStorage.getItem('token')}`
  //   // }
  // })
   .catch(error => {
      handleNetworkError(error);
      throw error;
    });
};

// 获取用户信息接口
export const getUserInfo = () => { 
  return service.get(`/user/user_info`,{
    params: {
      token: `${localStorage.getItem('token')}`
    } }) 
   .catch(error => {
      handleNetworkError(error);
      throw error;
    });
};

// 更新用户信息接口
export const updateUserInfo = (data) => {
  return service.post(`/user/update_user_info`, data)
  // , {
  //   // headers: {
  //   //   Authorization: `Bearer ${localStorage.getItem('token')}`
  //   // }
  // })
   .catch(error => {
      handleNetworkError(error);
      throw error;
    });
};

// 统一处理网络错误的函数
const handleNetworkError = (error) => {
  if (error.response) {
    // 请求已发送，服务器返回了非 2xx 的状态码
    ElMessage.error(`请求失败，状态码: ${error.response.status}`);
  } else if (error.request) {
    // 请求已发送，但没有收到响应
    ElMessage.error('无法连接到服务器，请检查网络设置');
  } else {
    // 在设置请求时发生了错误
    ElMessage.error(`发生错误: ${error.message}`);
  }
};