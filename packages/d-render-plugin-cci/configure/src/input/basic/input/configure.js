import { basicInputConfigureOptions } from '@xigefish/d-render-shared'

export default {
  ...basicInputConfigureOptions(),
  placeholder: {},
  defaultValue: {
    // type: 'formExpressionInput',
    // mode: 'append' // 开启值追加模式
  },
  limit: {},
  required: {},
  requiredErrorMessage: {},
  validateValue: {},
  validateValueErrorMessage: {},
  regexpValidate: {},
  regexpValidateErrorMessage: {}
}
