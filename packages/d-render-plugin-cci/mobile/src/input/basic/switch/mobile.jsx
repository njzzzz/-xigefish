import { Switch as VanSwitch } from 'vant'
import { useFormInput, formInputProps, fromInputEmits, isNotEmpty, isEmpty } from '@xigefish/d-render-shared'
import { computed } from 'vue'
export default {
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, context) {
    const { proxyValue, securityConfig } = useFormInput(props, context)
    const isValueEmpty = (value) => {
      return isEmpty(value) || value === ''
    }
    // 判断是否设置了activeValue
    const active = computed(() => {
      return !isValueEmpty(securityConfig.value.activeValue) ? proxyValue.value === securityConfig.value.activeValue : proxyValue.value
    })
    const activeValue = computed(() => {
      return isValueEmpty(securityConfig.value.activeValue) ? true : securityConfig.value.activeValue
    })
    const inactiveValue = computed(() => {
      return isValueEmpty(securityConfig.value.inactiveValue) ? false : securityConfig.value.inactiveValue
    })
    return () => <div class={'switch-m--wrapper'}>
      {
        isNotEmpty(securityConfig.value.inactiveText) && <lablel class={`switch-m--wrapper--label ${active.value ? '' : 'active'}`}>{securityConfig.value.inactiveText}</lablel>
      }
      <VanSwitch
        v-model={proxyValue.value}
        disabled={securityConfig.value.disabled}
        activeValue={activeValue.value}
        inactiveValue={inactiveValue.value}
      />
      {
        isNotEmpty(securityConfig.value.activeText) && <lablel class={`switch-m--wrapper--label ${active.value ? 'active' : ''}`}>{securityConfig.value.activeText}</lablel>
      }
    </div>
  }
}
