import { PlLeftRight } from '@xigefish/page-layout'
import AutoInfo from './info'
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
          <AutoInfo layoutTheme={props.layoutTheme} title={'测试标题'}/>
      }}
    </PlLeftRight>
  }
}
