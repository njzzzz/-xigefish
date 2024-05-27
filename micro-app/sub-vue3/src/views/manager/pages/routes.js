export const routes = [
  {
    path: '/page',
    name: 'page',
    component: () => import('./page')
  },
  {
    path: '/page1',
    name: 'page1',
    component: () => import('./page')
  },
  {
    path: '/sub-page/:id',
    name: 'subPage',
    props: true,
    component: () => import('./sub-page')
  }
]
