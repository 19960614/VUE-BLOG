<template>
  <div class="demo-image__lazy">
    <el-image
      v-for="(item, index) in list"
      :key="index"
      :src="item.photosUrl"
      lazy
    ></el-image>
  </div>
</template>

<script>
import { find } from "@/api/photos.js";

export default {
  data() {
    return {
      list: "",
    };
  },
  mounted() {
    find()
      .then((res) => {
        if (res.data.errcode === 0) {
          this.list = res.data.list;
        } else {
          this.$message({
            message: "图片加载失败",
            type: "error",
          });
        }
      })
      .catch(() => {
        this.$message({
          message: "图片加载失败",
          type: "error",
        });
      });
  },
};
</script>

<style>
/* 懒加载要加高度才生效 */
.demo-image__lazy .el-image {
  display: block;
  min-height: 200px;
  margin-bottom: 10px;
}
</style>