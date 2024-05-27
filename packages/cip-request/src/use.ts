import axios from 'axios'
import type { AxiosStatic } from 'axios'
import requestStore from './store'
import type { IAnyObject } from './util'
const isObject = (value)=> {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export interface IRequestPlugin<T = IAnyObject> {
  install: (
    axios: AxiosStatic,
    options: T | undefined,
    store: typeof requestStore
  )=> void
}


export const use = <T>(plugin: IRequestPlugin<T>, options?: T) => {
  if (isObject(plugin) && typeof plugin.install === 'function') {
    plugin.install(axios, options, requestStore)
  }
  return {
    use
  }
}
