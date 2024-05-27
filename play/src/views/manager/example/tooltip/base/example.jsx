import { ElInput, ElIcon } from 'element-plus'
import CipTooltip from '@xigefish/components/cip-tooltip/index'
import { CirclePlus } from '@element-plus/icons-vue'
export default {
  setup () {
    return () => <>
      <div style={{width: '300px', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
        <div>标题</div>
        <ElInput placeholder='请输入' style={{width: '200px'}} />
        <CipTooltip
          effect="dark"
          content="输入的解释说明"
          placement="top"
        >
          {{
            default: () => <ElIcon color='#3786fd' ><CirclePlus /></ElIcon>
          }}
        </CipTooltip>
      </div>
    </>
  }
}
