import { defineFormFieldConfig, generateFieldList } from '@xigefish/d-render-shared'

export const configFieldList = generateFieldList(defineFormFieldConfig({
  _divider2: {
    type: 'divider',
    span: 24
  },
  systemTheme: {
    label: '主题',
    type: 'radio',
    span: 24,
    options: [
      { value: 'light', label: 'light' },
      { value: 'dark', label: 'dark' },
      { value: 'auto', label: '跟随系统' }
    ]
  },
  _divider1: {
    type: 'divider',
    span: 24
  },
  layout: {
    label: '布局',
    type: 'select',
    span: 12,
    options: ['left-2', 'top-left', 'top']
  },
  theme: {
    label: '主题',
    type: 'select',
    allowCreate: true,
    span: 12,
    options: ['supergravity', 'standard', 'dark', 'data-center']
  },
  withBreadcrumb: {
    label: '面包屑',
    type: 'switch',
    span: 6
  },
  withTabs: {
    label: '页签',
    type: 'switch',
    span: 6
  },
  hideFooter: {
    label: '隐藏页脚',
    type: 'switch',
    span: 6
  },
  hideAsideSwitch: {
    label: '隐藏左侧菜单折叠',
    type: 'switch',
    span: 6
  },
  primaryColor: {
    label: '品牌色',
    type: 'colorPicker',
    span: 6
  },
  successColor: {
    label: '成功色',
    type: 'colorPicker',
    span: 6
  },
  dangerColor: {
    label: '危险色',
    type: 'colorPicker',
    span: 6
  },
  warningColor: {
    label: '警告色',
    type: 'colorPicker',
    span: 6
  },
  _divider: {
    type: 'divider',
    span: 24
  },
  'main.dropdownLogout': {
    type: 'switch',
    label: '退出是否采用下拉菜单',
    span: 12
  },
  searchReset: {
    type: 'switch',
    label: '搜索重置功能',
    span: 12
  },
  'provideLayout.pageTheme': {
    type: 'select',
    label: '页面布局主题',
    options: ['standard', 'dg', 'supergravity'],
    span: 12
  },
  'table.size': {
    type: 'select',
    label: 'table大小',
    options: ['small', 'default', 'large'],
    span: 12
  },
  'table.standardSize': {
    type: 'select',
    label: '预设table大小',
    options: ['small', 'default', 'large'],
    disabled: true,
    span: 12
  },
  'number.thousandSeparator': {
    label: '数字前分位符号',
    span: 12
  }

}))
