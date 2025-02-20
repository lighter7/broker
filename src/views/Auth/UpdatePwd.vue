<template>
    <MainLayout>
      <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="form.oldPassword" placeholder="请输入旧密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="form.newPassword" placeholder="请输入新密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" placeholder="请再次输入新密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleUpdatePwd">修改密码</el-button>
        </el-form-item>
      </el-form>
    </MainLayout>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';
  import { updatePassword, encryptPassword } from '../../api/auth';
  import { validateNewPassword, validatePasswordMatch } from '../../utils/validate';
  import { ElMessage } from 'element-plus';
  import MainLayout from '../../components/Layout/MainLayout.vue';
  import { useStore } from 'vuex';
  
  const form = ref({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const formRef = ref(null);
  const rules = {
    oldPassword: [
      { required: true, message: '请输入旧密码', trigger: 'blur' }
    ],
    newPassword: [
      { validator: validateNewPassword, trigger: 'blur' },
      { required: true, message: '请输入新密码', trigger: 'blur' }
    ],
    confirmPassword: [
      { validator: validatePasswordMatch, trigger: 'blur' }
    ]
  };
  
  // // 修改密码处理
  // const handleUpdatePwd = async () => {
  //   await formRef.value.validate((valid) => {
  //       const oldPasswordHash = await encryptPassword(form.value.oldPassword); 
  //       const newPasswordHash = await encryptPassword(form.value.newPassword); 
  //       const confirmPasswordHash = await encryptPassword(form.value.confirmPassword); 
  //       // const store = useStore();
  //       // const username = store.getters.getUsername;
  //       // 发送加密后的密码到后端
  //       const requestData = {
  //         password: oldPasswordHash, // 密码哈希
  //         newPassword: newPasswordHash, // 密码哈希
  //         confirmPassword: confirmPasswordHash, // 密码哈希
  //         // confirmPassword: confirmPassword, // 确认密码哈希
  //         // nickname: form.value.nickname || null,
  //         // avatar: form.value.avatar || null
  //       };
  //     if (valid) {
  //       updatePassword(requestData)
  //         .then(() => {
  //           ElMessage.success('密码修改成功');
  //           // 可添加跳转到登录页面或其他操作
  //         })
  //         .catch(error => {
  //           ElMessage.error('密码修改失败，请稍后重试');
  //         });
  //     }
  //   });
  // };

  
  const handleUpdatePwd = async () => {
    try{
      // 使用 Promise 方式验证表单
      const isValid = await formRef.value.validate(); 
      if (isValid) {
        const oldPasswordHash = form.value.oldPassword;//await encryptPassword(form.value.oldPassword); 
        const newPasswordHash = form.value.newPassword;//await encryptPassword(form.value.newPassword); 
        const confirmPasswordHash = form.value.confirmPassword;//await encryptPassword(form.value.confirmPassword); 
        // const store = useStore();
        // const username = store.getters.getUsername;
        // 发送加密后的密码到后端
        const requestData = {
          // token: localStorage.getItem('token'), 
          password: oldPasswordHash, // 密码哈希
          newPassword: newPasswordHash, // 密码哈希
          confirmPassword: confirmPasswordHash, // 密码哈希
          // confirmPassword: confirmPassword, // 确认密码哈希
          // nickname: form.value.nickname || null,
          // avatar: form.value.avatar || null
        };
        // 发送登录请求
        const response = await updatePassword(requestData);
        // 处理成功响应 
        ElMessage.success('密码修改成功');
        // 跳转到主页
        // router.push({ name: 'FollowStock' });
        } 
      } catch (error) {
      // 验证失败或请求失败
      ElMessage.error('密码修改失败，请稍后重试');
    }
  };
  


  </script>
  
  <style scoped>
  /* 可添加修改密码页面样式 */
  </style>