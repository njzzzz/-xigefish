import { CustomComponent, IAnyObject } from '@xigefish/types'
export const Component: CustomComponent<{
  total?: number // 总条目数
  limit?: number // 每页显示条目数
  offset?: number // (props.currentPage - 1) * size
  hideOnSinglePage?: boolean // 只有一页时是否隐藏
  layout?: string // 组件布局，子组件名用逗号分隔
  background?: boolean // 是否为分页按钮添加背景色
  pageSizes?: Array<any> // 每页显示个数选择器的选项设置
  small?: boolean // 是否使用小型分页样式
  pagerCount?: number // 设置最大页码按钮数。 页码按钮的数量，当总页数超过该值时会折叠
  popperClass?: string // 每页显示个数选择器的下拉框类名
  prevText?: string // 替代图标显示的上一页文字
  prevIcon?: IAnyObject // 上一页的图标， 比 prev-text 优先级更高
  nextText?: string // 替代图标显示的下一页文字
  nextIcon?: IAnyObject // 下一页的图标， 比 prev-text 优先级更高
  disabled?: boolean // 是否禁用分页
}, {
  'update:limit'?: (limit: any) => void
  'update:offset'?: (offset: any) => void
  refresh?: (offset: any) => void
}>
export default Component
