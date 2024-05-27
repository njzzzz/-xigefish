import { computed } from 'vue'
import { useConfig } from '../use-config'
export default {
  props: {
    type: { type: String, require: true },
    theme: {} // 单独指定
  },
  setup (props, { attrs, slots }) {
    const pageConfig = useConfig()
    const themeBridge = computed(() => {
      if (props.theme) {
        return pageConfig.themes[props.theme]
      }
      return pageConfig.theme
    })
    const Layout = computed(() => {
      return themeBridge.value[props.type]
    })
    //  vue3 attrs自动透传
    return () => <Layout.value
      v-slots={slots}
    />
  }
}
