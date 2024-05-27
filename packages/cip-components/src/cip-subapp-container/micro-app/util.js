import MicroApp from './index'
import { depthFirstSearchIndexTree, setFieldValue, getFieldValue, getPropertyKeyByPath, Strategy, subStr, isArray } from '@xigefish/d-render-shared'
/**
 * 生产子应用路由
 * @param subConfig {Array.<Object>}
 * @param subConfig.name 子应用名称需要唯一
 * @param subConfig.url 子应用地址需要访问到html
 * @param subConfig.baseRoute 子应用的publicPath地址
 */
export const generateSubRoutes = (subConfig = []) => {
  return [].concat(subConfig).map(sub => ({
    path: `${sub.baseRoute.replace(/\/$/, '')}/:subPath(.*)`,
    name: `${sub.name}Sub`,
    props: ({ params }) => ({
      baseRoute: sub.baseRoute,
      name: sub.name,
      url: sub.url,
      shadowDom: sub.shadowDom,
      subPath: '/' + params.subPath,
      withoutFramework: sub.withoutFramework
    }),
    component: MicroApp
  }))
}
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
const notifyBaseMenu = (router, subPages) => {
  // 当第二个参数是函数时特殊处理一下
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
  router.afterEach(to => {
    // 使用route.name查找对应的页面
    const currentPageIndex = depthFirstSearchIndexTree(subPages, to.name, 'name')
    if (currentPageIndex) {
      const currentRootPage = subPages[currentPageIndex[0]] // getFieldValue(subPages, getPropertyKeyByPath(currentPageIndex, {children: 'children'}))
      if (currentRootPage) {
        const { pName } = currentRootPage
        if (pName) {
          const pRoute = router.resolve({ name: pName })
          const { fullPath } = pRoute
          const basePath = subStr(window.__MICRO_APP_BASE_ROUTE__, 0, -1)
          const pPath = basePath + fullPath
          let item = currentRootPage
          if (currentPageIndex.length > 1) {
            const key = getPropertyKeyByPath(currentPageIndex, { children: 'children' })
            const lastItemKey = key.replace(/^[0-9]+\./, '')
            setFieldValue(item, lastItemKey, {
              ...getFieldValue(item, lastItemKey),
              hideInMenu: true,
              route: basePath + to.fullPath
            }, true)
          } else {
            // 一层数据时直接修改自己
            item = {
              ...item,
              hideInMenu: true,
              route: basePath + to.fullPath
            }
          }
          item.hideInMenu = true
          window.microApp.dispatch({
            type: 'setNavMenu',
            data: {
              pPath,
              item
            }
          })
        }
      }
    }
  })
}
export const microAppRender = (render, subPages = []) => {
  console.time('microAppRender')
  const props = {
    routerBase: window.__MICRO_APP_BASE_ROUTE__,
    ...window.microApp.getData()
  }
  const routerController = (router) => (data) => {
    // 基座传下来的subPath与当前页面的fullPath不一样时才进行转换
    if (router.currentRoute.value.fullPath !== data.subPath) {
      router.push(data.subPath)
    }
  }

  // 异步导致数据返回时间较长
  render(props).then((res) => {
    if (props.subPath) {
      res.router.push(props.subPath).then(() => {
        res.router.afterEach(to => {
          window.microApp.dispatch({ type: 'pathChange', data: to.fullPath })
        })
      })
    }
    window.microApp.addDataListener(routerController(res.router))
    notifyBaseMenu(res.router, subPages)
    window.addEventListener('unmount', () => {
      // 执行卸载相关操作
      window.microApp.clearDataListener()
      res.instance.unmount()
      res = null
    })
  })
  console.timeEnd('microAppRender')
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
