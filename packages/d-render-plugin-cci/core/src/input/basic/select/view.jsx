import { computed, h } from 'vue'
import { formInputViewProps, fromInputEmits, useOptions, useFormView } from '@xigefish/d-render-shared'
import { isNotEmpty, isArray, isObject, getUsingConfig } from '@xigefish/d-render-shared'
export default {
  props: { ...formInputViewProps, multiple: Boolean, isTree: Boolean },
  emits: [...fromInputEmits],
  setup (props, ctx) {
    const { securityConfig, proxyOtherValue } = useFormView(props)
    const multiple = computed(() => {
      return getUsingConfig(securityConfig.value.multiple, props.multiple)
    })
    const { getValue, getOtherValue, optionProps, splitKey } = useOptions(
      props,
      multiple,
      undefined,
      undefined,
      {
        isTree: props.isTree
      }
    )

    const viewValue = computed(() => {
      if (isNotEmpty(proxyOtherValue[0]?.value)) return proxyOtherValue[0]?.value
      // TODO: 此处需要优化，应该由useOptions提供（临时性修复）
      const value = getValue(props.modelValue)
      const otherValue = getOtherValue(props.modelValue, value) // || props.modelValue
      if (isArray(otherValue)) {
        if (isObject(otherValue[0])) {
          return otherValue.map(i => i[optionProps.value.label]).join(`${splitKey.value} `)
        }
        return otherValue.join(`${splitKey.value} `)
      }
      if (isObject(otherValue)) {
        return otherValue[optionProps.value.value]
      }
      return otherValue
    })
    return () => h('span', {}, [viewValue.value])
  }
}
