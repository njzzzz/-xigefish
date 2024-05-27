export default {
  searchForm: {
    component: () => () => import('./search-form'),
    page: true
  },
  pageTable: {
    component: () => () => import('./table'),
    page: true
  }
}
