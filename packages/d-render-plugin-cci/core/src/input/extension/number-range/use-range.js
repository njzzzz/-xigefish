import { computed } from 'vue'
import { isEmpty } from '@xigefish/d-render-shared'

export const useRange = (props, defaultJoint = '与') => {
  const min = computed(() => {
    const configMin = props.config?.min
    // 如果modelValue不存在 直接返回配置的min
    if (isEmpty(props.modelValue)) return configMin
    // 如果modelValue存在但configMin不存在
    if (isEmpty(configMin)) return props.modelValue
    // 如果modelValue存在 configMin也存在
    return props.modelValue > configMin ? props.modelValue : configMin
  })
  const max = computed(() => {
    const configMax = props.config?.max
    if (isEmpty(props.otherValue)) return configMax
    if (isEmpty(configMax)) return props.otherValue
    return props.otherValue > configMax ? configMax : props.otherValue
  })
  const joint = computed(() => {
    return props.config?.joint ?? defaultJoint
  })
  return {
    min, max, joint
  }
}
