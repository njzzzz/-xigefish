import { computed } from 'vue'
import { isNotEmpty } from '@xigefish/d-render-shared'

export const useMultiple = (securityConfig) => {
  const multiple = computed(() => {
    if (isNotEmpty(securityConfig.value.checkType)) {
      console.warn('[deprecated]: form-input/select-table 不再支持checkType的配置，将在v5.x版本废弃，请使用multiple属性代替')
      return securityConfig.value.checkType === 'checkbox'
    }
    return securityConfig.value.multiple ?? true
  })
  return multiple
}
