
export const propsScheme = {
  type: {
    type: String,
    intro: '菜单按钮类型，同 Button 组件一样，仅在 split-button 为 true 的情况下有效',
    attr: true
  },
  size: {
    type: String,
    intro: '菜单尺寸，在 split-button 为 true 的情况下也对触发按钮生效',
    options: ['large', 'default', 'small'],
    default: 'default',
    validate: true,
    attr: true
  },
  maxHeight: {
    type: [String, Number],
    intro: '菜单最大高度',
    attr: true
  },
  splitButton: {
    type: Boolean,
    intro: '下拉触发元素呈现为按钮组',
    default: false,
    attr: true
  },
  disabled: {
    type: Boolean,
    intro: '是否禁用',
    default: false,
    attr: true
  },
  placement: {
    type: String,
    intro: '菜单弹出位置',
    options: ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end'],
    default: 'bottom',
    validate: true,
    attr: true
  },
  trigger: {
    type: String,
    intro: '触发下拉的行为',
    options: ['hover', 'click', 'contextmenu'],
    default: 'hover',
    validate: true,
    attr: true
  },
  hideOnClick: {
    type: Boolean,
    intro: '是否在点击菜单项后隐藏菜单',
    default: true,
    attr: true
  },
  showTimeout: {
    type: Number,
    intro: '展开下拉菜单的延时，仅在 trigger 为 hover 时有效',
    default: 250,
    attr: true
  },
  hideTimeout: {
    type: Number,
    intro: '收起下拉菜单的延时（仅在 trigger 为 hover 时有效）',
    default: 150,
    attr: true
  },
  role: {
    type: String,
    intro: '下拉菜单的 ARIA 属性。 根据具体场景，您可能想要将此更改为“navigation”',
    default: 'menu',
    attr: true
  },
  tabindex: {
    type: Number,
    intro: 'Dropdown 组件的 tabindex',
    default: 0,
    attr: true
  },
  popperClass: {
    type: String,
    intro: '自定义浮层类名',
    attr: true
  },
  popperOptions: {
    type: Object,
    intro: 'popper.js 参数, 请参考 popper.js 文档',
    default: { boundariesElement: 'body', gpuAcceleration: false },
    attr: true
  }
}

export const slotsScheme = {
  default: {
    intro: '下拉菜单的内容。 注意：必须是有效的 html DOM 元素（例如 <span>、<button> 等）或 el-component，以附加监听触发器'
  },
  dropdown: {
    intro: '下拉列表，通常是 <el-dropdown-menu> 组件'
  }
}

export const componentScheme = {
  propsScheme,
  slotsScheme
}
