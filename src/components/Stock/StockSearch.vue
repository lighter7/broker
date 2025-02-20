<template>
    <el-autocomplete
      v-model="inputValue"
      :fetch-suggestions="querySearch"
      placeholder="请输入股票名称或代码"
      @select="handleSelect"
      :style="{ width: '300px' }"
    >
      <template #prefix>
        <el-icon><Search /></el-icon>
      </template>
    </el-autocomplete>
    <el-button @click="addStock" :loading="loading">添加关注</el-button>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { ElAutocomplete, ElButton, ElIcon } from 'element-plus';
  import { Search } from '@element-plus/icons-vue';
  import { useStockStore } from '../../stores/stock';
  import { addFollowStock } from '../../api/stock';
  import { ElMessage } from 'element-plus';
  
  const stockStore = useStockStore();
  const inputValue = ref('');
  const loading = ref(false);
  const allStocks = ref(stockStore.allStocks);
  
  // 监听全部股票数据变化
  watch(() => stockStore.allStocks, (newStocks) => {
    allStocks.value = newStocks;
  });
  
  // 查询建议
  const querySearch = (queryString, cb) => {
    const results = allStocks.value.filter(stock => {
      return stock['name'].includes(queryString) || stock['symbol'].includes(queryString);
    });
    cb(results);
  };
  
  // 选择股票
  const handleSelect = (item) => {
    inputValue.value = item['name'];
  };
  
  // 添加关注股票
  const addStock = async () => {
    if (!inputValue.value) {
      ElMessage.error('请输入股票名称或代码');
      return;
    }
    const selectedStock = allStocks.value.find(stock => {
      return stock['name'] === inputValue.value || stock['symbol'] === inputValue.value;
    });
    if (!selectedStock) {
      ElMessage.error('输入的股票名称或代码不存在');
      return;
    }
    loading.value = true;
    try {
      await addFollowStock({ symbol: selectedStock['symbol'] });
      ElMessage.success('添加关注成功');
      await stockStore.fetchFollowStocks();
    } catch (error) {
      ElMessage.error('添加关注失败');
    } finally {
      loading.value = false;
      inputValue.value = '';
    }
  };
  </script>
  
  <style scoped>
  /* 可添加搜索框样式 */
  </style>