import axios from 'axios';
import { ElMessage } from 'element-plus'; // 引入 ElMessage 用于错误提示
import { service } from '../utils/auth.js';


// import { store } from '@/store'; // 确保从 Vuex store 正确导入
// import { decryptAlgorithm } from '@/utils/encrypt'; // 假设这是您的解密方法

// // 分析 Excel 文件
// const analysis = async (filepath, sheetId) => {
//   const filename = genAutofillFilename(filepath);
//   const stockAnalysis = await Stock().analysis({
//     file: filename,
//     sheet: sheetId,
//     email: store.state.user.email, // 从 Vuex store 中获取用户邮件
//     vid: store.state.user.vid,     // 从 Vuex store 中获取用户 vid
//   });
  
//   // 调用 Vuex 异步方法 authCheck
//   await store.dispatch('authCheck', stockAnalysis);
  
//   // 对返回值进行解密
//   return decryptAlgorithm(
//     stockAnalysis[Math.max(...Object.keys(stockAnalysis))],
//     store.state.user.vid
//   );
// };


// 获取服务器基础 URL
const baseURL = import.meta.env.VITE_SERVER_BASE_URL;

// 查询全部股票信息接口
export const getAllStocks = () => {
  return service.get(`/stock/stock-all`,{
    params: {
      token: `${localStorage.getItem('token')}`
    } }) 
   .catch(error => {
      handleNetworkError(error);
      throw error;
    });
};

// 添加关注股票接口axios.post
export const addFollowStock = (data) => {
  return service.post(`/stock/add-stock-follow`, data)
  //   , {
  //   // headers: {
  //   //   Authorization: `Bearer ${localStorage.getItem('token')}`
  //   // }
  // })
   .catch(error => {
      handleNetworkError(error);
      throw error;
    });
};

// 删除关注股票接口
export const delFollowStock = (data) => {
  return service.post(`/stock/del-stock-follow`, data)
  // , {
  //   headers: {
  //     Authorization: `Bearer ${localStorage.getItem('token')}`
  //   }
  // })
   .catch(error => {
      handleNetworkError(error);
      throw error;
    });
};


// export const getUserInfo = () => { 
//   return service.get(`/user/user_info`,{
//     params: {
//       token: `${localStorage.getItem('token')}`
//     } }) 
//    .catch(error => {
//       handleNetworkError(error);
//       throw error;
//     });
// };

// 查询关注股票信息接口
export const getFollowStocks = () => {
  return service.get(`/stock/stock-follow`,{
    params: {
      token: `${localStorage.getItem('token')}`
    } }) 
   .catch(error => {
      handleNetworkError(error);
      throw error;
    });
};

// 获取推荐股票信息接口
export const getRecommendStocks = () => {
  return service.get(`/stock/stock-recommend`,{
    params: {
      token: `${localStorage.getItem('token')}`
    } }) 
   .catch(error => {
      handleNetworkError(error);
      throw error;
    });
};

// 添加复盘信息接口
export const addReviewMessage = (data) => {
  return service.post(`/stock/add-Review-Mess`, data)
  //   , {
  //   // headers: {
  //   //   Authorization: `Bearer ${localStorage.getItem('token')}`
  //   // }
  // })
   .catch(error => {
      handleNetworkError(error);
      throw error;
    });
};

// 查询某日复盘信息接口
export const getReviewMessage = (date) => {
  return service.get(`/stock/Review-Mess?date=${date}`,{
    params: {
      token: `${localStorage.getItem('token')}`
    } }) 
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


// ${baseURL}