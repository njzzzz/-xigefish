import { tableEntity } from '@/api/entity'
import { defineTableFieldConfig, generateFieldList } from '@xigefish/d-render-shared'

export const tableColumns = generateFieldList(defineTableFieldConfig({
  text: { fixed: true, width: '400px' },
  number: { width: '400px' },
  sortTextField: {
    sortable: true,
    width: '400px'
  },
  sortNumberField: {
    sortable: true,
    width: '400px'
  }
}), tableEntity)
