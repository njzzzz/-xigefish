import { provide, inject } from 'vue'
const configKey = '@xigefish/page-layout'// Symbol('pageLayout')

export const useSetConfig = (pageConfig) => {
  provide(configKey, pageConfig)
}

export const useConfig = () => {
  return inject(configKey, {})
}
