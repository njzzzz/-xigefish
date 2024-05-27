
export const propsScheme = {
  message: {
    type: String,
    intro: '消息文字'
  },
  type: {
    type: String,
    options: ['success', 'warning', 'info', 'error'],
    default: 'info',
    validate: true,
    intro: '消息类型'
  },
  showClose: {
    type: Boolean,
    intro: '是否显示关闭按钮',
    default: false,
    attr: true
  },
  grouping: {
    type: Boolean,
    intro: '合并内容相同的消息，不支持 VNode 类型的消息',
    default: false,
    attr: true
  },
  icon: {
    type: String,
    intro: '自定义图标，该属性会覆盖 type 的图标。',
    attr: true
  },
  dangerouslyUseHTMLString: {
    type: Boolean,
    intro: '是否将 message 属性作为 HTML 片段处理',
    default: false,
    attr: true
  },
  customClass: {
    type: String,
    intro: '自定义类名',
    attr: true
  },
  duration: {
    type: Number,
    intro: '显示时间，单位为毫秒。 设为 0 则不会自动关闭',
    default: 3000,
    attr: true
  },
  center: {
    type: Boolean,
    intro: '文字是否居中',
    default: false,
    attr: true
  },
  onClose: {
    type: Function,
    intro: '关闭时的回调函数, 参数为被关闭的 message 实例',
    attr: true
  },
  offset: {
    type: Number,
    intro: 'Message 距离窗口顶部的偏移量',
    default: 20,
    attr: true
  },
  appendTo: {
    type: [String],
    intro: '设置组件的根元素',
    default: 'document.body',
    attr: true
  }
}

export const componentScheme = {
  propsScheme
}
