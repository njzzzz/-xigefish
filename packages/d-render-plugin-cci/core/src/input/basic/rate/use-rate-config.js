import { computed, watch } from 'vue'

export const useRateConfig = (formInput) => {
  const { proxyValue, securityConfig } = formInput
  const max = computed(() => {
    return securityConfig.value.max ?? 5
  })

  const allowHalf = computed(() => {
    return securityConfig.value.allowHalf ?? false
  })

  watch([proxyValue, max], ([val]) => {
    if (val && val > max.value) {
      proxyValue.value = max.value
    }
  }, { immediate: true })

  return {
    max, allowHalf
  }
}
