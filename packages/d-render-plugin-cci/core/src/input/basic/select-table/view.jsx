import { formInputViewProps, useFormView, useInputProps } from '@xigefish/d-render-shared'
import { CipTable } from '@xigefish/d-render'
import { computed } from 'vue'
import { useMultiple } from './use-multiple'
export default {
  props: formInputViewProps,
  setup (props) {
    const { securityConfig, width } = useFormView(props)
    const inputProps = useInputProps(props, [
      ['tableColumns', 'columns'],
      'optionProps'
    ])

    const multiple = useMultiple(securityConfig)

    const viewValue = computed(() => {
      if (multiple.value !== false) return props.modelValue || []
      if (!props.modelValue) return []
      return [props.modelValue]
    })

    return () => <CipTable
      {...inputProps.value}
      style={{ width: width.value }}
      data={viewValue.value}
      columns={securityConfig.value.tableColumns}
    />
  }
}
