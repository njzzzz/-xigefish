import { basicInputConfigureOptions } from '@xigefish/d-render-shared'

export default {
  ...basicInputConfigureOptions(),
  controlsPosition: {
    label: '控制按钮位置',
    type: 'select',
    options: [{
      value: 'right', label: '右侧'
    }, {
      value: '', label: '默认'
    }],
    defaultValue: 'right'
  },
  min: {
    type: 'number',
    label: '最小值',
    controlsPosition: 'right'
  },
  max: {
    type: 'number',
    label: '最大值',
    controlsPosition: 'right'
  },
  step: {
    type: 'number',
    label: '步长',
    controlsPosition: 'right',
    dependOn: ['precision'],
    min: 0,
    changeConfig: (config, { precision }) => {
      config.precision = precision
      return config
    }
  },
  precision: {
    type: 'number',
    label: '精度',
    min: 0,
    max: 10
  },
  placeholder: {
    type: 'input',
    label: '占位符',
    limit: 50
  },
  defaultValue: {
    type: 'number',
    controlsPosition: 'right'
  },
  required: { },
  requiredErrorMessage: { }
}
