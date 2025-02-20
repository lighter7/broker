<template>
    <MainLayout>
      <h2>关注股票</h2>
      <StockSearch />
      <StockTable :stocks="stockStore.followStocks" />
    </MainLayout>
  </template>
  
  <script setup>
  import { useStockStore } from '../../stores/stock';
  import StockSearch from '../../components/Stock/StockSearch.vue';
  import StockTable from '../../components/Stock/StockTable.vue';
  import MainLayout from '../../components/Layout/MainLayout.vue';
  
  const stockStore = useStockStore();
  
  // 页面加载时获取关注股票信息
  const fetchData = async () => {
    await stockStore.fetchFollowStocks();
  };
  
  fetchData();
  </script>
  
  <style scoped>
  /* 可添加关注股票页面样式 */
  </style>