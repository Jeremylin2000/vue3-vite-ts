<script setup lang="ts">
import { ref } from "vue";
import type { IformData } from "../../utils/modules";
import http from "../../axios/axios";
let $emit = defineEmits(["handleSubmit", "handleCancel"]);
// 1. 用defineEmits定义事件名，得到emits对象
// 2.用emits函数指定事件名，并传递数据
// 3.父组件接收时，在子组件标签中触发子组件定义的事件，触发的函数的参数就是传递过来的值
// defineProps<{ msg: string }>()
// const formData = ref<IformData>({
//   goodsName: "",
//   goodsNum: 0,
//   checkState: false,
// });
const formData = ref<IformData>({} as IformData)
const refFormData = ref<any>(null);
// 确定按钮
const onSubmit = async () => {
  console.log("确定按钮");
  await refFormData.value.validate((valid: any) => {
    if (valid) {
      addDataInterface()
      $emit("handleSubmit", formData);
    }
    return false;
  });
};
// 调用添加商品接口
const addDataInterface = async () => {
  let res = await http.request("post", "/api/user/addData", {
    params: {
      name: formData.value.goodsName,
      count: formData.value.goodsNum,
      state: formData.value.checkState
    }
  })
  console.log(res, 'ggg');
  formData.value.goodsName = ''
  formData.value.goodsNum = 0
  formData.value.checkState = false
}
// 取消按钮
const cancel = () => {
  $emit("handleCancel");
};
// defineExpose({ formData, onsubmit})
</script>

<template>
  <div>
    <el-form
      :model="formData"
      ref="refFormData"
      label-width="auto"
      style="max-width: 500px"
    >
      <el-form-item label="商品名称" prop="goodsName" required>
        <el-input v-model="formData.goodsName" />
      </el-form-item>
      <el-form-item label="商品数量" prop="goodsNum" required>
        <el-input-number
          v-model="formData.goodsNum"
          :min="0"
        />
      </el-form-item>
      <el-form-item label="商品状态">
        <el-switch v-model="formData.checkState" />
      </el-form-item>
      <div class="flexBtn">
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<style scoped>
</style>
