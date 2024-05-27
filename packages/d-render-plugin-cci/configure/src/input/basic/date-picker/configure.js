import { basicInputConfigureOptions } from '@xigefish/d-render-shared'
export const viewTypeOptions = ['year', 'month', 'week', 'date', 'datetime']

export default {
  ...basicInputConfigureOptions(),
  viewType: {
    label: '显示类型',
    type: 'select',
    options: viewTypeOptions //, 'dates'
  },
  isTimestamp: {
    label: '是否获取时间戳',
    type: 'switch'
  },
  defaultValue: {
    label: '是否使用当前时间做默认值',
    type: 'switch',
    inactiveValue: null,
    // eslint-disable-next-line no-template-curly-in-string
    activeValue: '${new Date()}' // 数据没有格式化，选中默认值会有问题
  },
  placeholder: {},
  formatter: {
    label: '展示格式',
    type: 'input'
  },
  required: {},
  requiredErrorMessage: {}
}
