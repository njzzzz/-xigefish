import { ElTag } from 'element-plus'
import { formInputViewProps } from '@xigefish/d-render-shared'
import { useFormView, useOptions } from '@xigefish/d-render-shared'
import { computed } from 'vue'
import { getFieldValue, getValueByTemplate } from '@xigefish/d-render-shared'
export default {
  props: formInputViewProps,
  setup (props) {
    const { securityConfig, width } = useFormView(props)
    const multiple = computed(() => securityConfig.value.multiple)
    const { optionProps } = useOptions(props, false)
    return () => <div style={{ width: width.value }} class={'cip-select-object--view'}>
      {!multiple.value && getFieldValue(props.modelValue || {}, optionProps.value.label) }
      {multiple.value && <>
        {
          (props.modelValue || []).map(item => {
            const value = getFieldValue(item, optionProps.value.value) // 【注：】value不支持模版语法
            const label = optionProps.value.label.includes('$') ? getValueByTemplate(optionProps.value.label, item) : getFieldValue(item, optionProps.value.label) // 支持模版语法
            return <ElTag key={value}>{label}</ElTag>
          })
        }
      </> }
    </div>
  }
}
