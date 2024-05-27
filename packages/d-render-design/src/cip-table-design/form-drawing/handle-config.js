import { configListToMap } from '@xigefish/d-render-shared'
import { BasicTypeToComponent } from './type-to-component'
import { cloneDeep, isNotEmpty } from '@xigefish/d-render-shared'
export const handleSpan = (config, spanToStyle) => {
  const span = config.span || 1
  const width = spanToStyle.width * span + spanToStyle.gapsWidth * (span - 1)
  config.style = { width: `${width}px` }
  return config
}

export const handleType = (config, typeToComponentMap) => {
  if (isNotEmpty(config.type)) {
    config.originComponent = typeToComponentMap[config.type]
  } else {
    config.originComponent = typeToComponentMap.default
  }
  return config
}
export const handleDependOn = (config, configMap) => {
  config.dependOn = config.dependOn?.map?.(key => ({ key, config: configMap[key] }))
  return config
}
// form默认类型与组件映射关系
export const defaultTypeToComponentMap = {
  ...BasicTypeToComponent,
  grid: 'basic-grid', // layout
  steps: 'basic-steps'
}
// form默认placeholder转style
export const defaultSpanToStyle = {
  width: 275,
  gapsWidth: 0
}
export const handleFormConfig = (config, configList = [], customTypeToConfigMap = {}, customSpanToStyle = {}, clone = true) => {
  // 合并配置
  const typeToConfigMap = { ...defaultTypeToComponentMap, ...customTypeToConfigMap }
  const spanToStyle = { ...defaultSpanToStyle, ...customSpanToStyle }
  const configMap = configListToMap(configList)
  let cloneConfig = clone ? cloneDeep(config) : config
  cloneConfig = handleType(cloneConfig, typeToConfigMap)
  cloneConfig = handleSpan(cloneConfig, spanToStyle)
  cloneConfig = handleDependOn(cloneConfig, configMap)
  return cloneConfig
}
