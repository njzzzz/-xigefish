import { reactive, shallowRef, markRaw, watch } from 'vue'
import { useSetConfig } from './use-config'
export default {
  /**
   * @define themeComponent {Component}
   */
  props: {
    theme: [String, Object], // Record<string, themeComponent>
    themes: Object // Record<string, <Record<string, themeComponent>>>
  },
  setup (props, { slots }) {
    const pTheme = shallowRef({})
    watch(() => props.theme, (value) => {
      let result
      if (typeof props.theme === 'string') {
        result = props.themes[value]
      } else if (value) {
        result = value
      } else if (props.themes) {
        return props.themes[0]
      }
      pTheme.value = result
    }, { immediate: true })
    useSetConfig(reactive({
      theme: pTheme,
      themes: markRaw(props.themes) // themes不需要响应性
    }))
    return () => slots.default?.()
  }
}
