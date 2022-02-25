<template>
  <div id="Login-all">
    <div id="Login-login">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username" class="Login-label">
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
            class="Login-username"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass" class="Login-label">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
            class="Login-password"
          ></el-input>
        </el-form-item>
        <el-form-item class="Login-submit">
          <el-button
            type="primary"
            class="Login-submit-button"
            @click="submitForm('ruleForm')"
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="Login-register">
          <el-button class="Login-register-button" type="primary"
            >去注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      callback();
    };
    return {
      ruleForm: {
        pass: "",
        username: "",
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style>
#Login-all {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url(/images/bg.jpg);
  background-size: 100% 100%;
}
#Login-login {
  width: 400px;
  height: 300px;
  margin: 100px auto;
}
.Login-label .el-form-item__label {
  color: #eee;
}
.Login-username,
.Login-password {
  background: #fff;
  opacity: 0.5;
}
.Login-submit-button,
.Login-register-button {
  width: 100%;
  font-size: 16px;
  color: #eee;
  background: rgba(255, 255, 255, 0.5);
}
.Login-register {
  margin-top: -15px;
}
</style>