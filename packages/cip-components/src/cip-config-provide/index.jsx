import { defineComponent, computed } from 'vue'
import store from '../store'
import { XdpConfigProvide } from '@xigefish/config'
import deepmerge from 'deepmerge'
import { configProvideProps } from './props'
import { isNotEmpty } from '@xigefish/d-render-shared'
export default defineComponent({
  inheritAttrs: false,
  props: configProvideProps,
  setup (props, { slots, attrs }) {
    const filterEmpty = (object) => {
      return Object.keys(object).reduce((acc, key) => {
        const value = object[key]
        if (isNotEmpty(value)) {
          acc[key] = value
        }
        return acc
      }, {})
    }
    const config = computed(() => {
      // 兼容来版本，props会对短横行进行处理
      return deepmerge(deepmerge(store.state.app?.config, attrs), filterEmpty(props))
    })
    return () => <XdpConfigProvide {...config.value} v-slots={slots}/>
  }
})
// export const cipConfig = {}
//
// export default defineComponent({
//   name: 'CipConfigProvide',
//   inheritAttrs: true, // 不继承属性防止属性穿透
//   props: configProvideProps,
//   setup (props, { slots }) {
//     console.log('')
//     const appConfig = computed(() => store.state?.app?.config || {})
//     const provideProps = computed(() => {
//       const layout = getUsingConfig(props.layout, appConfig.value.layout, {})
//       Object.assign(cipConfig, {
//         ...props,
//         layout
//       })
//       return {
//         ...props,
//         layout
//       }
//     })
//     provide('cip-config', provideProps.value)
//     return () => slots.default?.()
//   }
// })
