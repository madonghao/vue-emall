<template>
  <div class="user">
    <p>我的页面</p>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.commit("changeTitle", "我的");
  }
};
</script>

<style lang="scss" scope>
</style>