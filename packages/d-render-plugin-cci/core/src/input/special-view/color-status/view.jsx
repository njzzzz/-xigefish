import { formInputViewProps, fromInputEmits, useFormView, useOptions } from '@xigefish/d-render-shared'
import { computed } from 'vue'
import { isObject } from '@xigefish/d-render-shared'
export default {
  props: formInputViewProps,
  emits: fromInputEmits,
  setup (props) {
    const { securityConfig } = useFormView(props)
    const { getValue, options, optionProps } = useOptions(props, false)
    const viewOption = computed(() => {
      const value = getValue(props.modelValue)
      const currentOption = options.value.find(option => option[optionProps.value.value] === value) // || props.modelValue
      if (isObject(currentOption)) { // 防御性代码
        return {
          label: currentOption[optionProps.value.label],
          color: currentOption[optionProps.value.color ?? 'color']
        }
      }
      return { label: currentOption }
    })
    return () => <div class={'cip-color-status'} >
      {
        viewOption.value.color && <div class={'cip-color-status__color'} style={{
          width: securityConfig.value.dotSize,
          height: securityConfig.value.dotSize,
          background: viewOption.value.color
        }}/>
      }
      <div>{viewOption.value.label}</div>
    </div>
  }
}
