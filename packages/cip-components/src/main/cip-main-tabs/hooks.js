import { ref, unref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// import { useCipConfig } from '../../hooks/use-cip-config'
const findViewIndex = (viewList, view) => {
  return viewList.findIndex(v => v.fullPath === view.fullPath)
}

export const useCacheView = (updateCache) => {
  const cacheViewList = ref([])
  // 添加
  const addCacheView = (path) => {
    // 判断是否需要添加
    if (!cacheViewList.value.includes(path)) {
      cacheViewList.value.push(path)
      updateCache(cacheViewList.value)
    }
  }
  // 删除
  const removeCacheView = (path) => {
    const index = cacheViewList.value.indexOf(path)
    if (index > -1) {
      cacheViewList.value.splice(index, 1)
      updateCache(cacheViewList.value)
    }
  }
  // 重置
  const resetCacheList = () => {
    cacheViewList.value = []
    updateCache(cacheViewList.value)
  }
  return {
    cacheViewList,
    addCacheView,
    removeCacheView,
    resetCacheList
  }
}

export const useActiveOrder = () => {
  const activeOrderList = ref([])
  const updateActiveOrder = (view) => {
    const activeIndex = findViewIndex(activeOrderList.value, view)
    if (activeIndex > -1) activeOrderList.value.splice(activeIndex, 1)
    activeOrderList.value.push(view)
  }
  const removeActiveOrder = (view) => {
    const activeIndex = findViewIndex(activeOrderList.value, view)
    if (activeIndex > -1) activeOrderList.value.splice(activeIndex, 1)
  }
  const resetActiveOrderList = () => {
    activeOrderList.value = []
  }
  const getNextActiveOrder = () => {
    const activeOrderListLength = activeOrderList.value.length
    if (activeOrderListLength > 2) {
      return activeOrderList.value[activeOrderListLength - 2]
    }
  }
  return {
    activeOrderList,
    updateActiveOrder,
    removeActiveOrder,
    resetActiveOrderList,
    getNextActiveOrder
  }
}

// activeView - ref({}) 当前激活的路由
export const useOpenedView = (homeView) => {
  const router = useRouter()
  const route = useRoute()
  // const cipConfig = useCipConfig()
  const activeView = ref({})
  const { updateActiveOrder, removeActiveOrder, resetActiveOrderList, getNextActiveOrder } = useActiveOrder()
  const isActiveView = (view) => {
    return unref(activeView).fullPath === view?.fullPath
  }
  const setActiveView = (view) => {
    activeView.value = view
    // 当前路由未要跳转的路由时，不出发setActiveView的跳转功能
    // const primaryKey = cipConfig.withQuery === false ? 'path' : 'fullPath'
    // TODO: 此处的代码处理可能导致特殊情况下页面不跳转，如果遇到后面带参数的页面或者带hash的页面存在问题时需要在此处进行调试
    const nextRoute = router.resolve(view.fullPath ?? view)
    if (nextRoute.fullPath !== route.fullPath) router.push(view.fullPath ?? view)
    // router.push(view.fullPath ?? view)
  }
  // TODO: 考虑固定打开的ViewList
  const openedViewList = ref([]) // 不再提供

  const getHomeView = () => {
    console.log('homeView', homeView.value)
    // 下一个为当前路由match的上一个
    if (homeView.value) {
      // 下一个为指定的首页
      return homeView.value
    } else {
      if (route.matched.length > 1) {
        return route.matched[route.matched.length - 2] // ()
      } else {
        return route.matched[0]
      }
    }
  }

  const getNextActiveView = () => {
    let nextActive = getNextActiveOrder()
    if (!nextActive) {
      // 如果已经是最后一个了(一般情况不允许删除)， 特殊情况允许返回首页
      nextActive = getHomeView()
    }
    return nextActive
  }
  watch(activeView, (val) => {
    updateActiveOrder(val)
  }, { immediate: true })

  // 添加一个视图
  const addOpenedView = (view) => {
    openedViewList.value.push(view)
    setActiveView(view)
  }
  // 修改一个视图
  const updateOpenedView = (index, view) => {
    openedViewList.value.splice(index, 1, view)
    setActiveView(view)
  }
  // 关闭一个视图
  const removeOpenedView = (view, autoRedirect = true) => { // 是否自动重定向到上一个tab
    if (isActiveView(view) && autoRedirect) setActiveView(getNextActiveView()) // 获取上一个激活的
    // 删除openedView时需要同时删除opened和active
    const index = findViewIndex(openedViewList.value, view)
    if (index > -1)openedViewList.value.splice(index, 1)
    removeActiveOrder(view)
  }
  // 关闭其他视图 view允许为空
  const removeOtherView = (view) => {
    if (!isActiveView(view)) {
      setActiveView(view)
    }
    openedViewList.value = [activeView.value]
  }
  const findViewByOpenedViewList = (fullPath) => {
    return openedViewList.value.find(openedView => openedView.fullPath === fullPath)
  }
  // 关闭所有
  const resetOpenedList = (redirect = true) => {
    resetActiveOrderList()
    // if (homeView) {
    if (redirect) {
      openedViewList.value = [getHomeView()]
      setActiveView(getHomeView())
    } else {
      openedViewList.value = []
    }

    // } else {
    //   // 默认方案
    //   openedViewList.value = [{ fullPath: '/', title: '首页' }]
    //   setActiveView({ fullPath: '/', title: '首页' })
    // }
  }

  return {
    activeView,
    openedViewList,
    addOpenedView,
    updateOpenedView,
    removeOpenedView,
    removeOtherView,
    resetOpenedList,
    setActiveView,
    findViewByOpenedViewList
  }
}
