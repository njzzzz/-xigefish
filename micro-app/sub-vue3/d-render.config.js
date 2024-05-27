// cci插件
import defaultInputsPlugin from '@xigefish/d-render-plugin-cci'
// 自定义的输入插件
import customInputsPlugin from '@/components/custom-form-input/component-config'
export default {
  components: {
    // 自定义的输入类型
    codeMirror: (mode) => () => import(`@xigefish/plugins/form/form-input/basic/code-mirror${mode}`)
  },
  plugins: [
    defaultInputsPlugin,
    customInputsPlugin
  ]
}
