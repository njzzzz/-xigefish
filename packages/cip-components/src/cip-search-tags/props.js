export const props = {
  modelValue: {},
  disabled: Boolean,
  config: {
    type: Object,
    default: () => ({})
  },
  multiple: {
    type: Boolean,
    default: true
  },
  optionProps: {
    type: Object,
    default: () => ({
      label: 'label',
      value: 'value',
      number: 'number',
      hideNumber: true
    })
  },
  options: {
    type: Array,
    default: () => []
  }
}
