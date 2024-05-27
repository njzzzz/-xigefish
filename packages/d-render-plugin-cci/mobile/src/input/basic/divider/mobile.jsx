import { Divider as VantDivider } from 'vant'
import { formInputProps, useFormInput } from '@xigefish/d-render-shared'
export default {
  props: formInputProps,
  setup (props, context) {
    const { width } = useFormInput(props, context)
    return () => <VantDivider
      style={{ width: width.value, color: props.config.textColor, borderColor: props.config.dividerColor }}
      content-position={props.config?.contentPosition ?? 'center'}>
      {props.modelValue || props.config.defaultValue}
    </VantDivider>
  }
}
