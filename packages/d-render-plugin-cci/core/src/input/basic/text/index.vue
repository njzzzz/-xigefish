<template>
  <div :style="{width, fontWeight, fontSize, textAlign, ...inputStyle }" v-textarea="modelValue"></div>
</template>
<script>
import { useFormInput, formInputProps, fromInputEmits } from '@xigefish/d-render-shared'
import { computed } from 'vue'
import TextareaDirective from '@xigefish/components/directives/textarea'
export default {
  props: formInputProps,
  emits: [...fromInputEmits],
  directives: { [TextareaDirective.name]: TextareaDirective },
  setup (props, context) {
    const { width, securityConfig, inputStyle, ...formInput } = useFormInput(props, context)
    const fontWeight = computed(() => {
      return securityConfig.value.fontWeight ?? 'normal'
    })
    const fontSize = computed(() => {
      return securityConfig.value.fontSize + 'px' ?? '12px'
    })
    const textAlign = computed(() => {
      return securityConfig.value.textAlign ?? 'left'
    })

    return {
      ...formInput,
      ...context.attrs,
      inputStyle,
      width,
      fontWeight,
      fontSize,
      textAlign
    }
  }
}
</script>
