import { notifyBaseMenu } from '../common/util'
import { debounce } from '@xigefish/d-render-shared/esm/util'
export const microAppRender = async (render, subPages) => {
  console.time('microAppRender')
  const props = {
    routerBase: window.__MICRO_APP_BASE_ROUTE__,
    ...window.microApp.getData()
  }
  const routerController = (router) => debounce((data) => {
    if (router.currentRoute.fullPath !== data.subPath) {
      router.replace(data.subPath)
      // 不需要进行beforeEach
    }
  })

  // 异步导致数据返回时间较长
  let res = await render(props)

  if (res.router.mode === 'abstract' && props.subPath === '/') {
    res.router.push(props.subPath)
  }
  res.router.afterEach((to, from) => {
    // 是否可以提升优先级
    if (from !== res.VueRouter.START_LOCATION) {
      window.microApp.dispatch({ type: 'pathChange', data: to.fullPath })
    }
  })
  notifyBaseMenu(res.router, subPages)
  window.microApp.addDataListener(routerController(res.router), true)
  window.addEventListener('unmount', () => {
    // 执行卸载相关操作
    console.log('销毁')
    window.microApp.clearDataListener()
    res.instance.$destroy()
    res = null
  })
  console.timeEnd('microAppRender')
  return res
}
