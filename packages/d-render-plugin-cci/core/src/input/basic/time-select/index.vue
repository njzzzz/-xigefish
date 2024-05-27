<template>
  <time-select
    class="cip-form-picker"
    v-model="proxyValue"
    :disabled="disabled"
    :placeholder="placeholder"
    :style="{width}"
    :start="start"
    :end="end"
    :step="step"
    v-bind="attrs"
  />
</template>
<script>
import TimeSelect from '@xigefish/components/cip-time-select'
import { useFormInput, formInputProps, fromInputEmits } from '@xigefish/d-render-shared'
import { computed } from 'vue'
export default {
  components: { TimeSelect },
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, context) {
    const { securityConfig, ...formInput } = useFormInput(props, context)

    const attrs = computed(() => {
      return securityConfig.value.attrs ?? {}
    })
    const placeholder = computed(() => {
      return securityConfig.value.placeholder ?? ''
    })
    const width = computed(() => {
      return securityConfig.value.width ?? ''
    })
    const start = computed(() => {
      return securityConfig.value.start ?? '00:00'
    })
    const end = computed(() => {
      return securityConfig.value.end ?? '24:00'
    })
    const step = computed(() => {
      return securityConfig.value.step ?? '00:30'
    })

    return {
      ...formInput,
      attrs,
      start,
      end,
      step,
      placeholder,
      width
    }
  }
}
</script>
