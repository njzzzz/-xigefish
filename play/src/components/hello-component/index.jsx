import { formInputProps } from '@xigefish/d-render-plugin-cci/esm/input/form-input-props'
import { useFormInput } from '@xigefish/components/hooks/form-input'
import { ElInput } from 'element-plus'

export default {
  name: 'HelloComponent',
  props: formInputProps,
  setup (props, context) {
    const FormInput = useFormInput(props, context)
    return () => <ElInput modelValue={props.modelValue} onUpdate:modelValue={(val)=>FormInput.emitModelValue(val)}/>
  }
}
