<template>
  <div id="Publish-setting">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="文章标题" prop="name" class="Publish-label">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="文章封面" prop="name2" class="Publish-label">
          <el-upload
            class="avatar-uploader"
            action=""
            :http-request="toupdate"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
  </el-form-item>
  <el-form-item>
    <div id="main">
      <mavon-editor v-model="content" @change="handle"></mavon-editor>
      <article v-html="myhtml"></article>   
    </div>
  </el-form-item>
  
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
export default {
  data() {
      return {
        ruleForm: {
          name: ''
        },
        imageUrl: '',
        content:'',
        myhtml:'',
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      toupdate(res){
        this.imageUrl = URL.createObjectURL(res.file);
      },
      handle(value, render) {
        this.myhtml = render;
        console.log(value, render);
      }
    }
}
</script>

<style>
.Publish-label .el-form-item__label {
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
    border-color: #409EFF;
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