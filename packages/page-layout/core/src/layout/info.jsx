import Layout from './index'
import { computed } from 'vue'
import { isNotEmpty } from '@xigefish/d-render-shared'
export default {
  props: {
    hideHandler: {
      type: Boolean,
      default: undefined
    }
  },
  setup (props, { slots }) {
    const useHideHandler = computed(() => {
      if (isNotEmpty(props.hideHandler)) return props.hideHandler
      if (slots.handle) return false
      return true
    })
    return () => <Layout
      type={'Handle'}
      hideHandler={useHideHandler.value}
      v-slots={slots}
    />
  }
}
