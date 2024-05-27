import { h } from 'vue'
import { formInputViewProps } from '@xigefish/d-render-shared'
export default {
  props: formInputViewProps,
  setup (props) {
    return () => h('span', {}, [`${props.modelValue ?? ''} - ${props.otherValue ?? ''}`])
  }
}
