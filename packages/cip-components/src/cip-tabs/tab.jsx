import { inject } from 'vue'
import { tabsKey } from './index'
export default {
  name: 'CipTab',
  props: {
    name: [String, Number]
  },
  setup (props, { slots }) {
    const ciplTabs = inject(tabsKey, {})
    return () => <div
      class={['cip-tab', { 'is-active': ciplTabs.active === props.name }]}
      onClick={() => ciplTabs.changeActive(props.name)}>
      {slots.default?.()}
    </div>
  }
}
