import { CustomComponent, IAnyObject } from '@xigefish/types'
export const Component: CustomComponent<{
  message?: string // 消息文字
  type?: string // 消息类型
  showClose?: boolean // 是否显示关闭按钮
  grouping?: boolean // 合并内容相同的消息，不支持 VNode 类型的消息
  icon?: string // 自定义图标，该属性会覆盖 type 的图标。
  dangerouslyUseHTMLString?: boolean // 是否将 message 属性作为 HTML 片段处理
  customClass?: string // 自定义类名
  duration?: number // 显示时间，单位为毫秒。 设为 0 则不会自动关闭
  center?: boolean // 文字是否居中
  onClose?: (()=>void) // 关闭时的回调函数, 参数为被关闭的 message 实例
  offset?: number // Message 距离窗口顶部的偏移量
  appendTo?: string // 设置组件的根元素
}, {

}>
export default Component
