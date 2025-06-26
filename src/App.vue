<script setup lang="ts">
import Navbar from "./view/navbar.vue";
</script>
<template>
  <div class="container">
    <el-header>
      <div class="header-title">智能仓库系统</div>
    </el-header>
    <el-container style="height: 100%">
      <el-aside width="200px">
        <Navbar></Navbar>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
  <!-- <el-config-provider :size="size" :z-index="zIndex"> -->
  <!-- <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div> -->
  <!-- <div>
    <router-view></router-view>
  </div> -->
  <!-- </el-config-provider> -->
</template>

<style scoped>
.el-header {
  background-color: rgb(117, 231, 117);
  display: flex;
  align-items: center;
}
.header-title {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
}
.el-container {
  height: 100%;
}
</style>
