import { generateFieldList, defineTableFieldConfig } from '@xigefish/d-render-shared'

export const tableColumns = generateFieldList(defineTableFieldConfig({
  input: { label: '单行', width: '100px', showOverflowTooltip: true },
  tableSelection: {
    label: '多选',
    columnType: 'checkbox',
    selectable: ({ row, index }) => {
      return index > 0
    }
  }, // 此type为内置
  textarea: { label: '多行', type: 'input' },
  select: { label: '下拉选择', type: 'select', options: [{ value: 1, label: '是' }, { value: 0, label: '否' }] },
  number: { label: '数字', type: 'number' }
}))
