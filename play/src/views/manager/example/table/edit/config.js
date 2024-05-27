import { tableEntity } from '@/api/entity'
import { defineTableFieldConfig, generateFieldList } from '@xigefish/d-render-shared'

export const tableColumns = generateFieldList(defineTableFieldConfig({
  text: {},
  number: {},
  sortTextField: {
    sortable: true
  },
  sortNumberField: {
    sortable: true
  }
}), tableEntity)
