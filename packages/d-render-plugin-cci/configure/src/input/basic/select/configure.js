import { basicInputConfigureOptions } from '@xigefish/d-render-shared'
export default {
  ...basicInputConfigureOptions(),
  placeholder: {},
  multiple: {
    type: 'switch',
    label: '是否多选'
  },
  filterable: {
    type: 'switch',
    label: '是否可搜索'
  },
  allowCreate: {
    type: 'switch',
    label: '是否可创建'
  },
  defaultValue: {
    type: 'staticOptionsConfig',
    label: '静态数据',
    otherKey: 'options',
    limit: 20
  },
  required: {},
  requiredErrorMessage: {}
}
