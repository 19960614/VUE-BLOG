<template>
  <div id="Edit-all">
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="标题"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="
              handleEdit(scope.$index, scope.row, (centerDialogVisible = true))
            "
            >编辑</el-button
          >

          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="60%"
      top="10px"
      :before-close="handleClose"
      center
    >
      <div id="Publish-setting">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <!-- 标题 -->
          <el-form-item label="文章标题" prop="articleTitle">
            <el-input v-model="ruleForm.articleTitle"></el-input>
          </el-form-item>
          <!-- 封面 -->
          <!-- :http-request="toupload"自定义上传接口的方法  -->
          <el-form-item label="文章封面" prop="articleImage">
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
          <el-form-item label="文章内容">
            <div id="main">
              <mavon-editor v-model="content" @change="handle"></mavon-editor>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="toEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { find, update, remove } from "@/api/article.js";

export default {
  data() {
    return {
      centerDialogVisible: false,
      list: "", //ajax传回来的数据
      tableData: [], //表格要渲染的数据
      ruleForm: {
        //提交的字段
        articleTitle: "",
        articleImage: "",
        articleContent: "",
        _id: "",
      },
      imageUrl: "", //图片url
      content: "", //内容
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
  mounted() {
    //在mounted时进行全部文章检索
    find()
      .then((res) => {
        if (res.data.errcode === 0) {
          this.list = res.data.list;
          for (let i = 0; i < this.list.length; i++) {
            this.tableData.push({
              //把数据放到tableData中渲染
              date: `${this.list[i].articleYear}-${this.list[i].articleMonth}-${this.list[i].articleDay}`,
              content: this.list[i].articleTitle,
            });
          }
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
    handleClose(done) {
      //关闭弹层
      this.$confirm("确认关闭?")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handleEdit(index, row, done) {
      //点击编辑按钮时触发，做回显
      this.ruleForm.articleTitle = this.list[index].articleTitle;
      this.ruleForm._id = this.list[index]._id;
      this.imageUrl = this.list[index].articleImage;
      this.content = this.list[index].articleContent;
    },
    handleDelete(index, row) {
      //删除按钮点击弹窗的按钮触发的事件
      this.$confirm("此操作将删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          //点击确认触发删除的ajax
          remove({ _id: this.list[index]._id }) //根据id删除
            .then((res) => {
              if (res.data.errcode === 0) {
                find() //删除完毕进行全部文章检索
                  .then((res) => {
                    if (res.data.errcode === 0) {
                      this.list = res.data.list;
                      this.tableData.length = 0;
                      for (let i = 0; i < this.list.length; i++) {
                        this.tableData.push({
                          date: `${this.list[i].articleYear}-${this.list[i].articleMonth}-${this.list[i].articleDay}`,
                          content: this.list[i].articleTitle,
                        });
                      }
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
        })
        .catch(() => {
          //点击取消删除触发
          this.$message({
            type: "info",
            message: "已取消删除",
          });
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
      this.ruleForm.articleImage = res.file; //拿到图片地址给articleImage
      //后端是通过 file来拿的
    },
    handle(value, render) {
      console.log(value, render); //markdown的内容
      this.ruleForm.articleContent = render;
    },
    toEdit() {
      //点击编辑触发
      if (this.ruleForm.articleTitle === "") {
        //标题不能为空
        this.$message({
          message: "请输入文章标题!",
          type: "warning",
        });
      } else {
        update(this.ruleForm)
          .then((res) => {
            //发起更新ajax
            if (res.data.errcode === 0) {
              this.$message({
                message: "提交完成!",
                type: "success",
              });
              find() //更新完毕进行全部文章检索
                .then((res) => {
                  if (res.data.errcode === 0) {
                    this.list = res.data.list;
                    this.tableData.length = 0;
                    for (let i = 0; i < this.list.length; i++) {
                      this.tableData.push({
                        date: `${this.list[i].articleYear}-${this.list[i].articleMonth}-${this.list[i].articleDay}`,
                        content: this.list[i].articleTitle,
                      });
                    }
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
              this.centerDialogVisible = false;
            } else {
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
      }
    },
  },
};
</script>

<style>
#Edit-all .el-dialog {
  margin: 0 auto 10px;
}
#Edit-all .el-dialog--center .el-dialog__body {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
}
#Edit-all .el-form-item {
  margin-bottom: 10px;
}
#Edit-all .el-dialog__footer {
  padding-bottom: 10px;
}
</style>