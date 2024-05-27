import { computed } from 'vue'
import { useFormInput, useOptions, formInputProps } from '@xigefish/d-render-shared'

import './index.less'

export default {
  name: 'CipStatus',
  props: formInputProps,
  setup (props, context) {
    const { width, securityConfig } = useFormInput(props, context)
    const { options } = useOptions(props, false)
    const optionProps = computed(() => Object.assign({ label: 'label', value: 'value', color: 'color' }, securityConfig.optionProps))

    const statusItem = computed(() => options.value.find(i => i[optionProps.value.value] === props.modelValue) || {})

    const statusLabel = computed(() => statusItem.value[optionProps.value.label])
    const statusColor = computed(() => statusItem.value[optionProps.value.color])
    return () => <div class='cip-status' style={{ width: width.value }}>
      <div class="cip-status__dot" style={{ background: statusColor.value }}></div>
      <div>{statusLabel.value}</div>
    </div>
  }
}
