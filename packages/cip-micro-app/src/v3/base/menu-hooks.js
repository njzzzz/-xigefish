import { toRaw } from 'vue'
import { depthFirstSearchIndexTree, getFieldValue, getPropertyKeyByPath } from '@xigefish/d-render-shared'
import microApp from '@micro-zoe/micro-app'
import { dataChangeStrategy } from '../../common/util'
import store from '@xigefish/components/store'
import { useCipConfig } from '@xigefish/components/hooks/use-cip-config'
import { setMenuRouteToEqualPath } from './util'
export const useBaseMenu = (menu) => {
  // state.menu = toRaw(menu)
  const cipConfig = useCipConfig()
  let menuChangeCount = 1
  dataChangeStrategy.setStrategy('setNavMenu', (data, props) => {
    const rawMenu = toRaw(menu.value)
    let pIndex
    if (data.pName) {
      // 直接挂在分类上
      pIndex = depthFirstSearchIndexTree(rawMenu, data.pName, 'name')
    } else {
      pIndex = depthFirstSearchIndexTree(rawMenu, data.pPath, 'route')
    }
    const key = getPropertyKeyByPath(pIndex, { children: 'children' })
    const pMenu = getFieldValue(rawMenu, key)
    if (pMenu) {
      pMenu.router = pMenu.route.replace(new RegExp(`^${props.baseRoute}`), '/')
      // 把所有有route的全部处理一次
      // const equalPath = getEqualPath(data.item.route, cipConfig)
      // data.item.route = equalPath
      setMenuRouteToEqualPath(data.item, cipConfig)
      if (pMenu.children) {
        const childIdx = pMenu.children.findIndex(v => v.name === data.item.name)
        if (childIdx === -1) {
          pMenu.children.push(data.item)
          // 路由由自己控制
        } else {
          // 路径不变的不需要更新
          if (pMenu.children[childIdx].route === data.item.route) return
          pMenu.children[childIdx].route = data.item.route
          pMenu.children[childIdx].name = data.item.name
        }
      } else {
        pMenu.children = [data.item]
      }
    }
    menu.value = [...rawMenu]
    menuChangeCount = menuChangeCount + 1
    store.dispatch('setApp', { ...store.state.app, menu: rawMenu })
    // 非1.x版本setData的数据缓存
    microApp.setData(props.name, { menuChangeCount, store })
  })
}
