import { computed, provide, inject } from 'vue'
const pageConfigKey = '@xigefish/page-layout'
export const usePageLayout = () => {
  const cipPageConfig = inject(pageConfigKey, undefined)
  const inPageLayout = computed(() => {
    return !!cipPageConfig
  })
  return {
    inPageLayout
  }
}

export const useSetPageConfig = (pageConfig) => {
  provide(pageConfigKey, pageConfig)
}
