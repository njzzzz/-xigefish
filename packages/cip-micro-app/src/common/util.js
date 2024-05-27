import { depthFirstSearchIndexTree, setFieldValue, getFieldValue, getPropertyKeyByPath, Strategy, subStr, isArray } from '@xigefish/d-render-shared/esm/util'

const localMenuToSubPages = (menus) => {
  if (!isArray(menus)) throw new Error('menus must be array')
  const subPages = []
  // weekMap用来判断循环引用，导致无限遍历问题
  const weakSet = new WeakSet()
  function findHideInMenu (children, parent) {
    if (weakSet.has(children)) return false
    weakSet.add(children)
    children.forEach(item => {
      if (item.hideInMenu) {
        const subPage = { ...item, pName: parent?.name }
        // delete subPage.hideInMenu
        subPages.push(subPage)
      } else {
        if (item.children) {
          findHideInMenu(item.children, item)
        }
      }
    })
  }
  findHideInMenu(menus)
  return subPages
}
// 兼容函数形式的subPages
const getSubPages = (subPages) => {
  if (typeof subPages === 'function') {
    const cb = subPages
    try {
      const result = cb(localMenuToSubPages)
      if (isArray(result)) {
        subPages = result
      } else {
        subPages = []
      }
    } catch (e) {
      subPages = []
    }
  }
  return subPages
}
// 获取要发送到基座的item(菜单信息)
const getItem = (currentPageIndex, currentRootPage, basePath, to) => {
  let item = currentRootPage
  const currentRoutePath = basePath + to.fullPath
  if (currentPageIndex.length > 1) {
    console.log('currentPageIndex', currentPageIndex)
    const key = getPropertyKeyByPath(currentPageIndex, { children: 'children' })
    const lastItemKey = key.replace(/^[0-9]+\./, '')
    setFieldValue(item, lastItemKey, {
      ...getFieldValue(item, lastItemKey),
      hideInMenu: true,
      route: currentRoutePath
    }, true)
  } else {
    // 一层数据时直接修改自己
    item = {
      ...item,
      hideInMenu: true,
      route: currentRoutePath
    }
  }
  item.hideInMenu = true
  return item
}
// 发送到基座
const microAppDispatch = (data) => {
  // 异步执行防止事件被path Change顶替
  setTimeout(() => {
    window.microApp.dispatch({
      type: 'setNavMenu',
      data: data
    })
  }, 0)
}
export const notifyBaseMenu = (router, subPages) => {
  // 当第二个参数是函数时特殊处理一下
  subPages = getSubPages(subPages)
  router.afterEach(to => {
    // 使用route.name查找对应的页面
    const currentPageIndex = depthFirstSearchIndexTree(subPages, to.name, 'name')
    if (currentPageIndex) {
      const currentRootPage = subPages[currentPageIndex[0]]
      if (currentRootPage) {
        const { pName } = currentRootPage
        if (pName) {
          const basePath = subStr(window.__MICRO_APP_BASE_ROUTE__, 0, -1)
          const item = getItem(currentPageIndex, currentRootPage, basePath, to)
          if (pName.indexOf('_') === 0) {
            // 直接挂在分类下， 此处需要基座分类与本地分类的name一致
            microAppDispatch({ pName, item })
          } else {
            const pRoute = router.resolve({ name: pName })
            // 此处router3和router4的方案不一样3需要从resolved获取
            // router3 返回href,此链接带有路径信息
            const { fullPath, href } = pRoute
            const pPath = href || basePath + fullPath
            microAppDispatch({ pPath, item })
          }
        }
      }
    }
  })
}

export const isSubApp = (name) => /Sub$/.test(name)

/**
 * 判断是否需要隐藏外出framework，值为字符串正则数组
 * @param withoutFramework {Array<RegExp|String>}
 * @param path {String}
 * @returns {boolean}
 */
export const judgeHiddenFramework = (withoutFramework, path) => {
  const regxRules = withoutFramework.filter(v => Object.prototype.toString.call(v) === '[object RegExp]')
  if (withoutFramework.includes(path)) return true
  for (let i = 0; i < regxRules.length; i++) {
    const regx = regxRules[i]
    if (regx.test(path)) return true
  }
  return false
}

export const dataChangeStrategy = new Strategy({ message: 'no type or no strategy' })
