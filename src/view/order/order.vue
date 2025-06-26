<script setup lang="ts">
// import useMouse from '../../hooks/useMouse'
import { Teleport } from 'vue'
import useMouse from '@/hooks/useMouse'

const { x, y } = useMouse()

const flag = ref<boolean>(false)
const test = () => {
  flag.value = !flag.value
  console.log('teleport')
}
// defineProps<{ msg: string }>()

</script>

<template>
  <div>
    order
    <div>Mouse 的位置： {{ x }}, {{ y }}</div>
  </div>
  <el-button @click="test" type="primary">teleport</el-button>
  <Teleport to="body">
    <div v-if="flag" class="teleport-box" style="position: absolute; top: 100px; left: 100px; width: 200px; height: 200px; background-color: red;">
      teleport
    </div>
  </Teleport>
</template>

<style scoped>
</style>
