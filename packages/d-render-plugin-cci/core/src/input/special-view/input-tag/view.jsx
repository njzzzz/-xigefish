import { computed } from 'vue'
import { ElTag } from 'element-plus'
import { formInputViewProps } from '@xigefish/d-render-shared'
import { getValueByTemplate, isObject } from '@xigefish/d-render-shared'

export default {
  props: formInputViewProps,
  inheritAttrs: false,
  setup (props) {
    const innerValue = computed(() => {
      return [].concat(props.modelValue)
    })
    return () => <div class={'cip-input-tag--view'}>
      {
        innerValue.value.map(v => <ElTag class='border-no'>
          {{
            default: () => {
              const valueTemplate = props.config.valueTemplate
              if (props.config.valueTemplate && isObject(v)) {
                return getValueByTemplate(valueTemplate, v)
              } else {
                return v
              }
            }
          }}
        </ElTag>)
      }
    </div>
  }
}
