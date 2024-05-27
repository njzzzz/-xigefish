import SelectTime from '../../basic/time-select/mobile'
import { useFormInput, formInputProps, fromInputEmits } from '@xigefish/d-render-shared'
import { computed } from 'vue'
import { compareTime } from '@xigefish/d-render-plugin-cci/esm/input/basic/time-select/utils'

export default {
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, context) {
    const { proxyValue, proxyOtherValue } = useFormInput(props, context, { maxOtherKey: 1 })
    const end = computed(() => {
      if (props.otherValue) {
        return compareTime(props.otherValue, props.config?.end ?? '20:00') ? props.otherValue : props.config?.end
      }
      return props.config?.end
    })
    const start = computed(() => {
      if (props.modelValue) {
        return compareTime(props.modelValue, props.config?.start ?? '08:00') ? props.modelValue : props.config?.start
      }
      return props.config?.start
    })
    return () => <div style="display: flex; flex: 1">
      <SelectTime v-model={proxyValue.value}
        config={{ ...props.config, end: end.value }} />
      <span style="padding: 0px 8px;">至</span>
      <SelectTime v-model={proxyOtherValue[0].value}
        config={{ ...props.config, start: start.value }} />
    </div>
  }
}
