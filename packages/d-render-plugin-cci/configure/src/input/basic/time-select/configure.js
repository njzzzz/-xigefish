import { basicInputConfigureOptions } from '@xigefish/d-render-shared'

export default {
  ...basicInputConfigureOptions(),
  placeholder: {},
  defaultValue: {
    label: '默认值',
    type: 'time'
  },
  required: {},
  requiredErrorMessage: {}
}
