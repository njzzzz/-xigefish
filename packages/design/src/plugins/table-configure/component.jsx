import { formConfigFieldConfigList } from './config'
import { CipForm } from '@xigefish/d-render'
export default {
  name: 'DrTableConfig',
  inheritAttrs: false,
  props: {
    schema: Object
  },
  setup (props) {
    return () => <CipForm
      labelPosition={'top'}
      model={props.schema}
      fieldList={formConfigFieldConfigList}
    />
  }
}
