<template>
  <div id="Customer-all">
    <div id="Customer-center">
      <el-container class="Customer-box">
        <el-header>
          <div class="Customer-title">VUE-BLOG</div>
          <div class="Customer-nav">
            <div class="line"></div>
            <el-menu
              :default-active="activeIndex"
              class="el-menu-demo"
              mode="horizontal"
              router
              background-color="#333"
              text-color="#eee"
              active-text-color="#eee"
            >
              <el-menu-item index="/customerHome" class="el-icon-s-home">
                博客首页</el-menu-item
              >
              <el-menu-item index="/blogArticle" class="el-icon-document">
                我的文章</el-menu-item
              >
              <el-menu-item index="3" class="el-icon-camera">
                我的相册</el-menu-item
              >
              <el-menu-item class="el-icon-close" @click="toLogout">
                退出登录</el-menu-item
              >
            </el-menu>
          </div>
        </el-header>
        <el-container>
          <el-aside width="250px">
            <el-col class="Customer-avatar">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="100" src="/images/avatar.jpg"></el-avatar>
                  <div class="Customer-username">小天天</div>
                </div>
              </div>
            </el-col>

            <el-col>
              <el-menu
                class="el-menu-vertical-demo Customer-card"
                background-color="#333"
                text-color="#eee"
              >
                <el-menu-item>
                  <span slot="title" class="Customer-card-article">
                    文章：{{ this.articleCount }}
                  </span>
                </el-menu-item>
                <el-menu-item>
                  <span slot="title" class="Customer-card-photo">
                    照片：{{ this.photoCount }}
                  </span>
                </el-menu-item>
              </el-menu>
            </el-col>
            <el-col>
              <el-menu
                class="el-menu-vertical-demo Customer-contact"
                background-color="#333"
                text-color="#eee"
              >
                <el-menu-item>
                  <i class="el-icon-phone-outline"></i>
                  <span slot="title" class="Customer-contact-tel">
                    15912341234
                  </span>
                </el-menu-item>
                <el-menu-item>
                  <i class="el-icon-chat-round"></i>
                  <span slot="title" class="Customer-contact-qq">
                    1441234567
                  </span>
                </el-menu-item>
                <el-menu-item>
                  <i class="el-icon-message"></i>
                  <span slot="title" class="Customer-contact-mail">
                    1441234567@qq.com
                  </span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-aside>
          <el-main class="Customer-main"><router-view></router-view></el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import { findArticleCount } from "@/api/article.js";

export default {
  name: "Customer",
  data() {
    return {
      activeIndex: "/customerHome",
      articleCount: 0,
      photoCount: 0,
    };
  },
  created() {
    if (this.$route.fullPath.toLowerCase() === "/customer") {
      this.activeIndex = "/customerHome";
    } else {
      this.activeIndex = this.$route.fullPath;
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    toLogout() {
      localStorage.removeItem("token");
      this.$router
        .push("/login")
        .then(() => {})
        .catch(() => {}); //编程式路由加then、catch放置报错
    },
  },
  mounted() {
    //DOM渲染后发起ajax
    findArticleCount() //查询文章数量，赋值给articleCount
      .then((res) => {
        if (res.data.errcode === 0) {
          this.articleCount = res.data.count;
        } else {
          this.articleCount = "error";
        }
      })
      .catch(() => {
        this.articleCount = "error";
      });
  },
};
</script>

<style>
#Customer-all {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url(/images/bg.jpg);
  background-size: 100% 100%;
}
.Customer-box {
  height: 100vh;
}
#Customer-center {
  margin: 0 auto;
  width: 1100px;
}
#Customer-all .el-header {
  height: 10vh;
  background-color: rgba(51, 51, 51, 0.9);
  text-align: center;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
}
.Customer-title {
  font-size: 22px;
  color: #eee;
}
#Customer-all .el-menu-item {
  min-width: 207px;
}
#Customer-all .el-menu-demo {
  background-color: #333;
  opacity: 0.8;
}
#Customer-all .el-aside {
  background-color: #333;
  opacity: 0.7;
  color: #eee;
  text-align: center;
}
.Customer-avatar {
  margin-top: 15px;
  font-size: 18px;
  color: #eee;
}
.Customer-card {
  margin-top: 40px;
  font-size: 18px;
}
.Customer-contact {
  margin-top: 40px;
  font-size: 16px;
}
#Customer-all .el-main {
  background-color: rgba(51, 51, 51, 0.8);
  color: #eee;
}
.Customer-main {
  height: 90vh;
  overflow: auto; /* main区域溢出加滚动条 */
}
#Customer-all .el-container {
  flex-grow: 1;
}
#Customer-all .el-container:nth-child(5) .el-aside,
#Customer-all .el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
#Customer-all .el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>