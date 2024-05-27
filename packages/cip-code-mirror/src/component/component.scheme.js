
export const propsScheme = {
  modelValue: {
    type: [String, Object],
    intro: '展示的代码'
  },
  readonly: {
    type: [Boolean, String],
    intro: 'nocursor: readonly状态并且不展示光标',
    options: [false, true, 'nocursor'],
    default: false,
    validate: true
  },
  type: {
    type: String,
    default: 'json'
  },
  mode: {
    type: String
  },
  height: {
    type: String,
    intro: '代码编辑器高度',
    default: 'auto'
  },
  theme: {
    type: String,
    intro: '主题，需要额外引入',
    default: 'dracula'
  },
  lineNumbers: {
    type: Boolean,
    default: true
  },
  lineWrapping: {
    type: Boolean,
    default: false
  },
  indentUnit: {
    type: Number,
    default: 4
  },
  customHintOption: {
    type: Function,
    default: null,
    intro: '自定义codemirror的hintOption, 函数类型，返回一个自定义的hintOption'
  }
}

export const eventsScheme = {
  'update:modelValue': {
    cbVar: 'value'
  }
}

export const componentScheme = {
  propsScheme,
  eventsScheme,
  name: 'CipCodeMirror'
}
