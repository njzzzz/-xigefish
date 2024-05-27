import { notifyBaseMenu } from '../../common/util'
/**
 * 生产子应用路由
 * @param subConfig {Array.<Object>}
 * @param subConfig.name 子应用名称需要唯一
 * @param subConfig.url 子应用地址需要访问到html
 * @param subConfig.baseRoute 子应用的publicPath地址
 */

export const microAppRender = (render, subPages = []) => {
  console.time('microAppRender')
  const props = {
    routerBase: window.__MICRO_APP_BASE_ROUTE__,
    ...window.microApp.getData()
  }
  const routerController = (router) => (data) => {
    if ((data.subPath)) {
      // 基座传下来的subPath与当前页面的fullPath不一样时才进行转换
      if (router.currentRoute.value.fullPath !== data.subPath) {
        router.push(data.subPath)
      }
    }
  }

  // 异步导致数据返回时间较长
  render(props).then((res) => {
    if (props.subPath) {
      res.router.push(props.subPath).then((r) => {
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
