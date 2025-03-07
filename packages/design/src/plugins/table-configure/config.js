import { configMapToList } from '@xigefish/d-render-shared'
export const formConfigFieldConfigMap = {
  hideIndex: {
    type: 'switch',
    label: '是否显示序号',
    defaultValue: false
  },
  indexFixed: {
    type: 'switch',
    label: '序号是否固定',
    defaultValue: true
  },
  showSummary: {
    type: 'switch',
    label: '是否显示汇总',
    defaultValue: false
  },
  hideBorder: {
    type: 'switch',
    label: '是否隐藏边框',
    defaultValue: true
  },
  stripe: {
    type: 'switch',
    label: '是否显示斑马纹',
    defaultValue: true
  },
  tableColumnStatus: {
    type: 'switch',
    label: '是否只读',
    defaultValue: 'readable',
    activeValue: 'writable',
    inactiveValue: 'readable'
  },
  height: {
    label: '表格高度',
    type: 'number',
    defaultValue: 400
  }
}
export const formConfigFieldConfigList = configMapToList(formConfigFieldConfigMap)
