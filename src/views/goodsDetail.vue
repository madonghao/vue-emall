<template>
  <div class="goods-detail">
    <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    <p>商品详情页</p>
  </div>
</template>

<script>
import { NavBar } from "vant";

export default {
  components: {
    [NavBar.name]: NavBar
  },
  created() {
    this.$myget("/xhr/item/detail.json", { itemId: this.$route.query.id }).then(
      res => {
        console.log(res);
      }
    );
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path == '/categorydetail') {
      console.log('商品详情页要过去了提前修改判断条件isBack为假');
      to.meta.isBack = false;
    }
    next();
  },
};
</script>

<style>
</style>