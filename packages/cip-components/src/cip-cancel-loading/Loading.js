import { render, h } from 'vue'
import { hasOwn } from '@vue/shared'
import CancelLoadingConstructor from './index'
function CancelLoading (options) {
  const container = document.createElement('div')

  let timeout = null

  options.onVanish = () => {
    options.onCancel && options.onCancel()
    clearTimeout(timeout)
    timeout = null
    render(null, container)
    document.body.removeChild(container)
  }

  const vnode = h(CancelLoadingConstructor, options)
  render(vnode, container)
  document.body.appendChild(container)
  const instance = vnode.component
  const vm = instance.proxy
  // eslint-disable-next-line no-unused-vars
  for (const prop in options) {
    if (hasOwn(options, prop) && !hasOwn(vm.$props, prop)) {
      vm[prop] = options[prop]
    }
  }
  vm.visible = true

  // options = {message, btnName, duration: 2000}
  timeout = setTimeout(() => {
    vm.visible = false
  }, options.duration || 2000)
  const hide = () => {
    vm.visible = false
    clearTimeout(timeout)
    timeout = null
  }
  return {
    hide
  }
}
export default CancelLoading
