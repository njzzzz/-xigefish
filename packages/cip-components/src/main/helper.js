import { depthFirstSearchTree } from '@xigefish/d-render-shared'

export const isHideInMenu = (item = {}) => {
  if (item?.meta?.hideInMenu === true || item.hideInMenu) return true// 明确指定hideInMenu
  return false
}

export const getMenuTitle = (menu) => {
  return menu?.meta?.title || menu?.title || menu?.name || ''
}

export const getRouteTitle = (route) => {
  return route?.meta?.title
}
export const getRouteCache = (route) => {
  return route?.meta?.cache
}
export const getRouteIcon = (route) => {
  return route?.meta?.icon
}

export const isCacheView = (currentView) => {
  return currentView?.meta?.cache || currentView?.cache
}

export const getMenuIcon = (menuList) => {
  for (let i = menuList.length - 1; i >= 0; i--) {
    const menu = menuList[i]
    const icon = menu?.meta?.icon || menu?.icon
    if (icon) return icon
  }
}

/**
 * 根据路由名称匹配路由所在菜单路径
 * @param routeName {String} 路由名称
 * @param menu {Array} 菜单
 */
export const matchMenuByRouteName = (menu, routeName) => {
  for (let i = 0; i < menu.length; i++) {
    const result = depthFirstSearchTree(menu[i], routeName, 'name')
    if (result) return result // 返回匹配的数组
  }
  return undefined // 未找到
}

export const matchMenuByRoutePath = (menu, path) => {
  for (let i = 0; i < menu.length; i++) {
    const result = depthFirstSearchTree(menu[i], path, 'route')
    if (result) return result // 返回匹配的数组
  }
  return undefined // 未找到
}

export const getFullPathWithoutHash = (fullPath) => {
  return fullPath.split('#')[0]
}

export const hasIgq = (fullPath) => {
  const r = /\?(.*)#?/.exec(fullPath)
  if (r && r[0].includes('_igq')) {
    return true
  }
}
export const getEqualPath = (fullPath, cipConfig) => {
  const withQuery = hasIgq(fullPath)
    ? false
    : cipConfig?.withQuery
  return withQuery === false ? fullPath.replace(/\?(.*)/, '') : getFullPathWithoutHash(fullPath)
}
