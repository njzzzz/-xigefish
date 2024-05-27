import { computed } from 'vue'
import { Field as VanField } from 'vant'
import { useFormInput, formInputProps, fromInputEmits, useCipConfig, getUsingConfig } from '@xigefish/d-render-shared'
export default {
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, context) {
    const cipConfig = useCipConfig()
    const { proxyValue, clearable, placeholder, securityConfig } = useFormInput(props, context)

    const limit = computed(() => {
      return getUsingConfig(securityConfig.value.limit, cipConfig.limit.textarea) // props.config?.limit ?? cipConfig?.limit?.textarea ?? ''
    })
    const autosize = computed(() => {
      if (props.config?.autosize) {
        const { minRows, maxRows } = props.config?.autosize
        return { minHeight: minRows * 30, maxHeight: maxRows * 30 }
      }
      return { minHeight: 60, maxHeight: 100 }
    })
    /* vant中clear使用的是touchStart事件，浏览器中click无效 */
    return () => <VanField
      v-model={proxyValue.value}
      type="textarea"
      clearable={clearable.value}
      placeholder={placeholder.value}
      autosize={autosize.value}
      maxlength={limit.value}
      show-word-limit={!!limit.value}
    />
  }
}
