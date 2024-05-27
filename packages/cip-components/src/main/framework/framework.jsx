import { computed, ref } from 'vue'
import Hide from './components/hide'
import Left2 from './components/left-2'
import Left from './components/left'
import Top from './components/top'
import TopLeft from './components/top-left'

const map = {
  left: Left,
  hide: Hide,
  'left-2': Left2,
  top: Top,
  'top-left': TopLeft
}

// const Framework = (props, { slots }) => {
//   // 异步组件将导致插入存在问题
//   return h(map[props.layout] || Left2, props, slots)
// }
// Framework.props = {
//   layout: { type: String, required: true },
//   hideAside: { type: Boolean }
// }
// export default Framework
export default {
  props: {
    layout: { type: String, required: true },
    hideAside: { type: Boolean }
  },
  setup: (props, { slots, expose }) => {
    // 异步组件将导致插入存在问题
    const FrameworkComponent = computed(() => map[props.layout] || Left2)
    const framework$ = ref()
    expose({
      framework$
    })
    return () => <FrameworkComponent.value ref={framework$} {...props} v-slots={slots} /> // h(FrameworkComponent.value, props, slots)
  }
}
