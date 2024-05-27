import { CustomComponent, IAnyObject } from '@xigefish/types'
export const Component: CustomComponent<{
  src?: string // 图片源地址，同原生属性一致
  fit?: string // 确定图片如何适应容器框，同原生
  hideOnClickModal?: boolean // 当开启 preview 功能时，是否可以通过点击遮罩层关闭 preview
  loading?: string // 浏览器加载图像的策略，和 浏览器原生能力一致
  lazy?: boolean // 是否使用懒加载
  scrollContainer?: string // 开启懒加载功能后，监听 scroll 事件的容器
  alt?: string // 原生属性 alt
  referrerPolicy?: string // 原生属性 referrerPolicy
  previewSrcList?: Array<any> // 开启图片预览功能
  zIndex?: number // 设置图片预览的 z-index
  initialIndex?: number // 初始预览图像索引，小于 url-list 的长度
  closeOnPressEscape?: boolean // 是否可以通过按下 ESC 关闭 Image Viewer
  previewTeleported?: boolean // image-viewer 是否插入至 body 元素上。 嵌套的父元素属性会发生修改时应该将此属性设置为 true
}, {
  load?: ('e: Event': any) => void
  error?: ('e: Error': any) => void
  switch?: ('index: number': any) => void
  close?: () => void
}>
export default Component
