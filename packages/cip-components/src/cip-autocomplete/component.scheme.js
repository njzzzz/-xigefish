
export const propsScheme = {
  modelValue: {
    type: String,
    intro: '绑定值'
  },
  placeholder: {
    type: String,
    intro: '输入框占位文本',
    attr: true
  },
  clearable: {
    type: Boolean,
    intro: '是否可清空',
    attr: true,
    default: false
  },
  disabled: {
    type: Boolean,
    intro: '是否禁用',
    attr: true,
    default: false
  },
  name: {
    type: String,
    intro: '等价于原生 input name 属性',
    attr: true
  },
  label: {
    type: String,
    intro: '标签文本',
    attr: true
  },
  popperClass: {
    type: String,
    intro: '下拉列表的类名',
    attr: true,
    default: {}
  },
  width: {
    type: [String, Number],
    intro: '控制文本框宽度',
    attr: false,
    default: '240px'
  }
}

export const eventsScheme = {
  select: { cbVar: 'e' },
  change: { cbVar: 'value' }
}

export const slotsScheme = {
  prefix: {},
  suffix: {},
  prepend: {},
  append: {}
}

export const componentScheme = {
  propsScheme,
  slotsScheme,
  eventsScheme
}
