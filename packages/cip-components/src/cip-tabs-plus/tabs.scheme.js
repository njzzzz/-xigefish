export const propsScheme = {
  modelValue: {
    type: [Number, String],
    intro: '选中选项卡的name'
  },
  type: {
    type: String,
    intro: '风格类型'
  },
  closable: {
    type: Boolean,
    default: false,
    intro: '标签是否可关闭'
  },
  addable: {
    type: Boolean,
    default: false,
    intro: '标签是否可增加'
  },
  editable: {
    type: Boolean,
    default: false,
    intro: '标签是否同时可增加和关闭'
  },
  tabPosition: {
    type: String,
    default: 'top',
    intro: '选项卡所在位置'
  },
  stretch: {
    type: Boolean,
    default: false,
    intro: '标签的宽度是否自撑开'
  },
  beforeLeave: {
    type: Function,
    intro: '切换标签之前的钩子函数，若返回 false 或者返回被 reject 的 Promise，则阻止切换。'
  },
  underline: {
    type: Boolean,
    default: true,
    intro: '是否显示灰色分割线'
  },
  height: {
    type: String,
    intro: 'tabs的高度'
  }
}

export const slotsScheme = {
  default: {}
}

export const eventsScheme = {
  tabClick: { cbVar: 'pane: TabsPaneContext, ev: Event', intro: 'tab 被选中时触发' },
  tabChange: { cbVar: 'name: TabPanelName', intro: 'activeName 改变时触发' },
  tabRemove: { intro: '点击 tab 移除按钮时触发' },
  tabAdd: { intro: '点击 tab 新增按钮时触发' },
  edit: { cbVar: "paneName: TabPanelName | undefined, action: 'remove' | 'add'", intro: '点击 tab 的新增或移除按钮后触发' }
}

export const componentScheme = {
  propsScheme,
  slotsScheme,
  eventsScheme
}
