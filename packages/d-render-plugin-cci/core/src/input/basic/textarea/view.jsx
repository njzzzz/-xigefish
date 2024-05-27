import { h, withDirectives } from 'vue'
import textareaDirectives from '@xigefish/components/directives/textarea'
import { formInputViewProps, useFormView } from '@xigefish/d-render-shared'
export default {
  props: formInputViewProps,
  setup (props) {
    const { width, inputStyle } = useFormView(props)
    return () => withDirectives(h('div', { style: { ...inputStyle.value, width: width.value } }), [[textareaDirectives, props.modelValue]])
  }
}
