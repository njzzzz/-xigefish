import { inject, provide, reactive } from "vue";
const ownPrivilegesKey = Symbol("ownPrivileges");
export const useCollectPrivileges = (value: (string | number)[]) => {
  provide(ownPrivilegesKey, reactive({ value }));
};
export const usePrivileges = () => {
  return inject(ownPrivilegesKey, { value: [] });
};
