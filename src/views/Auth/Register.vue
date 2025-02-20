<template>
    <AuthLayout>
      <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" placeholder="请再次输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleRegister">注册</el-button>
          <el-button @click="goToLogin">返回登录</el-button>
        </el-form-item>
      </el-form>
    </AuthLayout>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';
  import { register, encryptPassword } from '../../api/auth';
  import { validateUsername } from '../../utils/validate';
  import { ElMessage } from 'element-plus';
  import AuthLayout from '../../components/Layout/AuthLayout.vue';
  import { useRouter } from 'vue-router';

  const form = ref({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const formRef = ref(null);
  
  // 修改 validatePasswordMatch 函数，接收 form 对象作为参数
  const validatePasswordMatch = (form) => {
    return (rule, value, callback) => {
      if (value!== form.password) {
        callback(new Error('两次输入的密码不一致'));
      } else {
        callback();
      }
    };
  };
  
  const rules = {
    username: [
      { validator: validateUsername, trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    confirmPassword: [
      { validator: validatePasswordMatch(form.value), trigger: 'blur' }
    ]
  };
  
  const router = useRouter();
  
  // 注册处理
  // const handleRegister = async () => {
  //   await formRef.value.validate((valid) => {
  //     if (valid) { 
  //       // 确保密码和确认密码一致后再发送请求
  //       if (form.value.password !== form.value.confirmPassword) {
  //         ElMessage.error('密码和确认密码不一致');
  //         return;
  //       }
        
  //       const passwordHash = await encryptPassword(form.value.password);
  //       const confirmPassword = await encryptPassword(form.value.confirmPassword);
  //       // 发送加密后的密码到后端
  //       const requestData = {
  //         username: form.value.username,
  //         password: passwordHash, // 密码哈希
  //         confirmPassword: confirmPassword, // 确认密码哈希
  //         // nickname: form.value.nickname || null,
  //         // avatar: form.value.avatar || null
  //       };

  //       // console.log('Submitting registration data to the server:', requestData);
  //       register(requestData)
  //         .then(() => {
  //           ElMessage.success('注册成功，2秒后返回登录页面');
  //           setTimeout(() => {
  //             router.push({ name: 'Login' });
  //           }, 2000);
  //         })
  //         .catch(error => {
  //           ElMessage.error('注册失败，请稍后重试');
  //         });
  //     }
  //   });
  // }; 
  const handleRegister = async () => {
    try{
      // 使用 Promise 方式验证表单
      const isValid = await formRef.value.validate(); 
      if (isValid) {
        // 确保密码和确认密码一致后再发送请求
        if (form.value.password !== form.value.confirmPassword) {
          ElMessage.error('密码和确认密码不一致');
          return;
        }
        const passwordHash = form.value.password; //await encryptPassword(form.value.password);
        const confirmPassword = form.value.confirmPassword; //await encryptPassword(form.value.confirmPassword);
        // form.value.confirmPassword;
        // await encryptPassword(form.value.confirmPassword);
        console.log('Submitting registration data to the server:', form.value.password, form.value.confirmPassword);
        console.log('Submitting ', passwordHash, confirmPassword);
        // 发送加密后的密码到后端
        const requestData = {
          username: form.value.username,
          password: passwordHash, // 密码哈希
          confirmPassword: confirmPassword, // 确认密码哈希
          // nickname: form.value.nickname || null,
          // avatar: form.value.avatar || null
        };
        const response = await register(requestData) 
        // 处理成功响应 
        ElMessage.success('注册成功，2秒后返回登录页面');
        setTimeout(() => {
          router.push({ name: 'Login' });
        }, 2000);  
        }
      } catch (error) {
      // 验证失败或请求失败
      ElMessage.error('注册失败，请稍后重试');
    }
  };
  
  // 跳转到登录页面
  const goToLogin = () => {
    router.push({ name: 'Login' });
  };
  </script>
  
  <style scoped>
  /* 可添加注册页面样式 */
  </style>