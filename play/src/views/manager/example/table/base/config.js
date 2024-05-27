import { tableEntity } from '@/api/entity'
import { defineTableFieldConfig, generateFieldList } from '@xigefish/d-render-shared'

const filters = [
  {
    text: '完成',
    value: 0
  },
  {
    text: '错误',
    value: 1
  },
  {
    text: '告警',
    value: 2
  },
  {
    text: '进行中',
    value: 3
  },
  {
    text: '未开始',
    value: 4,
    color: '#C0C0C0'
  }
]
export const tableColumns = generateFieldList(defineTableFieldConfig({
  text: { description: '常规表头左对齐' },
  number: {},
  status: {
    filters,
    filterMethod (value, row) {
      return row.status === value
    }
  },
  sortTextField: {
    sortable: true
  },
  progress: {},
  switch: {},
  sortNumberField: {
    sortable: true
  }
}), tableEntity)
