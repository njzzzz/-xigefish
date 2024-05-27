import { h, computed, withDirectives } from 'vue'
import { formInputViewProps } from '@xigefish/d-render-shared'
import textareaDirective from '@xigefish/components/directives/textarea'
export default {
  props: formInputViewProps,
  inheritAttrs: false,
  setup (props) {
    const fontWeight = computed(() => {
      return props.config.fontWeight ?? 'normal'
    })
    const fontSize = computed(() => {
      return props.config.fontSize + 'px' ?? '12px'
    })
    const textAlign = computed(() => {
      return props.config.textAlign ?? 'left'
    })
    const width = computed(() => {
      return props.config.width ?? '100%'
    })
    return () => withDirectives(
      h('div', { style: { fontWeight: fontWeight.value, fontSize: fontSize.value, textAlign: textAlign.value, width: width.value } }),
      [[textareaDirective, props.modelValue]]
    )
  }
}
