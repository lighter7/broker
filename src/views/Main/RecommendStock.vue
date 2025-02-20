<template>
    <MainLayout>
      <h2>推荐股票</h2>
      <StockTable :stocks="stockStore.recommendStocks" />
    </MainLayout>
  </template>
  
  <script setup>
  import { useStockStore } from '../../stores/stock';
  import StockTable from '../../components/Stock/StockTable.vue';
  import MainLayout from '../../components/Layout/MainLayout.vue';
  
  const stockStore = useStockStore();
  
  // 页面加载时获取推荐股票信息
  const fetchData = async () => {
    await stockStore.fetchRecommendStocks();
  };
  
  fetchData();
  </script>
  
  <style scoped>
  /* 可添加推荐股票页面样式 */
  </style>