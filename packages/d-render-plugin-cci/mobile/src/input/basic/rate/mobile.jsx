import { Rate as VanRate } from 'vant'
import { useFormInput, formInputProps, fromInputEmits } from '@xigefish/d-render-shared'
import { useRateConfig } from '@xigefish/d-render-plugin-cci/esm/input/basic/rate/use-rate-config'
export default {
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, context) {
    const formInput = useFormInput(props, context)
    const { proxyValue } = formInput
    const { allowHalf, max } = useRateConfig(formInput)
    return () => <div>
      <VanRate v-model={proxyValue.value}
        count={max.value}
        allowHalf={allowHalf.value}
        void-icon="star"
        color="#ffd21e"
      />
    </div>
  }
}
