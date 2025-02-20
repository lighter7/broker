// 用户名格式验证规则
export const validateUsername = (rule, value, callback) => {
    if (!value) {
      callback(new Error('用户名不能为空'));
    } else if (!/^[a-zA-Z0-9]{3,20}$/.test(value)) {
      callback(new Error('用户名必须由 3 到 20 位字母或数字组成'));
    } else {
      callback();
    }
  };
  
  // 密码一致性验证规则
  export const validatePasswordMatch = (rule, value, callback) => {
    if (value!== this.form.password) {
      callback(new Error('两次输入的密码不一致'));
    } else {
      callback();
    }
  };
  
  // 新旧密码不能相同验证规则
  export const validateNewPassword = (rule, value, callback) => {
    if (value === this.form.oldPassword) {
      callback(new Error('新密码不能与旧密码相同'));
    } else {
      callback();
    }
  };