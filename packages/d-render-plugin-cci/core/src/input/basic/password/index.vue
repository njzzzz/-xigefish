<template>
  <el-input v-model="proxyValue"
            ref="inputRef"
            :placeholder="placeholder"
            :disabled="disabled"
            :style="{width}"
            :maxlength="limit"
            :show-word-limit="showWordLimit && !!limit"
            show-password
            :clearable="clearable"></el-input>
</template>
<script>
import { ElInput } from 'element-plus'
import { useFormInput } from '@xigefish/d-render-shared'
import { formInputProps, fromInputEmits } from '@xigefish/d-render-shared'
import { computed } from 'vue'

export default {
  name: 'BasicInput',
  components: { ElInput },
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, context) {
    const { inputRef, proxyValue, ...formInput } = useFormInput(props, context)
    const placeholder = computed(() => {
      return props.config?.placeholder ?? ''
    })
    const limit = computed(() => {
      return props.config?.limit ?? ''
    })
    const showWordLimit = computed(() => {
      return props.config?.showWordLimit ?? true
    })

    return {
      ...formInput,
      inputRef,
      proxyValue,
      placeholder,
      limit,
      showWordLimit
    }
  }
}
</script>
