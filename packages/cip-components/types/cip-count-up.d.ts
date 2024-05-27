import { CustomComponent, IAnyObject } from '@xigefish/types'
export const Component: CustomComponent<{
  modelValue?: number // 值
  startVal?: number // 起始值
  endVal?: number // 结束值
  duration?: number // 动画持续时间
  decimalPlaces?: number // 小数展示几位
  prefix?: string // 数字前缀
  suffix?: string // 数字后缀
}, {

}>
export default Component
