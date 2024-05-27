import {
  configMapToList,
  mergeFieldConfig,
  defineSearchFieldConfig,
  defineFormFieldConfig
} from '@xigefish/d-render-shared'

const entity = {}

export function createSearchFieldList (num) {
  const config = {}
  for (let i = 0; i < num; i++) {
    config[`name${i}`] = { type: 'input', label: `姓名${i}` }
  }
  return configMapToList(
    mergeFieldConfig(defineSearchFieldConfig(config), entity)
  ).map(v => {
    v.config.span = Math.floor(Math.random() * 3 + 1)
    return v
  })
}

const options = [
  {
    label: '显示',
    value: true
  },
  {
    label: '隐藏',
    value: false
  }
]
export const formFieldList = configMapToList(
  mergeFieldConfig(
    defineFormFieldConfig({
      conditionLength: { type: 'number', min: 1, label: '搜索条件数量' },
      labelPosition: {
        label: 'label位置',
        type: 'select',
        options: [
          {
            label: '在上方',
            value: 'top'
          },
          {
            label: '在左侧',
            value: 'left'
          }
        ]
      },
      grid: {
        label: 'Grid',
        type: 'number',
        description: 'cip-search-form中grid布局的列数，大于0才会生效',
        descriptionEffect: 'dark',
        min: 0,
        controls: false
      },
      collapse: {
        label: '是否显示展开/收缩',
        type: 'radio',
        options
      },
      showSearch: {
        label: '是否显示搜索按钮',
        type: 'radio',
        options
      },
      showResetBtn: {
        label: '是否显示重置按钮',
        type: 'radio',
        options
      },
      searchButtonText: {
        label: '搜索按钮文字',
        type: 'input'
      }
    }),
    entity
  )
).map(v => {
  v.config.span = Math.floor(Math.random() * 3 + 1)
  return v
})
