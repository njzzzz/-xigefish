import { computed } from 'vue'

export const useSliderConfig = (formInput) => {
  const { securityConfig } = formInput
  const min = computed(() => {
    return securityConfig.value.min
  })
  const max = computed(() => {
    return securityConfig.value.max
  })
  const step = computed(() => {
    return securityConfig.value.step
  })
  return {
    min, max, step
  }
}
