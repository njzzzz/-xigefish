<template>
  <main-framework
    @vue:mounted="frameworkMounted"
    ref="framework$"
    :class="`cip-main-framework main-theme main-theme--${theme}`"
    :hide-footer="hideFooterBridge"
    :hide-aside-switch="hideAsideSwitchBridge"
    :layout="usingLayout"
    :with-tabs="withTabsBridge"
    :with-breadcrumb="withBreadcrumbBridge"
    :hide-aside="dynamicMenu.length === 0"
    :force-collapse="forceCollapse"
  >
    <template #name="{isCollapse}">
      <slot name="collapse" v-if="isCollapse">
        <span style="margin-left: 8px;">{{name?.[0]}}</span>
      </slot>
      <slot name="expand" v-else>
        <span style="margin-left: 8px;">{{name}}</span>
      </slot>
      <slot name="name" :is-collapse="isCollapse"></slot>
    </template>
    <template #nav="{isCollapse}">
      <slot name="nav">
        <cip-main-nav v-bind="navMenuAttrs"
                      :nav-menu="dynamicMenu"
                      :theme="theme"
                      :icon-depth="iconDepth"
                      :mode="navMode"
                      :isCollapse="isCollapse"
                      :ellipsis="menuEllipsis"
                      :badgeMap="badgeMap"
                      @triggerGetBadge="consumptionBadgeFn"/>
      </slot>
    </template>
    <template #headerNav>
<!--  平铺模式的菜单[注：仅显示一层]-->
      <cip-main-nav :nav-menu="showMenu"
                    v-model:activeMenu="activeMenu"
                    :icon-depth="iconDepth"
                    mode="horizontal"
                    :ellipsis="menuEllipsis"
                    :top-menu-only="true"
                    :badgeMap="badgeMap"
                    @triggerGetBadge="consumptionBadgeFn"/>
    </template>
    <template #tabs>
      <cip-tabs
        ref="tabsRef"
        :menu="menu"
        :menu-title-map="menuPathMap"
        :home-view="homeViewBridge"
        :with-tabs="usingTabs"
        :equalPath="equalPath"
        v-model:cache="cache"
      />
    </template>
    <template #breadcrumb>
      <cip-main-breadcrumb />
    </template>
    <template #header>
      <header-bar :dropdown-logout="usingDropdownLogout">
        <template #header-plugin><slot name="header-plugin" /></template>
        <template #header-user><slot name="header-user" /></template>
        <template v-if="$slots.dropdown" #dropdown><slot name="dropdown" /></template>
        <template  v-if="$slots['pre-dropdown']" #pre-dropdown><slot name="pre-dropdown" /></template>
      </header-bar>
    </template>
    <cip-router-view v-if="viewSwitch" :viewKey="viewKey" :cacheList="cache" :withTabs="usingTabs"/>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </main-framework>
