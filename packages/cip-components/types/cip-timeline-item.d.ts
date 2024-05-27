import { CustomComponent, IAnyObject } from '@xigefish/types'
export const Component: CustomComponent<{
  timestamp?: string // 时间轴
  title?: string // 内容
  hollow?: boolean // 空心还是实心
  color?: string // 颜色
  icon?: string // 图标
}, {
  click?: (e: any) => void
},{
  default?: {"cbVar":"text"}
}>
export default Component
