<template>
  <div class="category-detail">
    <van-nav-bar title="推荐专区" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-tabs sticky swipeable :ellipsis="false" v-model="active" @change="tabChange" animated>
      <van-tab v-for="cate in cateList" :title="cate.name" :key="cate.id">
        <h6 class="title" v-text="title"></h6>
        <div class="goods-wrap">
          <goods-easy @click="goodsClick" v-for="item in itemList" :key="item.id" :info="item"></goods-easy>
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
  created() {
    let { index, cateList } = this.$route.params;
    this.active = index;
    this.cateList = cateList;
    let { frontName, id, superCategoryId } = cateList[index];
    this.title = frontName;
    this.$myget("/xhr/list/l2Items2.json", {
      categoryL1Id: superCategoryId,
      categoryL2Id: id
    }).then(res => {
      let { itemList } = res.data;
      this.itemList = itemList;
    });
  },
  methods: {
    onClickLeft() {
      this.$router.push({ path: "/category" });
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
    goodsClick(id) {
      this.$router.push({ path: "/goodsdetail", query: { id } });
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