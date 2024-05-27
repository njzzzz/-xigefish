import { tableEntity } from '@/api/entity'
import { defineTableFieldConfig, generateFieldList } from '@xigefish/d-render-shared'

export const tableColumns = generateFieldList(defineTableFieldConfig({
  text: {},
  text1: {},
  text2: {},
  text3: {},
  text4: {}
}), tableEntity)
