export const propsScheme = {
  active: {
    type: Number,
    default: 0,
    intro: '设置当前激活步骤'
  },
  space: {
    type: [Number, String],
    intro: '每个 step 的间距，不填写将自适应间距。 支持百分比。'
  },
  direction: {
    type: String,
    default: 'horizontal',
    intro: '显示方向'
  },
  processStatus: {
    type: String,
    default: 'process',
    intro: '设置当前步骤的状态'
  },
  finishStatus: {
    type: String,
    default: 'success', // 为配合ui规范
    intro: '设置结束步骤的状态'
  },
  alignCenter: {
    type: Boolean,
    default: false,
    intro: '进行居中对齐'
  },
  simple: {
    type: Boolean,
    default: false,
    intro: '是否应用简洁风格'
  },
  titleUp: {
    type: Boolean,
    default: false,
    intro: '文字提到图标右边，对应ui标准样式二，只适用于横向'
  }
}

export const slotsScheme = {
  default: {}
}

export const componentScheme = {
  propsScheme,
  slotsScheme
}
