import CipCodeMirror from '@xigefish/code-mirror'
import { useFormInput, useInputProps,formInputProps, fromInputEmits } from '@xigefish/d-render-shared'

export default {
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, context) {
    const { proxyValue, width } = useFormInput(props, context, { maxOtherKey: 0 })
    // 注意取出的值为props.config的值
    const codeMirrorProps = useInputProps(props, [['codeType', 'type'], 'mode', ['height', { defaultValue: '300px' }], 'theme', 'lineNumbers', 'indentUnit'])
    return () => <CipCodeMirror
      style={{ width: width.value }}
      v-model={proxyValue.value}
      readonly={props.disabled}
      {...codeMirrorProps.value}
    />
  }
}
