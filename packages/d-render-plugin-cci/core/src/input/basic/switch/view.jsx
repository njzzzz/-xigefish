import { formInputViewProps } from '@xigefish/d-render-shared'
import BasicSwitch from './index'
export default {
  props: formInputViewProps,
  inheritAttrs: false,
  setup (props) {
    return () => <BasicSwitch modelValue={props.modelValue} config={props.config} disabled={true}/>
  }
}
