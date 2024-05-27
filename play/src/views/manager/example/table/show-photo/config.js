import { tableEntity } from '@/api/entity'
import { defineTableFieldConfig, generateFieldList } from '@xigefish/d-render-shared'

export const tableColumns = generateFieldList(defineTableFieldConfig({
  img: { type: 'image', itemWidth: '32px', itemHeight: '32px' },
  text: {},
  number: {},
  sortTextField: {
    sortable: true
  },
  sortNumberField: {
    sortable: true
  }
}), tableEntity)
