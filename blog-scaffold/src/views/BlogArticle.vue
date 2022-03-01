<template>
  <div id="BlogArtice-All">
    <div id="BlogArtice-BlogArtice">
      <!-- 搜索 -->
      <div style="margin-top: 15px">
        <el-input placeholder="请输入搜索内容" v-model="search">
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="toSearch"
          ></el-button>
        </el-input>
      </div>

      <!-- 文章列表 -->
      <el-row>
        <el-col
          :span="7"
          v-for="(item, index) in this.list"
          :key="index"
          :offset="1"
        >
          <el-card :body-style="{ padding: '0px' }" class="BlogArtice-card">
            <img :src="item.articleImage" class="image" />
            <div style="padding: 14px">
              <span>{{ item.articleTitle }}</span>
              <div class="bottom clearfix">
                <time class="time"></time>
                <el-button
                  type="text"
                  class="button"
                  @click="toBlogArticleContent(item._id)"
                  >浏览</el-button
                >
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { find } from "@/api/article.js";

export default {
  data() {
    return {
      list: "",
      search: "",
    };
  },
  methods: {
    toBlogArticleContent(index) {
      //点击去往BlogArticleContent页面,将_id作为动态路由后面的信息带过去
      this.$router
        .push(`/blogArticleContent/${index}`)
        .then(() => {})
        .catch(() => {});
    },
    toSearch() {
      if (!this.search) {
        //搜索框为空搜索全部内容
        find()
          .then((res) => {
            if (res.data.errcode === 0) {
              this.list = res.data.list;
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
      } else {
        //搜索框有内容按照内容进行模糊匹配
        find({ articleTitle: this.search })
          .then((res) => {
            if (res.data.errcode === 0) {
              this.list = res.data.list;
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
      }
      this.search = ""; //清空搜索框
    },
  },
  mounted() {
    //在mounted时进行全部文章检索
    find()
      .then((res) => {
        if (res.data.errcode === 0) {
          this.list = res.data.list;
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
};
</script>

<style>
#BlogArtice-All .BlogArtice-card {
  margin-top: 10px;
  background: rgba(238, 238, 238, 1);
}
#BlogArtice-All .time {
  font-size: 13px;
  color: #999;
}

#BlogArtice-All .bottom {
  margin-top: 13px;
  line-height: 12px;
}

#BlogArtice-All .button {
  padding: 0;
  float: right;
}

#BlogArtice-All .image {
  width: 100%;
  display: block;
}

#BlogArtice-All .clearfix:before,
#BlogArtice-All .clearfix:after {
  display: table;
  content: "";
}

#BlogArtice-All .clearfix:after {
  clear: both;
}
</style>