// 默认的输入插件
import CCIPlugin from '@xigefish/d-render-plugin-cci'
import CCIPluginConfigure from '@xigefish/d-render-plugin-cci-configure'
import CCIPluginMobile from '@xigefish/d-render-plugin-cci-mobile'
import { insertConfig, defineDRenderConfig } from '@xigefish/d-render-shared'
import '@xigefish/d-render-plugin-cci/dist/index.css'
// 默认的布局插件
// 自定义的输入插件
import customInputsPlugin from '@/components/custom-form-input/component-config'

export default defineDRenderConfig({
  components: {
    // 自定义的输入类型
    codeMirror: (mode) => () => import(`@xigefish/plugins/form/form-input/basic/code-mirror${mode}`)
  },
  plugins: [
    CCIPlugin,
    customInputsPlugin
  ].map(v => insertConfig(v, CCIPluginMobile, 'mobile'))
    .map(v => insertConfig(v, CCIPluginConfigure, 'configure'))
})
