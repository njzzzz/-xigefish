import MicroApp from './component'
import { getEqualPath } from '@xigefish/components/main/helper'
export const generateSubRoutes = (subConfig = []) => {
  return [].concat(subConfig).map(sub => ({
    path: `${sub.baseRoute.replace(/\/$/, '')}/:subPath(.*)`,
    name: `${sub.name}Sub`,
    props: ({ params }) => ({
      baseRoute: sub.baseRoute,
      name: sub.name,
      url: sub.url,
      shadowDom: sub.shadowDom,
      subPath: '/' + params.subPath,
      withoutFramework: sub.withoutFramework
    }),
    component: MicroApp
  }))
}

export const setMenuRouteToEqualPath = (item = {}, cipConfig) => {
  if (item.children && item.children.length > 0) {
    return item.children.forEach(v => setMenuRouteToEqualPath(v, cipConfig))
  }
  if (typeof item.route === 'string') item.route = getEqualPath(item.route, cipConfig)
}
