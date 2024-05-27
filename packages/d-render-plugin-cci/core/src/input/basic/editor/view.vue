<template>
  <div class="basic-editor-view" :style="{...inputStyle, width }" v-textarea="html"></div>
</template>

<script>
import { computed } from 'vue'
import textareaDirectives from '@xigefish/components/directives/textarea'
import { formInputViewProps, useFormView } from '@xigefish/d-render-shared'
export default {
  props: formInputViewProps,
  directives: {
    [textareaDirectives.name]: textareaDirectives
  },
  setup (props) {
    const { width, inputStyle } = useFormView(props)
    const html = computed(() => props.modelValue)
    return { html, width, inputStyle }
  }
}

</script>
