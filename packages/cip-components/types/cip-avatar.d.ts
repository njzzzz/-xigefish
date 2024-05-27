import { CustomComponent, IAnyObject } from '@xigefish/types'
export const Component: CustomComponent<{
  src?: string // Avatar图片的源地址
  size?: number|string // 大小
  icon?: IAnyObject|string // 设置Avatar的图标类型，具体参考Icon组件
  shape?: string // Avatar 形状
  'src-set'?: string // 图片Avatar的原生srcset属性
  alt?: string // 图片Avatar的原生alt属性
  fit?: string // 当展示类型为图片的时候，设置图片如何适应容器
}, {
  error?: (e: any) => void
},{
  default?: {}
}>
export default Component
