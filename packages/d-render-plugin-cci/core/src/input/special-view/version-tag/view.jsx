import { h } from 'vue'
import { ElTag } from 'element-plus'
import { formInputViewProps } from '@xigefish/d-render-shared'
export default {
  props: formInputViewProps,
  setup (props) {
    const getValue = (modelValue) => {
      if (modelValue) return `V:${props.modelValue}`
      return '0'
    }
    return () => h(ElTag, { size: 'default' }, {
      default: () => getValue(props.modelValue)
    })
  }
}
