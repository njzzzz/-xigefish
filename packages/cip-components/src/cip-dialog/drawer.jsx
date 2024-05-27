import { computed, Teleport } from 'vue'
import { ElDrawer } from 'element-plus'
import { getUsingConfig } from '@xigefish/d-render-shared'
import { useCipConfig } from '../hooks/use-cip-config'
const DRAWER_SIZE_CONFIG = {
  mini: '334px',
  small: '424px',
  default: '608px',
  large: '1070px'
}

export default {
  name: 'CipDrawer', // 将api与dialog转换为一致
  inheritAttrs: false,
  props: {
    width: String,
    size: String
  },
  setup (props, { attrs, slots }) {
    const cipConfig = useCipConfig()
    const quirks = computed(() => cipConfig.quirks)
    const width = computed(() => {
      return getUsingConfig(props.width, DRAWER_SIZE_CONFIG[props.size], DRAWER_SIZE_CONFIG.default)
    })
    let body = document.body
    // 子应用环境下插入到顶部的body中
    if (window.__MICRO_APP_ENVIRONMENT__) {
      // 子应用中真正的插入body
      const _window = new Function('return window')()
      window.microApp.removeDomScope()
      body = _window.document.body
    }
    const appendTo = computed(() => {
      let result = body
      if (quirks.value) result = '.drawer-insert'
      return result
    })
    return () =>
      attrs.modelValue && <Teleport to={appendTo.value}>
        <ElDrawer
          customClass={'cip-drawer'}
          modalClass={`cip-drawer__container${quirks.value ? ' cip-drawer__container--quirks' : ''}`}
          appendToBody={false}
          {...attrs}
          size={width.value}
          v-slots={slots}
        />
      </Teleport>
  }
}
