import { PlLeftRight } from '@xigefish/page-layout'
import AutoCurd from './index'
import TreeBase from '@/views/manager/example/tree/base'
export default {
  props: {
    layoutTheme: String
  },
  setup (props) {
    return () => <PlLeftRight theme={props.layoutTheme} canBack={true}>
      {{
        left: () => <div style={{ padding: '0 24px' }}>
          <TreeBase />
        </div>,
        default: () =>
          <AutoCurd layoutTheme={props.layoutTheme} title={'测试标题'}/>
      }}
    </PlLeftRight>
  }
}
