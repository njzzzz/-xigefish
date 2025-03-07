import { createApp } from 'vue'
import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'

import { ElLoading } from 'element-plus'

import App from '@/App.vue'
import store from '@xigefish/components/store'
import { setUserInfo } from './auth.js'
import { judgeFramework } from './judge-framework.js'
import { mainChildren, routes, mainRoute, hideRoute } from '@/router/routes.js'

/**
 * 渲染应用
 * @param props
 * @returns {Promise<{router: Router, instance: App<Element>}>}
 */
export const render = async (props = {}) => {
  console.time('router')
  const elementId = '#subapp'
  const { routerBase, store: pStore } = props
  if (routerBase) {
    // console.log('send addDataListener', bProps)
    console.log('store', store, props)
    store.dispatch('setAccountInfo', pStore.state.accountInfo)
    store.dispatch('setApp', pStore.state.app)
  } else if (process.env.NODE_ENV !== 'development' || process.env.VUE_APP_USE_ACCOUNT !== 'off') {
    try {
      if (window.location.pathname !== `${process.env.BASE_URL}login`) {
        await setUserInfo()
      }
    } catch (e) {
      console.error(e)
    }
  }
  // 获取菜单
  // 生产基础路由，不包含业务页面
  const router = createRouter({
    // 子应用时采用内存方式记录路由
    history: routerBase ? createMemoryHistory(routerBase) : createWebHistory(process.env.BASE_URL),
    routes: routes
  })

  router.beforeEach(async (to, from, next) => {
    // TODO: 路由跳转时的处理
    next()
  })
  // 判断是否需要mainFramework 注: 作为嵌入页及乾坤子站引入时不使用framework
  let parentName
  if (!judgeFramework()) {
    router.addRoute(hideRoute)
    parentName = hideRoute.name
  } else {
    router.addRoute(mainRoute)
    parentName = mainRoute.name
  }
  mainChildren.forEach(route => {
    // 注: 此处可修改为按权限设置业务路由
    router.addRoute(parentName, route)
  })
  console.log('mainChildren', mainChildren)
  const instance = createApp(App)
  instance
    .use(router)
    .use(ElLoading) // v-loading指令
    .mount(elementId)

  instance.config.errorHandler = (err, instance, info) => {
    console.log(err, instance, info)
  }
  // instance.config.warnHandler = function (msg, vm, trace) {
  //   console.warn(msg)
  // }

  console.timeEnd('router')
  return { instance, router }
}
