<template>
  <div class="goods-detail">
    <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft" fixed />
    <van-swipe :autoplay="3000" @change="onChange">
      <van-swipe-item v-for="(swiper, index) in picUrlList" :key="index">
        <van-image class="img-wrap" width="100%" height="100%" :src="swiper" />
      </van-swipe-item>
      <div class="custom-indicator" slot="indicator">{{ current + 1 }}/{{picUrlList.length}}</div>
    </van-swipe>
    <div class="info">
      <div class="info-top">
        <div class="top-left">
          <p v-text="goodsInfo.name"></p>
          <p class="top-left-txt" v-text="goodsInfo.simpleDesc"></p>
        </div>
        <div class="top-right">
          <p class="praise-num" v-text="praise.num"></p>
          <p class="praise-txt" v-text="praise.txt"></p>
        </div>
      </div>
      <div class="info-mid">
        <div class="mid-left">
          <span class="activity-price" v-if="goodsInfo.activityPrice">
            <span>￥</span>
            {{goodsInfo.activityPrice}}
          </span>
          <span
            :class="goodsInfo.activityPrice ? 'retail-price' : 'activity-price'"
            v-if="goodsInfo.retailPrice"
          >￥{{goodsInfo.retailPrice}}</span>
        </div>
        <p class="reward">
          {{rewardText}}
          <span>￥{{rewardAmount}}</span>
        </p>
      </div>
      <div class="info-bot">
        <van-tag
          class="info-tag"
          plain
          color="#ff6600"
          v-for="tag in goodsInfo.tagList"
          :key="tag.id"
        >{{tag.tagName}}</van-tag>
      </div>
    </div>
    <van-cell-group>
      <van-cell title="数量规格选择" is-link />
      <van-cell title="领券" is-link />
      <van-cell title="配送" is-link />
      <van-cell title="服务" is-link @click="serviceClick" />
    </van-cell-group>
    <van-action-sheet v-model="show" :title="service.title">
      <p class="connect" v-text="service.content"></p>
    </van-action-sheet>
    <div class="detail-wrap" v-html="detailHtml"></div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="jumpCart" />
      <van-goods-action-button type="warning" text="加入购物车" @click="onClickButton" />
      <van-goods-action-button type="danger" text="立即购买" @click="buyClick" />
    </van-goods-action>
  </div>
</template>

<script>
import {
  NavBar,
  Swipe,
  SwipeItem,
  Image,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Cell,
  CellGroup,
  Sku,
  Toast,
  ActionSheet,
  Tag
} from "vant";

export default {
  components: {
    [NavBar.name]: NavBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Image.name]: Image,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Sku.name]: Sku,
    [ActionSheet.name]: ActionSheet,
    [Tag.name]: Tag
  },
  data() {
    return {
      current: 0,
      show: false,
      goodsInfo: {}
    };
  },
  created() {
    this.$myget("/xhr/item/detail.json", { itemId: this.$route.query.id }).then(
      res => {
        console.log(res);
        this.goodsInfo = res.data;
      }
    );
  },
  computed: {
    service() {
      return this.goodsInfo.policyList[0];
    },
    detailHtml() {
      // TODO: 可以使用此正则添加行内样式
      // this.detailHtml = this.detailHtml.replace(/style=(.*?)\s/g, 'style="display: block; width: 100%"');
      let html = this.goodsInfo.itemDetail.detailHtml;
      return html.replace(/<br\/>/g, "");
    },
    picUrlList() {
      let picUrlList = [];
      let { itemDetail, primaryPicUrl } = this.goodsInfo;
      console.log(itemDetail);
      for (const key in itemDetail) {
        if (key != "detailHtml" && itemDetail[key] != "") {
          picUrlList.push(itemDetail[key]);
        }
      }
      picUrlList.push(primaryPicUrl);
      return picUrlList;
    },
    praise() {
      let { goodCmtRate } = this.goodsInfo.itemStar;
      let obj = {};
      goodCmtRate = goodCmtRate.split(" ");
      goodCmtRate.forEach((item, index) => {
        switch (index) {
          case 0:
            obj.num = item;
            break;
          case 1:
            obj.txt = item + "率>";
            break;
        }
      });
      return obj;
    },
    rewardText() {
      return this.goodsInfo.itemRewardVO.rewardText;
    },
    rewardAmount() {
      return this.goodsInfo.itemRewardVO.rewardAmount;
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onChange(index) {
      this.current = index;
    },
    onClickIcon() {
      Toast("点击客服");
    },
    buyClick() {
      Toast("点击购买");
    },
    jumpCart() {
      this.$router.push({ path: "/cart" });
    },
    onClickButton() {
      Toast("成功加入购物车");
    },
    serviceClick() {
      this.show = !this.show;
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
  padding: 46px 0 50px 0;
  .info {
    display: flex;
    flex-direction: column;
    padding: 10px;
    .info-top {
      display: flex;
      flex-flow: row nowrap;
      font-size: 16px;
      margin-bottom: 12px;
      .top-left {
        flex-grow: 1;
        .top-left-txt {
          color: #bbb;
          font-size: 14px;
        }
        p {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
      .top-right {
        width: 70px;
        text-align: center;
        flex-shrink: 0;
        .praise-num {
          color: red;
        }
        .praise-txt {
          color: #bbb;
          font-size: 14px;
        }
      }
      p {
        margin: 0;
      }
    }
    .info-mid {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: flex-end;
      font-size: 12px;
      .activity-price {
        font-size: 20px;
        color: red;
        margin-right: 4px;
        span {
          font-size: 14px;
        }
      }
      .retail-price {
        text-decoration: line-through;
        color: #bbb;
        font-size: 14px;
      }
      .reward {
        color: #bbb;
        span {
          color: red;
        }
      }
      p {
        margin: 0;
      }
    }
    .info-bot {
      .info-tag {
        margin-right: 6px;
      }
    }
  }
  .img-wrap {
    background-color: #eee;
  }
  .connect {
    font-size: 14px;
    padding: 20px;
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