export const propsScheme = {
  src: {
    type: String,
    intro: 'Avatar图片的源地址'
  },
  size: {
    type: [Number, String],
    default: 'default',
    intro: '大小'
  },
  icon: {
    type: [Object, String],
    intro: '设置Avatar的图标类型，具体参考Icon组件'
  },
  shape: {
    type: String,
    default: 'circle',
    intro: 'Avatar 形状',
    options: ['circle', 'square'],
    validate: true
  },
  'src-set': {
    type: String,
    intro: '图片Avatar的原生srcset属性'
  },
  alt: {
    type: String,
    intro: '图片Avatar的原生alt属性'
  },
  fit: {
    type: String,
    default: 'cover',
    intro: '当展示类型为图片的时候，设置图片如何适应容器',
    options: ['fill', 'contain', 'cover', 'none', 'scale-down'],
    validate: true
  }
}

export const eventsScheme = {
  error: { cbVar: 'e' }
}

export const slotsScheme = {
  default: {}
}

export const componentScheme = {
  propsScheme,
  slotsScheme,
  eventsScheme
}
