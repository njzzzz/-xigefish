import { CustomComponent, IAnyObject } from '@xigefish/types'
export const Component: CustomComponent<{
  type?: string // 菜单按钮类型，同 Button 组件一样，仅在 split-button 为 true 的情况下有效
  size?: string // 菜单尺寸，在 split-button 为 true 的情况下也对触发按钮生效
  maxHeight?: string|number // 菜单最大高度
  splitButton?: boolean // 下拉触发元素呈现为按钮组
  disabled?: boolean // 是否禁用
  placement?: string // 菜单弹出位置
  trigger?: string // 触发下拉的行为
  hideOnClick?: boolean // 是否在点击菜单项后隐藏菜单
  showTimeout?: number // 展开下拉菜单的延时，仅在 trigger 为 hover 时有效
  hideTimeout?: number // 收起下拉菜单的延时（仅在 trigger 为 hover 时有效）
  role?: string // 下拉菜单的 ARIA 属性。 根据具体场景，您可能想要将此更改为“navigation”
  tabindex?: number // Dropdown 组件的 tabindex
  popperClass?: string // 自定义浮层类名
  popperOptions?: IAnyObject // popper.js 参数, 请参考 popper.js 文档
}, {

},{
  default?: {"intro":"下拉菜单的内容。 注意：必须是有效的 html DOM 元素（例如 <span>、<button> 等）或 el-component，以附加监听触发器"}
  dropdown?: {"intro":"下拉列表，通常是 <el-dropdown-menu> 组件"}
}>
export default Component
