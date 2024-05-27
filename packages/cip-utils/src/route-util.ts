import { toUpperFirstCase, isInputEmpty } from './util'

type ToUpperFirstCase<T extends string> = T extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : T;
export function getRouteName<T extends string, U extends string>(
  baseName: T,
  routeName: U
): T extends '' ? U : `${T}${ToUpperFirstCase<U>}`;
export function getRouteName(baseName, routeName){
  return baseName ? `${baseName}${toUpperFirstCase(routeName)}` : routeName
}

export const prependRoutes = <T extends {path?: string, name?: string | symbol}>(routes: T[], { path = '', name = '' } = {}) => {
  return routes.map(route => {
    if (path && route.path) {
      if (route.path[0] === '/') {
        route.path = `${path}${route.path}`
      } else {
        route.path = `${path}/${route.path}`
      }
    } else if (!route.path || route.path === '/'){
      route.path = path
    }
    if (name && route.name) {
      route.name = getRouteName(name, route.name as string)
    }
    return route
  })
}

export const getBaseName = (basePath: string) => {
  // 去除空的路径
  const arr = basePath.split('/').filter(v => !isInputEmpty(v))
  return arr.map((v, i) => {
    return i === 0 ? v : toUpperFirstCase(v)
  }).join('')
  // 数组与replace性能比较
  // return basePath.replace(/\/[a-zA-Z]/ig, (val) => {
  //   return val.replace(/\//, '').toLocaleUpperCase()
  // })
}

export const getDefaultBaseRoute = (filePath: string, frameworkPath: string)=> {
  const basePath = filePath.replace(/\.|\/pages|\/routes\.js/g, '')
  return frameworkPath ? frameworkPath + basePath : basePath
}

