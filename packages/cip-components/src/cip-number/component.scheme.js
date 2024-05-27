
export const propsScheme = {
  modelValue: {
    type: Number,
    intro: '值'
  },
  unit: {
    type: String,
    intro: '单位'
  },
  controls: {
    type: Boolean,
    default: true,
    intro: '是否需要按钮'
  },

  controlsPosition: {
    type: String,
    intro: '按钮位置',
    options: ['right', 'standard'],
    validate: true
  },
  noPrecision: {
    type: Boolean,
    intro: '是否不设置精度'
  },
  precision: {
    type: Number,
    intro: '保留小数',
    default: 0
  },
  step: {
    type: Number,
    intro: '步长',
    default: 1
  },
  min: {
    type: Number,
    intro: '最小值'
  },
  placeholder: {
    type: String,
    intro: '占位符'
  },
  disabled: {
    type: Boolean,
    intro: '是否禁用状态'
  },
  max: {
    type: Number,
    intro: '最大值'
  },
  size: {
    type: String,
    default: 'default',
    intro: '大小',
    options: ['small', 'default', 'large'],
    validate: true,
    attr: true
  }
}

export const eventsScheme = {
  'update:modelValue': {
    cbVar: 'val'
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
