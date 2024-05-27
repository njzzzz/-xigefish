import { provide, reactive, toRefs } from 'vue'
import Tab from './tab'
export const tabsKey = Symbol('cip-tabs')
const Tabs = {
  name: 'CipTabs',
  props: {
    active: [String, Number]
  },
  emits: ['update:active'],
  setup (props, { emit, slots }) {
    const changeActive = (val) => {
      emit('update:active', val)
    }

    const ciplTabs = reactive({
      ...toRefs(props),
      changeActive
    })
    provide(tabsKey, ciplTabs)

    return () => <div class={'cip-tabs'}>
      {slots.default?.()}
    </div>
  }
}
Tabs.Tab = Tab
export default Tabs
