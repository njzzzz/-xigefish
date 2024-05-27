import { ElCheckbox } from 'element-plus'
import { useFormInput, formInputProps, fromInputEmits } from '@xigefish/d-render-shared'
import { computed, h } from 'vue'
export default {
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, context) {
    const { proxyValue, securityConfig, ...formInput } = useFormInput(props, context)
    const option = computed(() => {
      return securityConfig.value.option
    })
    return () => h(ElCheckbox, {
      ...formInput,
      disabled: props.disabled,
      label: option.value.value,
      modelValue: props.modelValue === option.value.value,
      'onUpdate:modelValue': (val) => {
        if (val) {
          proxyValue.value = option.value.value ?? true
        } else {
          proxyValue.value = option.value.inactiveValue
        }
      }
    }, { default: () => `${option.value.label}` })
  }
}
