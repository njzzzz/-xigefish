import MavonEditorInput from './index'
import { formInputViewProps } from '@xigefish/d-render-shared'
export default {
  props: formInputViewProps,
  setup (props) {
    return () => <MavonEditorInput
      {...props}
      toolbarsFlag={false}
      subfield={false}
      defaultOpen="preview"
    />
  }
}
