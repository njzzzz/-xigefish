import { ref } from 'vue'
import { ElButton } from 'element-plus'
import CipTooltip from '@xigefish/components/cip-tooltip/index'

export default {
  setup () {
    const visible = ref(false)

    return () => <CipTooltip visible={visible.value}>
      {{
        content: () => <span>Content</span>,
        default: () => <ElButton onMouseenter={() => visible.value = true} onMouseleave={() => visible.value = false}>Hover me</ElButton>
      }}
    </CipTooltip>
  }
}
