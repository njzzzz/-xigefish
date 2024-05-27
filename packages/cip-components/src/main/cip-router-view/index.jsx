import { defineComponent, KeepAlive, computed, inject, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { getFullPathWithoutHash } from '../helper'
import { isSubApp } from '../../cip-subapp-container/micro-app/util'
export default defineComponent({
  name: 'CipRouterView',
  props: {
    viewKey: String,
    noViewKey: { type: Boolean, default: undefined },
    withTabs: { type: Boolean, default: undefined },
    cacheList: Array
  },
  setup (props) {
    const cipMenu = inject('cipMenu', {})
    const router = useRouter()
    // path获取路由名称时带缓存缓存功能
    const menuRouteNameDict = {}
    const getRouteNameByPath = (path) => {
      if (menuRouteNameDict[path]) {
        return menuRouteNameDict[path]
      } else {
        const name = router.resolve(path).name
        menuRouteNameDict[path] = name
        return name
      }
    }
    const cacheBridge = computed(() => {
      if (props.withTabs) return props.cacheList
      if (!cipMenu.routeMatched) return []
      let canCacheNames = []
      if (window.__MICRO_APP_BASE_ROUTE__) {
        const canCached = cipMenu.routeMatched.filter(v => typeof v.route === 'string')
        canCacheNames = canCached.map(v => {
          const path = v.route.replace(window.__MICRO_APP_BASE_ROUTE__, '/')
          return getRouteNameByPath(path)
        })
      } else {
        canCacheNames = cipMenu.routeMatched.filter(v => v.path || v.route || (v.name && v.name.indexOf('_') !== '0')).map(v => {
          const path = v.path || v.route
          if (path) {
            return getRouteNameByPath(path)
          }
          return v.name
        })
      }
      const tabsCacheNamesMap = props.cacheList.map(path => ({ path, name: getRouteNameByPath(path) }))
      const result = tabsCacheNamesMap.filter(v => canCacheNames.includes(v.name)).map(v => v.path)
      console.log('cacheBridge result', result)
      return result
    })

    return () => (
      <router-view>
        {{
          default: ({ Component, route, ...args }) => {
            // TODO: 直接修改name可能导致的问题位置
            if (!isSubApp(route.name)) {
              // 不对子应用进行相关操作
              if (Component && !props.noViewKey) {
                Component.type.name = getFullPathWithoutHash(route.fullPath)
              }
            }
            return <KeepAlive include={cacheBridge.value}>
              {Component && <Component key={props.viewKey}/>}
            </KeepAlive>
          }
        }}
      </router-view>
    )
  }
})
