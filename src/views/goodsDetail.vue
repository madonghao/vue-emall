<template>
  <div class="goods-detail">
    <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-swipe :autoplay="3000" @change="onChange">
      <van-swipe-item v-for="(swiper, index) in picUrlList" :key="index">
        <van-image class="img-wrap" width="100%" height="100%" :src="swiper" />
      </van-swipe-item>
      <div class="custom-indicator" slot="indicator">{{ current + 1 }}/5</div>
    </van-swipe>

    <div class="detail-wrap" v-html="detailHtml">

    </div>
  </div>
</template>

<script>
import { NavBar, Swipe, SwipeItem, Image } from "vant";

export default {
  components: {
    [NavBar.name]: NavBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Image.name]: Image
  },
  data() {
    return {
      detailHtml: "",
      picUrlList: [],
      current: 0
    };
  },
  created() {
    this.$myget("/xhr/item/detail.json", { itemId: this.$route.query.id }).then(
      res => {
        let { itemDetail, listPicUrl } = res.data;
        console.log(res);
        for (const key in itemDetail) {
          if (key == "detailHtml") {
            console.log(itemDetail[key])
            this.detailHtml = itemDetail[key];
          } else {
            this.picUrlList.push(itemDetail[key]);
          }
        }
        this.picUrlList.unshift(listPicUrl);
        // TODO: 可以使用此正则添加行内样式
        // this.detailHtml = this.detailHtml.replace(/style=(.*?)\s/g, 'style="display: block; width: 100%"');
        this.detailHtml = this.detailHtml.replace(/<br\/>/g, '');
      }
    );
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onChange(index) {
      this.current = index;
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path == "/categorydetail") {
      console.log("商品详情页要过去了提前修改判断条件isBack为假");
      to.meta.isBack = false;
    }
    next();
  }
};
</script>

<style lang="scss" scope>
.goods-detail {
  .img-wrap {
    background-color: #eee;
  }
  .custom-indicator {
    position: absolute;
    bottom: 16px;
    right: 8px;
    font-size: 12px;
    background-color: #fff;
    padding: 0 4px;
    border-radius: 4px;
  }
  .detail-wrap {
    p {
      margin: 0;
      img {
        display: block;
        width: 100%;
      }
    }
  }
}
</style>