<template>
  <div id="Setting-setting">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <!-- 昵称 -->
      <el-form-item label="昵称" prop="myName" class="Setting-label">
        <el-input v-model="ruleForm.myName"></el-input>
      </el-form-item>

      <!-- 头像 -->
      <!-- :http-request="toupload"自定义上传接口的方法  -->
      <el-form-item label="头像" prop="myHead" class="Setting-label">
        <el-upload
          class="avatar-uploader"
          action=""
          :http-request="toUpload"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <!-- 电话 -->
      <el-form-item label="电话" prop="myTel" class="Setting-label">
        <el-input v-model="ruleForm.myTel"></el-input>
      </el-form-item>

      <!-- QQ -->
      <el-form-item label="QQ" prop="myQQ" class="Setting-label">
        <el-input v-model="ruleForm.myQQ"></el-input>
      </el-form-item>

      <!-- 邮箱 -->
      <el-form-item label="邮箱" prop="myMail" class="Setting-label">
        <el-input v-model="ruleForm.myMail"></el-input>
      </el-form-item>

      <!-- button -->
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >更新</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { find, update } from "@/api/setting.js";

export default {
  data() {
    return {
      ruleForm: {
        //提交的字段
        myName: "",
        myHead: "",
        myTel: "",
        myQQ: "",
        myMail: "",
      },
      imageUrl: "",
      rules: {
        myName: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          {
            min: 1,
            max: 6,
            message: "长度为 1 到 6 个字符",
            trigger: "blur",
          },
        ],
        myTel: [
          { required: true, message: "请输入电话", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "长度为11个字符",
            trigger: "blur",
          },
        ],
        myQQ: [{ required: true, message: "请输入QQ", trigger: "blur" }],
        myMail: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
      },
    };
  },
  mounted() {
    //在mounted时进行个人信息检索
    find()
      .then((res) => {
        if (res.data.errcode === 0) {
          this.ruleForm.myName = res.data.list[0].myName;
          this.imageUrl = res.data.list[0].myHead;
          this.ruleForm.myHead = res.data.list[0].myHead;
          this.ruleForm.myTel = res.data.list[0].myTel;
          this.ruleForm.myQQ = res.data.list[0].myQQ;
          this.ruleForm.myMail = res.data.list[0].myMail;
        } else {
          this.$message({
            message: "文章列表加载失败",
            type: "error",
          });
        }
      })
      .catch(() => {
        this.$message({
          message: "文章列表加载失败",
          type: "error",
        });
      });
  },
  methods: {
    submitForm(formName) {
      //更新触发事件
      this.$refs[formName].validate((valid) => {
        if (valid) {
          update(this.ruleForm)
            .then((res) => {
              //发起更新ajax
              if (res.data.errcode === 0) {
                this.$message({
                  message: "更新完成!",
                  type: "success",
                });
              } else {
                this.$message({
                  message: "更新失败",
                  type: "error",
                });
              }
            })
            .catch(() => {
              this.$message({
                message: "提交失败",
                type: "error",
              });
            });
        } else {
          return false;
        }
      });
    },
    beforeAvatarUpload(file) {
      //图片格式与大小验证
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    toUpload(res) {
      this.imageUrl = URL.createObjectURL(res.file); //图片预览
      this.ruleForm.myHead = res.file; //拿到图片地址给articleImage
      //后端是通过 file来拿的
    },
  },
};
</script>

<style>
.Setting-label .el-form-item__label {
  /* 改变label前面文字的样式(style不能加scoped) */
  color: #eee;
}
.Setting-label {
  width: 400px;
}
#Setting-setting .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
#Setting-setting .avatar-uploader .el-upload:hover {
  border-color: #ec8bb8;
}
#Setting-setting .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
#Setting-setting .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>