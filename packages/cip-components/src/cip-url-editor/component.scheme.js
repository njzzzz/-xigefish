export const propsScheme = {
  protocol: { type: String, default: 'http:', intro: '协议' },
  host: { type: String, intro: '主机地址' },
  port: { type: Number, intro: '端口号' },
  path: { type: String, intro: '路径' },
  size: {
    type: String,
    options: ['small', 'default', 'large'],
    default: 'default',
    intro: '尺寸'
  },
  portMin: { type: Number, default: 0, intro: '端口号最小值' },
  portMax: { type: Number, default: 65535, intro: '端口号最大值' },
  disabled: { type: Boolean, default: undefined, intro: '禁用' },
  disabledConfig: {
    type: Object,
    default: () => ({}),
    intro: '细致的对每个输入框的禁用进行配置'
  } // { protocol, host, port, path}
}

export const eventsScheme = {
  'update:protocol': {
    cbVar: 'newVal'
  },
  'update:host': {
    cbVar: 'newVal'
  },
  'update:port': {
    cbVar: 'newVal'
  },
  'update:path': {
    cbVar: 'newVal'
  }
}

export const componentScheme = {
  propsScheme,
  eventsScheme
}
