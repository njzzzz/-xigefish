import { basicTwoInputConfigureOptions } from '@xigefish/d-render-shared'
import { mergeFieldConfig, configMapToList } from '@xigefish/d-render-shared'
import { dictionaryManageService } from '@/api'
import { dictionaryEntity } from '@/api/entity'
const dictionaryColumns = configMapToList(mergeFieldConfig({ code: {}, name: {} }, dictionaryEntity))
const dictionarySearchFieldList = configMapToList(mergeFieldConfig({ name: {} }, dictionaryEntity))
export default {
  ...basicTwoInputConfigureOptions(),

  dictionaryCode: {
    type: 'selectInputTable',
    label: '字典类型',
    entity: dictionaryManageService,
    tableColumns: dictionaryColumns,
    searchFieldList: dictionarySearchFieldList,
    multiple: false,
    optionProps: { label: 'name', value: 'code' },
    otherKey: 'dictionaryName'
  },
  viewType: {
    type: 'radio',
    label: '选择形式',
    isButton: true,
    options: [
      { value: 'radio', label: 'Radio' },
      { value: 'checkbox', label: 'Checkbox' },
      { value: 'select', label: 'Select' }
    ],
    defaultValue: 'select'
  },
  display: {
    type: 'radio',
    label: '布局方式',
    isButton: true,
    options: [{ label: '块级', value: 'block' }, { label: '行内', value: 'inline-block' }],
    dependOn: ['viewType'],
    changeConfig: (config, { viewType }) => {
      if (viewType === 'select') config.readable = false
      return config
    }
  },
  placeholder: {
    dependOn: ['viewType'],
    changeConfig: (config, { viewType }) => {
      if (viewType !== 'select') config.readable = false
      return config
    }
  },
  multiple: {
    type: 'switch',
    label: '是否多选',
    dependOn: ['viewType'],
    changeConfig: (config, { viewType }) => {
      if (viewType !== 'select') config.readable = false
      return config
    }
  },
  filterable: {
    type: 'switch',
    label: '是否可搜索',
    defaultValue: true,
    dependOn: ['viewType'],
    changeConfig: (config, { viewType }) => {
      if (viewType !== 'select') config.readable = false
      return config
    }
  },
  required: {},
  requiredErrorMessage: {}
}
