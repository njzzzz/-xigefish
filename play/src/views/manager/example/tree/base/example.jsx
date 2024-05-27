import { basicOptions } from './config.js'
import CipTree from '@xigefish/components/cip-tree'
import './index.less'
export default {
  setup () {
    return () => <CipTree
      config={{ highlightCurrent: true }}
      options={basicOptions}
      showButton={false}
    />
  }
}
