import { defineSearchFieldConfig, defineTableFieldConfig, generateFieldList } from '@xigefish/d-render'
export const searchFieldList = generateFieldList(defineSearchFieldConfig({
  name: { label: '库名' }
}))
export const tableColumns = generateFieldList(defineTableFieldConfig({
  name: { label: '库名' },
  description: { label: '描述', showOverflowTooltip: true },
  version: { label: '版本' }
}))
