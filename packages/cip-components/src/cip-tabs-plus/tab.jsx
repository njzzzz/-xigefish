import { ElTabPane } from 'element-plus'
import { generateProps } from '@xigefish/shared'
import { componentScheme } from './tab.scheme'

export default {
  name: 'CipTabPane',
  props: generateProps(componentScheme),
  setup (props, { emit, slots }) {
    return () => <ElTabPane {...props}>
      {{
        default: slots.default?.(),
        label: slots.label?.()
      }}
    </ElTabPane>
  }
}
