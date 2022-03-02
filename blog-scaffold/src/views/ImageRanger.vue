<template>
  <div id="ImageRanger-all">
    <el-row>
      <el-col
        :span="4"
        v-for="(item, index) in list"
        :key="index"
        :offset="1"
        class="ImageRanger-card"
      >
        <el-card :body-style="{ padding: '0px' }" class="el-card">
          <img :src="item.photosUrl" class="image" />
          <el-button
            class="button el-icon-delete button"
            circle
            @click="toDelete(index)"
          ></el-button>
        </el-card>
      </el-col>

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
    </el-row>
  </div>
</template>

<script>
import { add, find, remove } from "@/api/photos.js";

export default {
  data() {
    return {
      list: "",
      ruleForm: {
        //提交的字段
        photosUrl: "",
      },
      imageUrl: "",
    };
  },
  mounted() {
    //在mounted时进行全部图片检索
    find()
      .then((res) => {
        if (res.data.errcode === 0) {
          this.list = res.data.list;
        } else {
          this.$message({
            message: "图片加载失败",
            type: "error",
          });
        }
      })
      .catch(() => {
        this.$message({
          message: "图片加载失败",
          type: "error",
        });
      });
  },
  methods: {
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 格式!");
      }
      return isJPG;
    },
    toUpload(res) {
      this.ruleForm.photosUrl = res.file; //拿到图片地址给photosUrl
      //后端是通过 file来拿的
      add(this.ruleForm)
        .then((res) => {
          //发起ajax
          if (res.data.errcode === 0) {
            //返回0，提交成功
            this.$message({
              message: "上传完成!",
              type: "success",
            });
            find()
              .then((res) => {
                if (res.data.errcode === 0) {
                  this.list = res.data.list;
                } else {
                  this.$message({
                    message: "图片加载失败",
                    type: "error",
                  });
                }
              })
              .catch(() => {
                this.$message({
                  message: "图片加载失败",
                  type: "error",
                });
              });
          } else {
            //提交失败
            this.$message({
              message: "上传失败",
              type: "error",
            });
          }
        })
        .catch(() => {
          this.$message({
            message: "上传失败",
            type: "error",
          });
        });
    },
    toDelete(index) {
      remove({ _id: this.list[index]._id }) //根据id删除
        .then((res) => {
          if (res.data.errcode === 0) {
            find()
              .then((res) => {
                if (res.data.errcode === 0) {
                  this.list = res.data.list;
                } else {
                  this.$message({
                    message: "图片加载失败",
                    type: "error",
                  });
                }
              })
              .catch(() => {
                this.$message({
                  message: "图片加载失败",
                  type: "error",
                });
              });
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          } else {
            this.$message({
              message: "删除失败",
              type: "error",
            });
          }
        })
        .catch(() => {
          this.$message({
            message: "删除失败",
            type: "error",
          });
        });
    },
  },
};
</script>

<style>
#ImageRanger-all .ImageRanger-card {
  margin-top: 12px;
}
#ImageRanger-all .el-card {
  width: 178px;
  height: 178px;
}
#ImageRanger-all .image {
  width: 178px;
  height: 178px;
  object-fit: contain;
  display: block;
}
#ImageRanger-all .button {
  width: 40px;
  height: 40px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border: 0;
  background: #eee;
  opacity: 0;
}
#ImageRanger-all .el-card:hover .button {
  opacity: 1;
  transition: 0.5s;
}
#ImageRanger-all .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-top: 12px;
  margin-left: 4%;
}
#ImageRanger-all .avatar-uploader .el-upload:hover {
  border-color: #40ffdf;
}
#ImageRanger-all .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
#ImageRanger-all .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>