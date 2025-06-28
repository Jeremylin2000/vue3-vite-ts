<script setup lang="ts">
import { ref } from "vue";
import type { INavMenu } from "../utils/modules";
import {
  Document,
  Menu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import { markRaw } from 'vue'
// ...existing code...
const menu = ref<INavMenu[]>([
  { name: "首页", url: "/", icon: markRaw(Document) },
  { name: "订单管理", url: "/census", icon: markRaw(Menu) },
  { name: "统计管理", url: "/manage", icon: markRaw(Location) },
  { name: "管理权限", url: "/order", icon: markRaw(Setting) },
])
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
        <el-icon><Component :is="item.icon" /></el-icon>
         <!-- <el-icon v-if="item.icon" :is="item.icon" /> -->
        <span>{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
    <!-- </el-aside> -->
  </div>
</template>

<style scoped>
</style>
