import { CustomComponent, IAnyObject } from '@xigefish/types'
export const Component: CustomComponent<{
  placement?: string // Tooltip 组件出现的位置
  trigger?: string // 如何触发 tooltip (来显示)
  rowKey?: undefined // 强制更新 rowKey改变后重新计算是否溢出
}, {

},{
  default?: {"intor":"Tooltip 触发 & 引用的元素"}
}>
export default Component
