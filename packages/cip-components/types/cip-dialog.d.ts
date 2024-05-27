import { CustomComponent, IAnyObject } from '@xigefish/types'
export const Component: CustomComponent<{
  title?: string // 标题
  dialogType?: string
  subTitle?: string // 副标题
  modelValue?: boolean // 是否显示dialog
  onConfirm?: (()=>void) // 确认函数
  beforeConfirm?: (()=>void) // 触发表单验证前的值设置
  size?: undefined // dialog宽度对应的尺寸
  width?: undefined // dialog宽度
  top?: undefined // 高度
  closeOnClickModal?: boolean // 点击遮罩层是否关闭dialog
  showOnly?: undefined // 是否只展示
  buttonSize?: undefined // footer按钮大小
  confirmText?: undefined // 触发on-confirm方法的按钮文字
  cancelText?: undefined // 触发关闭dialog方法按钮的文字
  showCancel?: boolean // 是否展示取消按钮
  destroyOnClose?: boolean // 关闭时是否销毁dialog
  maxDepth?: number // 查找form的深度
  fullscreen?: boolean
}, {
  cancel?: () => void
  close?: () => void
  'update:modelValue'?: (value: any) => void
},{
  mainTitle?: {"cbVar":"text"}
  subTitle?: {"cbVar":"text"}
  default?: {"cbVar":"text"}
  footer?: {"cbVar":"text"}
}>
export default Component
