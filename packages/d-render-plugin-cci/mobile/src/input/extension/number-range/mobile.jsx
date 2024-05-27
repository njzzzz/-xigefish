import BasicNumberMobile from '../../basic/number/mobile'
import { useFormInput, formInputProps, fromInputEmits } from '@xigefish/d-render-shared'
import { useRange } from '@xigefish/d-render-plugin-cci/esm/input/extension/number-range/use-range'
export default {
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, context) {
    const { proxyValue, securityConfig, proxyOtherValue } = useFormInput(props, context)
    // min和max限制输入值大小
    const { min, max, joint } = useRange(props)
    return () => <div class={['extension-number-range', 'extension-number-range--mobile']}>
      <BasicNumberMobile
        v-model={proxyValue.value}
        config={{
          ...securityConfig.value,
          max: max.value,
          placeholder: securityConfig.value.startPlaceholder
        }}
      />
      <span style="padding: 0px 8px;">{joint.value}</span>
      <BasicNumberMobile
        v-model={proxyOtherValue[0].value}
        config={{
          ...securityConfig.value,
          min: min.value,
          placeholder: securityConfig.value.endPlaceholder
        }}
      />
    </div>
  }
}
