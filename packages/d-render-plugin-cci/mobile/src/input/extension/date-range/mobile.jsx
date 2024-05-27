import { computed } from 'vue'
import BasicDate from '../../basic/date-picker/mobile'
import { useFormInput, formInputProps, fromInputEmits } from '@xigefish/d-render-shared'
export default {
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, context) {
    const { emitModelValue, emitOtherValue } = useFormInput(props, context)
    // 时间区间
    const currentYear = new Date().getFullYear()
    const minDate = computed(() => {
      return props.config?.minDate ?? new Date(currentYear - 10, 0, 1)
    })
    const maxDate = computed(() => {
      return props.config?.maxDate ?? new Date(currentYear + 10, 11, 31)
    })
    return () => <div style="display: flex;flex: 1">
      <BasicDate modelValue={props.modelValue}
        onUpdate:modelValue={emitModelValue}
        config={{ ...props.config, minDate: minDate.value, maxDate: props.otherValue }}
      />
      <span style="padding: 0px 8px;">至</span>
      <BasicDate modelValue={props.otherValue}
        onUpdate:modelValue={emitOtherValue}
        config={{ ...props.config, minDate: props.modelValue, maxDate: maxDate.value }}
      />
    </div>
  }
}
