import { defaultMenus } from '@xigefish/d-render-plugin-cci/esm/input/basic/editor/config'
export default {
  key: {},
  label: {},
  description: {},
  isMainField: {},
  hideLabel: {},
  labelWidth: {},
  height: {
    label: '高度',
    type: 'select',
    allowCreate: true,
    options: ['150', '200', '250', '300', '400']
  },
  menus: {
    label: '菜单配置',
    type: 'select',
    multiple: true,
    options: defaultMenus
  },
  menuTooltipPosition: {
    label: '菜单栏提示位置',
    type: 'select',
    options: ['up', 'down']
  },
  showMenuTooltips: {
    label: '是否显示菜单栏提示',
    type: 'switch',
    defaultValue: true
  },
  showFullScreen: {
    label: '开启全屏功能',
    type: 'switch',
    defaultValue: true
  },
  pasteFilterStyle: {
    label: '是否开启粘贴样式过滤',
    type: 'switch',
    defaultValue: true
  },
  pasteIgnoreImg: {
    label: '是否忽略粘贴内容的图片',
    type: 'switch',
    defaultValue: true
  },
  required: { },
  requiredErrorMessage: { }
}
