import { Stepper as VanStepper } from 'vant'
import { useFormInput, formInputProps, fromInputEmits, isNotEmpty } from '@xigefish/d-render-shared'
import { computed } from 'vue'
export default {
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, context) {
    const { emitModelValue, placeholder, securityConfig, proxyValue } = useFormInput(props, context)
    // min和max限制输入值大小
    const emitInput = (val) => {
      if (props.config?.min && val && val < props.config.min) {
        val = props.config.min
      }
      if (props.config?.max && val && val > props.config.max) {
        val = props.config.max
      }
      if (val && props.config?.precision) {
        val = Number(val).toFixed(props.config?.precision ?? 0)
      }
      emitModelValue(val)
    }
    const precision = computed(() => {
      return !securityConfig.value.noPrecision ? (securityConfig.value.precision ?? 0) : undefined
    })
    return () => <VanStepper modelValue={proxyValue.value}
      onUpdate:modelValue={emitInput}
      default-value={securityConfig.value.defaultValue ?? 0}
      placeholder={placeholder.value}
      step={securityConfig.value.step ?? 1}
      min={securityConfig.value.min}
      max={securityConfig.value.max}
      decimal-length={precision.value}
    />
  }
}
