import tableRadio from './index'
import { formInputViewProps } from '@xigefish/d-render-shared'
export default {
  props: formInputViewProps,
  setup (props) {
    return () => <tableRadio {...props} disabled={true} />
  }
}
