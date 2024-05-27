import { tableEntity } from '@/api/entity'
import { defineTableFieldConfig, generateFieldList } from '@xigefish/d-render-shared'

export const tableColumns = generateFieldList(defineTableFieldConfig({
  text: {},
  mergeText: {
    label: '合并表头',
    children: generateFieldList(defineTableFieldConfig({
      text1: {},
      text2: {}
    }), tableEntity)
  },
  mergeText2: {
    label: '合并表头',
    children: generateFieldList(defineTableFieldConfig({
      text3: {},
      text4: {}
    }), tableEntity)
  }
}), tableEntity)
