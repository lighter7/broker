<template>
    <el-container>
      <el-header>
        <img src="@/assets/images/logo.png" alt="Logo" class="logo">
        <span class="user-info">
          <el-avatar :src="userStore.userInfo?.avatar" size="small"></el-avatar>
          <span>{{ userStore.userInfo?.nickname }}</span>
          <span>{{ currentTime }}</span>
          <el-dropdown @command="handleCommand">
            <i class="el-icon-setting"></i>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">个人信息</el-dropdown-item>
                <el-dropdown-item command="update-pwd">修改密码</el-dropdown-item>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </span>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu :default-active="activeMenu" mode="vertical">
            <el-menu-item index="follow-stock">关注股票</el-menu-item>
            <el-menu-item index="recommend-stock">推荐股票</el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <slot></slot>
        </el-main>
      </el-container>
    </el-container>
  </template>
  
  <script setup>
  import { ref, onMounted, watchEffect } from 'vue';
  import { ElContainer, ElHeader, ElAside, ElMain, ElMenu, ElMenuItem, ElAvatar, ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus';
  import { useUserStore } from '../../stores/user';
  import { getCurrentTime } from '../../utils/time';
  
  const userStore = useUserStore();
  const activeMenu = ref('follow-stock');
  const currentTime = ref('');
  
  // 定时更新时间
  const updateTime = () => {
    currentTime.value = getCurrentTime();
  };
  
  onMounted(() => {
    updateTime();
    setInterval(updateTime, 1000);
  });
  
  const handleCommand = (command) => {
    if (command === 'profile') {
      // 跳转到个人信息页面
    } else if (command === 'update-pwd') {
      // 跳转到修改密码页面
    } else if (command === 'logout') {
      userStore.logout();
      // 跳转到登录页面
    }
  };
  </script>
  
  <style scoped>
  .logo {
    height: 40px;
    margin-right: 20px;
  }
  
  .user-info {
    float: right;
    display: flex;
    align-items: center;
  }
  
  .user-info span {
    margin: 0 10px;
  }
  </style>