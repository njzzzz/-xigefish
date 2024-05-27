import CipPageLayoutListDemo from './index'
import { PlInfo } from '@xigefish/page-layout'
export default {
  props: {
    layoutTheme: {}
  },
  setup (props) {
    return () => <PlInfo theme={props.layoutTheme}>
      <div>一些提示</div>
      <CipPageLayoutListDemo layoutTheme={props.layoutTheme}></CipPageLayoutListDemo>
    </PlInfo>
  }
}
