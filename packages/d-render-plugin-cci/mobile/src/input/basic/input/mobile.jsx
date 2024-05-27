import { watch } from 'vue'
import { Field as VanField } from 'vant'
import { useFormInput, formInputProps, fromInputEmits, useElementFormEvent } from '@xigefish/d-render-shared'
import { useInputConfig } from '@xigefish/d-render-plugin-cci/esm/input/basic/input/use-input-config'
export default {
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, context) {
    const formInput = useFormInput(props, context)
    const { handleBlur, handleChange } = useElementFormEvent()
    const { width, proxyValue, clearable } = formInput
    const { placeholder, limit, showWordLimit } = useInputConfig(formInput)
    watch(proxyValue, (val) => {
      handleChange(val)
    })
    return () => <VanField
      v-model={proxyValue.value}
      placeholder={placeholder.value}
      disabled={props.disabled}
      style={{ width: width.value }}
      maxLength={limit.value}
      showWordLimit={showWordLimit.value}
      clearable={clearable.value}
      onBlur={() => handleBlur(proxyValue.value)}
    />
  }
}
