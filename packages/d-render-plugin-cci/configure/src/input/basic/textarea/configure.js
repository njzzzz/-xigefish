import { basicInputConfigureOptions } from '@xigefish/d-render-shared'

export default {
  ...basicInputConfigureOptions(),
  placeholder: {
    type: 'input', // 'formExpressionInput',
    inputType: 'textarea',
    mode: 'append' // 开启值追加模式
  },
  defaultValue: {
    type: 'textarea'
  },
  'autosize.minRows': {
    type: 'numberRange',
    label: '文本行数',
    min: 1,
    otherKey: 'autosize.maxRows'
  },
  required: {},
  requiredErrorMessage: {},
  validateValue: {},
  validateValueErrorMessage: {},
  regexpValidate: {},
  regexpValidateErrorMessage: {}
}
