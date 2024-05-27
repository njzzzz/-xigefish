/**
 * @description 用于触发多表单验证
 * @author xmf
 */
import { ref, markRaw } from 'vue'
import { isArray } from '@xigefish/d-render-shared'
export default {
  name: 'CipFormValidate',
  setup (props, { slots, expose }) {
    const defaultSlot = ref([])
    const isComponent = vnode => !!vnode.component
    const isFormComponent = (vnode) => {
      if (!isComponent(vnode)) return false
      const componentName = (vnode.type?.name ?? '') // .toLocaleLowerCase()
      return /(-form|Form)$/.test(componentName) // componentName.indexOf('form') > -1
    }
    const getComponent = vnode => vnode?.component
    const getMethodByComponent = (component = {}, method) => component.ctx?.[method] ?? component.exposed?.[method]
    const clearValidate = (vnodeList = []) => {
      // eslint-disable-next-line no-unused-expressions
      const handler = (component) => {
        const clearValidate = getMethodByComponent(component, 'clearValidate')
        // eslint-disable-next-line no-unused-expressions
        clearValidate?.()
      }
      return findFormAndHandler(vnodeList, handler).then(() => {})
    }
    const findFormAndHandler = async (vnodeList = [], handler = () => {}, depth = 1) => {
      for (let i = 0; i < vnodeList.length; i++) {
        const vnode = vnodeList[i]
        if (isFormComponent(vnode)) {
          const component = getComponent(vnode)
          await handler(component)
        } else {
          if (depth > props.maxDepth) return false
          // 使用defineAsyncComponent 是 subTree 及为下个组件
          const childVnodeList = isComponent(vnode)
            ? isArray(vnode.component.subTree?.children)
              // 可能存在值为对象的情况
              ? vnode.component.subTree?.children
              : [vnode.component.subTree]
            : vnode.children
          // 如果是文字节点则跳过不处理
          if (typeof childVnodeList === 'string') {
            continue
          }
          if (childVnodeList?.length > 0) {
            await findFormAndHandler(childVnodeList, handler, ++depth) // 此处++必须在前
          }
        }
      }
    }
    const validForms = async (vnodeList = []) => {
      const validList = []
      const handler = async (component) => {
        try {
          const validate = getMethodByComponent(component, 'validate')
          await validate?.()
          validList.push(true)
        } catch (e) {
          validList.push(e)
        }
      }
      try {
        await findFormAndHandler(vnodeList, handler)
      } catch (e) {
        console.log('findFormAndHandler', e)
      }
      return validList
    }
    const validate = async () => {
      const validList = await validForms(defaultSlot.value)
      if (!validList.some(valid => valid !== true)) {
        return true
      } else {
        // 此处不需要报错
        throw new Error('未通过表单验证')
      }
    }
    const clear = () => {
      return clearValidate(defaultSlot.value)
    }

    expose({
      validate,
      clear
    })

    return () => {
      const slot = slots.default?.()
      if (slot) {
        defaultSlot.value = markRaw(slot)
      }
      return slot
    }
  }
}
