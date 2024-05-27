import { ElDialog } from 'element-plus'
import { computed } from 'vue'
import { getUsingConfig } from '@xigefish/d-render-shared'

const DIALOG_SIZE_CONFIG = {
  mini: '374px',
  small: '568px',
  default: '860px',
  large: '1144px'
}

export default {
  name: 'CipDialog2', // 将api与dialog转换为一致
  inheritAttrs: false,
  props: {
    width: String,
    size: String
  },
  setup (props, { attrs, slots }) {
    const width = computed(() => {
      return getUsingConfig(props.width, DIALOG_SIZE_CONFIG[props.size], DIALOG_SIZE_CONFIG.default)
    })
    return () =>
      <ElDialog
        class={[
          'cip-dialog__wrapper',
          { 'cip-dialog--show-only': attrs.showOnly }
        ]}
        {...attrs}
        width={width.value}
        appendToBody={true}
        v-slots={slots}
      />
  }
}
