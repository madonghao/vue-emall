<template>
  <div class="category-detail">
    <van-nav-bar title="推荐专区" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-tabs sticky swipeable :ellipsis="false" v-model="active" @change="tabChange" animated>
      <van-tab v-for="cate in cateList" :title="cate.name" :key="cate.id">
        <h6 class="title" v-text="title"></h6>
        <div class="goods-wrap">
          <goods-easy v-for="item in itemList" :key="item.id" :info="item"></goods-easy>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs, NavBar } from "vant";
import goodsEasy from "@/components/goodsEasy";

export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [NavBar.name]: NavBar,
    goodsEasy
  },
  data() {
    return {
      title: "",
      active: 0,
      cateList: [],
      itemList: []
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    tabChange(name) {
      let { frontName, id, superCategoryId } = this.cateList[name];
      this.title = frontName;
      this.$myget("/xhr/list/l2Items2.json", {
        categoryL1Id: superCategoryId,
        categoryL2Id: id
      }).then(res => {
        let { itemList } = res.data;
        this.itemList = itemList;
      });
    },
    init() {
      let { name, cateList } = this.$route.params;
      for (let i = 0; i < cateList.length; i++) {
        if (cateList[i].name == name) {
          this.active = i;
          break;
        }
      }
      this.cateList = cateList;
      let { frontName, id, superCategoryId } = cateList[this.active];
      this.title = frontName;
      this.$myget("/xhr/list/l2Items2.json", {
        categoryL1Id: superCategoryId,
        categoryL2Id: id
      }).then(res => {
        let { itemList } = res.data;
        this.itemList = itemList;
      });
    }
  },
  // created() {
  //   // 第一次进入正常初始化
  //   this.init();
  // },
  beforeRouteLeave(to, from, next) {
    if (to.path == "/category") {
      from.meta.isBack = true;
      console.log('我要返回到category页面了调整isBack为真');
    }
    next();
  },
  activated() {
    if (this.$route.meta.isBack) {
      console.log('我执行了init')
      this.init();
    }
  }
};
</script>

<style lang="scss" scope>
.category-detail {
  .title {
    text-align: center;
    margin: 10px 0;
    font-size: 14px;
  }
}
</style>