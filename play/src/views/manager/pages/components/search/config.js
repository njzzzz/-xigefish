import { defineFormFieldConfig, generateFieldList } from '@xigefish/d-render-shared'
const common = {
  asyncOptions () {
    return [{ value: '当前项', label: '当前项' }, { value: '选择项', label: '选择项' }, { value: '悬浮项', label: '悬浮项' }, { value: '禁用项', label: '禁用项', disabled: true }]
  },
  valueKey: 'label',
  type: 'select'
}
const entity = {
  defaultVal: {
    label: '默认'
  },
  float: {
    label: '悬浮'
  },
  click: {
    label: '选择'
  },
  disabled: {
    label: '禁用'
  },
  extend: {
    label: '扩展'
  },
  number: {
    label: '数量'
  },
  age: {
    label: '年龄'
  }
}
const fieldSelect1 = {
  defaultVal: {
    ...common
  },
  float: {
    ...common
  },
  click: {
    ...common
  },
  disabled: {
    disabled: true,
    ...common
  },
  extend: {},
  number: {},
  age: {}
}
const columnsTable = {
  column1: {
    label: '表头1'
  },
  column2: {
    label: '表头2'
  },
  column3: {
    label: '表头3'
  },
  column4: {
    label: '表头4'
  }
}
export const tableList = [
  {
    withHandle: true,
    span: 3,
    title: '带表格功能 ',
    subTitle: '单行可放全选择框'
  },
  {
    withHandle: true,
    span: 4,
    title: '带表格功能 ',
    subTitle: '单行可放全选择框（展开1）'
  },
  {
    withHandle: true,
    span: 8,
    title: '带表格功能 ',
    subTitle: '单行可放全选择框（展开2）'
  },
  {
    withHandle: false,
    span: 3,
    title: '不带表格功能',
    subTitle: '单行可放全选择框'
  },
  {
    withHandle: false,
    span: 4,
    title: '不带表格功能',
    subTitle: '单行不可放全选择框（展开1）'
  },
  {
    withHandle: false,
    span: 6,
    title: '不带表格功能',
    subTitle: '单行不可放全选择框（展开2）'
  }
]
export const formFieldList = generateFieldList(defineFormFieldConfig(fieldSelect1), entity)
export const column = generateFieldList(defineFormFieldConfig(columnsTable), {})
