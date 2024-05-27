import Component from './component'
import { componentScheme } from './component/component.scheme'
import pkg from '../package.json'
const install = (app) => {
  app.component(Component.name, Component)
}
const version = pkg.version
export {
  Component as default,
  install,
  componentScheme,
  version
}
