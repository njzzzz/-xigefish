import { CustomComponent, IAnyObject } from '@xigefish/types'
export const Component: CustomComponent<{
  value?: string // 绑定值
  size?: string // 大小
  maxHeight?: string // 最大高度
  showCron?: boolean // 是否显示表达式
  showField?: boolean // 是否显示表达式字段
}, {
  'update:value'?: (value: any) => void
  postChange?: (value: any) => void
},{
  append?: {"intro":"组件后置内容"}
}>
export default Component
