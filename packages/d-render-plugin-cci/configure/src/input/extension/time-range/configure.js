import { basicTwoInputConfigureOptions } from '@xigefish/d-render-shared'

export default {
  ...basicTwoInputConfigureOptions(),
  startPlaceholder: {
    label: '开始占位内容',
    type: 'input',
    limit: 20
  },
  endPlaceholder: {
    label: '结束占位内容',
    type: 'input',
    limit: 20
  },
  startDefaultValue: {
    label: '开始默认值',
    type: 'time'
  },
  endDefaultValue: {
    label: '结束默认值',
    type: 'time'
  },
  required: {},
  requiredErrorMessage: {}
}
