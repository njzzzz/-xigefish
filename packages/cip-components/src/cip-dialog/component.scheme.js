export const propsScheme = {
  title: {
    type: String,
    intro: '标题'
  },
  dialogType: {
    type: String,
    validate: (val) => ['dialog', 'drawer', undefined].includes(val)
  },
  subTitle: {
    type: String,
    intro: '副标题'
  },
  modelValue: {
    default: false,
    type: Boolean,
    intro: '是否显示dialog'
  },
  onConfirm: {
    type: Function,
    intro: '确认函数'
  },
  beforeConfirm: {
    type: Function,
    default: () => {},
    intro: '触发表单验证前的值设置'
  },
  size: {
    default: 'default',
    intro: 'dialog宽度对应的尺寸'
  }, // mini: '374px', small: '568px', default: '860px', large: '1144px'
  width: {
    intro: 'dialog宽度'
  }, // 374px 568px 860px 1144px [ui建议值，特殊情况可自定义]
  top: {
    default: '15vh',
    intro: '高度'
  },
  closeOnClickModal: {
    type: Boolean,
    default: false,
    intro: '点击遮罩层是否关闭dialog'
  },
  showOnly: {
    default: false,
    intro: '是否只展示'
  },
  buttonSize: {
    default: 'default',
    intro: 'footer按钮大小'
  },
  confirmText: {
    default: '确认',
    intro: '触发on-confirm方法的按钮文字'
  },
  cancelText: {
    default: '取消',
    intro: '触发关闭dialog方法按钮的文字'
  },
  showCancel: {
    type: Boolean,
    default: true,
    intro: '是否展示取消按钮'
  },
  destroyOnClose: {
    type: Boolean,
    default: true,
    intro: '关闭时是否销毁dialog'
  },
  maxDepth: {
    type: Number,
    default: 5,
    intro: '查找form的深度'
  },
  fullscreen: {
    type: Boolean
  }
}
export const eventsScheme = {
  cancel: {
    intro: '取消触发'
  },
  close: {
    intro: '关闭触发'
  },
  'update:modelValue': {
    cbVar: 'value'
  }
}

export const slotsScheme = {
  mainTitle: {
    cbVar: 'text'
  },
  subTitle: {
    cbVar: 'text'
  },
  default: {
    cbVar: 'text'
  },
  footer: {
    cbVar: 'text'
  }
}

export const componentScheme = {
  propsScheme,
  slotsScheme,
  eventsScheme
}
