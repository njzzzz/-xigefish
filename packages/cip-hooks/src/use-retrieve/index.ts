import { MaybeRef, UnwrapRef, computed, ref, unref } from "vue";
import { debounce } from "@xigefish/d-render-shared";
import { cloneDeep } from "@xigefish/d-render-shared";
import {
  TEntityFunctionReturnType,
  TUseCreateEntityType,
} from "@xigefish/hooks/use-create";
/**
 * 分页hook
 */
export const usePaging = ({
  offset: initOffset = 0,
  limit: initLimit = 10,
}) => {
  const offset = ref(initOffset);
  const limit = ref(initLimit);
  const total = ref(0);
  const currentPage = ref(1);
  return {
    offset,
    limit,
    total,
    currentPage,
  };
};
interface IUseRetrieveConfig<E> {
  itemType: string | number;
  pageFn?: MaybeRef<keyof UnwrapRef<E>>;
  infoFn?: MaybeRef<keyof UnwrapRef<E>>;
  limit?: number;
  showBefore?: <TItem, MItem>(item: TItem) => Promise<MItem>;
  pageBefore?: <TItem, MTItem>(item: TItem) => Promise<MTItem>;
  pageAfter?: <TRes, MTRes>(item: TRes) => Promise<MTRes>;
}
/**
 * 列表页hook
 */
export const useRetrieve = <
  E extends TUseCreateEntityType,
  C extends IUseRetrieveConfig<MaybeRef<E>>,
>(
  Entity: MaybeRef<E>,
  config: C
) => {
  const {
    itemType,
    showBefore,
    pageBefore,
    pageAfter,
    pageFn = "page",
    infoFn = "info",
    limit: initLimit = 10,
  } = config ?? {};
  const { offset, limit, total, currentPage } = usePaging({
    offset: 0,
    limit: initLimit,
  });

  const listLoading = ref(false);
  const itemList = ref([]);
  const item = ref<{id?: string | number | boolean}>({});
  const showOnly = ref(false);
  const itemDialog = ref(false);
  const dialogType = ref("");
  const searchFilter = ref({});
  const defaultSearchFilter = ref({});
  const dialogTitle = computed(() => {
    return `${dialogType.value}${itemType}`;
  });

  const getItemList = debounce(
    async (params = {}) => {
      try {
        listLoading.value = true;
        let filter = {
          ...defaultSearchFilter.value, // 默认搜索条件
          ...searchFilter.value, // 搜索条件
          ...params // 调用是传入的雕件
        };
        if (typeof pageBefore === "function") {
          try {
            filter = await pageBefore(filter);
          } catch (e) {
            console.error("[Lifecycle pageBefore]", e);
          }
        }
        let res = await unref(Entity)[unref(pageFn)](
          filter,
          { offset: offset.value, limit: limit.value }
        );
        if (typeof pageAfter === "function") {
          try {
            res = await pageAfter(res);
          } catch (e) {
            console.error("[Lifecycle pageAfter]", e);
          }
        }
        itemList.value = res.data || [];
        offset.value = res.offset || 0;
        total.value = res.total || 0;
        currentPage.value = res.pageNum || 1;
      } finally {
        listLoading.value = false;
      }
    },
    50,
    false
  );

  const getItem = <ResponseDataType, TItem>(
    row: TItem
  ): Promise<
    Partial<Pick<TEntityFunctionReturnType<ResponseDataType>, "data">>
  > => {
    return unref(Entity)[unref(infoFn)](row);
  };

  const showItem = async <TItem>(row: TItem, fetch = false) => {
    if (typeof showBefore === "function") {
      row = await showBefore(cloneDeep(row));
    }
    try {
      if (fetch) {
        const { data } = await getItem(row);
        item.value = data;
      } else {
        item.value = row; // 查看时不需要深克隆，此处不应该对row进行任何的修改
      }
      dialogType.value = "查看";
      showOnly.value = true;
      itemDialog.value = true;
    } catch (err) {}
  };
  const search = () => {
    offset.value = 0;
    getItemList();
  };
  return {
    itemType,
    listLoading,
    itemList,
    item,
    itemDialog,
    dialogTitle,
    dialogType,
    showOnly,
    offset,
    limit,
    total,
    currentPage,
    searchFilter,
    defaultSearchFilter,
    getItemList,
    getItem,
    showItem,
    search,
  };
};

