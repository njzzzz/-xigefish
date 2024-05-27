import inputComponentConfig from './input/component-config'
import layoutComponentConfig from './layout/component-config'

/**
 * 无法单独使用，依赖与@xigefish/d-render-plugin-cci
 * 通过import('@xigefish/d-render-shared').insertConfig(dRenderPluginCciMobile,'mobile')实现注入
 */
export default {
  ...inputComponentConfig,
  ...layoutComponentConfig
}
