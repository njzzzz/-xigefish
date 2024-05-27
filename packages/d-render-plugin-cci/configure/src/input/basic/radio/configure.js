import { basicInputConfigureOptions } from '@xigefish/d-render-shared'
export default {
  ...basicInputConfigureOptions(),
  display: {
    type: 'radio',
    label: '布局方式',
    isButton: true,
    options: [{ label: '块级', value: 'flex' }, { label: '行内', value: 'inline-flex' }]
  },
  defaultValue: {
    type: 'staticOptionsConfig',
    label: '静态数据',
    otherKey: 'options'
  },
  required: {},
  requiredErrorMessage: {}
}
