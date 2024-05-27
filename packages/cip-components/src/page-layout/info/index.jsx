import { defineComponent, computed } from 'vue'
import CipPageLayoutHandler from '../handle'
import { isNotEmpty } from '@xigefish/d-render-shared'

export default defineComponent({
  props: {
    hideHandler: { type: Boolean, default: undefined } // 默认隐藏
  },
  setup (props, { slots }) {
    const useHideHandler = computed(() => {
      if (isNotEmpty(props.hideHandler)) return props.hideHandler
      if (slots.handle) return false
      return true
    })
    return () => <CipPageLayoutHandler hideHandler={useHideHandler.value} v-slots={slots}/>
  }
})
