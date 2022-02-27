<template>
  <div id="Article">
    <div id="Artivle-content">
      <h2>这是标题</h2>
      <h3>发布于:2022/2/26/13:14</h3>
      <div class="Artivle-content-words">
        乌克兰24频道报道称，战斗正在激烈进行中。乌克兰24频道报道称，战斗正在激烈进行中。乌克兰24频道报道称，战斗正在激烈进行中。乌克兰24频道报道称，战斗正在激烈进行中。乌克兰24频道报道称，战斗正在激烈进行中。乌克兰24频道报道称，战斗正在激烈进行中。乌克兰24频道报道称，战斗正在激烈进行中。乌克兰24频道报道称，战斗正在激烈进行中。乌克兰24频道报道称，战斗正在激烈进行中。乌克兰24频道报道称，战斗正在激烈进行中。乌克兰24频道报道称，战斗正在激烈进行中。乌克兰24频道报道称，战斗正在激烈进行中。乌克兰24频道报道称，战斗正在激烈进行中。乌克兰24频道报道称，战斗正在激烈进行中。乌克兰24频道报道称，战斗正在激烈进行中。乌克兰24频道报道称，战斗正在激烈进行中。乌克兰24频道报道称，战斗正在激烈进行中。乌克兰24频道报道称，战斗正在激烈进行中。乌克兰24频道报道称，战斗正在激烈进行中。乌克兰24频道报道称，战斗正在激烈进行中。乌克兰24频道报道称，战斗正在激烈进行中。
      </div>
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
      <el-button plain class="Artivle-comment-submit">发送</el-button>

      <div style="clear: both"></div>

      <ul class="Artivle-comment-content">
        <li>
          <div>
            <h4 class="Artivle-comment-content-username">小天天 :</h4>
            <p class="Artivle-comment-content-words">太棒啦</p>
          </div>
          <p class="Artivle-comment-content-time">2022/2/26/14:45</p>
        </li>
        <el-divider></el-divider>
        <li>
          <div>
            <h4 class="Artivle-comment-content-username">小天天 :</h4>
            <p class="Artivle-comment-content-words">太棒啦</p>
          </div>
          <p class="Artivle-comment-content-time">2022/2/26/14:45</p>
        </li>
        <el-divider></el-divider>
        <li>
          <div>
            <h4 class="Artivle-comment-content-username">小天天 :</h4>
            <p class="Artivle-comment-content-words">太棒啦</p>
          </div>
          <p class="Artivle-comment-content-time">2022/2/26/14:45</p>
        </li>
        <el-divider></el-divider>
        <li>
          <div>
            <h4 class="Artivle-comment-content-username">小天天 :</h4>
            <p class="Artivle-comment-content-words">太棒啦</p>
          </div>
          <p class="Artivle-comment-content-time">2022/2/26/14:45</p>
        </li>
        <el-divider></el-divider>
        <li>
          <div>
            <h4 class="Artivle-comment-content-username">小天天 :</h4>
            <p class="Artivle-comment-content-words">
              太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦太棒啦
            </p>
          </div>
          <p class="Artivle-comment-content-time">2022/2/26/14:45</p>
        </li>
        <el-divider></el-divider>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea: "",
    };
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