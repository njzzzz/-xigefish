import { basicInputConfigureOptions } from '@xigefish/d-render-shared'

export default {
  ...basicInputConfigureOptions(),
  defaultValue: {
    // type: 'formExpressionInput',
    // inputType: 'textarea',
    // mode: 'append' // 开启值追加模式
  },
  fontWeight: {
    type: 'radio',
    label: '文字粗细',
    isButton: true,
    options: ['lighter', 'normal', 'bold']
  },
  fontSize: {
    type: 'number',
    label: '文字大小',
    min: 12,
    max: 72,
    step: 1
  },
  textAlign: {
    type: 'radio',
    label: '文字位置',
    isButton: true,
    options: ['left', 'center', 'right']
  }
}
