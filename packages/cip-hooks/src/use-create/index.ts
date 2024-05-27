import { useRetrieve } from "@xigefish/hooks/use-retrieve";
import { unref, ref, Ref } from "vue";
import { ElMessage } from "element-plus";
import { IAnyObject } from "@xigefish/hooks/ts-utils";
export type TCreateItem = <T extends IAnyObject = IAnyObject>(
  initValue?: T
) => void;
export type TSaveItem = <D extends any = any>(
  resolve: PromiseConstructor["resolve"],
  reject: PromiseConstructor["reject"]
) => Promise<TEntityFunctionReturnType<D>>;
export function useFormDialog<
  TFormItem,
  TOpenDialogArgs extends [IAnyObject, string]
>(params: {
  beforeOpen: (...args: TOpenDialogArgs) => void;
}): {
  dialog: Ref<boolean>;
  openDialog: (...args: TOpenDialogArgs) => void;
  formItem: Ref<TFormItem>;
  onConfirm: (
    resolve: PromiseConstructor["resolve"],
    reject: PromiseConstructor["reject"]
  ) => void;
};
export function useFormDialog(params) {
  const { beforeOpen = () => {}, submit = () => {} } = params;
  const dialog = ref(false);
  const formItem = ref({});
  const openDialog = (params, type) => {
    beforeOpen(params, type);
    dialog.value = true;
  };
  const onConfirm = async (resolve, reject) => {
    try {
      await submit();
      resolve();
    } catch (e) {
      reject(e);
    }
  };
  return {
    dialog,
    openDialog,
    formItem,
    onConfirm,
  };
}
export interface TEntityFunctionReturnType<D> {
  data: D;
  offset: number;
  total: number;
  pageNum: number;
  message: string;
}
export interface IEntityFunction<
  D extends any = any,
  P extends IAnyObject = any
> {
  (param?: P): Promise<Partial<TEntityFunctionReturnType<D>>>;
  (param: P, config: { limit: number; offset: number }): Promise<
    Partial<TEntityFunctionReturnType<D>>
  >;
}
export type TUseCreateEntityType = Record<string, IEntityFunction>;
type TUseCreateEntityTypeWithCreate = { create: IEntityFunction } & Record<
  string,
  IEntityFunction
>;
export function useCreate<
  E extends TUseCreateEntityType = TUseCreateEntityType
>(
  Entity: E,
  params: {
    pageFn: keyof E;
    createFn: keyof E;
    infoFn: keyof E;
    itemType: string | number;
  }
): ReturnType<typeof useRetrieve> & {
  createItem: TCreateItem;
  saveItem: TSaveItem;
};
export function useCreate<
  E extends TUseCreateEntityTypeWithCreate = TUseCreateEntityTypeWithCreate
>(
  Entity: E,
  params: {
    pageFn: keyof E;
    infoFn: keyof E;
    itemType: string | number;
  }
): ReturnType<typeof useRetrieve> & {
  createItem: TCreateItem;
  saveItem: TSaveItem;
};
export function useCreate(Entity, params) {
  const { itemType, pageFn, infoFn, createFn = "create" } = params || {};
  const Retrieve = useRetrieve(Entity, { itemType, pageFn, infoFn });
  const { item, dialogType, showOnly, itemDialog } = Retrieve;
  const createItem: TCreateItem = (initValue) => {
    item.value = initValue || {};
    dialogType.value = "新增";
    showOnly.value = false;
    itemDialog.value = true;
  };
  const saveItem: TSaveItem = async (resolve, reject) => {
    try {
      const method = unref(createFn);
      const res = await unref(Entity)[method](item.value);
      ElMessage({ type: "success", message: res.message });
      // eslint-disable-next-line no-unused-expressions
      resolve?.(res);
      return res;
    } catch (e) {
      // eslint-disable-next-line no-unused-expressions
      reject?.(e);
      throw e;
    }
  };
  return {
    ...Retrieve,
    createItem,
    saveItem,
  };
}
