<template>
  <div id="Register-all">
    <div id="Register-register">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username" class="Register-label">
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
            class="Register-username"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass" class="Register-label">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
            class="Register-password"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" class="Register-label">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
            class="Register-checkPassword"
          ></el-input>
        </el-form-item>
        <el-form-item class="Register-register">
          <el-button
            class="Register-register-button"
            @click="submitForm('ruleForm')"
            type="primary"
            >注册</el-button
          >
        </el-form-item>
        <el-form-item class="Register-submit">
          <el-button
            type="primary"
            @click="toLogin"
            class="Register-submit-button"
            >去登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { register } from "@/api/user.js";

export default {
  name: "Register",
  data() {
    var validateUsername = (rule, value, callback) => {
      //验证是否输入用户名
      if (value === "") {
        callback(new Error("请输入用户名"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      //验证是否输入密码
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      callback();
    };
    var validatePass2 = (rule, value, callback) => {
      //确认密码
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      }
      callback();
    };
    return {
      ruleForm: {
        //提交字段
        username: "",
        pass: "",
        checkPass: "",
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
      title: "",
      type: "",
    };
  },
  methods: {
    submitForm(formName) {
      //点击注册触发事件
      this.$refs[formName].validate((valid) => {
        if (valid) {
          register({
            //发起ajax
            username: this.ruleForm.username,
            password: this.ruleForm.pass,
          }).then((res) => {
            if (res.data.errcode === 0) {
              this.$message({
                message: "恭喜您注册成功!",
                type: "success",
              });
            } else {
              this.$message({
                message: "注册失败,请重新注册!",
                type: "error",
              });
            }
          });
        } else {
          return false;
        }
        //清空输入框
        this.ruleForm.username = "";
        this.ruleForm.pass = "";
        this.ruleForm.checkPass = "";
      });
    },
    toLogin() {
      this.$router.push("/login/"); //点击去往登录页面
    },
  },
};
</script>

<style>
#Register-all {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url(/images/bg.jpg);
  background-size: 100% 100%;
}
#Register-register {
  width: 400px;
  height: 300px;
  margin: 100px auto;
}
.Register-label .el-form-item__label {
  /* 改变label前面文字的样式(style不能加scoped) */
  color: #eee;
}
.Register-username,
.Register-password,
.Register-checkPassword {
  background: #fff;
  opacity: 0.5;
}
.Register-submit-button,
.Register-register-button {
  width: 100%;
  font-size: 16px;
  color: #eee;
  background: rgba(255, 255, 255, 0.5);
}
.Register-submit {
  margin-top: -15px;
}
</style>
