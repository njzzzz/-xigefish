import { CustomComponent, IAnyObject } from '@xigefish/types'
export const Component: CustomComponent<{
  mode?: string // 时间轴位置
}, {
  click?: (e: any) => void
},{
  default?: {"cbVar":"text"}
}>
export default Component
