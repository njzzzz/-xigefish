import { computed } from 'vue'
import { formInputViewProps, getFieldValue } from '@xigefish/d-render-shared'
import { getUsingConfig, isNotEmpty, addThousandSeparator } from '@xigefish/d-render-shared'
import { useCipConfig } from '@xigefish/components/hooks/use-cip-config'
export default {
  props: formInputViewProps,
  setup (props) {
    const cipConfig = useCipConfig()
    // 分隔符
    const separator = computed(() => {
      return getUsingConfig(
        props.config.separator,
        getFieldValue(cipConfig, 'number.thousandSeparator')
      )
    })
    // 精度
    const precision = computed(() => {
      return getUsingConfig(
        props.config.precision,
        getFieldValue(cipConfig, 'number.precision')
      )
    })
    // 展示数据
    const viewValue = computed(() => {
      let value = Number(props.modelValue)
      if (!isNaN(value)) {
        if (isNotEmpty(precision.value)) value = value.toFixed(precision.value)
        if (separator.value) value = addThousandSeparator(value, separator.value)
        return [value, props.config.unit]
      } else {
        return props.config.defaultValue ?? '-'
      }
    })
    return () => <div class={'basic-number--view'}>
      {viewValue.value}
    </div>
  }
}
