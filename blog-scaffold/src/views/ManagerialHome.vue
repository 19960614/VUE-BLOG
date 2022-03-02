<template>
  <div id="ManagerialHome-all">
    <h1 class="ManagerialHome-title">{{ title }}</h1>
    <el-empty
      image="/images/homeTitle.jpg"
      :image-size="200"
      description="嘻嘻"
    ></el-empty>
  </div>
</template>

<script>
export default {
  name: "ManagerialHome",
  data() {
    return {
      title:
        "欢迎来到本系统,本系统功能如今较为缺乏,有什么意见可以提,反正不改!!",
    };
  },
};
</script>

<style>
#ManagerialHome-all {
  font-size: 20px;
  color: #eee;
}
.ManagerialHome-title {
  text-align: center;
}
</style>