import { CustomComponent, IAnyObject } from '@xigefish/types'
export const Component: CustomComponent<{
  message?: string // 加载文案
  btnName?: string // 关闭loading按钮-按钮展示文字
  onCancel?: (()=>void)
}, {

}>
export default Component
