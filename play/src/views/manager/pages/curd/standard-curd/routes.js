import { routes as basicRoutes } from '../auto-curd/routes'

export const routes = [...basicRoutes].map(v => {
  const item = { ...v }
  item.path = item.path.replace('auto', 'standard')
  item.name = item.name.replace('Basic', 'Standard')
  item.props = { layoutTheme: 'standard' }
  return item
})
