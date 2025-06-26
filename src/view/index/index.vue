<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import http from "../../axios/axios";
import type { ITableData } from "../../utils/modules";
import addDialog from "./addDialog.vue";
import { useDeleteModal } from '../../hooks/deleteDialog'

const tableData = ref<ITableData[]>([] as ITableData[]);
// defineProps<{ msg: string }>()
onMounted(async () => {
  getTableData()
});
// 获取表格数据
const loading = ref<boolean>(false)
const getTableData = async () => {
  loading.value = true
  let { data } = await http.request<{ data: { result: ITableData[] } }>(
    "get",
    "/api/user/getData"
  );
  tableData.value = data.result;
  loading.value = false
}
// 商品数量事件
const handleChangeNum = (e: number | undefined): void => {
  console.log(e);
};

// 获取核对数数
const checkedTotal = computed<number>(
  () => tableData.value.filter((item) => item.state).length
);
const unCheckedTotal = computed<number>(
  () => tableData.value.filter((v) => !v.state).length
);
// 库存总数量
const total = computed<number>(() =>
  tableData.value.reduce((acc, cur) => acc + cur.count, 0)
);
// 已核对库存数量
const checkedNum = computed<number>(() =>
  tableData.value.reduce((acc, cur) => acc + (cur.state ? cur.count : 0), 0)
);
// 未核对库存数量
const unCheckedNum = computed<number>(() =>
  tableData.value.reduce((acc, cur) => acc + (!cur.state ? cur.count : 0), 0)
);
// 控制弹窗变量
const dialogVisible = ref<boolean>(false)
// 点击添加按钮
const addDialogVisible = () => {
  dialogVisible.value = true
}
// 自定义事件确定关闭弹窗
const handleSubmit = (e: any) => {
  console.log(e, 'hhh');
  getTableData()
  dialogVisible.value = false
}
// 自定义事件取消按钮关闭弹窗
const cancel = () => {
  dialogVisible.value = false
}
// 单选/多选框点击事件
const selectData = ref<ITableData[]>([] as ITableData[])
const handleSelectionChange = (e: ITableData[]) => {
  console.log(e, 'nnn');
  selectData.value = e
}
// 点击批量删除按钮
const { deleteModal } = useDeleteModal()
const deleteData = async () => {
  deleteModal({
    title: "批量删除",
    message: "确定要删除选中的数据吗？",
    actionFn: async (done) => {
      let { data } = await http.request<{ data: { code: number } }>("post", "/api/user/deleteData", {
        params: selectData.value
      })
      if (data.code === 200) {
        getTableData()
        done() // 关闭弹窗
      }
    }
  })
  // let { data } = await http.request("post", "/api/user/deleteData", {
  //   params: selectData.value
  // })
  // if (data.code === 200) {
  //   getTableData()
  // }
}
// 弹窗事件
const handleClose = () => {
  console.log('ggg');
}
// 查看
const handleView = (index:string, row:object) => {
  console.log(index, row);
}
// 删除
const handleDelete = (index:string, row:object) => {
  console.log(index, row);
}
</script>

<template>
  <div id="home">
    <el-card style="width: 100%; height: 100%">
      <div style="display: flex; justify-content: space-around">
        <el-row>
          <el-col>
            <el-result icon="success" title="录入总数">
              <template #extra>
                {{ tableData.length }}
              </template>
            </el-result></el-col>
        </el-row>
        <el-row>
          <el-col><el-result icon="success" title="已核对数">
              <template #extra>
                {{ checkedTotal }}
              </template>
            </el-result></el-col>
        </el-row>
        <el-row>
          <el-col><el-result icon="success" title="未核对数">
              <template #extra>
                {{ unCheckedTotal }}
              </template>
            </el-result></el-col>
        </el-row>
      </div>
      <div class="btn">
        <el-button @click="addDialogVisible" type="primary">添加</el-button>
        <el-button @click="deleteData" type="danger">批量删除</el-button>
      </div>
      <el-table :data="tableData" v-loading="loading" border @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column type="selection" />
        <el-table-column prop="name" label="商品名称" />
        <el-table-column prop="count" label="商品数量">
          <template #default="scope">
            <el-input-number v-model="scope.row.count" :min="0" @change="handleChangeNum" />
          </template>
        </el-table-column>
        <el-table-column prop="state" label="是否核对">
          <template #default="scope">
            <el-switch v-model="scope.row.state" class="ml-2" style="
                --el-switch-on-color: #13ce66;
                --el-switch-off-color: #ff4949;
              " />
          </template>
        </el-table-column>
        <el-table-column prop="state" label="核对状态">
          <template #default="scope">
            <el-tag :type="scope.row.state ? 'success' : 'danger'">{{
              scope.row.state ? "已核对" : "未核对"
              }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="操作">
          <template #default="scope">
            <el-button size="small" type="success" @click="handleView(scope.$index, scope.row)">
              查看
            </el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer">
        库存总数量<el-tag type="primary">{{ total }}</el-tag>
        已核对库存数量<el-tag type="success">{{ checkedNum }}</el-tag>
        未核对库存数量<el-tag type="warning">{{ unCheckedNum }}</el-tag>
      </div>

      <div>
        <el-dialog v-model="dialogVisible" title="Tips" width="500" :before-close="handleClose">
          <addDialog @handleSubmit="handleSubmit" @handleCancel="cancel"></addDialog>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.el-result :deep() .el-result__extra {
  margin-top: 2px;
}

.footer {
  margin-top: 20px;
}

.btn {
  margin: 20px 0;
}
</style>
