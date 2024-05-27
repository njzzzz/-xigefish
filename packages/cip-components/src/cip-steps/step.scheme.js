export const propsScheme = {
  title: {
    type: String,
    intro: '标题'
  },
  description: {
    type: String,
    intro: '描述文案'
  },
  icon: {
    type: [String, Object],
    intro: 'Step 组件的自定义图标。 也支持 slot 方式写入'
  },
  status: {
    type: String,
    intro: '设置当前步骤的状态， 不设置则根据 steps 确定状态'
  }
}

export const slotsScheme = {
  icon: {
    intro: '自定义图标'
  },
  title: {
    intro: '自定义标题'
  },
  description: {
    intro: '自定义描述文案'
  }
}

export const componentScheme = {
  propsScheme,
  slotsScheme
}
