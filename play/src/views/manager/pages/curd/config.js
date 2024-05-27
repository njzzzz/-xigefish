import {
  defineFormFieldConfig,
  defineSearchFieldConfig,
  defineTableFieldConfig,
  generateFieldList
} from '@xigefish/d-render'
import { accountEntity } from '@/api/entity'

export const searchFieldList = generateFieldList(defineSearchFieldConfig({
  username: { span: 1 },
  userName: { span: 1 },
  sex: { },
  birthday: { span: 1 },
  dataRange: { label: '日期区间', span: 2, type: 'dateRange', otherKey: 'dataRang1' }
  // status: {}
}), accountEntity)

export const inputSearchFieldList = generateFieldList(defineSearchFieldConfig({
  userName: { hideLabel: true }
}), accountEntity)

export const tableColumns = generateFieldList(defineTableFieldConfig({
  username: { },
  userName: {},
  sex: {},
  birthday: { align: 'center' },
  createTime: {},
  status: {},
  num: { width: '100px' }
}), accountEntity)

export const formFieldList = generateFieldList(defineFormFieldConfig({
  username: { required: true, type: 'textarea' },
  userName: { required: true },
  pwd: {
    required: true,
    dependOn: ['id'],
    changeConfig: (config, { id }) => {
      if (id) {
        config.readable = false
      }
      return config
    }
  },
  sex: {},
  birthday: {},
  divider: { type: 'divider', span: 2, border: false },
  status: { required: true, span: 2 }
}), accountEntity)

export const tableRadioColumns = generateFieldList(defineTableFieldConfig({
  username: {},
  userName: {},
  sex: {},
  birthday: {},
  status: { type: 'tableRadio', activeValue: true, inactiveValue: false, writable: true, checkComponent: 'checkbox' }
}), accountEntity)
