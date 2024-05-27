import { isArray, isInputEmpty } from '@xigefish/d-render-shared'
import { isHideInMenu } from '../helper'

export const getFirstMenuItem = (subMenu) => {
  if (subMenu?.children && subMenu.children.length > 0) {
    return getFirstMenuItem(subMenu.children[0])
  }
  return subMenu
}

// 判断权限
const hasPrivilege = (item, privileges) => {
  const code = item.code || item.meta?.code
  if (isInputEmpty(code)) return true // 没有code即表示此不需要权限
  if (isArray(code)) {
    // code为数组的情况
    if (code.length === 0) return true // 空数组代表不需要权限
    return code.some(v => {
      if (isInputEmpty(v)) return true // 没有code即表示此不需要权限
      return privileges?.includes(v)
    })
  } else {
    return privileges?.includes(code)
  }
}

const mapFilter = (list, mCb, fcb) => {
  return list.map(mCb).filter(fcb)
}

export const filterMenu = (menu = [], privileges) => {
  return mapFilter(menu, child => {
    if (!isHideInMenu(child) && hasPrivilege(child, privileges)) {
      if (child.children) {
        return Object.assign({}, child, { children: filterMenu(child.children, privileges) })
      } else {
        return Object.assign({}, child)
      }
    }
    // 无权限会返回 undefined
  }, v => { return v !== undefined && !((v?.name || '').indexOf('_') === 0 && (v.children || []).length === 0) })
}

export const findMenu = (menu, name) => {
  return menu.find(menu => menu.name === name)
}

/**
 * 根据匹配到的菜单路径获取选中的菜单
 * @param menuPath
 * @returns {String}
 */
export const getActiveNameByMatchedMenu = (menuPath) => {
  if (!menuPath || menuPath.length === 0) return ''
  for (let i = 0; i < menuPath.length; i++) {
    const menu = menuPath[menuPath.length - 1 - i]
    if (!isHideInMenu(menu)) {
      return menu.name // 跳出循环
    }
  }
  return '' // 最后的保险
}

export const isLink = (item) => {
  const { route, link, isOpen } = item
  return link || isOpen || /http(s)?:\/\//.test(route)
}
