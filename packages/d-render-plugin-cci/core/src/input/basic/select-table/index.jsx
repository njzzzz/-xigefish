import { useFormInput, useInputProps, formInputProps, fromInputEmits } from '@xigefish/d-render-shared'
import { useMultiple } from './use-multiple'
import CipSelectTable from '@xigefish/components/cip-select-table'
export default {
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, context) {
    const { proxyValue, securityConfig, width } = useFormInput(props, context, { maxOtherKey: 1 })
    // 做一次兼容设置
    // checkType
    const multiple = useMultiple(securityConfig)

    const inputProps = useInputProps(props, [
      'direction',
      'multiple',
      'entity',
      'curdFn',
      'tableColumns',
      'searchFieldList',
      'optionProps',
      'hideSearch',
      'defaultSearchModel',
      'withPagination',
      'selectable',
      'searchAttrs'
    ])
    return () => <CipSelectTable
      {...inputProps.value}
      style={{ width: width.value }}
      multiple={multiple.value}
      v-model={proxyValue.value}
    />
  }
}
