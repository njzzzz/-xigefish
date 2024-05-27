import { computed } from 'vue'
import { formInputViewProps } from '@xigefish/d-render-shared'
import { useOptions, useFormView } from '@xigefish/d-render-shared'
export default {
  props: formInputViewProps,
  setup (props) {
    const { securityConfig } = useFormView(props)
    const multiple = computed(() => {
      return securityConfig.value.multiple ?? false
    })
    const { options, optionProps, getValue } = useOptions(props, multiple)
    const viewValue = computed(() => {
      const values = [].concat(getValue(props.modelValue))
      return options.value?.filter(v => values.includes(v[optionProps.value.value]))
    })
    return () => <div>
      {viewValue.value.map(option => (
        <img
          class={'select-image-view__image'}
          key={option[optionProps.value.value]}
          src={option[optionProps.value.label]}
          width={securityConfig.value.width ?? 64}
          style={ 'vertical-align: middle;'}
        />
      ))}
    </div>
  }
}
