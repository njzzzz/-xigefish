import { computed } from 'vue'
import { isNotEmpty } from '@xigefish/d-render-shared'
import { formInputViewProps, useOptions } from '@xigefish/d-render-shared'
export default {
  props: formInputViewProps,
  setup (props) {
    const { options, optionProps } = useOptions(props)
    const showValue = computed(() => {
      return isNotEmpty(props.otherValue) ? props.otherValue : showLabel(options.value)
    })
    const showLabel = (options) => {
      // eslint-disable-next-line
      for (const option of options) {
        if (option[optionProps.value.value] === props.modelValue) {
          return option[optionProps.value.label]
        }
        const children = option[optionProps.value.children]
        if (children) {
          const label = showLabel(children)
          if (label) return label
        }
      }
    }
    return () => <span>{showValue.value}</span>
  }
}
