import { CustomComponent, IAnyObject } from '@xigefish/types'
export const Component: CustomComponent<{
  protocol?: string // 协议
  host?: string // 主机地址
  port?: number // 端口号
  path?: string // 路径
  size?: string // 尺寸
  portMin?: number // 端口号最小值
  portMax?: number // 端口号最大值
  disabled?: boolean // 禁用
  disabledConfig?: IAnyObject // 细致的对每个输入框的禁用进行配置
}, {
  'update:protocol'?: (newVal: any) => void
  'update:host'?: (newVal: any) => void
  'update:port'?: (newVal: any) => void
  'update:path'?: (newVal: any) => void
}>
export default Component
