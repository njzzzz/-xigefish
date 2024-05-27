export const propsScheme = {
  limit: {
    type: Number,
    intro: '出发collapse的最大数量'
  },
  row: {
    type: Object,
    intro: '所处的row的值，作为是否重新刷新的依据',
    required: true
  },
  buttonComp: {
    type: Boolean,
    intro: '以何种形式展示button',
    default: 'text',
    options: ['text', 'button']
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
  name: 'CipButtonCollapse'
}
