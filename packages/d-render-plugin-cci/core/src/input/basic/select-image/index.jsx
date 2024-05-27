import { ElRadioGroup, ElRadio, ElCheckboxGroup, ElCheckbox } from 'element-plus'
import { useFormInput, useOptions } from '@xigefish/d-render-shared'
import { formInputProps, fromInputEmits } from '@xigefish/d-render-shared'
import { computed } from 'vue'
export default {
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, context) {
    const { width, securityConfig, updateStream } = useFormInput(props, context)
    const multiple = computed(() => {
      return securityConfig.value.multiple ?? false
    })
    const { options, optionProps, proxyOptionsValue } = useOptions(props, multiple, updateStream)
    const display = computed(() => {
      return securityConfig.value.display ?? 'inline-block'
    })
    const SelectComponent = computed(() => multiple.value ? ElCheckbox : ElRadio)
    const SelectComponentGroup = computed(() => multiple.value ? ElCheckboxGroup : ElRadioGroup)

    return () => <SelectComponentGroup.value
      v-model={proxyOptionsValue.value}
      style={{ width: width.value }}
      disabled={props.disabled}
    >
      {options.value.map(option => (
        <SelectComponent.value
          key={option[optionProps.value.value]}
          label={option[optionProps.value.value]}
          style={{ display: display.value ?? 0 }}
        >
          <img
            src={option[optionProps.value.label]}
            width={option.width ?? 64}
            style={'vertical-align: middle;'}
          />
        </SelectComponent.value>
      ))}
    </SelectComponentGroup.value>
  }
}
