export const routes = [

  {
    path: '/components/changelog',
    name: 'componentsChangelog',
    component: () => import('./components')
  },
  {
    path: '/styles/changelog',
    name: 'stylesChangelog',
    component: () => import('./styles')
  },
  {
    path: '/plugins/changelog',
    name: 'pluginsChangelog',
    component: () => import('./plugins')
  },
  // {
  //   path: '/@xigefish/d-render/changelog',
  //   name: 'dRenderChangelog',
  //   component: () => import('./d-render')
  // },
  {
    path: '/@xigefish/d-render-plugin-cci/changelog',
    name: 'dRenderPluginCciChangelog',
    component: () => import('@xigefish/d-render-plugin-cci')
  },
  {
    path: '/xdp-button/changelog',
    name: 'xdpButtonChangelog',
    component: () => import('./xdp-button')
  }

]
