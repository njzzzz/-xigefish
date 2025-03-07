import CodeMirrorInput from './index'
import { formInputViewProps } from '@xigefish/d-render-shared'
export default {
  props: formInputViewProps,
  setup (props) {
    return () => <CodeMirrorInput
      {...props}
      readonly={true}
    />
  }
}
