import { ElButton } from 'element-plus'
import CipTooltip from '@xigefish/components/cip-tooltip/index'

export default {
  setup () {
    return () => <CipTooltip placement="top">
      {{
        default: () => <ElButton>Top center</ElButton>,
        content: () => <>multiple lines<br />second line</>
      }}
    </CipTooltip>
  }
}
