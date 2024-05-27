import BasicNumberView from '../../basic/number/view'
import { useFormView, formInputViewProps } from '@xigefish/d-render-shared'
export default {
  name: 'ToleranceNumberView',
  props: formInputViewProps,
  setup (props) {
    const { proxyOtherValue, width } = useFormView(props)
    return () => <div class={'extension-tolerance-number'} style={{ width: width.value }}>
      <BasicNumberView modelValue={props.modelValue} config={props.config}/>
      <span class={'extension-tolerance-number__joint'}>±</span>
      <BasicNumberView modelValue={proxyOtherValue[0].value} config={{ ...props.config, noPrecision: true }}/>
    </div>
  }
}
