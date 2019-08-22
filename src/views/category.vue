<template>
  <div class="category">
    <van-sidebar class="sidebar" v-model="activeKey">
      <van-sidebar-item
        @click="categoryClick(category.id)"
        v-for="category in categoryList"
        :key="category.id"
        :title="category.name"
      />
    </van-sidebar>
    <div class="create">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="focusBanner in focusBannerList" :key="focusBanner.id">
          <van-image width="100%" height="100%" :src="focusBanner.picUrl" />
        </van-swipe-item>
      </van-swipe>
      <div class="create-item" v-for="categoryGroup in categoryGroupList" :key="categoryGroup.id">
        <h6 v-if="categoryGroup.name" class="title" v-text="categoryGroup.name"></h6>
        <!-- <van-grid :column-num="3" square>
            <van-grid-item v-for="category in categoryGroup.categoryList" :key="category.id" :icon="category.bannerUrl" :text="category.name" />
        </van-grid>-->
        <div class="grid">
          <div
            @click="clickJump(index)"
            class="grid-item"
            v-for="(category, index) in categoryGroup.categoryList"
            :key="category.id"
          >
            <img :src="category.prettyBannerUrl" />
            <p v-text="category.name"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Sidebar,
  SidebarItem,
  Swipe,
  SwipeItem,
  Image
  //   Grid,
  //   GridItem
} from "vant";

export default {
  components: {
    [Sidebar.name]: Sidebar,
    [SidebarItem.name]: SidebarItem,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Image.name]: Image
    // [Grid.name]: Grid,
    // [GridItem.name]: GridItem
  },
  data() {
    return {
      activeKey: 0,
      categoryList: [],
      categoryGroupList: [],
      focusBannerList: [],
      subCategoryList: []
    };
  },
  methods: {
    categoryClick(id) {
      this.$myget("/xhr/list/subCate.json", { categoryId: id }).then(res => {
        let {
          categoryGroupList,
          focusBannerList,
          subCategoryList
        } = res.data.category;
        this.categoryGroupList = categoryGroupList;
        this.focusBannerList = focusBannerList;
        this.subCategoryList = subCategoryList;
      });
    },
    clickJump(index) {
      let cateList = this.subCategoryList;
      this.$router.push({
        name: "categoryDetail",
        params: {
          index,
          cateList
        }
      });
    }
  },
  created() {
    this.$myget("/xhr/list/categorySimple").then(res => {
      let { categoryList } = res.data;
      this.categoryList = categoryList;
      this.categoryClick(categoryList[0].id);
    });
    this.$store.commit("changeTitle", "分类");
  }
};
</script>

<style lang="scss" scope>
[class*="van-hairline"]::after {
  border: none;
}
.category {
  display: flex;
  height: 100%;
  .sidebar,
  .create {
    height: 100%;
    overflow: auto;
  }
  .sidebar {
    flex-shrink: 0;
  }
  .create {
    flex-grow: 1;
    box-sizing: border-box;
    padding: 10px;
    .create-item {
      .title {
        margin: 0;
        padding: 6px 0;
        font-size: 12px;
        border-bottom: 1px solid #ddd;
      }
      .grid {
        .grid-item {
          width: 33.333%;
          display: inline-block;
          box-sizing: border-box;
          padding: 10px;
          vertical-align: middle;
          img {
            width: 100%;
          }
          p {
            font-size: 12px;
            text-align: center;
            margin: 0;
            min-height: 32px;
          }
        }
      }
    }
  }
}
</style>