import { ElTooltip } from 'element-plus'
export default {
  setup (props, { slots }) {
    return () => <ElTooltip popperClass='cip-tooltip'>
      {{
        default: () => slots.default?.(),
        content: () => slots.content?.()
      }}
    </ElTooltip>
  }
}
