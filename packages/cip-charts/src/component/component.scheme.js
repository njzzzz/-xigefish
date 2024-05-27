import { GROUP, NAME, OPTION, VALUE } from './const'

export const propsScheme = {
  options: {
    type: Object,
    default: () => OPTION,
    intro: '图表配置项'
  },
  dataset: {
    type: Array,
    default: () => [],
    intro: '数据集'
  },
  bindProps: {
    type: Object,
    default: () => ({
      name: NAME,
      value: VALUE,
      group: GROUP,
      intro: '属性绑定'
    })
  }
}

export const eventsScheme = {
  'chart-init': {
    intro: '图表加载后抛出charts实例',
    cbVar: 'chartInstance'
  }
}

export const componentScheme = {
  propsScheme,
  eventsScheme
}
