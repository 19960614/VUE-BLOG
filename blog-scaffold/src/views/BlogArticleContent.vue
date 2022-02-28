<template>
  <div id="Article">
    <div id="Artivle-content">
      <h2>{{ articleTitle }}</h2>
      <h3>
        {{ "发布于:" + articleYear + "/" }}{{ articleMonth + "/"
        }}{{ articleDay + "/" }}{{ articleHour + ":" }}{{ articleMinute }}
      </h3>
      <div class="Artivle-content-words" v-html="articleContent"></div>
    </div>

    <el-divider></el-divider>

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

      <ul class="Artivle-comment-content">
        <li v-for="(item, index) in articleComment" :key="index">
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
    find()
      .then((res) => {
        if (res.data.errcode === 0) {
          this.list = res.data.list[this.$route.params.id];
          this.list.articleComment = JSON.parse(this.list.articleComment);
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
      let date = new Date();
      this.list.articleComment.push({
        commentYear: date.getFullYear(),
        commentMonth: date.getMonth() + 1,
        commentDay: date.getDate(),
        commentHour: date.getHours(),
        commentMinute: date.getMinutes(),
        username: this.username,
        commentContent: this.textarea,
      });
      updateComment(this.list)
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
      this.textarea = "";
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
}
.Artivle-comment-content-time {
  float: right;
}
</style>