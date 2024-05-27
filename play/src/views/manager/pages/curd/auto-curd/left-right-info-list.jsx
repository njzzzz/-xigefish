import { PlLeftRight } from '@xigefish/page-layout'
import AutoInfoList from './info-list'
import TreeBase from '@/views/manager/example/tree/base'
export default {
  props: {
    layoutTheme: String
  },
  setup (props) {
    return () => <PlLeftRight theme={props.layoutTheme}>
      {{
        left: () => <div style={{ padding: '0 24px' }}>
          <TreeBase />
        </div>,
        default: () =>
          <AutoInfoList layoutTheme={props.layoutTheme} title={'测试标题'}/>
      }}
    </PlLeftRight>
  }
}
