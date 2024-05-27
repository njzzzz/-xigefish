import BasicNumberView from '../../basic/number/view'
import { formInputViewProps, useFormView } from '@xigefish/d-render-shared'
import { useRange } from './use-range'
export default {
  props: formInputViewProps,
  setup (props) {
    const { securityConfig, proxyOtherValue } = useFormView(props)
    const { joint } = useRange(props)
    // 此时min max 无效不需要特殊处理
    return () => <div class={['extension-number-range', 'extension-number-range--view']}>
      <BasicNumberView modelValue={props.modelValue} config={securityConfig.value}/>
      <span class={'extension-number-range__joint'}>{joint.value}</span>
      <BasicNumberView modelValue={proxyOtherValue[0].value} config={securityConfig.value}/>
    </div>
  }
}
