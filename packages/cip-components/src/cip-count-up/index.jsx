import { defineComponent, ref, watch, onMounted, computed } from 'vue'
import { CountUp } from 'countup.js'
import { componentScheme } from './component.scheme'
import { generateProps } from '@xigefish/shared'
export default defineComponent({
  name: 'CipCountUp',
  props: generateProps(componentScheme),
  setup (props) {
    const countRef = ref()
    const value = computed(() => {
      return props.endVal || props.modelValue
    })
    const countUp = ref()
    const newCountUP = () => {
      return new CountUp(countRef.value, props.endVal || props.modelValue, {
        duration: props.duration,
        startVal: props.startVal,
        decimalPlaces: props.decimalPlaces,
        prefix: props.prefix,
        suffix: props.suffix
      })
    }
    onMounted(() => {
      countUp.value = newCountUP()
      countUp.value.start()
      watch(props, () => {
        // 监听动态配置项，组件本身不支持动态配置，需要重新创建实例
        countUp.value = newCountUP()
        countUp.value.update(value.value)
      })
    })

    return () => (
      <span ref={countRef} />
    )
  }
})
