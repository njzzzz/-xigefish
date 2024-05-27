
export const propsScheme = {
  src: {
    type: String,
    intro: '图片源地址，同原生属性一致'
  },
  fit: {
    type: String,
    intro: '确定图片如何适应容器框，同原生',
    options: ['fill', 'contain', 'cover', 'none', 'scale-down'],
    validate: true,
    attr: true
  },
  hideOnClickModal: {
    type: Boolean,
    intro: '当开启 preview 功能时，是否可以通过点击遮罩层关闭 preview',
    default: false,
    attr: true
  },
  loading: {
    type: String,
    intro: '浏览器加载图像的策略，和 浏览器原生能力一致',
    options: ['eager', 'lazy'],
    validate: true,
    attr: true
  },
  lazy: {
    type: Boolean,
    intro: '是否使用懒加载',
    default: false,
    attr: true
  },
  scrollContainer: {
    type: [String],
    intro: '开启懒加载功能后，监听 scroll 事件的容器',
    default: '最近一个 overflow 值为 auto 或 scroll 的父元素',
    attr: true
  },
  alt: {
    type: String,
    intro: '原生属性 alt',
    attr: true
  },
  referrerPolicy: {
    type: String,
    intro: '原生属性 referrerPolicy',
    attr: true
  },
  previewSrcList: {
    type: Array,
    intro: '开启图片预览功能',
    attr: true
  },
  zIndex: {
    type: Number,
    intro: '设置图片预览的 z-index',
    attr: true
  },
  initialIndex: {
    type: Number,
    intro: '初始预览图像索引，小于 url-list 的长度',
    default: 0,
    attr: true
  },
  closeOnPressEscape: {
    type: Boolean,
    intro: '是否可以通过按下 ESC 关闭 Image Viewer',
    default: true,
    attr: true
  },
  previewTeleported: {
    type: Boolean,
    intro: 'image-viewer 是否插入至 body 元素上。 嵌套的父元素属性会发生修改时应该将此属性设置为 true',
    default: false,
    attr: true
  }
}

export const eventsScheme = {
  load: {
    intro: '图片加载成功触发',
    cbVar: 'e: Event'
  },
  error: {
    intro: '图片加载失败触发',
    cbVar: 'e: Error'
  },
  switch: {
    intro: '切换图像时触发。',
    cbVar: 'index: number'
  },
  close: {
    intro: '当点击 X 按钮或者在hide-on-click-modal为 true 时点击遮罩层时触发'
  }
}

export const componentScheme = {
  propsScheme,
  eventsScheme
}
