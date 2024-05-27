export const subMenuMixin = {
  data () {
    return {
      menu: []
    }
  },
  created () {
    // micro-app环境下才执行
    if (window.__MICRO_APP_ENVIRONMENT__) {
      let menuChangeCount = 0
      const transformFn = typeof this.transform === 'function' ? this.transform : (val) => val
      let init = true
      const transformMenu = (menu) => {
        const originMenu = JSON.parse(JSON.stringify(menu))
        return transformFn(originMenu)
      }
      window.microApp.addDataListener((data) => {
        if (init) {
          this.menu = transformMenu(data.store.state.app?.menu)
          init = false
        } else {
          if (data.menuChangeCount && menuChangeCount !== data.menuChangeCount) {
            this.menu = transformMenu(data.store.state.app?.menu)
            menuChangeCount = data.menuChangeCount
          }
        }
      }, true)
    }
  }
}
