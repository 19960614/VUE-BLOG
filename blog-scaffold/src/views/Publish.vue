<template>
  <div id="Publish-setting">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <!-- 标题 -->
      <el-form-item label="文章标题" prop="articleTitle" class="Publish-label">
        <el-input v-model="ruleForm.articleTitle"></el-input>
      </el-form-item>

      <!-- 封面 -->
      <!-- :http-request="toupload"自定义上传接口的方法  -->
      <el-form-item label="文章封面" prop="articleImage" class="Publish-label">
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

      <!-- markdown编辑器 -->
      <el-form-item label="文章内容" class="Publish-label">
        <div id="main">
          <mavon-editor v-model="content" @change="handle"></mavon-editor>
        </div>
      </el-form-item>

      <!-- button -->
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >创建</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { add } from "@/api/article.js";

export default {
  data() {
    return {
      ruleForm: {
        //提交的字段
        articleTitle: "",
        articleImage: "",
        articleContent: "",
        articleYear: "",
        articleMonth: "",
        articleDay: "",
        articleHour: "",
        articleMinute: "",
        articleComment: [],
      },
      imageUrl: "",
      content: "",
      rules: {
        //标题验证
        articleTitle: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          {
            min: 1,
            max: 16,
            message: "长度为 1 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      //提交触发事件
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let date = new Date();
          this.ruleForm.articleYear = date.getFullYear();
          this.ruleForm.articleMonth = date.getMonth() + 1;
          this.ruleForm.articleDay = date.getDate();
          this.ruleForm.articleHour = date.getHours();
          this.ruleForm.articleMinute = date.getMinutes();
          add(this.ruleForm)
            .then((res) => {
              //发起ajax
              if (res.data.errcode === 0) {
                //返回0，提交成功
                this.$message({
                  message: "提交完成!",
                  type: "success",
                });
              } else {
                //提交失败
                this.$message({
                  message: "提交失败",
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    beforeAvatarUpload(file) {
      //图片格式与大小验证
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      return isJPG;
    },
    toUpload(res) {
      this.imageUrl = URL.createObjectURL(res.file); //图片预览
      this.ruleForm.articleImage = res.file; //拿到图片地址给articleImage
      //后端是通过 file来拿的
    },
    handle(value, render) {
      console.log(value, render);
      this.ruleForm.articleContent = render;
    },
  },
};
</script>

<style>
.Publish-label .el-form-item__label {
  /* 改变label前面文字的样式(style不能加scoped) */
  color: #eee;
}
#Publish-setting .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
#Publish-setting .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
#Publish-setting .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
#Publish-setting .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>