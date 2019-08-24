<template>
  <div class="goods-easy" @click="goodsClick">
    <img :src="info.primaryPicUrl" alt />
    <p class="desc" v-text="info.simpleDesc"></p>
    <div class="info">
      <template v-if="info.itemTagList">
        <p class="tag">
          <van-tag
            class="tag-item"
            :color="tag | color"
            v-for="tag in info.itemTagList"
            :key="tag.type"
          >{{tag.name}}</van-tag>
        </p>
      </template>
      <p class="name" v-text="info.name"></p>
      <p>
        <span class="activity" v-if="info.activityPrice" v-text="'￥' + info.activityPrice"></span>
        <span :class="info.activityPrice ? 'retail' : 'activity'" v-text="'￥' + info.retailPrice"></span>
      </p>
    </div>
  </div>
</template>

<script>
import { Tag } from "vant";

export default {
  components: {
    [Tag.name]: Tag
  },
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  filters: {
    //   #f2826a
    color(value) {
      switch (value.name) {
        case "售罄":
          return "#cccccc";
        case "新品":
          return "#bdb76b";
        default:
          return "#f2826a";
      }
    }
  },
  methods: {
    goodsClick() {
      let id = this.info.id;
      this.$router.push({ path: "/goodsdetail", query: { id } });
    },
  }
};
</script>

<style lang="scss" scope>
.goods-easy {
  width: 179.5px;
  display: inline-block;
  background-color: #f4f4f4;
  box-sizing: border-box;
  margin: 4px;
  vertical-align: middle;
  img {
    width: 100%;
    display: block;
  }
  .desc {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin: 0;
    padding: 4px 8px;
    background-color: #f1ece2;
    color: #9f8a60;
    font-size: 14px;
  }
  .info {
    padding: 6px 0;
    background-color: #fff;
    font-size: 14px;
    min-height: 76.78px;
    p {
      margin: 0;
    }
    .tag {
      margin-bottom: 6px;
      .tag-item {
        margin-right: 6px;
      }
    }
    .name {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .activity {
      margin-right: 6px;
      font-weight: bolder;
    }
    .retail {
      color: #ccc;
      text-decoration: line-through;
    }
  }
}
</style>