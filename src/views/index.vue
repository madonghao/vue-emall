<template>
  <div class="wrap">
    <header>
      <van-nav-bar :title="title" />
    </header>

    <div class="main">
      <router-view />
    </div>

    <footer>
      <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o" to="home">首页</van-tabbar-item>
        <van-tabbar-item icon="label-o" to="category">分类</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart-o" to="cart">购物车</van-tabbar-item>
        <van-tabbar-item icon="user-o" to="user">个人</van-tabbar-item>
      </van-tabbar>
    </footer>
  </div>
</template>

<script>
import { NavBar, Tabbar, TabbarItem } from "vant";

export default {
  components: {
    [NavBar.name]: NavBar,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {
      active: 0,
    };
  },
  methods: {},
  computed: {
      title() {
          return this.$store.state.title;
      }
  }
};
</script>

<style lang="scss" scope>
.wrap {
    display: flex;
    flex-direction: column;
    height: 100vh;
    header, footer {
        flex-shrink: 0;
    }
    header {
        height: 46px;
    }
    .main {
        flex-grow: 1;
        overflow: hidden;
    }
    footer {
        height: 50px;
    }
}
</style>