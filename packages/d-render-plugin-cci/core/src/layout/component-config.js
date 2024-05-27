export default {
  grid: {
    component: (mode) => () => import(`./basic-grid${['/index', '/view'].includes(mode) ? '/index' : mode}`),
    layout: true
  },
  collapse: {
    component: (mode) => () => import(`./basic-collapse${mode}`),
    layout: true
  },
  steps: {
    component: (mode) => () => import(`./basic-steps${mode}`),
    layout: true
  },
  classifyLayout: {
    component: () => () => import('./basic-classify-layout'),
    layout: true
  },
  autoClassifyLayout: {
    component: () => () => import('./basic-auto-classify-layout'),
    layout: true
  }
}
