import { CustomComponent, IAnyObject } from '@xigefish/types'
export const Component: CustomComponent<{
  modelValue?: string // 绑定值
  loading?: boolean // 加载状态
  buttonText?: string // 按钮文字
}, {
  'update:modelValue'?: (value: any) => void
  search?: () => void
},{
  buttonText?: {"intro":"按钮文字"}
  append?: {"intro":"组件后置内容"}
}>
export default Component
