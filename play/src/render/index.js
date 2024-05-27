import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import { ElLoading } from 'element-plus'

import App from '@/App.vue'

import { setUserInfo } from './auth.js'
import { judgeFramework } from './judge-framework.js'
import { mainChildren, routes } from '@/router/routes.js'
import store from '@xigefish/components/store'
/**
 * 渲染应用
 * @param props {Object} 乾坤主应用传入数据
 * @return {Promise<App<Element>>}
 */
export const render = async (props = {}) => {
  const elementId = '#subapp'
  const { container, routerBase = '' } = props
  store.dispatch('setAccountInfo', { userName: 'test用户' })
  if (process.env.NODE_ENV !== 'development' || process.env.VUE_APP_USE_ACCOUNT !== 'off') {
    try {
      const user = await setUserInfo()
    } catch (e) {
      console.error(e)
    }
  }
  // 获取菜单
  // 生产基础路由，不包含业务页面
  const router = createRouter({
    history: createWebHistory(routerBase || process.env.BASE_URL),
    routes: routes
  })

  router.beforeEach(async (to, from, next) => {
    // TODO: 路由跳转时的处理
    next()
  })
  // 判断是否需要mainFramework 注: 作为嵌入页及乾坤子站引入时不使用framework
  const parentName = judgeFramework() ? '_mainFramework' : '_hideFramework'
  mainChildren.forEach(route => {
    // 注: 此处可修改为按权限设置业务路由
    router.addRoute(parentName, route)
  })

  const instance = createApp(App)
  instance
    .use(router)
    .use(ElLoading) // v-loading指令
    .mount(
      container
        ? container.querySelector(elementId)
        : elementId)

  instance.config.errorHandler = (err, instance, info) => {
    console.log(err, instance, info)
  }
  // instance.config.warnHandler = function (msg, vm, trace) {
  //   console.warn(msg)
  // }
  return { instance, router }
}
