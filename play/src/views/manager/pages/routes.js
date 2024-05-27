export const routes = [
  {
    path: '/top-item-test',
    name: 'topItemTest',
    component: () => import('./table')
  },
  {
    path: '/form-pc',
    name: 'formPC',
    component: () => import('./form')
  },
  {
    path: '/form-mobile',
    name: 'formMobile',
    component: () => import('./form/mobile')
  },
  {
    path: '/table',
    name: 'table',
    component: () => import('./table')
  },
  {
    path: '/complex-table',
    name: 'complexTable',
    component: () => import('./table/complex-table')
  },

  {
    path: '/search-form',
    name: 'searchForm',
    component: () => import('./search-form')
  },
  {
    path: '/search-form/label',
    name: 'searchFormLabel',
    component: () => import('./search-form/label')
  }

]
