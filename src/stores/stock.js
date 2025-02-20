import { defineStore } from 'pinia';
import { getAllStocks, getFollowStocks, getRecommendStocks } from '../api/stock';
// import { useUserStore } from './user';

// const userStore = useUserStore();

// 使用 Pinia 定义股票状态管理
export const useStockStore = defineStore('stock', {
  state: () => ({
    allStocks: [],
    followStocks: [],
    recommendStocks: [],
    lastUpdateTime: {
      follow: null,
      recommend: null
    }
  }),
  actions: {
    // 获取全部股票信息
    async fetchAllStocks() {
      try {
        const response = await getAllStocks();
        this.allStocks = response.data;
      } catch (error) {
        console.error('获取全部股票信息失败:', error);
      }
    },
    // 获取关注股票信息
    async fetchFollowStocks() {
      try {
        // const response = await getFollowStocks(); 
        const response = await getFollowStocks(); 
        this.followStocks = response.data;
        console.log('this.followStocks', this.followStocks)
        this.lastUpdateTime.follow = new Date();
      } catch (error) {
        console.error('获取关注股票信息失败:', error);
      }
    },
    // 获取推荐股票信息
    async fetchRecommendStocks() {
      try {
        const response = await getRecommendStocks();
        this.recommendStocks = response.data;
        this.lastUpdateTime.recommend = new Date();
      } catch (error) {
        console.error('获取推荐股票信息失败:', error);
      }
    }
  }
});