<template>
  <div class="cip-divider"
    :class="[dividerClass, proxyValue ?? 'empty-divider']"
    :style="{
      ...inputStyle,
      width: width,
      height: config.dividerHeight,
      color: config.textColor,
      'border-color': config.dividerColor,
      'border-style': config.dividerType
    }">
    {{proxyValue}}
  </div>
</template>
<script>
import { computed } from 'vue'
import { formInputProps, useFormInput } from '@xigefish/d-render-shared'
export default {
  props: formInputProps,
  setup (props, context) {
    const formInput = useFormInput(props, context)
    const contentPosition = computed(() => {
      return props.config?.contentPosition ?? 'center'
    })
    const dividerClass = computed(() => {
      if (contentPosition.value === 'left') return 'divider-left'
      if (contentPosition.value === 'right') return 'divider-right'
      return ''
    })
    const proxyValue = computed(() => {
      return props.modelValue || props.config.defaultValue
    })
    return {
      ...formInput,
      dividerClass,
      proxyValue // 覆盖formInput中的proxyValue
    }
  }
}
</script>
