<template>
    <MainLayout>
      <h2>个人信息</h2>
      <el-form :model="userInfo" label-width="100px">
        <el-form-item label="昵称">
          <el-input v-model="userInfo.nickname"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            action="#"
            :show-file-list="false"
            :before-upload="beforeUpload"
          >
            <el-button size="small" type="primary">上传头像</el-button>
          </el-upload>
          <el-avatar :src="userInfo.avatar" size="large"></el-avatar>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleUpdateInfo">保存信息</el-button>
        </el-form-item>
      </el-form>
    </MainLayout>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { ElForm, ElFormItem, ElInput, ElButton, ElUpload, ElAvatar } from 'element-plus';
  import { useUserStore } from '../../stores/user';
  import { updateUserInfo } from '../../api/auth';
  import { ElMessage } from 'element-plus';
  import MainLayout from '../../components/Layout/MainLayout.vue';
  
  const userStore = useUserStore();
  const userInfo = ref(userStore.userInfo || {});
  
  // 上传头像前的处理
  const beforeUpload = (file) => {
    // 可添加文件类型、大小等验证
    return true;
  };
  
  // 保存用户信息
  const handleUpdateInfo = async () => {
    try {
      await updateUserInfo(userInfo.value);
      userStore.userInfo = userInfo.value;
      ElMessage.success('信息更新成功');
    } catch (error) {
      ElMessage.error('信息更新失败，请稍后重试');
    }
  };
  </script>
  
  <style scoped>
  /* 可添加个人信息页面样式 */
  </style>