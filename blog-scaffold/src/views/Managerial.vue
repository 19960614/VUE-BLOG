<template>
  <div id="Managerial-all">
    <el-container class="Managerial-box">
      <el-header>
        <div>VUE-BLOG后台管理系统</div>
        <div>欢迎：小天天</div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#333"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="1">
              <i class="el-icon-s-home"></i>
              <span>系统首页</span>
            </el-menu-item>
            <!-- <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group> -->
            <!-- <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group> -->
            <!-- <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu> -->
            <!-- </el-submenu> -->
            <el-menu-item index="2">
              <i class="el-icon-document"></i>
              <span slot="title">发表文章</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-document-checked"></i>
              <span slot="title">编辑文章</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-camera"></i>
              <span slot="title">相册管理</span>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="el-icon-user"></i>
              <span slot="title">个人设置</span>
            </el-menu-item>
            <el-menu-item index="6">
              <i class="el-icon-close"></i>
              <span slot="title">退出登录</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Managerial",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
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
  opacity: .6;
  text-align: center;
}
#Managerial-all .el-main {
  background: rgba(0, 0, 0, 0.5);
  color: #eee;
  text-align: center;
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