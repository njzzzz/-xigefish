import { configMapToList } from '@xigefish/d-render-shared'
import { DRender } from '@xigefish/d-render-shared'
export const formConfigFieldConfigMap = {
  labelPosition: {
    type: 'radio',
    label: '标签对齐方式',
    options: [
      { label: '左对齐', value: 'left' },
      { label: '右对齐', value: 'right' },
      { label: '顶部对齐', value: 'top' }
    ],
    isButton: true,
    defaultValue: 'right'
  },
  labelWidth: {
    type: 'number',
    label: '表单标签宽度',
    step: 10,
    min: 0
  },
  labelSuffix: {
    type: 'switch',
    label: '是否添加表单标签后缀',
    activeValue: '：',
    inactiveValue: ' ',
    defaultValue: '：'
  },
  tableSize: {
    type: 'radio',
    label: '组件尺寸',
    options: ['large', 'default', 'small'],
    isButton: true,
    defaultValue: 'default'
  }
}
export const formConfigFieldConfigList = configMapToList(formConfigFieldConfigMap)

const dRender = new DRender()
export const getComponentConfigure = async (type) => {
  const { default: configure } = await dRender.componentDictionary[type]('/configure')()
  return configure
}

export const tableConfigFieldConfigList = configMapToList({
  width: {
    type: 'input',
    label: '宽度',
    limit: 8
  }
  // sort: {
  //   type: 'switch',
  //   label: '是否排序'
  // }
})

export const searchConfigFieldConfigList = configMapToList({
  fieldAlias: {
    type: 'input',
    label: '标题',
    limit: 8
  },
  search: {
    type: 'switch',
    label: '是否可查询'
  }
})