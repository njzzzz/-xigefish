import { basicInputConfigureOptions } from '@xigefish/d-render-shared'

export default {
  ...basicInputConfigureOptions(),
  max: {
    label: '最大值',
    type: 'number',
    min: 1
  },
  // lowThreshold: {
  //   label: '低分界限',
  //   type: 'number',
  //   min: 1
  // },
  // highThreshold: {
  //   label: '高分界限',
  //   type: 'number',
  //   dependOn: ['max'],
  //   changeConfig: (config, { max, allowHalf } = {}) => {
  //     config.max = max
  //     config.allowHalf = allowHalf
  //     return config
  //   },
  //   min: 1
  // },
  allowHalf: {
    label: '允许半选',
    type: 'switch'
  },
  defaultValue: {
    type: 'rate',
    dependOn: ['max', 'allowHalf'],
    changeConfig: (config, { max, allowHalf } = {}) => {
      config.max = max
      config.allowHalf = allowHalf
      return config
    }
  },

  required: {},
  requiredErrorMessage: {}
}
