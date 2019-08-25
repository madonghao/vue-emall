<template>
  <div id="app" v-cloak>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
      </router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive">
    </router-view>
  </div>
</template>

<style lang="scss" scope>
[v-cloak] {
  display: none;
}
</style>
