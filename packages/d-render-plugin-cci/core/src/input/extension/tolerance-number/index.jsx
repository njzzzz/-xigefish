import BasicNumber from '../../basic/number'
import { useFormInput, formInputProps, fromInputEmits } from '@xigefish/d-render-shared'
export default {
  name: 'ToleranceNumber',
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, context) {
    const { proxyValue, proxyOtherValue, width } = useFormInput(props, context)
    return () => <div class={'extension-tolerance-number'} style={{ width: width.value }}>
      <BasicNumber v-model={proxyValue.value} disabled={props.disabled} config={props.config}/>
      <span class={'extension-tolerance-number__joint'}>±</span>
      <BasicNumber v-model={proxyOtherValue[0].value} disabled={props.disabled} config={{ ...props.config, noPrecision: true }}/>
    </div>
  }
}
