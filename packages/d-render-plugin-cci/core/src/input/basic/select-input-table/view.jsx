import { formInputViewProps } from '@xigefish/d-render-shared'
import { useFormView } from '@xigefish/d-render-shared'
export default {
  props: formInputViewProps,
  setup (props) {
    const { proxyOtherValue } = useFormView(props)
    return () => (
      <span>{proxyOtherValue[0]?.value || props.modelValue}</span>
    )
  }
}
