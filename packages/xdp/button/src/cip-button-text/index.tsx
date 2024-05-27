import { computed, defineComponent } from 'vue'
import { useTable, getUsingConfig } from '@xigefish/d-render-shared'
import CipButton from '../cip-button'
export default defineComponent({
  name: 'CipButtonText',
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    size: String,
    danger: { type: Boolean, default: undefined }, // 是否为真正的danger
    disabled: Boolean,
    showDisabled: { // 是否展示disabled的按钮
      type: Boolean,
      default: undefined
    }
  },
  // emits: ["click"], //tips: 此处千万不要加，不然会导致onClick无法正常下发 onClick
  setup (props, { attrs, slots }) {
    const cipTable = useTable() as any
    const sizeBridge = computed(() => {
      return getUsingConfig(props.size, cipTable.size, 'default')
    })
    const dangerBridge = computed(() => {
      return getUsingConfig(props.danger, cipTable.dangerButton, true)
    })
    const showDisabledButton = computed(() => {
      return getUsingConfig(props.showDisabled, cipTable.showDisabledButton, true)
    })
    const showButton = computed(() => {
      if (showDisabledButton.value === false && props.disabled) return false
      return true
    })
    /* 修改danger类型的按钮 转换为primary [注： UI标准中无颜色区分] */
    return () => showButton.value && <CipButton
      {...attrs}
      link
      disabled={props.disabled}
      type={ (dangerBridge.value === false && props.type === 'danger') ? 'primary' : props.type}
      size={sizeBridge.value}
    >
      {slots.default?.()}
    </CipButton>
  }
})
