import { formInputViewProps, fromInputEmits } from '@xigefish/d-render-shared'
import BasicSlider from './index'
export default {
  props: formInputViewProps,
  inheritAttrs: false,
  emits: [...fromInputEmits],
  setup (props) {
    return () => <BasicSlider modelValue={props.modelValue} config={props.config} disabled={true}/>
  }
}
