import { ref, onMounted, onUnmounted, nextTick } from 'vue'

/**
 * @description: 检测一个元素是否可见或者两个元素是否相交
 * @param {*} selector 元素选择器
 * @param {*} opts.scope 指定某个范围，因为 dom 操作可能会监听到别的组件的元素
 * @param {*} opts.multiple 监听多个元素时需传 true
 * @param {*} opts.handler 自定义返回的 entries 格式
 * @param {*} opts.options 构建 IntersectionObserver 实例的第二个参数 { root, rootMargin, threshold}
 * @return {intersectionObserver, entries} entries 即变动的元素信息
 */
export default function useIntersectionObserver (selector, opts = {}) {
  const intersectionObserver = ref()
  const entries = ref([])
  onMounted(() => {
    nextTick(() => {
      const { scope = 'body', handler, options = {}, multiple = false } = opts
      intersectionObserver.value = new IntersectionObserver(function (entry) {
        entries.value = handler ? handler(entry) : entry
      }, options)

      let el
      const scopeEl = document.querySelector(scope)
      if (multiple) {
        el = scopeEl.querySelectorAll(selector)
        el?.forEach?.(item => {
          intersectionObserver.value.observe(item)
        })
      } else {
        el = scopeEl.querySelector(selector)
        intersectionObserver.value.observe(el)
      }
    })
  })
  onUnmounted(() => {
    intersectionObserver.value.disconnect()
  })

  return {
    intersectionObserver,
    entries
  }
}
