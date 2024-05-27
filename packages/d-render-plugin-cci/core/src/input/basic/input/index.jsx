import CipInput from '@xigefish/components/cip-input'
import { formInputProps, fromInputEmits, useFormInput } from '@xigefish/d-render-shared'
import { useInputConfig } from './use-input-config'
import { computed } from 'vue'
import { ElIcon } from 'element-plus'
import { Search } from '@element-plus/icons-vue'

export default {
  name: 'BasicInput',
  // components: { CipInput },
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, context) {
    const formInput = useFormInput(props, context, {
      toModelValue(val){
        if(props.config?.trim !== false && typeof val === 'string'){
          val = val.trim()
        }
        return val
      }
    })
    const { width, proxyValue, clearable, inputRef, securityConfig } = formInput
    const { placeholder, limit, showWordLimit } = useInputConfig(formInput)
    context.expose({
      focus: () => { inputRef.value.focus() }
    })
    // 给config.withSearch=true的，加个查询按钮图标
    const computedSlots = computed(() => {
      const _slots = securityConfig.value.slots || {}
      if (securityConfig.value.withSearch) {
        _slots.suffix = () => <ElIcon style="cursor: pointer" onClick={props.onSearch}><Search /></ElIcon>
      }
      return _slots
    })
    return () =>
      <CipInput
        v-model={proxyValue.value}
        placeholder={placeholder.value}
        disabled={props.disabled}
        style={{ width: width.value }}
        maxlength={limit.value}
        showWordLimit={showWordLimit.value && !!limit.value}
        clearable={clearable.value}
        v-slots={computedSlots.value}
        ref={inputRef}
      />
  }
}
