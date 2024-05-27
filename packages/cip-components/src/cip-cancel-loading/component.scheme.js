
export const propsScheme = {
  message: {
    type: String,
    default: 'loading',
    intro: '加载文案'
  },
  btnName: {
    type: String,
    default: '退出',
    intro: '关闭loading按钮-按钮展示文字'
  },
  onCancel: {
    type: Function,
    default: () => {}
  }
}

export const componentScheme = {
  propsScheme
}
