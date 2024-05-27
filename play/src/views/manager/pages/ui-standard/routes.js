export const routes = [
  {
    name: 'standardFont',
    path: '/standard/font',
    component: () => import('./font')
  },
  {
    name: 'standardColor',
    path: '/standard/color',
    component: () => import('./color')
  },
  {
    name: 'standardBoxShadow',
    path: '/standard/box-shadow',
    component: () => import('./box-shadow')
  }
]
