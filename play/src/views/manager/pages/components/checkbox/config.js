import { defineFormFieldConfig, generateFieldList } from '@xigefish/d-render-shared'
const common = {
  options: ['选中', '未选中'],
  type: 'radio'
}
const commonCheckbox = {
  options: ['选中', '未选中'],
  type: 'checkbox'
}
const entity = {
  defaultVal: {
    label: '默认'
  },
  float: {
    label: '悬浮'
  },
  click: {
    label: '点击'
  },
  disabled: {
    label: '禁用'
  },
  vertical: {
    label: '禁用'
  }
}
const fieldRadio = {
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
  }
}

const fieldCheckbox = {
  defaultVal: {
    ...commonCheckbox
  },
  float: {
    ...commonCheckbox
  },
  click: {
    ...commonCheckbox
  },
  disabled: {
    disabled: true,
    ...commonCheckbox
  },
  vertical: {
    display: 'flex',
    label: '垂直排列',
    ...commonCheckbox
  }
}
export const formFieldList = generateFieldList(defineFormFieldConfig(fieldRadio), entity)
export const formFieldListCehckbox = generateFieldList(defineFormFieldConfig(fieldCheckbox), entity)
