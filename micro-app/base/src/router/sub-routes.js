import { generateSubRoutes } from '@xigefish/micro-app/v3/base'
import { toUpperFirstCase } from '@xigefish/d-render-shared'

const subAppConfig = [
  { name: 'vue2', devUrl: 'http://127.0.0.1:18082' },
  { name: 'vue3', devUrl: 'http://127.0.0.1:18083' }
]

const env = process.env.NODE_ENV === 'production'
  ? localStorage.getItem('env') || 'production'
  : process.env.NODE_ENV
const getSubRouteConfigMap = (config, type) => {
  return config.reduce((acc, subApp) => {
    const { name, devUrl, prodUrl, withoutFramework, shadowDom = false } = subApp
    const url = env === 'development' ? devUrl : prodUrl // `${origin}/${name}/index.html`
    acc[name] = {
      url,
      baseRoute: `/m${toUpperFirstCase(name)}/`,
      withoutFramework,
      shadowDom
    }
    return acc
  }, {})
}

export const subRouteConfigMap = getSubRouteConfigMap(subAppConfig, process.env.NODE_ENV)
const subConfig = Object.keys(subRouteConfigMap).map(name => ({ name, ...subRouteConfigMap[name] }))
export const subappRoutes = generateSubRoutes(subConfig)
