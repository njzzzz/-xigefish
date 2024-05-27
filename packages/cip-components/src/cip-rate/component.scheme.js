import { StarFilled } from '@element-plus/icons-vue'

export const propsScheme = {
  modelValue: {
    type: Number,
    default: 0,
    intro: '选中项绑定值'
  },
  max: {
    type: Number,
    default: 5,
    intro: '最大分值'
  },
  size: {
    type: String,
    default: 'default',
    intro: '尺寸',
    options: ['small', 'default', 'large'],
    validate: true
  },
  disabled: {
    type: Boolean,
    default: false,
    intro: '是否为只读'
  },
  allowHalf: {
    type: Boolean,
    default: false,
    intro: '是否允许半选'
  },
  lowThreshold: {
    type: Number,
    default: 2,
    intro: '低分和中等分数的界限值， 值本身被划分在低分中'
  },
  highThreshold: {
    type: Number,
    default: 4,
    intro: '高分和中等分数的界限值， 值本身被划分在高分中'
  },
  colors: {
    type: [Array, Object],
    default: () => ['#FF8F33', '#FF8F33', '#FF8F33'],
    intro: 'icon 的颜色。 若传入数组，共有 3 个元素，为 3 个分段所对应的颜色；若传入对象，可自定义分段，键名为分段的界限值，键值为对应的颜色'
  },
  voidColor: {
    type: String,
    default: '#F0F2F5',
    intro: '未选中 icon 的颜色'
  },
  disabledVoidColor: {
    type: String,
    default: '#EFF2F7',
    intro: '只读时未选中 icon 的颜色'
  },
  icons: {
    type: [Array, Object],
    default: () => [StarFilled, StarFilled, StarFilled],
    intro: '图标组件 若传入数组，共有 3 个元素，为 3 个分段所对应的类名；若传入对象，可自定义分段，键名为分段的界限值，键值为对应的类名'
  },
  voidIcon: {
    type: [String, Object],
    default: StarFilled,
    intro: '未被选中的图标组件'
  },
  disabledVoidIcon: {
    type: [String, Object],
    default: StarFilled,
    intro: '禁用状态的未选择图标'
  },
  showText: {
    type: Boolean,
    default: false,
    intro: '是否显示辅助文字，若为真，则会从 texts 数组中选取当前分数对应的文字内容'
  },
  showScore: {
    type: Boolean,
    default: false,
    intro: '是否显示当前分数， show-score 和 show-text 不能同时为真'
  },
  textColor: {
    type: String,
    default: '#1F2D3D',
    intro: '辅助文字的颜色'
  },
  texts: {
    type: Array,
    default: () => ['Extremely bad', 'Disappointed', 'Fair', 'Satisfied', 'Surprise'],
    intro: '辅助文字数组'
  },
  scoreTemplate: {
    type: String,
    intro: '分数显示模板'
  }
}

export const eventsScheme = {
  'update:modelValue': {
    cbVar: 'val'
  },
  change: {
    cbVar: 'val',
    intro: '分值改变时触发'
  }
}

export const componentScheme = {
  propsScheme,
  eventsScheme
}
