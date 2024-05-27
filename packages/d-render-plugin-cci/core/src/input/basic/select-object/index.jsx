import { computed } from 'vue'
import { formInputProps, fromInputEmits } from '@xigefish/d-render-shared'
import { useFormInput, useInputProps, useOptions } from '@xigefish/d-render-shared'
import { ElSelect, ElOption } from 'element-plus'
import { getFieldValue, getValueByTemplate } from '@xigefish/d-render-shared'
export default {
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, context) {
    const { proxyValue, securityConfig, width, updateStream } = useFormInput(props, context, {
      fromModelValue: (val) => {
        if (multiple.value) {
          return (val || []).map(v => getFieldValue(v, optionProps.value.value))
        } else {
          return getFieldValue((val ?? {}), optionProps.value.value)
        }
      },
      toModelValue: (val) => {
        if (multiple.value) {
          return (val || []).map(v => options.value.find(option => v === option[optionProps.value.value]))
        } else {
          return options.value.find(option => val === option[optionProps.value.value])
        }
      }
    })
    const multiple = computed(() => securityConfig.value.multiple)
    const { options, optionProps } = useOptions(props, multiple, updateStream, context)
    const inputProps = useInputProps(props, [
      ['clearable', { defaultValue: true }],
      'collapseTags',
      'multipleLimit',
      ['placeholder', { defaultValue: '' }],
      'filterable'
    ])
    return () => <ElSelect
      {...inputProps.value}
      style={{ width: width.value }}
      v-model={proxyValue.value}
      multiple={multiple.value}
    >
      {
        options.value.map(option => {
          const value = getFieldValue(option, optionProps.value.value) // 【注：】value不支持模版语法
          const label = optionProps.value.label.includes('$') ? getValueByTemplate(optionProps.value.label, option) : getFieldValue(option, optionProps.value.label) // 支持模版语法
          return <ElOption
            key={value}
            value={value}
            label={label}
          />
        })
      }
    </ElSelect>
  }
}
