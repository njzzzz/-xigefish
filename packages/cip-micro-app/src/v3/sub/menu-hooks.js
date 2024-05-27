import { toRaw } from 'vue'

export const useSubMenu = (menu, transformFn) => {
  let menuChangeCount = 0
  let init = true
  const transformMenu = (menu) => {
    const originMenu = [...toRaw(menu)]
    return typeof transformFn === 'function' ? transformFn(originMenu) : originMenu
  }
  window.microApp.addDataListener((data) => {
    if (init) {
      menu.value = transformMenu(data.store.state.app?.menu)
      init = false
    } else {
      if (data.menuChangeCount && menuChangeCount !== data.menuChangeCount) {
        menu.value = transformMenu(data.store.state.app?.menu)
        menuChangeCount = data.menuChangeCount
      }
    }
  }, true)
}
