import { ref } from 'vue'
import { ElButton } from 'element-plus'
import CipTooltip from '@xigefish/components/cip-tooltip/index'
import './example.less'

export default {
  setup () {
    const disabled = ref(false)

    return () => <CipTooltip
      disabled={disabled.value}
      content="click to close tooltip function"
      placement="bottom"
      effect="light"
    >
      <ElButton onClick={() => disabled.value = !disabled.value} >click to { disabled.value ? 'active' : 'close' } tooltip function</ElButton>
    </CipTooltip>
  }
}
