import CipUrlEditor from '@xigefish/components/cip-url-editor'
import { useFormInput, formInputProps, fromInputEmits } from '@xigefish/d-render-shared'
export default {
  name: 'BasicUrlEditor',
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, ctx) {
    const { securityConfig, width, proxyValue, proxyOtherValue } = useFormInput(props, ctx, { maxOtherKey: 3 })
    return () => <CipUrlEditor
      v-models={[
        [proxyValue.value, 'host'],
        [proxyOtherValue[0].value, 'protocol'],
        [proxyOtherValue[1].value, 'port'],
        [proxyOtherValue[2].value, 'path']
      ]}
      style={{ width: width.value }}
      portMin={securityConfig.value.portMin}
      portMax={securityConfig.value.portMax}
      disabledConfig={securityConfig.value.disabledConfig}
    />
  }
}
