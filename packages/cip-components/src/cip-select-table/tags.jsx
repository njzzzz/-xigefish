import { ElTag } from 'element-plus'
const SelectTags = (props, { emit }) => {
  const valueKey = props.optionProps.value
  const labelKey = props.optionProps.label
  const getLabel = (row) => typeof props.optionProps.getLabel === 'function'
    ? props.optionProps.getLabel(row)
    : row[labelKey]
  return <>
    {
      props.modelValue.map((v, index) => <ElTag
        class={'cip-select-table__tag'}
        type={'info'}
        key={v[valueKey]}
        closable={true}
        onClose={() => emit('remove', index)}
      >
        {getLabel(v)}
      </ElTag>)
    }
  </>
}
SelectTags.props = {
  modelValue: {
    type: Array,
    default: () => []
  },
  optionProps: {
    type: Object
  },
  multiple: Boolean
}
SelectTags.emits = ['remove']

export default SelectTags
