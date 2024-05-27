import Component from './component/component'
import { componentScheme } from './component/component.scheme'
const install = (app) => {
  app.component(Component.name, Component)
}

export {
  Component as default,
  install,
  componentScheme
}
