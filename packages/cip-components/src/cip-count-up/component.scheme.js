export const propsScheme = {
  modelValue: {
    type: Number,
    intro: '值'
  },
  startVal: {
    type: Number,
    default: 0,
    intro: '起始值'
  },
  endVal: {
    type: Number,
    default: 0,
    intro: '结束值'
  },
  duration: {
    type: Number,
    default: 1,
    intro: '动画持续时间'
  },
  decimalPlaces: {
    type: Number,
    default: 0,
    intro: '小数展示几位'
  },
  prefix: {
    type: String,
    default: '',
    intro: '数字前缀'
  },
  suffix: {
    type: String,
    default: '',
    intro: '数字后缀'
  }
}

export const eventsScheme = {

}

export const slotsScheme = {

}

export const componentScheme = {
  propsScheme,
  slotsScheme,
  eventsScheme
}
