import { Slider as VanSlider, Button as VanButton } from 'vant'
import { useFormInput, formInputProps, fromInputEmits } from '@xigefish/d-render-shared'
import { useSliderConfig } from '@xigefish/d-render-plugin-cci/esm/input/basic/slider/use-slider-config'
export default {
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, context) {
    const { proxyValue, securityConfig, width } = useFormInput(props, context)
    const { max, min, step } = useSliderConfig({ securityConfig })
    return () => <div class={'basic-slider--m__wrapper'}>
      <div class={'basic-slider--m'} style={{ width: width.value }}>
        <VanSlider
          style={{ width: '100%', top: '50%', transform: 'translateY(-50%)' }}
          v-model={proxyValue.value}
          max={max.value}
          min={min.value}
          step={step.value}
          disabled={securityConfig.value.disabled}
        >
          {{
            button: () => <VanButton round size="mini">{proxyValue.value}</VanButton>
          }}
        </VanSlider>
      </div>
    </div>
  }
}
