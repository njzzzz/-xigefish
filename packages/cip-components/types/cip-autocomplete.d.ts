import { CustomComponent, IAnyObject } from '@xigefish/types'
export const Component: CustomComponent<{
  modelValue?: string // 绑定值
  placeholder?: string // 输入框占位文本
  clearable?: boolean // 是否可清空
  disabled?: boolean // 是否禁用
  name?: string // 等价于原生 input name 属性
  label?: string // 标签文本
  popperClass?: string // 下拉列表的类名
  width?: string|number // 控制文本框宽度
}, {
  select?: (e: any) => void
  change?: (value: any) => void
},{
  prefix?: {}
  suffix?: {}
  prepend?: {}
  append?: {}
}>
export default Component
