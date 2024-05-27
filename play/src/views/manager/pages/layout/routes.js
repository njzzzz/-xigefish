export const routes = [
  {
    name: 'pageLayoutList',
    path: '/page-layout/list',
    component: () => import('./list')
  },
  {
    name: 'pageLayoutHandle',
    path: '/page-layout/handle',
    component: () => import('./handle')
  },
  {
    name: 'pageLayoutInfo',
    path: '/page-layout/info',
    component: () => import('./info')
  },
  {
    name: 'pageLayoutLeftRight',
    path: '/page-layout/left-right',
    component: () => import('./left-right')
  },
  {
    name: 'pageLayoutFreedom',
    path: '/page-layout/freedom',
    component: () => import('./freedom')
  }
]
