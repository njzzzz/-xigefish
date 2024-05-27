import { routes as basicRoutes } from '../auto-curd/routes'

export const routes = [...basicRoutes].map(v => {
  const item = { ...v }
  item.path = item.path.replace('auto', 'dg')
  item.name = item.name.replace('Basic', 'Dg')
  item.props = { layoutTheme: 'dg' }
  return item
})
