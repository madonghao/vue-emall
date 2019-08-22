<template>
  <div class="home">
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="focu in focus" :key="focu.rank">
        <van-image width="100%" :src="focu.img" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Image } from "vant";

export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Image.name]: Image
  },
  data() {
    return {
      focus: []
    };
  },
  created() {
    this.$myget("/xhr/index/index.json").then(res => {
      console.log(res);
      let { focus } = res.data;
      this.focus = focus;
    });
    this.$store.commit("changeTitle", "网易严选");
  }
};
</script>

<style lang="scss" scope>
.home {
    padding: 0 12px;
}
</style>