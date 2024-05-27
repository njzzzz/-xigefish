import { defineTableFieldConfig, generateFieldList } from '@xigefish/d-render-shared'

export const tableColumns = generateFieldList(defineTableFieldConfig({
  key: { label: '参数' },
  intro: { label: '说明' },
  type: { label: '类型' },
  options: { label: '可选值', type: 'select', splitKey: ' /' },
  default: { label: '默认值' },
  value: {
    label: '当前值',
    writable: true,
    dependOn: ['default', 'type', 'options'],
    changeConfig: (config, values) => {
      if (values.default) config.defaultValue = values.default
      if ((values.options || []).length > 0) {
        config.type = 'select'
        config.options = values.options
        if (!config.validate) {
          config.allowCreate = true
        }
      }
      if (values.type === 'Boolean') {
        config.type = 'select'
        config.options = [{ value: true, label: 'true' }, { value: false, label: 'false' }]
      }
      return config
    }
  }
}))
