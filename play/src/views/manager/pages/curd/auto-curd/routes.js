export const routes = [
  {
    path: '/curd/auto',
    name: 'curdBasicCurd',
    component: () => import('./index'),
    meta: {
      cache: true
    }
  },
  {
    path: '/curd/auto/input-search-model-curd',
    name: 'curdBasicInputSearchModelCurd',
    component: () => import('./input-search-model-curd')
  },
  {
    path: '/curd/auto/handle',
    name: 'curdBasicHandle',
    component: () => import('./handle')
  },
  {
    path: '/curd/auto/info',
    name: 'curdBasicInfo',
    component: () => import('./info')
  },
  {
    path: '/curd/auto/really/info/:id',
    name: 'curdBasicReallyInfo',
    props: true,
    component: () => import('./info')
  },
  {
    path: '/curd/auto/left-right',
    name: 'curdBasicLeftRight',
    component: () => import('./left-right')
  },
  {
    path: '/curd/auto/info-list',
    name: 'curdBasicInfoList',
    component: () => import('./info-list')
  },
  {
    path: '/curd/auto/left-right-info',
    name: 'curdBasicLeftRightInfo',
    component: () => import('./left-right-info')
  },
  {
    path: '/curd/auto/left-right-handle',
    name: 'curdBasicLeftRightHandle',
    component: () => import('./left-right-handle')
  },
  {
    path: '/curd/auto/left-right-info-list',
    name: 'curdBasicLeftRightInfoList',
    component: () => import('./left-right-info-list')
  }
]
