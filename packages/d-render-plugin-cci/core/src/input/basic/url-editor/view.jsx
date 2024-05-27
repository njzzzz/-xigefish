import { computed } from 'vue'
import { useFormView, formInputViewProps } from '@xigefish/d-render-shared'
export default {
  props: formInputViewProps,
  setup (props) {
    const { proxyOtherValue } = useFormView(props, { maxOtherKey: 3 })
    const protocol = computed(() => {
      return proxyOtherValue[0].value || 'http:'
    })
    return () => <div>
      {protocol.value}//{props.modelValue}{proxyOtherValue[1].value ? `:${proxyOtherValue[1].value}` : ''}{proxyOtherValue[2].value}
    </div>
  }
}
