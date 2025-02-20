<template>
    <el-table :data="stocks" stripe>
      <el-table-column prop="symbol" label="代码"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="price" label="最新价"></el-table-column>
      <el-table-column prop="change_rate" label="涨幅"></el-table-column>
      <el-table-column prop="bidding_volume" label="竞价额"></el-table-column>
      <el-table-column prop="bidding_volume_m5" label="竞价额5日均线"></el-table-column>
      <el-table-column prop="bidding_volume_m10" label="竞价额10日均线"></el-table-column>
      <el-table-column prop="bidding_volume_b1" label="1天前竞价额"></el-table-column>
      <el-table-column prop="bidding_volume_b2" label="2天前竞价额"></el-table-column>
      <el-table-column prop="bidding_volume_b3" label="3天前竞价额"></el-table-column>
      <el-table-column prop="bidding_volume_b4" label="4天前竞价额"></el-table-column>
      <el-table-column prop="open" label="今开"></el-table-column>
      <el-table-column prop="pre_close" label="昨收"></el-table-column>
      <el-table-column prop="turnover_rate" label="换手率"></el-table-column>
      <el-table-column prop="market_cap" label="总市值"></el-table-column>
      <el-table-column prop="circulating_cap" label="流通市值"></el-table-column>
      <el-table-column prop="change_60d" label="60日涨跌幅"></el-table-column>
      <el-table-column prop="change_year" label="年初至今涨跌幅"></el-table-column>
    </el-table>
  </template>
  
  <script setup>
  import { ref, defineProps } from 'vue';
  import { ElTable, ElTableColumn } from 'element-plus';
  
  // 接收父组件传递的股票数据
  const props = defineProps({
    stocks: {
      type: Array,
      default: () => []
    }
  });
  </script>
  
  <style scoped>
  /* 可添加表格样式 */
  </style>