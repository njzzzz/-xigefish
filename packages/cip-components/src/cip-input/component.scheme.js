
export const propsScheme = {
  modelValue: {
    type: String,
    intro: '绑定值'
  },
  rows: {
    type: Number,
    intro: '输入框行数，仅 type 为 \'textarea\' 时有效',
    default: 3
  },
  fixBorder: {
    type: Boolean,
    intro: '当存在suffix或者prefix时是否使用分割线',
    default: false
  },
  type: {
    type: String,
    options: ['text', 'textarea'],
    intro: '类型',
    attr: true
  },
  maxlength: {
    type: Number,
    intro: '最大输入长度',
    attr: true
  },
  minlength: {
    type: Number,
    intro: '原生属性，最小输入长度',
    attr: true
  },
  showWordLimit: {
    type: Boolean,
    intro: '是否显示输入字数统计，只在 type = "text" 或 type = "textarea" 时有效',
    attr: true,
    default: false
  },
  placeholder: {
    type: String,
    intro: '输入框占位文本',
    attr: true
  },
  clearable: {
    type: Boolean,
    intro: '是否可清空',
    attr: true,
    default: false
  },
  formatter: {
    type: Function,
    intro: '指定输入值的格式。(只有当 type 是"text"时才有效) function(value: string / number): string',
    attr: true
  },
  parser: {
    type: Function,
    intro: '指定从格式化器输入中提取的值。(仅当 type 是"text"时才有效) function(value: string): string',
    attr: true
  },
  showPassword: {
    type: Boolean,
    intro: '是否显示切换密码图标',
    attr: true,
    default: false
  },
  disabled: {
    type: Boolean,
    intro: '是否禁用',
    attr: true,
    default: false
  },
  size: {
    type: String,
    default: 'default',
    intro: '大小 只在 type 不为 `textarea` 时有效',
    options: ['small', 'default', 'large'],
    validate: true,
    attr: true
  },
  prefixIcon: {
    type: [String, Object, Function],
    intro: '自定义前缀图标'
  },
  suffixIcon: {
    type: [String, Object, Function],
    intro: '自定义后缀图标'
  },

  autosize: {
    type: [Boolean, Object],
    intro: '输入框行数，仅 type 为 \'textarea\' 时有效',
    attr: true,
    default: false
  },
  autocomplete: {
    type: String,
    intro: '原生 autocomplete 属性',
    attr: true,
    default: 'off'
  },
  name: {
    type: String,
    intro: '等价于原生 input name 属性',
    attr: true
  },
  readonly: {
    type: Boolean,
    intro: '原生  readonly 属性，是否只读',
    attr: true,
    default: false
  },
  max: {
    type: [Number, String],
    intro: '原生 max 属性，设置最大值'
  },
  min: {
    type: [Number, String],
    intro: '原生属性，设置最小值',
    attr: true
  },
  step: {
    type: [Number, String],
    intro: '原生属性，设置输入字段的合法数字间隔',
    attr: true
  },
  resize: {
    type: String,
    intro: '控制是否能被用户缩放 none / both / horizontal / vertical',
    options: ['none', 'both', 'horizontal', 'vertical'],
    attr: true
  },
  autofocus: {
    type: Boolean,
    intro: '原生属性，自动获取焦点',
    attr: true,
    default: false
  },
  form: {
    type: String,
    intro: '原生属性',
    attr: true
  },
  label: {
    type: String,
    intro: '标签文本',
    attr: true
  },
  tabindex: {
    type: [String, Number],
    intro: '输入框的 tabindex',
    attr: true
  },
  validateEvent: {
    type: Boolean,
    intro: '原生属性，自动获取焦点',
    attr: true,
    default: true
  },
  inputStyle: {
    type: Object,
    intro: 'input 元素或 textarea 元素的 style',
    attr: true,
    default: {}
  }
}

export const eventsScheme = {
  blur: { cbVar: 'e' },
  focus: { cbVar: 'e' },
  change: { cbVar: 'value' },
  input: { cbVar: 'value' },
  clear: { }
}

export const slotsScheme = {
  prefix: {},
  suffix: {},
  prepend: {},
  append: {}
}

export const componentScheme = {
  propsScheme,
  slotsScheme,
  eventsScheme
}
