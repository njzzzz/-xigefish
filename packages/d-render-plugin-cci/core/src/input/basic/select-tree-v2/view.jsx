import { formInputViewProps } from '@xigefish/d-render-shared'
import SelectView from '../select/view'
export default {
  props: formInputViewProps,
  setup (props) {
    return () => <SelectView {...props} isTree={true} />
  }
}
