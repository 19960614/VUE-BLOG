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
          v-for="(item, index) in listPage"
          :key="index"
          :offset="1"
        >
          <el-card :body-style="{ padding: '0px' }" class="BlogArtice-card">
            <img
              :src="item.articleImage"
              class="image"
              @click="toBlogArticleContent(item._id)"
            />
          </el-card>
          <div style="padding: 14px">
            <span>{{ item.articleTitle }}</span>
          </div>
        </el-col>
      </el-row>
      <!-- 分页 -->
      <el-pagination
        background
        page-size="6"
        layout="prev, pager, next"
        @current-change="current_change"
        :total="list.length"
        class="page"
      >
      </el-pagination>
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
      current: 1, //当前页数
    };
  },
  computed: {
    listPage() {
      return this.list.slice(6 * (this.current - 1), 6 * this.current); //将全部文章slice成每页需要渲染的文章的数组
    },
  },
  methods: {
    current_change(current) {
      this.current = Number(current); //currentPage改变时改变当前页数
    },
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
  width: 175px;
  height: 175px;
  margin-top: 10px;
}

#BlogArtice-All .image {
  width: 175px;
  height: 175px;
  object-fit: contain;
  display: block;
  cursor: pointer;
}

#BlogArtice-All .clearfix:before,
#BlogArtice-All .clearfix:after {
  display: table;
  content: "";
}

#BlogArtice-All .clearfix:after {
  clear: both;
}
#BlogArtice-All .page {
  text-align: right;
}
</style>