<template>
  <div id="Article">
    <div id="Artivle-content">
      <h2>{{ articleTitle }}</h2>
      <!-- 标题 -->
      <h3>
        <!-- 发布时间 -->
        {{ "发布于:" + articleYear + "/" }}{{ articleMonth + "/"
        }}{{ articleDay + "/" }}{{ articleHour + ":" }}{{ articleMinute }}
      </h3>
      <div class="Artivle-content-words" v-html="articleContent"></div>
    </div>

    <el-divider></el-divider>
    <!-- 分割线 -->

    <div class="Artivle-comment">
      <!-- 评论框 -->
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
        <li v-for="(item, index) in articleComment" :key="index">
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            class="Artivle-comment-content-delete"
            v-show="
              $store.state.username === articleComment[index].username
                ? true
                : false
            "
            @click="toDelete(index)"
          ></el-button>
          <div>
            <h4
              class="Artivle-comment-content-username"
              :style="{
                color:
                  articleComment[index].username === 'admin123' && '#ffd04b',
              }"
            >
              {{
                articleComment[index].username === "admin123"
                  ? "博主:"
                  : articleComment[index].username + ":"
              }}
            </h4>
            <p class="Artivle-comment-content-words">
              {{ articleComment[index].commentContent }}
            </p>
          </div>
          <p class="Artivle-comment-content-time">
            {{ articleComment[index].commentYear + "/"
            }}{{ articleComment[index].commentMonth + "/"
            }}{{ articleComment[index].commentDay + "/"
            }}{{ articleComment[index].commentHour + ":"
            }}{{ articleComment[index].commentMinute }}
          </p>
          <el-divider></el-divider>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { find, updateComment } from "@/api/article.js";

export default {
  data() {
    return {
      textarea: "",
      list: "",
    };
  },
  created() {
    find({ _id: this.$route.params.id }) //根据动态路由带过来的信息查询文章信息
      .then((res) => {
        if (res.data.errcode === 0) {
          this.list = res.data.list[0]; //找到对应的文章
          this.list.articleComment = JSON.parse(this.list.articleComment); //找到放置评论的数组，用JSON.parse转成对象
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
    articleComment() {
      return this.list.articleComment;
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
      let date = new Date();
      this.list.articleComment.push({
        //将渲染评论需要的信息整合为对象push到评论数组中
        commentYear: date.getFullYear(),
        commentMonth: date.getMonth() + 1,
        commentDay: date.getDate(),
        commentHour: date.getHours(),
        commentMinute: date.getMinutes(),
        username: this.username,
        commentContent: this.textarea,
      });
      updateComment(this.list) //发起更新的ajax
        .then((res) => {
          if (res.data.errcode === 0) {
            this.$message({
              message: "评论成功",
              type: "success",
            });
          } else {
            this.$message({
              message: "发表评论失败",
              type: "error",
            });
          }
        })
        .catch(() => {
          this.$message({
            message: "发表评论失败",
            type: "error",
          });
        });
      this.textarea = ""; //清空输入框
    },
    toDelete(index) {
      //删除评论（只能删除用户自己发送的评论 v-show）
      this.list.articleComment.splice(index, 1); //利用index将评论数组中对应的第几个数据剪切掉
      updateComment(this.list) //发起更新的ajax
        .then((res) => {
          if (res.data.errcode === 0) {
            this.$message({
              message: "删除成功",
              type: "success",
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