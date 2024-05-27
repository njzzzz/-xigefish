import { defineTableFieldConfig, generateFieldList } from '@xigefish/d-render-shared'

export const tableColumns = generateFieldList(defineTableFieldConfig({
  key: { label: '参数' },
  intro: { label: '说明' },
  cbVar: { label: '回调参数' },
  value: {
    minWidth: '300px',
    label: '当前值',
    type: 'codeMirror',
    codeType: 'x-java',
    writable: true,
    height: '100px'
  }
}))
