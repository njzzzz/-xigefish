export const propsScheme = {
  type: {
    type: String,
    intro: '按钮类型',
    options: ['default', 'primary', 'info', 'warning', 'danger', 'success'],
    validate: true,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'default',
    intro: '大小',
    options: ['small', 'default', 'large'],
    validate: true,
    attr: true
  },
  icon: {
    type: [String, Object, Function],
    intro: '图标类名/组件'
  },

  disabled: {
    type: Boolean,
    intro: '是否禁用状态',
    attr: true
  }
}

export const eventsScheme = {
  click: {
    cbVar: 'e'
  }
}

export const slotsScheme = {
  default: {
    cbVar: 'text'
  }
}

export const componentScheme = {
  propsScheme,
  slotsScheme,
  eventsScheme,
  name: "CipButtonText"
}
