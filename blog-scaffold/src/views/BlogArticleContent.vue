<template>
  <div id="Article">
    <div id="Artivle-content">
      <!-- 标题 -->
      <h2>{{ articleTitle }}</h2>
      <!-- 发布时间 -->
      <h3>
        {{ "发布于:" + articleYear + "/" }}{{ articleMonth + "/"
        }}{{ articleDay + "/" }}{{ articleHour + ":" }}{{ articleMinute }}
      </h3>
      <div class="Artivle-content-words" v-html="articleContent"></div>
    </div>

    <el-divider></el-divider>
    <!-- 分割线 -->

    <!-- 评论框 -->
    <div class="Artivle-comment">
      <el-input
        type="textarea"
        :autosize="{ minRows: 6 }"
        placeholder="快来评论吧"
        v-model="textarea"
      >
      </el-input>
      <el-button plain class="Artivle-comment-submit" @click="toComment"
        >发送</el-button
      >

      <div style="clear: both"></div>
      <!-- 清除浮动 -->

      <ul class="Artivle-comment-content">
        <!-- 评论渲染 -->
        <li v-for="(item, index) in comment" :key="index">
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            class="Artivle-comment-content-delete"
            v-show="$store.state.username === item.commentUser ? true : false"
            @click="toDelete(index)"
          ></el-button>
          <div>
            <h4
              class="Artivle-comment-content-username"
              :style="{
                color: item.commentUser === 'admin123' && '#ffd04b',
              }"
            >
              {{
                item.commentUser === "admin123"
                  ? "博主:"
                  : item.commentUser + ":"
              }}
            </h4>
            <p class="Artivle-comment-content-words">
              {{ item.commentContent }}
            </p>
          </div>
          <p class="Artivle-comment-content-time">
            {{ item.commentYear + "/" }}{{ item.commentMonth + "/"
            }}{{ item.commentDay + "/" }}{{ item.commentHour + ":"
            }}{{ item.commentMinute }}
          </p>
          <el-divider></el-divider>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { find } from "@/api/article.js";
import { addComment, findComment, removeComment } from "@/api/comment.js";

export default {
  data() {
    return {
      textarea: "", //输入框
      list: "", //渲染文章的数组
      comment: "", //渲染评论的数组
      ruleForm: {
        //提交的字段
        commentId: this.$route.params.id,
        commentUser: this.$store.state.username,
        commentContent: "",
        commentYear: "",
        commentMonth: "",
        commentDay: "",
        commentHour: "",
        commentMinute: "",
      },
    };
  },
  created() {
    find({ _id: this.$route.params.id }) //根据动态路由带过来的信息查询文章信息
      .then((res) => {
        if (res.data.errcode === 0) {
          this.list = res.data.list[0]; //找到对应的文章
        } else {
          this.$message({
            message: "文章加载失败",
            type: "error",
          });
        }
      })
      .catch(() => {
        this.$message({
          message: "文章加载失败",
          type: "error",
        });
      });
    findComment({ commentId: this.$route.params.id }) //根据动态路由带过来的信息查询评论信息
      .then((res) => {
        if (res.data.errcode === 0) {
          this.comment = res.data.list; //找到对应的评论
        } else {
          this.$message({
            message: "评论加载失败",
            type: "error",
          });
        }
      })
      .catch(() => {
        this.$message({
          message: "评论加载失败",
          type: "error",
        });
      });
  },
  computed: {
    articleTitle() {
      return this.list.articleTitle;
    },
    articleYear() {
      return this.list.articleYear;
    },
    articleMonth() {
      return this.list.articleMonth;
    },
    articleDay() {
      return this.list.articleDay;
    },
    articleHour() {
      return this.list.articleHour;
    },
    articleMinute() {
      return this.list.articleMinute;
    },
    articleContent() {
      return this.list.articleContent;
    },
    username() {
      return this.$store.state.username;
    },
  },
  methods: {
    toComment() {
      //发送评论
      if (this.textarea === "") {
        this.$message({
          message: "评论内容不能为空",
          type: "warning",
        });
      } else {
        let date = new Date();
        this.ruleForm.commentContent = this.textarea;
        this.ruleForm.commentYear = date.getFullYear();
        this.ruleForm.commentMonth = date.getMonth() + 1;
        this.ruleForm.commentDay = date.getDate();
        this.ruleForm.commentHour = date.getHours();
        this.ruleForm.commentMinute = date.getMinutes();
        addComment(this.ruleForm)
          .then((res) => {
            //发起添加评论ajax
            if (res.data.errcode === 0) {
              this.$message({
                message: "评论成功!",
                type: "success",
              });
              findComment({ commentId: this.$route.params.id }) //根据动态路由带过来的信息查询评论信息
                .then((res) => {
                  if (res.data.errcode === 0) {
                    this.comment = res.data.list; //找到对应的评论
                  } else {
                    this.$message({
                      message: "评论加载失败",
                      type: "error",
                    });
                  }
                })
                .catch(() => {
                  this.$message({
                    message: "评论加载失败",
                    type: "error",
                  });
                });
            } else {
              this.$message({
                message: "评论失败",
                type: "error",
              });
            }
          })
          .catch(() => {
            this.$message({
              message: "评论失败",
              type: "error",
            });
          });
        this.textarea = ""; //清空输入框
      }
    },
    toDelete(index) {
      //删除评论（只能删除用户自己发送的评论 v-show）
      removeComment({ _id: this.comment[index]._id }) //发起删除的ajax
        .then((res) => {
          if (res.data.errcode === 0) {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            findComment({ commentId: this.$route.params.id }) //根据动态路由带过来的信息查询评论信息
              .then((res) => {
                if (res.data.errcode === 0) {
                  this.comment = res.data.list; //找到对应的评论
                } else {
                  this.$message({
                    message: "评论加载失败",
                    type: "error",
                  });
                }
              })
              .catch(() => {
                this.$message({
                  message: "评论加载失败",
                  type: "error",
                });
              });
          } else {
            this.$message({
              message: "删除评论失败",
              type: "error",
            });
          }
        })
        .catch(() => {
          this.$message({
            message: "删除评论失败",
            type: "error",
          });
        });
    },
  },
};
</script>

<style scoped>
.Artivle-content-words {
  background: #eee;
  color: #333;
  margin: 10px;
  padding: 15px;
  font-size: 20px;
  line-height: 30px;
}
#Artivle-content h2 {
  margin: 5px;
}
#Artivle-content h3 {
  text-align: right;
}
.Artivle-comment-submit {
  margin-top: 15px;
  float: right;
}
.Artivle-comment-content li {
  font-size: 18px;
  width: 100%;
  margin-top: 40px;
  line-height: 30px;
  position: relative;
}
.Artivle-comment-content-delete {
  position: absolute;
  top: 0;
  right: 0;
}
.Artivle-comment-content-time {
  float: right;
}
</style>