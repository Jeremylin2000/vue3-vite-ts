<script setup lang="ts">
import { ref } from "vue";
import type { INavMenu } from "../utils/modules";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
const menu = ref<INavMenu[]>([
  { name: "首页", url: "/" },
  { name: "订单管理", url: "/census" },
  { name: "统计管理", url: "/manage" },
  { name: "管理权限", url: "/order" },
]);
// defineProps<{ msg: string }>()
</script>

<template>
  <div style="height: 100%">
    <!-- <el-aside width="200px"> -->
    <el-menu
      style="height: 100%; width: 200px"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      text-color="#fff"
      router
    >
      <el-menu-item :index="item.url" v-for="item in menu" :key="item.url">
        <el-icon><setting /></el-icon>
        <span>{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
    <!-- </el-aside> -->
  </div>
</template>

<style scoped>
</style>
