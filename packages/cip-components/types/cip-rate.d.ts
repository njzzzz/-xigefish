import { CustomComponent, IAnyObject } from '@xigefish/types'
export const Component: CustomComponent<{
  modelValue?: number // 选中项绑定值
  max?: number // 最大分值
  size?: string // 尺寸
  disabled?: boolean // 是否为只读
  allowHalf?: boolean // 是否允许半选
  lowThreshold?: number // 低分和中等分数的界限值， 值本身被划分在低分中
  highThreshold?: number // 高分和中等分数的界限值， 值本身被划分在高分中
  colors?: Array<any>|IAnyObject // icon 的颜色。 若传入数组，共有 3 个元素，为 3 个分段所对应的颜色；若传入对象，可自定义分段，键名为分段的界限值，键值为对应的颜色
  voidColor?: string // 未选中 icon 的颜色
  disabledVoidColor?: string // 只读时未选中 icon 的颜色
  icons?: Array<any>|IAnyObject // 图标组件 若传入数组，共有 3 个元素，为 3 个分段所对应的类名；若传入对象，可自定义分段，键名为分段的界限值，键值为对应的类名
  voidIcon?: string|IAnyObject // 未被选中的图标组件
  disabledVoidIcon?: string|IAnyObject // 禁用状态的未选择图标
  showText?: boolean // 是否显示辅助文字，若为真，则会从 texts 数组中选取当前分数对应的文字内容
  showScore?: boolean // 是否显示当前分数， show-score 和 show-text 不能同时为真
  textColor?: string // 辅助文字的颜色
  texts?: Array<any> // 辅助文字数组
  scoreTemplate?: string // 分数显示模板
}, {
  'update:modelValue'?: (val: any) => void
  change?: (val: any) => void
}>
export default Component
