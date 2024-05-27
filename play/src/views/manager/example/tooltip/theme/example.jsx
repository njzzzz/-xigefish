import { ElButton } from 'element-plus'
import CipTooltip from '@xigefish/components/cip-tooltip/index'
import './example.less'

export default {
  setup () {
    return () => <>
      <CipTooltip content="Top center" placement="top">
        <ElButton>Dark</ElButton>
      </CipTooltip>
      <CipTooltip content="Bottom center" placement="bottom" effect="light">
        <ElButton>Light</ElButton>
      </CipTooltip>
      <CipTooltip content="Bottom center" effect="customized">
        <ElButton>Customized theme</ElButton>
      </CipTooltip>
    </>
  }
}
