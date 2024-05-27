import { ElButton } from 'element-plus'
import CipTooltip from '@xigefish/components/cip-tooltip/index'
import './example.less'

export default {
  setup () {
    return () => <div class="tooltip-base-box">
      <div class="row center">
        <CipTooltip
          class="box-item"
          effect="dark"
          content="Top Left prompts info"
          placement="top-start"
        >
          <ElButton>top-start</ElButton>
        </CipTooltip>
        <CipTooltip
          class="box-item"
          effect="dark"
          content="Top Center prompts info"
          placement="top"
        >
          <ElButton>top</ElButton>
        </CipTooltip>
        <CipTooltip
          class="box-item"
          effect="dark"
          content="Top Right prompts info"
          placement="top-end"
        >
          <ElButton>top-end</ElButton>
        </CipTooltip>
      </div>
      <div class="row">
        <CipTooltip
          class="box-item"
          effect="dark"
          content="Left Top prompts info"
          placement="left-start"
        >
          <ElButton>left-start</ElButton>
        </CipTooltip>
        <CipTooltip
          class="box-item"
          effect="dark"
          content="Right Top prompts info"
          placement="right-start"
        >
          <ElButton>right-start</ElButton>
        </CipTooltip>
      </div>
      <div class="row">
        <CipTooltip
          class="box-item"
          effect="dark"
          content="Left Center prompts info"
          placement="left"
        >
          <ElButton class="mt-3 mb-3">left</ElButton>
        </CipTooltip>
        <CipTooltip
          class="box-item"
          effect="dark"
          content="Right Center prompts info"
          placement="right"
        >
          <ElButton>right</ElButton>
        </CipTooltip>
      </div>
      <div class="row">
        <CipTooltip
          class="box-item"
          effect="dark"
          content="Left Bottom prompts info"
          placement="left-end"
        >
          <ElButton>left-end</ElButton>
        </CipTooltip>
        <CipTooltip
          class="box-item"
          effect="dark"
          content="Right Bottom prompts info"
          placement="right-end"
        >
          <ElButton>right-end</ElButton>
        </CipTooltip>
      </div>
      <div class="row center">
        <CipTooltip
          class="box-item"
          effect="dark"
          content="Bottom Left prompts info"
          placement="bottom-start"
        >
          <ElButton>bottom-start</ElButton>
        </CipTooltip>
        <CipTooltip
          class="box-item"
          effect="dark"
          content="Bottom Center prompts info"
          placement="bottom"
        >
          <ElButton>bottom</ElButton>
        </CipTooltip>
        <CipTooltip
          class="box-item"
          effect="dark"
          content="Bottom Right prompts info"
          placement="bottom-end"
        >
          <ElButton>bottom-end</ElButton>
        </CipTooltip>
      </div>
    </div>
  }
}
