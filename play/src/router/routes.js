import ManagerFramework from '@/views/manager/framework'
const ctx = require.context('@/views/manager', true, /(\w+\/)*(routes\/index|routes)\.js$/i)
const frontCtx = require.context('@/views/front', true, /(\w+\/)*(routes\/index|routes)\.js$/i)
const getChildren = (ctx) => {
  const result = []
  const paths = ctx.keys()
  paths.forEach(path => {
    const routes = ctx(path).routes || []
    result.push(...routes)
  })
  return result
}
// front 子路由 可用于权限控制
export const frontChildren = getChildren(frontCtx)
// manager 子路由 可用于权限控制
export const mainChildren = getChildren(ctx)

export const mainRoute = {
  path: '/',
  name: '_mainFramework',
  component: ManagerFramework,
  children: []
}
export const routes = [mainRoute, {
  path: '/form-design',
  name: 'formDesign',
  component: () => import('@/views/manager/pages/form-design')
}]
