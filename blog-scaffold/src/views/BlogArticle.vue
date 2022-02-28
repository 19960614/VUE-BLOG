<template>
  <div id="BlogArtice-All">
    <div id="BlogArtice-BlogArtice">
      <div style="margin-top: 15px">
        <el-input placeholder="请输入内容" v-model="search">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
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
                  @click="toBlogArticleContent(index)"
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
      this.$router.push(`/blogArticleContent/${index}`); //点击去往BlogArticleContent页面
    },
  },
  mounted() {
    find().then((res) => {
      if (res.data.errcode === 0) {
        this.list = res.data.list;
      } else {
        this.$message({
          message: "文章列表加载失败",
          type: "error",
        });
      }
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