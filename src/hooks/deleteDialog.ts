
import { ElMessage, ElMessageBox } from "element-plus";
import type { ElMessageBoxOptions } from "element-plus";

export interface MsgBoxOptions extends ElMessageBoxOptions {
    confirmButtonText?: string;
    successText?: string;
    actionFn: (done: () => any) => any
}

export function useDeleteModal() {
    const deleteModal = (msgOption: MsgBoxOptions) => {
        ElMessageBox({
            customClass: msgOption.customClass || "useDeleteModal",
            title: msgOption.title || "删除",
            message: msgOption.message || "删除该数据，是否继续？",
            showCancelButton: true,
            confirmButtonText: msgOption.confirmButtonText || "删除",
            cancelButtonText: msgOption.cancelButtonText || "取消",
            cancelButtonClass: "cancel-btn",
            confirmButtonClass: msgOption.confirmButtonClass || "delete-btn",
            type: msgOption.type || "error",
            draggable: true,
            beforeClose: async (action, instance, done) => {
                if (action === "confirm") {
                    instance.confirmButtonLoading = true;
                    instance.confirmButtonText = msgOption.confirmButtonText ? msgOption.confirmButtonText + "中..." : "删除中...";
                    try {
                        await msgOption.actionFn(done);
                        ElMessage.success(msgOption.successText || "删除成功");
                    } catch (error) {
                        console.log(error);
                        instance.confirmButtonText = msgOption.confirmButtonText || "删除";
                    } finally {
                        instance.confirmButtonLoading = false;
                    }
                } else {
                    done();
                }
            }
        }).catch(() => { });
    }
    return {
        deleteModal
    }
}
