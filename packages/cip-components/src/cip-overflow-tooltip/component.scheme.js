
export const propsScheme = {
  placement: {
    type: String,
    default: 'top',
    intro: 'Tooltip 组件出现的位置',
    options: ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'],
    validate: true
  },
  trigger: {
    type: String,
    default: 'hover',
    intro: '如何触发 tooltip (来显示)',
    options: ['click', 'focus', 'hover', 'manual'],
    validate: true

  },
  rowKey: {
    intro: '强制更新 rowKey改变后重新计算是否溢出'
  }
}

export const slotsScheme = {
  default: {
    intor: 'Tooltip 触发 & 引用的元素'
  }
}

export const componentScheme = {
  propsScheme,
  slotsScheme
}
