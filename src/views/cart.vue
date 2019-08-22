<template>
  <div class="cart">
    <p>购物车页面</p>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.commit("changeTitle", "购物车");
  }
};
</script>

<style lang="scss" scope>
</style>