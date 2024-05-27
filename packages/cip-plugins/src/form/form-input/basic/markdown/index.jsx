import { useFormInput, useInputProps, formInputProps, fromInputEmits } from '@xigefish/d-render-shared'
import MavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  components: {
    MavonEditor: MavonEditor.mavonEditor
  },
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, context) {
    const { proxyValue, width } = useFormInput(props, context)
    // 注意取出的值为props.config的值
    const MavonEditorProps = useInputProps(props)
    console.log('MavonEditorProps.value===>', MavonEditorProps.value)
    return () => <mavon-editor
      style={{ width: width.value }}
      v-model={proxyValue.value}
      {...MavonEditorProps.value}
    />
  }
}
