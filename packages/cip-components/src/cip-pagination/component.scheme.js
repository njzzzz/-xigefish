import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
export const propsScheme = {
  // 于4.2.9版本废弃
  // currentPage: {
  //   type: Number,
  //   intro: '当前页数',
  //   default: 1
  // },
  total: {
    type: Number,
    intro: '总条目数',
    default: 0
  },
  limit: {
    type: Number,
    intro: '每页显示条目数',
    default: 10
  },
  offset: {
    type: Number,
    intro: '(props.currentPage - 1) * size',
    default: 0
  },
  hideOnSinglePage: {
    type: Boolean,
    intro: '只有一页时是否隐藏'
  },
  layout: {
    type: String,
    intro: '组件布局，子组件名用逗号分隔',
    default: 'total, sizes, prev, pager, next, jumper'
  },
  background: {
    type: Boolean,
    intro: '是否为分页按钮添加背景色',
    default: true
  },
  pageSizes: {
    type: Array,
    intro: '每页显示个数选择器的选项设置',
    default: [5, 8, 10, 15, 20]
  },
  small: {
    type: Boolean,
    intro: '是否使用小型分页样式',
    default: false,
    attr: true
  },
  pagerCount: {
    type: Number,
    intro: '设置最大页码按钮数。 页码按钮的数量，当总页数超过该值时会折叠',
    options: '5 ≤ x ≤ 21 的奇数',
    default: 7,
    attr: true
  },
  popperClass: {
    type: String,
    intro: '每页显示个数选择器的下拉框类名',
    attr: true
  },
  prevText: {
    type: String,
    intro: '替代图标显示的上一页文字',
    attr: true
  },
  prevIcon: {
    type: Object,
    intro: '上一页的图标， 比 prev-text 优先级更高',
    default: ArrowLeft,
    attr: true
  },
  nextText: {
    type: String,
    intro: '替代图标显示的下一页文字',
    attr: true
  },
  nextIcon: {
    type: Object,
    intro: '下一页的图标， 比 prev-text 优先级更高',
    default: ArrowRight,
    attr: true
  },
  disabled: {
    type: Boolean,
    intro: '是否禁用分页',
    default: false,
    attr: true
  }
}

export const eventsScheme = {
  'update:limit': {
    intro: '每页条数变化时触发',
    cbVar: 'limit'
  },
  'update:offset': {
    intro: '当前页变化时触发',
    cbVar: 'offset'
  },
  refresh: {
    intro: '每页条数变化、当前页变化时触发',
    cbVar: 'offset'
  }
}

export const componentScheme = {
  propsScheme,
  eventsScheme
}
