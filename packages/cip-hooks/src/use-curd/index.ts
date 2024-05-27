import { useRetrieve } from "@xigefish/hooks/use-retrieve";
import { cloneDeep } from "@xigefish/d-render-shared";
import { unref, ref, Ref, MaybeRef, UnwrapRef } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { TUseCreateEntityType, TSaveItem } from "@xigefish/hooks/use-create";
import { IAnyObject } from "@xigefish/hooks/ts-utils";
export type TAnyFunction = (...args: any) => any;
type TInfo = { _updateLoading?: boolean; id?: boolean | string | number };
type TCurdCreateItem = <InitValue extends IAnyObject = IAnyObject>(
  initValue?: InitValue,
  type?: string
) => void;
type ICurdEditItem<I extends TInfo = TInfo> = (
  ...args: [I, boolean?, string?]
) => void;
type TCurdDelete = <I extends TInfo>(
  info: I,
  message: string,
  rewrite: boolean,
  confirmed: boolean
) => void;
type TDeleteItemList = <ItemList extends any[]>(
  beforeDelete: () => ItemList
) => void;
type TUseCurdConfig<E> = {
  itemType?: string;
  pageFn: MaybeRef<keyof UnwrapRef<E>>;
  infoFn: MaybeRef<keyof UnwrapRef<E>>;
  createFn?: MaybeRef<keyof UnwrapRef<E>>;
  updateFn?: MaybeRef<keyof UnwrapRef<E>>;
  deleteFn?: MaybeRef<keyof UnwrapRef<E>>;
  batchDeleteFn?: MaybeRef<keyof UnwrapRef<E>>;
  saveBefore?: <TItem, MTItem>(
    item: TItem,
    reject: PromiseConstructor["reject"]
  ) => Promise<MTItem>;
  saveAfter?: <TItem, T>(item: TItem) => Promise<T>;
  editBefore?: <TItem, MItem>(item: TItem) => Promise<MItem>;
  showBefore?: <TItem, MItem>(item: TItem) => Promise<MItem>;
  pageBefore?: <TItem, MTItem>(item: TItem) => Promise<MTItem>;
  pageAfter?: <TRes, MTRes>(item: TRes) => Promise<MTRes>;
  judgeUpdate?: any;
};
export function useCurd<E extends TUseCreateEntityType = TUseCreateEntityType>(
  Entity: E,
  config: TUseCurdConfig<MaybeRef<E>>
): ReturnType<typeof useRetrieve> & {
  createItem: TCurdCreateItem;
  saveItem: TSaveItem;
  isUpdate: Ref<boolean>;
  editItem: ICurdEditItem;
  updateItem: ICurdEditItem;
  deleteItem: TCurdDelete;
  deleteItemList: TDeleteItemList;
};
export function useCurd<E extends TUseCreateEntityType = TUseCreateEntityType>(
  Entity: E,
  config: TUseCurdConfig<MaybeRef<E>>
) {
  const {
    itemType = "",
    pageFn,
    infoFn,
    createFn = "create",
    updateFn = "update",
    deleteFn = "delete",
    batchDeleteFn = "batchDelete",
    saveBefore,
    saveAfter,
    editBefore,
    showBefore,
    pageBefore,
    pageAfter,
  } = config ?? {};

  let judgeUpdate = config.judgeUpdate;
  const Retrieve = useRetrieve(Entity, {
    itemType,
    pageFn,
    infoFn,
    showBefore,
    pageBefore,
    pageAfter,
  });
  const { item, dialogType, showOnly, itemDialog, getItem, getItemList } =
    Retrieve;
  const isUpdate = ref(false);
  if (!judgeUpdate) {
    judgeUpdate = () => item.value.id;
  }
  const createItem: TCurdCreateItem = (initValue: {} = {}, type = "新增") => {
    isUpdate.value = false; // 设置更新标记
    item.value = { ...initValue };
    dialogType.value = type;
    showOnly.value = false;
    itemDialog.value = true;
  };
  /**
   * @deprecated
   */
  const editItem: ICurdEditItem = (...args) => {
    updateItem(...args);
  };
  const updateItem: ICurdEditItem = async (
    info,
    fetch = false,
    type = "编辑"
  ) => {
    if (typeof editBefore === "function") {
      info = await editBefore(cloneDeep(info));
    }
    isUpdate.value = true; // 设置更新标记
    try {
      if (fetch) {
        // 接口请求时间过长将导致页面卡顿且无提示，故加入_loading
        info._updateLoading = true;
        try {
          const { data } = await getItem(info);
          item.value = data;
          // eslint-disable-next-line no-useless-catch
        } catch (e) {
          // 抛出错误
          throw e;
        } finally {
          info._updateLoading = false;
        }
      } else {
        item.value = cloneDeep(info);
      }
      dialogType.value = type;
      showOnly.value = false;
      itemDialog.value = true;
    } catch (e) {}
  };
  // 保存修改或新建
  const saveItem = async (resolve, reject) => {
    try {
      if (typeof saveBefore === "function") {
        item.value = await saveBefore(item.value, reject);
      }
      const method = judgeUpdate() ? unref(updateFn) : unref(createFn);
      const res = await unref(Entity)[method](item.value);
      ElMessage({ type: "success", message: res.message });
      getItemList();
      // eslint-disable-next-line no-unused-expressions
      resolve?.(res);
      if (typeof saveAfter === "function") {
        await saveAfter({ ...item.value, ...res.data });
      }
      return res;
    } catch (e) {
      // eslint-disable-next-line no-unused-expressions
      reject?.(e);
    }
  };

  const deleteItem: TCurdDelete = async (
    info,
    message,
    rewrite = false,
    confirmed
  ) => {
    const confirmMessage = rewrite ? message : `确认删除 ${message || ""}`;
    try {
      if (!confirmed) {
        await ElMessageBox.confirm(confirmMessage, "提示", { type: "warning" });
      }
      try {
        const { message } = await unref(Entity)[unref(deleteFn)](info);
        ElMessage({ type: "success", message });
        getItemList();
      } catch (e) {
        console.error(e);
      }
    } catch (e) {
      console.info("取消删除");
    }
  };

  const deleteItemList: TDeleteItemList = async (beforeDelete) => {
    // 此处itemList为内部变量非Retrieve中的itemList
    const itemList = unref(beforeDelete?.()) || [];
    if (!itemList || itemList.length === 0) {
      ElMessage.error(
        `需要选择至少一条${unref(itemType) ?? "数据"}后再进行批量删除`
      );
      return;
    }
    try {
      await ElMessageBox.confirm("确认批量删除已选项", "提示", {
        type: "warning",
      });
      try {
        const { message } = await unref(Entity)[unref(batchDeleteFn)](itemList);
        ElMessage.success({ type: "success", message });
        getItemList();
      } catch (e) {
        console.error(e);
      }
    } catch (e) {
      console.info("取消批量删除");
    }
  };

  return {
    ...Retrieve,
    isUpdate,
    createItem,
    editItem,
    updateItem,
    saveItem,
    deleteItem,
    deleteItemList,
  };
}

