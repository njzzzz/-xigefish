import CipCodeMirror from '@xigefish/code-mirror'
import { isJson } from '@xigefish/d-render-shared'
export default {
  inheritAttrs: false,
  props: {
    schema: {}
  },
  emits: ['update:schema'],
  setup (props, { emit }) {
    return () => <CipCodeMirror
      height={'100%'}
      modelValue={JSON.stringify(props.schema, null, 2)}
      onUpdate:modelValue={(v) => {
        if (isJson(v)) emit('update:schema', JSON.parse(v))
      }}
    />
  }
}
