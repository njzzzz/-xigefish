import { computed, provide, inject } from 'vue'
const pageConfigKey = 'cip-page-config'
export const usePageLayout = (props = {}) => {
  const cipPageConfig = inject(pageConfigKey, undefined)
  const inPageLayout = computed(() => {
    // 当忽略时直接返回false
    return !!cipPageConfig && !props.ignoreParentLayout
  })
  return {
    inPageLayout
  }
}
// 设置config
export const useSetPageConfig = (pageConfig) => {
  provide(pageConfigKey, pageConfig)
}
// 使用config
export const usePageConfig = () => {
  return inject(pageConfigKey, {})
}
