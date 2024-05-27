import { basicInputConfigureOptions } from '@xigefish/d-render-shared'
export const fileTypeList = ['png', 'jpg', 'jpeg', 'jpe', 'gif', 'doc', 'docx', 'ppt', 'pptx', 'pdf', 'xls', 'xlsx', 'zip', '7z', 'rar']

export default {
  ...basicInputConfigureOptions(),
  limit: {
    type: 'number',
    label: '文件数量限制',
    min: 0
  },
  size: {
    type: 'number',
    label: '文件大小限制(MB)',
    controlsPosition: 'right',
    defaultValue: 500,
    min: 0,
    max: 500
  },
  fileType: {
    type: 'select',
    multiple: true,
    allowCreate: true,
    label: '文件类型',
    options: fileTypeList
  },
  formwork: {
    label: '模板',
    type: 'file',
    limit: 1,
    dependOn: ['fileType'],
    changeConfig: (config, { fileType }) => {
      if (fileType) config.fileType = fileType
      return config
    },
    fileType: fileTypeList.join(',')
  },
  required: { },
  requiredErrorMessage: { }
}
