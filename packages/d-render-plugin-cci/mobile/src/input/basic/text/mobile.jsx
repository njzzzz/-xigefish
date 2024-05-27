import { computed } from 'vue'
import { useFormInput, formInputProps, fromInputEmits } from '@xigefish/d-render-shared'
export default {
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, context) {
    const { width } = useFormInput(props, context)
    const fontWeight = computed(() => {
      return props.config.fontWeight ?? 'normal'
    })
    const fontSize = computed(() => {
      return props.config.fontSize + 'px' ?? '12px'
    })
    const textAlign = computed(() => {
      return props.config.textAlign ?? 'left'
    })
    return () => <div style={{ width: width.value, fontWeight: fontWeight.value, fontSize: fontSize.value, textAlign: textAlign.value }}>
      {props.modelValue}
    </div>
  }
}
