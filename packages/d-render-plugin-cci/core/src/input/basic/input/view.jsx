import { h } from 'vue'
import { useFormView, formInputViewProps } from '@xigefish/d-render-shared'

export default {
  props: formInputViewProps,
  setup (props) {
    const { inputStyle } = useFormView(props)
    return () => h('span', { style: inputStyle.value }, [props.modelValue])
  }
}