</template>
<script>
import { computed, nextTick, ref, watch, provide, reactive, onUnmounted } from 'vue'
import { useCipConfig } from '../hooks/use-cip-config'
import MainFramework from './framework/framework'
import CipMainNav from './cip-main-nav'
import CipMainBreadcrumb from './cip-main-breadcrumb'
import HeaderBar from './header-bar'
import CipTabs from './cip-main-tabs'
import CipRouterView from './cip-router-view'
import { useRoute } from 'vue-router'
import { useBadge, useConfigBridge, useMainMenu, useMenuTitle } from './main-hooks'
import { getFullPathWithoutHash, getMenuTitle, matchMenuByRouteName, matchMenuByRoutePath, isHideInMenu, getEqualPath } from './helper'
import { isSubApp } from '../cip-subapp-container/micro-app/util'
import { getUsingConfig, subStr, getFieldValue } from '@xigefish/d-render-shared'
import store from '../store'
export default {
  name: 'CipMain',
  components: { MainFramework, CipMainNav, HeaderBar, CipMainBreadcrumb, CipTabs, CipRouterView },
  props: {
    logo: String, // 平台LOGO
    platformName: String, // 平台名称
    iconDepth: Number, // 菜单的icon展示的最大层级
    navMenu: Array, // 导航菜单
    navMenuAttrs: Object,
    // privileges: Array, // 权限
    hideFooter: { type: Boolean, default: undefined }, // 是否隐藏footer
    hideAsideSwitch: { type: Boolean, default: undefined }, // 是否隐藏手风琴折叠开关
    rootPath: String,
    theme: {
      type: String,
      default: 'standard' // 默认使用数据中台的主题
      // validator: (value) => {
      //   return ['data-center', 'light', 'dark'].includes(value)
      // }
    }, // 主题
    layout: {
      type: String,
      default: 'left-2',
      validator: (value) => {
        return ['left', 'left-2', 'top', 'top-left', 'hide'].includes(value)
      }
    }, // 布局
    withTabs: { type: Boolean, default: undefined }, // 是否使用tabs)
    withBreadcrumb: { type: Boolean, default: undefined }, // 是否展示面包屑
    homeView: { type: Object, default: undefined }, // 首页配置(开启tabs时建议开启)
    badgeInterval: Number, // 获取badge的时间间隔 单位min(分钟)
    noViewKey: { type: Boolean, default: undefined },
    dropdownLogout: { type: Boolean, default: undefined }, // 退出是否使用拉下菜单
    collapseRegex: [Array, RegExp],
    menuEllipsis: { type: Boolean, default: undefined }
  },
  setup (props) {
    const isMicroApp = window.__MICRO_APP_ENVIRONMENT__
    const configBridges = useConfigBridge(props, store)
    const cipConfig = useCipConfig()
    const route = useRoute()
    const activeMenu = ref([])
    const cache = ref([])
    const { menuNameMap, menuPathMap } = useMenuTitle()
    const usingDropdownLogout = computed(() => {
      return getUsingConfig(
        props.dropdownLogout,
        getFieldValue(cipConfig, 'main.dropdownLogout')
      )
    })
    const forceCollapse = ref(undefined)
    if (props.collapseRegex) {
      watch(() => route.fullPath, (val) => {
        const regexArr = [].concat(props.collapseRegex)
        if (regexArr.some(regex => regex.test(val))) {
          forceCollapse.value = true
        } else {
          forceCollapse.value = undefined
        }
      }, { immediate: true })
    }

    const tabsRef = ref()
    // FEAT: [6.0.19] 允许控制closeTab不自动重定向
    const closeTab = (autoRedirect) => {
      const fullPath = getFullPathWithoutHash(route.fullPath)
      // eslint-disable-next-line no-unused-expressions
      tabsRef.value?.removeTab(fullPath, autoRedirect)
    }

    const { menu, showMenu, menuToRoute, toRouteByMenuItem, firstRoute, firstMenuItem } = useMainMenu(props, closeTab)
    // 菜单
    // const menu = computed(() => {
    //   return props.navMenu
    // })
    // const privileges = usePrivileges()
    // const showMenu = computed(() => { // 去除hideInMenu 和无权限的菜单
    //   return filterMenu(props.navMenu, privileges.value)
    // })

    if (props.rootPath) {
      // 执行的比较平凡其实可以交给tab来执行
      watch(showMenu, (val, old) => {
        if (val && route.path === props.rootPath) {
          menuToRoute(firstMenuItem.value)
          toRouteByMenuItem(firstMenuItem.value, 'replace')
          // clear()
          // console.log('unwatch')
          // console.log('umwatch', umwatch)
          // umwatch()
        }
      }, { immediate: true })
    }

    const layoutHide = ref(false)
    const setFrameHide = (val) => {
      layoutHide.value = val
    }
    onUnmounted(() => {
      console.log('Main Unmounted')
    })
    const usingLayout = computed(() => {
      return layoutHide.value ? 'hide' : props.layout
    })

    const usingTabs = computed(() => {
      if (!configBridges.withTabsBridge.value) return false
      return !isSubApp(route.name)
    })
    const dynamicMenu = computed(() => {
      if (usingLayout.value !== 'top-left') return showMenu.value
      if (!activeMenu.value || activeMenu.value.length === 0) return []
      // 明确标记没有children时返回当前menu
      if ((activeMenu.value.children || []).length === 0) {
        // 当当前激活菜单的子为0且配置有hideAsideWhenTop是隐藏侧边栏
        if (activeMenu.value.hideAsideWhenTop) {
          return []
        }
        return [activeMenu.value]
      }
      // 传入当前激活路由top menu的children
      return activeMenu.value.children
    })

    const oneMinute = 60 * 1000

    const { badgeMap, collectBadgeFn, consumptionBadgeFn } = useBadge(props.badgeInterval * oneMinute)

    watch(menu, (val) => {
      collectBadgeFn(val, { key: 'name', fnKey: 'getBadge' })
    }, { immediate: true })
    // 平台名称
    const name = computed(() => {
      return props.platformName ?? process.env.VUE_APP_PLATFORM_NAME
    })
    // 菜单模式
    const navMode = computed(() => {
      return props.layout === 'top' ? 'horizontal' : 'vertical'
    })

    const equalPath = computed(() => {
      return getEqualPath(route.fullPath, cipConfig)
      // const withQuery = route.query._igq !== undefined
      //   ? false
      //   : cipConfig.withQuery
      // return withQuery === false ? route.path : getFullPathWithoutHash(route.fullPath)
    })
    const framework$ = ref()
    const frameworkMounted = () => {
      console.log('load')
      watch(() => route.fullPath, () => {
        console.log('framework$', framework$.value?.framework$?.setScrollTop(0))
      })
    }

    // 兼容KeepAlivePages组件的运行
    const viewKey = computed(() => {
      if (props.noViewKey) return 'viewKey'
      if (isSubApp(route.name)) return 'SubApp'
      const routeMatch = route.matched
      const length = routeMatch.length
      const cacheName = length > 1 ? routeMatch[routeMatch.length - 2].name : undefined
      if (cacheName?.indexOf('_cache') > -1) {
        return cacheName
      }
      return equalPath.value // cipConfig.withQuery === false ? route.path : getFullPathWithoutHash(route.fullPath)
    })

    const handlerPathChange = (fullPath) => {
      fullPath = getFullPathWithoutHash(fullPath)
      // eslint-disable-next-line no-unused-expressions
      tabsRef.value?.handlerPathChange(fullPath)
    }
    provide('closeTab', closeTab)
    provide('pathChange', handlerPathChange)
    const routeMatched = computed(() => {
      if (route.name === 'lowCodePage') { // lowCodePage固定值
        return matchMenuByRoutePath(menu.value, equalPath.value)
      } else {
        // Sub结尾的name开启path匹配功能
        let result = matchMenuByRouteName(menu.value, route.name)
        // 低代码页面如何match
        if (!result) {
          if (isMicroApp) {
            const routerBase = window.__MICRO_APP_BASE_ROUTE__
            // micro-app下的处理方式
            result = matchMenuByRoutePath(menu.value, subStr(routerBase, 0, -1) + equalPath.value)
          } else {
            if (/Sub$/.test(route.name ?? '')) {
              result = matchMenuByRoutePath(menu.value, equalPath.value)
            }
            // micro-app主应用
          }
        }

        if (!window.__MICRO_APP_ENVIRONMENT__) console.log('micro-app主应用', result)
        return result
      }
    })
    const lastRoute = computed(() => {
      if (routeMatched.value) {
        return routeMatched.value[routeMatched.value.length - 1]
      } else {
        return undefined
      }
    })
    const canBack = computed(() => {
      return isHideInMenu(lastRoute.value)
    })
    const lastTitle = computed(() => {
      if (lastRoute.value) {
        return menuNameMap.value.get(lastRoute.value.name) ? menuNameMap.value.get(lastRoute.value.name) : getMenuTitle(lastRoute.value)
      } else {
        return undefined
      }
    })

    provide('cipMenu', reactive({
      menuNameMap,
      showMenu,
      navMenu: menu,
      toRouteByMenuItem,
      firstMenuItem,
      routeMatched,
      lastTitle,
      lastRoute,
      canBack,
      equalPath
    }))
    provide('setFrameHide', setFrameHide)
    const setChangeSign = () => {
      // const fullPath = getFullPathWithoutHash(route.fullPath)
    }
    provide('setChangeSign', setChangeSign)
    const viewSwitch = ref(true)
    // 对外提供

    // 如何判断无 router-view中的组件为空 children
    const reloadView = () => {
      // TODO: 此处需要清理tabs中的数据，当前需求暂不需要实现
      viewSwitch.value = false
      nextTick().then(() => {
        viewSwitch.value = true
      })
    }
    const homeViewBridge = computed(() => {
      if (props.homeView) return props.homeView
      return firstRoute.value
    })

    return {
      framework$,
      cache,
      menu,
      showMenu,
      name,
      menuNameMap,
      menuPathMap,
      navMode,
      dynamicMenu,
      activeMenu,
      viewKey,
      badgeMap,
      consumptionBadgeFn,
      tabsRef,
      usingLayout,
      usingTabs,
      closeTab,
      homeViewBridge,
      usingDropdownLogout,
      viewSwitch,
      reloadView,
      forceCollapse,
      equalPath,
      frameworkMounted,
      ...configBridges
    }
  }
}
</script>
