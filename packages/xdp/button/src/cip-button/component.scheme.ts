import { defaultButtonConfigMap } from './config.js'
export const propsScheme = {
  buttonType: {
    type: String,
    options: Object.keys(defaultButtonConfigMap),
    intro: '预设按钮类型'
  },
  size: {
    type: String,
    // default: 'default',
    intro: '大小',
    options: ['small', 'default', 'large'],
    validate: true
  },
  icon: {
    type: [String, Object, Function],
    intro: '图标类名/组件'
  },
  type: {
    type: String,
    intro: '按钮类型',
    options: ['default', 'primary', 'info', 'warning', 'danger', 'success'],
    validate: true
  },
  map: {
    type: Boolean,
    intro: '是否地图按钮'
  },
  plain: {
    type: Boolean,
    intro: '是否朴素按钮'
  },
  text: {
    type: Boolean,
    intro: '是否文字按钮'
  },
  bg: {
    type: String,
    intro: '背景色'
  },
  link: {
    type: Boolean,
    intro: '文字型按钮'
  },
  round: {
    type: Boolean,
    intro: '是否圆角按钮'
  },
  circle: {
    type: Boolean,
    intro: '是否圆形按钮'
  },
  square: {
    type: Boolean,
    intro: '是否方形按钮'
  },
  loading: {
    type: Boolean,
    intro: '是否加载中状态'
  },
  loadingIcon: {
    type: [String, Object],
    intro: '加载状态时的icon'
  },
  disabled: {
    type: Boolean,
    intro: '是否禁用状态'
  },
  autofocus: {},
  nativeType: {},
  autoInsertSpace: {},
  color: {},
  dark: {}
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
  eventsScheme,
  name: 'CipButton'
}
