<script setup lang="ts">
import { ref } from 'vue'
const tableData = ref([{ name: 'a', count: 1, state: true }])
</script>

<template>
  <div>{{ tableData.length }}</div>
</template>