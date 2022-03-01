<template>
  <div id="Managerial-all">
    <el-container class="Managerial-box">
      <el-header>
        <div>VUE-BLOG后台管理系统</div>
        <div>欢迎：{{ username }}</div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-vertical-demo"
            router
            background-color="#333"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="/managerialHome">
              <i class="el-icon-s-home"></i>
              <span>系统首页</span>
            </el-menu-item>
            <el-menu-item index="/publish">
              <i class="el-icon-document"></i>
              <span slot="title">发表文章</span>
            </el-menu-item>
            <el-menu-item index="/edit">
              <i class="el-icon-document-checked"></i>
              <span slot="title">编辑文章</span>
            </el-menu-item>
            <el-menu-item index="/imageRanger">
              <i class="el-icon-camera"></i>
              <span slot="title">相册管理</span>
            </el-menu-item>
            <el-menu-item index="/setting">
              <i class="el-icon-user"></i>
              <span slot="title">个人设置</span>
            </el-menu-item>
            <el-menu-item @click="toLogout">
              <i class="el-icon-close"></i>
              <span slot="title">退出登录</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Managerial",
  data() {
    return {
      activeIndex: "/managerialHome",
    };
  },
  created() {
    if (this.$route.fullPath.toLowerCase() === "/managerial") {
      this.activeIndex = "/managerialHome";
    } else {
      this.activeIndex = this.$route.fullPath;
    }
  },
  computed: {
    username() {
      return this.$store.state.username;
    },
  },
  methods: {
    toLogout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
#Managerial-all {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url(/images/bg.jpg);
  background-size: 100% 100%;
}
.Managerial-box {
  height: 100vh;
}
#Managerial-all .el-header {
  height: 10vh;
  background-color: #333;
  color: #eee;
  text-align: center;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
}
#Managerial-all .el-aside {
  background-color: #333;
  color: #eee;
  opacity: 0.6;
  text-align: center;
}
#Managerial-all .el-main {
  background: rgba(0, 0, 0, 0.5);
  color: #eee;
  height: 90vh;
  overflow: auto;
}
#Managerial-all .el-container {
  flex-grow: 1;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>