import { defineFormFieldConfig, generateFieldList } from '@xigefish/d-render-shared'
import { cloneDeep } from '@xigefish/d-render-shared'

const common = {
  options: [{ value: '1', label: '当前项' }, { value: '2', label: '选择项' }, { value: '3', label: '悬浮项' }, { value: '4', label: '禁用项测试', disabled: true }],
  type: 'select',
  optionProps: {
    label: 'label',
    value: 'value',
    disabled: 'disabled'
  }
}
const common2 = cloneDeep(common)
common2.type = 'checkTags'
common2.multiple = true
const entity = {
  defaultVal: {
    label: '默认'
  },
  float: {
    label: '悬浮'
  },
  click: {
    label: '选择'
  },
  disabled: {
    label: '禁用'
  },
  complete: {
    label: '完成'
  },
  alarm: {
    label: '告警'
  },
  multiply: {
    label: '多选溢出形式1'
  },
  multiply2: {
    label: '多选溢出形式2'
  },
  multiplyDisabled: {
    label: '多选不可用'
  },
  multiplySearch: {
    label: '带搜索功能'
  },
  searchDefault: {
    label: '带搜索默认态'
  },
  checkTags: {
    label: '搜索'
  }
}
const fieldSelect1 = {
  defaultVal: {
    ...common
  },
  float: {
    ...common
  },
  click: {
    ...common
  },
  disabled: {
    disabled: true,
    ...common
  },
  alarm: {
    required: true,
    ...common
  }
}
const fieldSelect2 = {
  multiply: {
    ...common,
    multiple: true
  },
  multiply2: {
    ...common,
    multiple: true,
    collapseTags: true
  },
  multiplyDisabled: {
    ...common,
    multiple: true,
    disabled: true
  }
}
const fieldSelect3 = {
  multiplySearch: {
    ...common,
    multiple: true,
    filterable: true
  },
  searchDefault: {
    ...common,
    filterable: true,
    noMatchText: '无相关内容'
  }
}
export const fieldSelectTag = {
  multiplySearch: {
    ...common,
    multiple: true,
    filterable: true
  }
}
const fieldSelect4 = {
  checkTags: {
    ...common2
  }
}
export const cascader = {
  data: {
    label: '级联选择',
    type: 'cascader',
    options: [
      {
        value: 'guide',
        label: 'Guide',
        children: [
          {
            value: 'disciplines',
            label: 'Disciplines'
            // children: [
            //   {
            //     value: 'consistency',
            //     label: 'Consistency'
            //   },
            //   {
            //     value: 'feedback',
            //     label: 'Feedback'
            //   },
            //   {
            //     value: 'efficiency',
            //     label: 'Efficiency'
            //   },
            //   {
            //     value: 'controllability',
            //     label: 'Controllability'
            //   }
            // ]
          },
          {
            value: 'navigation',
            label: 'Navigation',
            children: [
              {
                value: 'side nav',
                label: 'Side Navigation'
              },
              {
                value: 'top nav',
                label: 'Top Navigation'
              }
            ]
          }
        ]
      },
      {
        value: 'component',
        label: 'Component',
        children: [
          {
            value: 'basic',
            label: 'Basic',
            children: [
              {
                value: 'layout',
                label: 'Layout'
              },
              {
                value: 'color',
                label: 'Color'
              },
              {
                value: 'typography',
                label: 'Typography'
              },
              {
                value: 'icon',
                label: 'Icon'
              },
              {
                value: 'button',
                label: 'Button'
              }
            ]
          },
          {
            value: 'form',
            label: 'Form',
            children: [
              {
                value: 'radio',
                label: 'Radio'
              },
              {
                value: 'checkbox',
                label: 'Checkbox'
              },
              {
                value: 'input',
                label: 'Input'
              },
              {
                value: 'input-number',
                label: 'InputNumber'
              },
              {
                value: 'select',
                label: 'Select'
              },
              {
                value: 'cascader',
                label: 'Cascader'
              },
              {
                value: 'switch',
                label: 'Switch'
              },
              {
                value: 'slider',
                label: 'Slider'
              },
              {
                value: 'time-picker',
                label: 'TimePicker'
              },
              {
                value: 'date-picker',
                label: 'DatePicker'
              },
              {
                value: 'datetime-picker',
                label: 'DateTimePicker'
              },
              {
                value: 'upload',
                label: 'Upload'
              },
              {
                value: 'rate',
                label: 'Rate'
              },
              {
                value: 'form',
                label: 'Form'
              }
            ]
          },
          {
            value: 'data',
            label: 'Data',
            children: [
              {
                value: 'table',
                label: 'Table'
              },
              {
                value: 'tag',
                label: 'Tag'
              },
              {
                value: 'progress',
                label: 'Progress'
              },
              {
                value: 'tree',
                label: 'Tree'
              },
              {
                value: 'pagination',
                label: 'Pagination'
              },
              {
                value: 'badge',
                label: 'Badge'
              }
            ]
          },
          {
            value: 'notice',
            label: 'Notice',
            children: [
              {
                value: 'alert',
                label: 'Alert'
              },
              {
                value: 'loading',
                label: 'Loading'
              },
              {
                value: 'message',
                label: 'Message'
              },
              {
                value: 'message-box',
                label: 'MessageBox'
              },
              {
                value: 'notification',
                label: 'Notification'
              }
            ]
          },
          {
            value: 'navigation',
            label: 'Navigation',
            children: [
              {
                value: 'menu',
                label: 'Menu'
              },
              {
                value: 'tabs',
                label: 'Tabs'
              },
              {
                value: 'breadcrumb',
                label: 'Breadcrumb'
              },
              {
                value: 'dropdown',
                label: 'Dropdown'
              },
              {
                value: 'steps',
                label: 'Steps'
              }
            ]
          },
          {
            value: 'others',
            label: 'Others',
            children: [
              {
                value: 'dialog',
                label: 'Dialog'
              },
              {
                value: 'tooltip',
                label: 'Tooltip'
              },
              {
                value: 'popover',
                label: 'Popover'
              },
              {
                value: 'card',
                label: 'Card'
              },
              {
                value: 'carousel',
                label: 'Carousel'
              },
              {
                value: 'collapse',
                label: 'Collapse'
              }
            ]
          }
        ]
      },
      {
        value: 'resource',
        label: 'Resource',
        children: [
          {
            value: 'axure',
            label: 'Axure Components'
          },
          {
            value: 'sketch',
            label: 'Sketch Templates'
          },
          {
            value: 'docs',
            label: 'Design Documentation'
          }
        ]
      }
    ]
  }
}
export const formFieldList = generateFieldList(defineFormFieldConfig(fieldSelect1), entity)
export const formFieldList2 = generateFieldList(defineFormFieldConfig(fieldSelect2), entity)
export const formFieldList3 = generateFieldList(defineFormFieldConfig(fieldSelect3), entity)
export const formFieldList5 = generateFieldList(defineFormFieldConfig(fieldSelect4), entity)
export const formFieldList4 = generateFieldList(defineFormFieldConfig(cascader, {}))
export const formFieldListTag = generateFieldList(defineFormFieldConfig(fieldSelectTag), entity)
