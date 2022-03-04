<template>
  <div class="demo CustomerHome-all">
    <div class="select">
      <el-select v-model="value" placeholder="webpack基本操作">
        <el-option
          @click.native="toSelect"
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="video">
      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
      >
      </video-player>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomerHome",
  data() {
    return {
      options: [
        { value: "webpack基本操作", label: "webpack基本操作" },
        { value: "webpack插件和服务器", label: "webpack插件和服务器" },
        { value: "webpack_loader", label: "webpack_loader" },
        { value: "webpack支持vue文件", label: "webpack支持vue文件" },
        { value: "Vue3和Vue3对比", label: "Vue3和Vue3对比" },
        { value: "Vue3组合式API", label: "Vue3组合式API" },
      ],
      value: "",
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: false, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", // 类型
            src: "/video/webpack基本操作.mp4", // url地址
          },
        ],
        poster: "", // 封面地址
        notSupportedMessage: "此视频暂无法播放,请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true, // 是否显示全屏按钮
        },
      },
    };
  },
  methods: {
    toSelect() {
      this.playerOptions.sources[0].src = `/video/${this.value}.mp4`;
      console.log(this.playerOptions.sources.src);
    },
  },
};
</script>

<style>
.select{
  padding-bottom: 20px;
}
</style>