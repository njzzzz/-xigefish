export const routes = [
  {
    path: '/migration-guide/v2.x',
    name: 'migrationGuideV2',
    component: () => import('./v2.x')
  },
  {
    path: '/migration-guide/v3.x',
    name: 'migrationGuideV3',
    component: () => import('./v3.x')
  },
  {
    path: '/migration-guide/v4.x',
    name: 'migrationGuideV4',
    component: () => import('./v4.x')
  },
  {
    path: '/migration-guide/v5.x',
    name: 'migrationGuideV5',
    component: () => import('./v5.x')
  },
  {
    path: '/migration-guide/v6.x',
    name: 'migrationGuideV6',
    component: () => import('./v6.x')
  }
  // {
  //   path: '/future-plan',
  //   name: 'futurePlan',
  //   component: () => import('../migration-guide/future-plan')
  // }
]
