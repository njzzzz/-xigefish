import { render, h } from 'vue'
import { hasOwn } from '@vue/shared'
// import { cipConfig } from '../cip-config-provide'
import FormDialogConstructor from './index'
function showFormDialog (options, resolve, reject) {
  const container = document.createElement('div')
  // 将cipConfig数据入住props
  options.cipConfig = {} // cipConfig
  options.onVanish = () => {
    render(null, container)
  }

  options.onAction = (action, data) => {
    if (action === 'close') {
      reject(data)
    } else {
      resolve(data)
    }
  }

  const vnode = h(FormDialogConstructor, options)
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
}
function FormDialog (options = {}) {
  return new Promise((resolve, reject) => {
    showFormDialog(options, resolve, reject)
  })
}

export default FormDialog
