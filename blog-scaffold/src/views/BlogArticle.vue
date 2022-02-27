<template>
  <div id="BlogArtice-All">
    <div id="BlogArtice-BlogArtice">
      <div style="margin-top: 15px">
        <el-input placeholder="请输入内容" v-model="input2">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <el-row>
        <el-col :span="7" v-for="o in 9" :key="o" :offset="1">
          <el-card :body-style="{ padding: '0px' }" class="BlogArtice-card">
            <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              class="image"
            />
            <div style="padding: 14px">
              <span>老八秘制小汉堡</span>
              <div class="bottom clearfix">
                <time class="time"></time>
                <el-button
                  type="text"
                  class="button"
                  @click="toBlogArticleContent"
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
export default {
  methods: {
    toBlogArticleContent() {
      this.$router.push("/blogArticleContent/"); //点击去往BlogArticleContent页面
    },
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