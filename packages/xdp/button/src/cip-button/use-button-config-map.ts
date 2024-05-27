import { computed } from 'vue'
import { useConfig } from '@xigefish/config'
import { defaultButtonConfigMap } from './config.js'
export const useButtonConfigMap = () => {
  const xdpConfig = useConfig()
  const buttonConfigMap = computed(() => {
    const result = {}
    const defaultKeys = Object.keys(defaultButtonConfigMap)
    defaultKeys.forEach(key => {
      const defaultButtonConfig = defaultButtonConfigMap[key]
      if (xdpConfig.buttonConfigMap?.[key]) {
        result[key] = Object.assign({}, defaultButtonConfig, xdpConfig.buttonConfigMap[key])
      } else {
        result[key] = defaultButtonConfig
      }
    })
    const globalButtonConfigMapKeys = Object.keys(xdpConfig.buttonConfigMap || {})
    if (globalButtonConfigMapKeys.length > 0) {
      globalButtonConfigMapKeys
        .filter(key => !defaultKeys.includes(key))
        .forEach(key => {
          result[key] = xdpConfig.buttonConfigMap[key]
        })
    }
    return result
  })
  return buttonConfigMap
}
