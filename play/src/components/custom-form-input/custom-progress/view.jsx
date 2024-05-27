import { ElProgress } from 'element-plus'
import { useFormInput, formInputProps } from '@xigefish/d-render-shared'

export default {
  name: 'CipStatus',
  props: formInputProps,
  setup (props, context) {
    const { width } = useFormInput(props, context)
    return () => <ElProgress
      style={{ width: width.value }}
      percentage={props.modelValue}
      color='#19CC96'>
    </ElProgress>
  }
}
