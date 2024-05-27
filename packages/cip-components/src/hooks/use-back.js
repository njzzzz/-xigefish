import { useRoute, useRouter } from 'vue-router'
import { inject } from 'vue'
import { useMain } from '@xigefish/hooks/use-main'
import { isHideInMenu } from '../main/helper'
// BROKEN: [6.0.19] 对多个父亲的页面将存在一定的破坏性，多父亲页面可配置back={()=>router.go(-1)} autoCloseTab 或者将其挂在不可见菜单下(name以_开头，或者hideInMenu为true)的菜单下
// 1、返回菜单层级中的父页
//     - 如果祖先中没有可用的父页，跳转使用3的逻辑，有线使用1
// 2、返回前一页，可能导致返回到别的网站(不再使用此方案)
// 3、返回tab的激活页 与返回前一页的区别为，当前一页为非本系统页面时自动重定向到home页
export const useBack = (props) => {
  const isMicroApp = window.__MICRO_APP_ENVIRONMENT__
  const routerBase = window.__MICRO_APP_BASE_ROUTE__
  const cipMenu = inject('cipMenu', {})
  const { closeTab } = useMain()
  const router = useRouter()
  const route = useRoute()
  const runRouter = (item) => {
    if (item.router) {
      if (typeof item.router === 'function') {
        item.router(router, route)
      } else {
        router.replace(item.router === true ? { name: item.name } : item.router)
      }
    }
  }
  const backParentPage = () => {
    if (cipMenu.routeMatched) {
      for (let i = 1; i < cipMenu.routeMatched.length; i++) {
        const route = cipMenu.routeMatched[cipMenu.routeMatched.length - 1 - i]
        // 非hideInMenu或者hideInMenu但是存在router属性的
        if ((!isHideInMenu(route) || (route.router)) && route.name.indexOf('_') !== 0) {
          if (route.router) {
            closeTab(false)
            runRouter(route)
          } else {
            if (isMicroApp) {
              window.microApp.dispatch({ type: 'pathChange', data: route.route.replace(routerBase, '/') })
            } else {
              closeTab(false)
              router.replace(route)
            }
            return true// 不继续执行
          }
        }
      }
    }
  }
  const onBack = () => {
    if (props.back) {
      // 需要明确设置autoCloseTab才会自动关闭tab页
      props.autoCloseTab && closeTab(false)
      props.back()
      return
    }
    const result = backParentPage()
    if (!result) { // 没有找到父页，即上一步执行无果
      closeTab()
    }
  }
  return {
    onBack
  }
}
