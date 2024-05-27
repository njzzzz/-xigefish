import { computed, defineComponent } from 'vue'
import { getUsingConfig } from '@xigefish/d-render-shared'
import { useCipConfig } from '../../hooks/use-cip-config'
import * as pageLayouts from './components/index'
export default defineComponent({
  props: {
    theme: String
  },
  setup (props, { slots }) {
    const cipConfig = useCipConfig()
    const _theme = computed(() => {
      return getUsingConfig(props.theme, cipConfig.layout?.pageTheme)
    })
    const Component = computed(() => pageLayouts[_theme.value || 'standard'])
    // 属性自动继承 slots?
    return () => <Component.value v-slots={slots}/>
  }
})
