import { routes as basicRoutes } from '../auto-curd/routes'

export const routes = [...basicRoutes].map(v => {
  const item = { ...v }
  item.path = item.path.replace('auto', 'supergravity')
  item.name = item.name.replace('Basic', 'Supergravity')
  item.props = { layoutTheme: 'supergravity' }
  return item
})
