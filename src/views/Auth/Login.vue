<template>
    <AuthLayout>
      <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin">登录</el-button>
          <el-button @click="goToRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </AuthLayout>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';
  import { login, encryptPassword } from '../../api/auth'; 
  import { useUserStore } from '../../stores/user';
  import { ElMessage } from 'element-plus';
  import AuthLayout from '../../components/Layout/AuthLayout.vue';
  import { useRouter } from 'vue-router'; // 引入 useRouter 函数
  
  const userStore = useUserStore();
  const form = ref({
    username: '',
    password: ''
  });
  const formRef = ref(null);
  const rules = {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' }
    ]
  };
  
  const router = useRouter(); // 获取路由实例
  
  // 登录处理
  const handleLogin = async () => {
    try{
      // 使用 Promise 方式验证表单
      const isValid = await formRef.value.validate(); 
      if (isValid) {
        const passwordHash = form.value.password; //await encryptPassword(form.value.password); 
        // 发送加密后的密码到后端
        const requestData = {
          username: form.value.username,
          password: passwordHash 
          // 密码哈希
          // confirmPassword: confirmPassword, // 确认密码哈希
          // nickname: form.value.nickname || null,
          // avatar: form.value.avatar || null
        };
        // 发送登录请求
        const response = await login(requestData);
        // 处理成功响应
        console.log(response.data)
        const token = response.data.token;
        userStore.login(token);
        ElMessage.success('登录成功');
        // 跳转到主页
        router.push({ name: 'FollowStock' });
        }
      } catch (error) {
      // 验证失败或请求失败
      ElMessage.error('登录失败，请检查用户名和密码');
    }
  };
  
  // 跳转到注册页面
  const goToRegister = () => {
    router.push({ name: 'Register' }); // 使用路由实例进行跳转
  };

  // const handleLogout = () => {
  //   userStore.logout();
  //   ElMessage.success('已成功登出');
  //   router.push({ name: 'Login' });
  // };

  </script>
  
  <style scoped>
  /* 可添加登录页面样式 */
  </style>