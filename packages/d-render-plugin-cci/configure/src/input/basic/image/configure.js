import { basicInputConfigureOptions } from '@xigefish/d-render-shared'

export default {
  ...basicInputConfigureOptions(),
  limit: {
    type: 'number',
    label: '图片数量限制',
    min: 0
  },
  size: {
    type: 'number',
    label: '图片大小限制(MB)',
    controlsPosition: 'right',
    max: 500,
    min: 0,
    defaultValue: 500
  },
  fileType: {
    type: 'select',
    multiple: true,
    label: '图片类型',
    options: ['png', 'jpg', 'jpeg', 'jpe']
  },
  required: { },
  requiredErrorMessage: { }
}
