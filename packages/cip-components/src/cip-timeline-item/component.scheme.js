export const propsScheme = {
  timestamp: {
    type: String,
    intro: '时间轴'
  },
  title: {
    type: String,
    intro: '内容'
  },
  hollow: {
    type: Boolean,
    default: false,
    intro: '空心还是实心'
  },
  color: {
    type: String,
    intro: '颜色',
    default: '#e6e6e6'
  },
  icon: {
    type: String,
    intro: '图标',
    default: ''
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
  eventsScheme
}
