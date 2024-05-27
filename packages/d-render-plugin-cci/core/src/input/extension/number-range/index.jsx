import BasicNumber from '../../basic/number'
import { useFormInput, formInputProps, fromInputEmits } from '@xigefish/d-render-shared'
import { useRange } from './use-range'
export default {
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, context) {
    const { width, securityConfig, proxyValue, proxyOtherValue } = useFormInput(props, context, { maxOtherKey: 1 })
    const { min, max, joint } = useRange(props)
    // range组件下放values会导致otherValue被modelValue覆盖掉
    const { modelValue, otherValue, values, ...otherProps } = props
    return () => <div class={'extension-number-range'} style={{ width: width.value }}>
      <BasicNumber
        {...otherProps}
        v-model={proxyValue.value}
        config={{
          ...securityConfig.value,
          max: max.value,
          placeholder: securityConfig.value.startPlaceholder
        }}
      />
      <span class={'extension-number-range__joint'}>{joint.value}</span>
      <BasicNumber
        {...otherProps}
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
