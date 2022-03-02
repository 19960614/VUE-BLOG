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
          <el-button
            class="Login-register-button"
            @click="toRegister"
            type="primary"
            >去注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/user.js";

export default {
  name: "Login",
  data() {
    var validateUsername = (rule, value, callback) => {
      //验证用户名是否为空
      if (value === "") {
        callback(new Error("请输入用户名"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      //验证密码是否为空
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      callback();
    };
    return {
      ruleForm: {
        //提交的字段
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
      //点击登录触发事件
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login({
            //发起ajax
            username: this.ruleForm.username,
            password: this.ruleForm.pass,
          }).then((res) => {
            if (res.data.errcode === 0) {
              localStorage.setItem("token", res.data.token); //将token存入本地存储
              this.$message({
                message: "登录成功!",
                type: "success",
              });
              if (this.ruleForm.username === "admin123") {
                //只有admin123账户可以进入管理系统
                this.$router.push("/Managerial/");
              } else {
                this.$router.push("/Customer/");
              }
            } else {
              this.$message({
                message: "登录失败,请重新登录!",
                type: "error",
              });
            }
            //清空输入框
            this.ruleForm.username = "";
            this.ruleForm.pass = "";
          });
        } else {
          return false;
        }
      });
    },
    toRegister() {
      this.$router.push("/register/"); //点击去往注册页面
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
  /* 改变label前面文字的样式(style不能加scoped) */
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