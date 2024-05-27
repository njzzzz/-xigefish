import { CustomComponent, IAnyObject } from '@xigefish/types'
export const Component: CustomComponent<{
  modelValue?: string // 绑定值
  rows?: number // 输入框行数，仅 type 为 'textarea' 时有效
  fixBorder?: boolean // 当存在suffix或者prefix时是否使用分割线
  type?: string // 类型
  maxlength?: number // 最大输入长度
  minlength?: number // 原生属性，最小输入长度
  showWordLimit?: boolean // 是否显示输入字数统计，只在 type = "text" 或 type = "textarea" 时有效
  placeholder?: string // 输入框占位文本
  clearable?: boolean // 是否可清空
  formatter?: (()=>void) // 指定输入值的格式。(只有当 type 是"text"时才有效) function(value: string / number): string
  parser?: (()=>void) // 指定从格式化器输入中提取的值。(仅当 type 是"text"时才有效) function(value: string): string
  showPassword?: boolean // 是否显示切换密码图标
  disabled?: boolean // 是否禁用
  size?: string // 大小 只在 type 不为 `textarea` 时有效
  prefixIcon?: string|IAnyObject|(()=>void) // 自定义前缀图标
  suffixIcon?: string|IAnyObject|(()=>void) // 自定义后缀图标
  autosize?: boolean|IAnyObject // 输入框行数，仅 type 为 'textarea' 时有效
  autocomplete?: string // 原生 autocomplete 属性
  name?: string // 等价于原生 input name 属性
  readonly?: boolean // 原生  readonly 属性，是否只读
  max?: number|string // 原生 max 属性，设置最大值
  min?: number|string // 原生属性，设置最小值
  step?: number|string // 原生属性，设置输入字段的合法数字间隔
  resize?: string // 控制是否能被用户缩放 none / both / horizontal / vertical
  autofocus?: boolean // 原生属性，自动获取焦点
  form?: string // 原生属性
  label?: string // 标签文本
  tabindex?: string|number // 输入框的 tabindex
  validateEvent?: boolean // 原生属性，自动获取焦点
  inputStyle?: IAnyObject // input 元素或 textarea 元素的 style
}, {
  blur?: (e: any) => void
  focus?: (e: any) => void
  change?: (value: any) => void
  input?: (value: any) => void
  clear?: () => void
},{
  prefix?: {}
  suffix?: {}
  prepend?: {}
  append?: {}
}>
export default Component
