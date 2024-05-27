export const propsScheme = {
  label: {
    type: String,
    intro: '选项卡标题'
  },
  name: {
    type: [String, Number],
    intro: '与选项卡绑定值 value 对应的标识符，表示选项卡别名'
  },
  disabled: {
    type: Boolean,
    default: false,
    intro: '是否禁用'
  },
  closable: {
    type: Boolean,
    default: false,
    intro: '标签是否可关闭'
  },
  lazy: {
    type: Boolean,
    default: false,
    intro: '标签是否延迟渲染'
  }
}

export const slotsScheme = {
  default: {},
  label: { intro: 'tab-pane的标题内容' }
}

export const componentScheme = {
  propsScheme,
  slotsScheme
}
