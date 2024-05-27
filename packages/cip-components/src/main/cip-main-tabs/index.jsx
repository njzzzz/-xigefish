import { defineComponent, watch, inject, toRef } from 'vue'
import { useRoute } from 'vue-router'
import { ElTabs, ElTabPane, ElTooltip } from 'element-plus'
import {
  getMenuTitle,
  getRouteCache,
  isCacheView,
  getRouteIcon,
  getMenuIcon
  // getFullPathWithoutHash
} from '../helper'
import { useOpenedView, useCacheView } from './hooks'
// import { useCipConfig } from '../../hooks/use-cip-config'
import CipMainIcon from '../cip-main-icon'
import { isEmpty } from '@xigefish/d-render-shared'
import { isSubApp } from '../../cip-subapp-container/micro-app/util'
export default defineComponent({
  name: 'CipTabs',
  props: {
    menu: Array, // 菜单配置
    cache: Array, // 缓存fullPath列表
    menuTitleMap: Object, // 自定义fullPath对应的视图title
    homeView: Object, // 首页视图配置
    withTabs: {
      type: Boolean,
      default: undefined
    },
    equalPath: String // 监听路径
  },
  emits: ['update:cache'],
  setup (props, { emit, expose }) {
    // const isMicroApp = window.__MICRO_APP_ENVIRONMENT__
    // const routerBase = window.__MICRO_APP_BASE_ROUTE__
    // const cipConfig = useCipConfig()
    const route = useRoute()
    // const instance = getCurrentInstance()
    const cipMenu = inject('cipMenu', {})
    // 已打开的view(包含未缓存及已缓存的视图)
    const homeViewRef = toRef(props, 'homeView')
    const { openedViewList, activeView, addOpenedView, resetOpenedList, updateOpenedView, removeOpenedView, findViewByOpenedViewList, setActiveView } = useOpenedView(homeViewRef)
    const updateCache = (cache) => { emit('update:cache', cache) }
    const { cacheViewList, addCacheView, removeCacheView, resetCacheList } = useCacheView(updateCache)
    // menu 配置的优先级高于 route
    const getViewConfig = (map, menu, view) => {
      if (props.homeView && view.fullPath === props.homeView.fullPath) {
        view = Object.assign({}, props.homeView, view)
      }
      // console.log('openedView', JSON.stringify(view))
      let viewTitle = getMenuTitle(view) // 获取路由信息中的title
      // [CHANGE]: 2023-12-08 当关闭tabs时所有tab页都开启缓存
      let isCache = props.withTabs ? getRouteCache(view) : true// 获取路由信息中的cache
      let icon = getRouteIcon(view)
      const customTitle = map[view.fullPath]
      const menuMatch = cipMenu.routeMatched // matchMenuByRouteName(menu, view.name)
      // if (!menuMatch && isMicroApp) {
      //   menuMatch = matchMenuByRoutePath(menu, subStr(routerBase, 0, -1) + view.fullPath)
      // }

      if (menuMatch) {
        const innerIcon = getMenuIcon(menuMatch) // 开启递归查找 倒着查找
        if (!isEmpty(innerIcon)) icon = innerIcon
        const currentMenu = cipMenu.lastRoute // menuMatch.pop()
        if (!isEmpty(getMenuTitle(currentMenu))) viewTitle = getMenuTitle(currentMenu) // 匹配到菜单项后获取菜单项的title
        if (!isEmpty(isCacheView(currentMenu))) isCache = isCacheView(currentMenu)
      }
      const title = [viewTitle, customTitle].filter(v => !!v).join('-')
      return {
        title,
        isCache,
        icon
      }
    }
    const handlerPathChange = (path) => {
      const { matched, ...currentView } = route
      // route
      // currentView.fullPath = path // 重写fullPath
      currentView.equalPath = path
      // const primaryKey = 'fullPath'// cipConfig.withQuery === false ? 'path' : 'fullPath'
      const index = openedViewList.value.findIndex(openedView => openedView.equalPath === currentView.equalPath)
      // if (index === -1 || index > 0) {
      const { title, isCache, icon } = getViewConfig(props.menuTitleMap, props.menu, currentView)
      title && (currentView.title = title)
      icon && (currentView.icon = icon)
      currentView.isCache = isCache
      if (index === -1) {
        addOpenedView(currentView)
      } else {
        updateOpenedView(index, currentView)
      }
      if (isCache) {
        addCacheView(currentView.equalPath)
        emit('update:cache', cacheViewList.value)
      }
      // }
      // else {
      //   if (primaryKey === 'path') {
      //     openedViewList.value[index].fullPath = currentView.fullPath
      //   }
      //   setActiveView(openedViewList.value[index])
      // }
    }
    watch(() => props.equalPath, (val) => {
      if (isSubApp(route.name)) {
        console.log('子应用不缓存')
      } else {
        handlerPathChange(val)
        // console.log('openedViewList', openedViewList.value)
      }
    }, { immediate: true, flush: 'pre' })

    // 打开view 缓存 tab名称
    // 控制tab名称及缓存
    watch(() => props.menu, (val) => { // menu变化是对整个openedViewList进行viewName计算
      // 子应用add的时候容易出现 因为menu在变化，openedViewList也在变化
      // ERROR: 在微应用场景下add导致menu变化，
      openedViewList.value.forEach((openedView) => {
        // console.log('openedView', JSON.parse(JSON.stringify(openedView)), val)
        const { title, isCache, icon } = getViewConfig(props.menuTitleMap, val, openedView)
        title && (openedView.title = title)
        icon && (openedView.icon = icon)
        if (openedView.isCache !== isCache) {
          // 存在变化的openedView
          openedView.isCache = isCache
          isCache
            ? addCacheView(openedView.fullPath)
            : removeCacheView(openedView.fullPath)
        }
      })
    }, { immediate: true, flush: 'post' })
    // 控制tab名称
    watch(() => props.menuTitleMap, (val) => {
      Object.keys(val).forEach(fullPath => {
        const matchRoute = openedViewList.value.find(view => view.fullPath === fullPath)
        if (matchRoute) {
          const { title, icon } = getViewConfig(val, props.menu, matchRoute)
          matchRoute.title = title
          matchRoute.icon = icon
        }
      })
    }, { deep: true, immediate: true })
    // 前往Tab视图
    const toTab = (fullPath) => {
      const view = findViewByOpenedViewList(fullPath)
      setActiveView(view)
    }
    // 删除当前Tab视图
    const removeTab = (fullPath, autoRedirect) => { // 是否自动重定向到上一个tab
      const view = findViewByOpenedViewList(fullPath)
      removeCacheView(fullPath)
      removeOpenedView(view, autoRedirect)
    }
    const removeAllTab = (redirect) => {
      resetCacheList()
      resetOpenedList(redirect)
    }
    expose({
      removeTab,
      removeAllTab,
      handlerPathChange
    })
    // instance.ctx.removeTab = removeTab
    // instance.ctx.handlerPathChange = handlerPathChange
    return () => {
      // 隐藏模式时只有功能，没有dom
      if (!props.withTabs) return null
      return <div class={['cip-main-tabs']}>
        <ElTabs
          type="card"
          modelValue={activeView.value.fullPath}
          onTabClick={({ paneName }) => toTab(paneName)}
          onTabRemove={(paneName) => { removeTab(paneName) }}>
          {openedViewList.value.map(openedView => (
            <ElTabPane
              key={openedView.fullPath}
              name={openedView.fullPath}
              label={openedView.title || openedView.name}
              closable={openedViewList.value.length > 1}
              // closable={openedView.fullPath !== props.homeView?.fullPath}
              onClick={() => toTab(openedView)}
              onClose={() => removeOpenedView(openedView)} >
              {{
                label: () => <>
                  {openedView.icon && <CipMainIcon style={'margin-right: 4px; font-size: 12px;'} name={openedView.icon}/>}
                  <ElTooltip content={openedView.title || openedView.name}>
                    <span class={'cip-main-tab__label'}>{openedView.title || openedView.name}</span>
                  </ElTooltip>
                </>

              }}
            </ElTabPane>
          ))}
        </ElTabs>
      </div>
    }
  }
})
