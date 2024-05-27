export const propsScheme = {
  modelValue: {
    type: String,
    intro: '绑定值'
  },
  loading: {
    type: Boolean,
    intro: '加载状态'
  },
  buttonText: {
    type: String,
    intro: '按钮文字'
  }
}

export const eventsScheme = {
  'update:modelValue': {
    intro: '',
    cbVar: 'value'
  },
  search: {
    intro: '点击搜索按钮触发'
  }
}

export const slotsScheme = {
  buttonText: {
    intro: '按钮文字'
  },
  append: {
    intro: '组件后置内容'
  }
}

export const componentScheme = {
  propsScheme,
  eventsScheme,
  slotsScheme
}
