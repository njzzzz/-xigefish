import { basicInputConfigureOptions } from '@xigefish/d-render-shared'

export default {
  ...basicInputConfigureOptions(),
  showInput: {
    label: '显示输入框',
    type: 'switch'
  },
  min: {
    label: '最小值',
    type: 'number'
  },
  max: {
    label: '最大值',
    type: 'number'
  },
  step: {
    label: '步长',
    type: 'number'
  },
  required: {},
  requiredErrorMessage: {}
}
