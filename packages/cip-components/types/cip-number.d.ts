import { CustomComponent, IAnyObject } from '@xigefish/types'
export const Component: CustomComponent<{
  modelValue?: number // 值
  unit?: string // 单位
  controls?: boolean // 是否需要按钮
  controlsPosition?: string // 按钮位置
  noPrecision?: boolean // 是否不设置精度
  precision?: number // 保留小数
  step?: number // 步长
  min?: number // 最小值
  placeholder?: string // 占位符
  disabled?: boolean // 是否禁用状态
  max?: number // 最大值
  size?: string // 大小
}, {
  'update:modelValue'?: (val: any) => void
},{
  default?: {"cbVar":"text"}
}>
export default Component
