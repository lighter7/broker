<template>
    <div class="login-container">
      <el-card>
        <template #header>
          <h3>股票信息管理系统</h3>
        </template>
        <slot></slot>
      </el-card>
    </div>
  </template>
  
  <script setup>
  // 引入 Element Plus 组件
  import { ElCard } from 'element-plus';
  </script>
  
  <style scoped>
  /* 引入全局样式 */
  @import '../../assets/styles/common.scss';
  </style>