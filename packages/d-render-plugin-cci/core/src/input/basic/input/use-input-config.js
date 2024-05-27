import { computed } from 'vue'
import { getUsingConfig } from '@xigefish/d-render-shared'
import { useCipConfig, getFieldValue } from '@xigefish/d-render-shared'

export const useInputConfig = (formInput) => {
  const cipConfig = useCipConfig()
  const { securityConfig } = formInput
  const placeholder = computed(() => {
    return securityConfig.value.placeholder ?? ''
  })
  const limit = computed(() => {
    return getUsingConfig(
      securityConfig.value.limit,
      getFieldValue(cipConfig, 'limit.input')
    ) // props.config?.limit ?? cipConfig?.limit?.input ?? ''
  })
  const showWordLimit = computed(() => {
    return getUsingConfig(
      securityConfig.value.showWordLimit,
      // cipConfig.limit?.inputShowWordLimit,
      getFieldValue(cipConfig, 'limit.inputShowWordLimit'),
      true
    ) // securityConfig.value.showWordLimit ??  true
  })

  return {
    placeholder, limit, showWordLimit
  }
}
