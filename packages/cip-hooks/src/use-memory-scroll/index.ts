import { onActivated, unref, onMounted } from 'vue'
import type { Ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
/**
 * 纪录缓存页面指定dom的滚动条位置
 */
export const useMemoryScroll = (dom: Ref<HTMLElement|undefined> | (() => HTMLElement))=> {
  let scrollTop = 0
  const getRealDom = () => {
    if(typeof dom === 'function') return dom()
    return unref(dom)
  }

  onActivated(() => {
    console.log('onActivated', scrollTop)
    const _dom = getRealDom()
    if(_dom) _dom.scrollTop = scrollTop

  })

  onBeforeRouteLeave(() => {
    const _dom = getRealDom()
    console.log('onBeforeRouteLeave', _dom?.scrollTop)
    scrollTop = _dom?.scrollTop ?? 0
  })
}
