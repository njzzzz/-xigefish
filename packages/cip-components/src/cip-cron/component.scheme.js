export const propsScheme = {
  value: {
    type: String,
    intro: '绑定值'
  },
  size: {
    type: String,
    default: 'default',
    intro: '大小',
    options: ['small', 'default', 'large']
  },
  maxHeight: {
    type: String,
    intro: '最大高度'
  },
  showCron: {
    type: Boolean,
    intro: '是否显示表达式'
  },
  showField: {
    type: Boolean,
    intro: '是否显示表达式字段'
  }
}

export const eventsScheme = {
  'update:value': {
    intro: '',
    cbVar: 'value'
  },
  postChange: {
    intro: '点击确定按钮触发',
    cbVar: 'value'
  }
}

export const slotsScheme = {
  append: {
    intro: '组件后置内容'
  }
}

export const componentScheme = {
  propsScheme,
  eventsScheme,
  slotsScheme
}
