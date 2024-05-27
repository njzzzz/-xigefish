export const propsScheme = {
  mode: {
    type: String,
    intro: '时间轴位置',
    default: 'left',
    options: ['left', 'right'],
    validate: true
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
