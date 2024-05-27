import BasicRate from './index'
import { formInputViewProps } from '@xigefish/d-render-shared'
import { computed } from 'vue'
export default {
  props: formInputViewProps,
  inheritAttrs: false,
  setup (props) {
    const viewConfig = computed(() => {
      return { ...props.config, showScore: props.config.showScore ?? true }
    })
    return () => <BasicRate
      modelValue={props.modelValue}
      config={viewConfig.value}
      disabled={true}
    />
  }
}
