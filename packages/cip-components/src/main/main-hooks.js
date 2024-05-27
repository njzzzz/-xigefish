import { onBeforeUnmount, provide, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isArray, getUsingConfig } from '@xigefish/d-render-shared'
import { usePrivileges } from '@xigefish/hooks/use-privileges'
import { filterMenu, getFirstMenuItem, isLink } from './cip-main-nav/util'

// 菜单徽标hook
/**
 * 定时更新时间
 * @param timer 为0时不进行更新 单位ms
 * @return {{badgeMap: ToRef<{}>, badgeFnMap: ToRef<{}>, collectBadgeFn: collectBadgeFn, consumptionBadgeFn: ((function(*): Promise<void>)|*)}}
 */
export const useBadge = (times) => {
  const badgeMap = ref({}) // 徽标key-value关系
  const badgeFnMap = ref({}) // 徽标key-fn关系
  const collectBadgeFn = (menu = [], { key, fnKey, childrenKey = 'children' }) => {
    menu.forEach(item => {
      const fn = item?.[fnKey]
      if (typeof fn === 'function') {
        badgeFnMap.value[item[key]] = { fn, used: false, privilege: false }
      }
      const children = item[childrenKey]
      if (isArray(children)) {
        collectBadgeFn(children, { key, fnKey, childrenKey })
      }
    })
  }
  // 定时更新时使用
  const resetComputed = () => {
    Object.keys(badgeFnMap.value).forEach(key => {
      badgeFnMap.value[key].used = false
      // !!!有权限的菜单的badge方法才会执行
      if (badgeFnMap.value[key].privilege) {
        consumptionBadgeFn(key)
      }
    })
  }
  if (times > 0) {
    const timer = setInterval(() => {
      resetComputed()
    }, times)
    onBeforeUnmount(() => {
      clearInterval(timer)
    })
  }

  const consumptionBadgeFn = async (key) => {
    const badgeFn = badgeFnMap.value?.[key]
    if (badgeFn && !badgeFn.used) {
      badgeFn.used = true // 删除防止多次触发
      badgeFn.privilege = true // 触发过一次及判断为拥有权限
      const total = await badgeFn.fn()
      badgeMap.value[key] = total
    }
  }

  const setBadge = (key, badge) => {
    badgeMap.value[key] = badge
  }
  // 子孙组件直接修改徽标
  provide('setBadge', setBadge)
  const refreshBadge = (key) => {
    const badgeFn = badgeFnMap.value?.[key]
    if (badgeFn) {
      badgeFn.used = false // 先把used设置为false才能触发更新
      consumptionBadgeFn(key)
    }
  }
  // 子孙组件根据触发修改徽标
  provide('refreshBadge', refreshBadge)
  return {
    badgeMap,
    badgeFnMap,
    collectBadgeFn,
    consumptionBadgeFn
  }
}

export const useMenuTitle = () => {
  const route = useRoute()

  const menuNameMap = ref(new Map()) // name 与 title 的关系
  const menuPathMap = ref({}) // fullPath 与 title 的关系

  const setCurrentTitle = (title) => {
    setTitle(route.fullPath, route.name, title)
  }

  const setTitle = (fullPath, name, title) => {
    menuNameMap.value.set(name, title)
    menuPathMap.value[fullPath] = title
  }

  // 兼容老代码[addMenuName]不建议再使用
  provide('addMenuName', setCurrentTitle)
  provide('setCurrentTitle', setCurrentTitle)
  provide('setTitle', setTitle)
  return {
    menuNameMap,
    menuPathMap
  }
}
/**
 *
 * @param props
 * @param store
 * @returns {{hideFooterBridge,withTabs,withBreadcrumb,hideAsideSwitch}}
 */
export const useConfigBridge = (props, store) => {
  const appMainConfig = computed(() => store.state?.app?.main || {})
  const bridges = [
    'hideFooter',
    'withTabs',
    'withBreadcrumb',
    'hideAsideSwitch'
  ].reduce((acc, key) => {
    acc[`${key}Bridge`] = computed(() => getUsingConfig(props[key], appMainConfig.value[key]))
    return acc
  }, {})
  return {
    ...bridges
  }
}
export const useRouteByMenuItem = (menuItem, type = 'push') => {

}

export const useMainMenu = (props, closeTab) => {
  const router = useRouter()
  const menu = computed(() => {
    return props.navMenu
  })
  const privileges = usePrivileges()
  const showMenu = computed(() => { // 去除hideInMenu 和无权限的菜单
    return filterMenu(props.navMenu, privileges.value)
  })

  const toRouteByMenuItem = (menuItem, type = 'push') => {
    if (!menuItem) return
    const routeFn = (route) => {
      if (type === 'replace') {
        closeTab() // 如果是replace类型需要删除当前tab后再repalce
      }
      return router[type](route)
    }
    const { route, name, link } = menuItem
    // open页面的处理
    if (isLink(menuItem)) {
      // route 也可能是是网页完整地址
      window.open(link || route)
    } else {
      if (route) {
        routeFn(route)
      } else {
        routeFn({ name })
      }
    }
  }

  const menuToRoute = (menuItem) => {
    if (!menuItem) return undefined
    let { route, name } = menuItem
    route = route ?? { name }
    // console.log('router', router.resolve(route))
    return router.resolve(route)
  }

  const firstMenuItem = computed(() => {
    let firstItem
    const menu = showMenu.value
    for (let i = 0; i < menu.length; i++) {
      firstItem = getFirstMenuItem(menu[i])
      if (firstItem) return firstItem
    }
    return undefined
  })

  const firstRoute = computed(() => {
    return menuToRoute(firstMenuItem.value)
  })

  return {
    menu,
    menuToRoute,
    firstRoute,
    toRouteByMenuItem,
    firstMenuItem,
    showMenu
  }
}
