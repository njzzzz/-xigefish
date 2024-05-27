import { defineComponent, provide, computed } from 'vue'
import merge from 'deepmerge'
import { xdpConfigKey, useConfig } from '../use-config'
const defaultXdpConfig = {}
// Tip: 为什么不采用Symbol, 因为可能存在多处安装的问题Symbol将导致无法正确获取到的问题

export default defineComponent({
  name: 'XdpConfigProvide',
  inheritAttrs: false, // 不继承属性防止属性穿透
  setup (props, { attrs, slots }) {
    const parentConfig = useConfig()
    const provideProps = computed(() => {
      return merge(parentConfig, attrs) ?? defaultXdpConfig
    })
    provide(xdpConfigKey, provideProps.value)
    return () => slots.default?.()
  }
})
