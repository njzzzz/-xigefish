import { basicInputConfigureOptions } from '@xigefish/d-render-shared'

export default {
  ...basicInputConfigureOptions(),
  defaultValue: {
    type: 'switch',
    label: '默认值',
    dependOn: ['activeValue', 'inactiveValue'],
    changeConfig: (config, { activeValue, inactiveValue }) => {
      config.activeValue = activeValue
      config.inactiveValue = inactiveValue
      return config
    }
  },
  activeText: {
    type: 'input',
    label: 'switch打开时的文字描述',
    limit: 20
  },
  inactiveText: {
    type: 'input',
    label: 'switch关闭时的文字描述',
    limit: 20
  },
  activeValue: {
    type: 'input',
    label: 'switch打开时的值',
    limit: 20
  },
  inactiveValue: {
    type: 'input',
    label: 'switch关闭时的值',
    limit: 20
  },
  required: {},
  requiredErrorMessage: {}
}
