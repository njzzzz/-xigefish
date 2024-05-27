import { computed } from 'vue'
import { formInputProps, useFormView } from '@xigefish/d-render-shared'
export default {
  props: formInputProps,
  setup (props) {
    const { securityConfig } = useFormView(props)
    const viewValue = computed(() => {
      return props.modelValue.map(item => item[securityConfig.value.primaryKey]).join(securityConfig.value.splitKey)
    })
    return () => <div>{viewValue.value}</div>
  }
}
