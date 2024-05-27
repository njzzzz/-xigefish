import { computed, h } from 'vue'
import { isObject, isArray } from '@xigefish/d-render-shared'
import { fromInputEmits } from '@xigefish/d-render-shared'
// 异步获取options由上层提供 不支持按条件搜索
export default {
  props: {
    modelValue: [String, Number],
    config: Object,
    tableOptions: Array
  },
  emits: [...fromInputEmits],
  setup (props) {
    const options = computed(() => {
      return props.tableOptions || props.config.options || []
    })
    const optionIsObject = computed(() => {
      return isObject(options.value[0])
    })
    const optionProps = computed(() => {
      return Object.assign({
        label: 'label',
        value: 'value'
      }, props.config?.optionProps)
    })
    const marryOption = (value) => {
      const item = options.value.filter(v => v[optionProps.value.value] === value)[0]
      return item ? item[optionProps.value.label] : ''
    }
    const viewValue = computed(() => {
      if (isArray(props.modelValue)) {
        if (optionIsObject.value) {
          return props.modelValue.map(i => marryOption(i, i)).join(props.config.splitKey || ',')
        } else {
          return props.modelValue.join(props.config.splitKey || ',')
        }
      }
      if (options.value.length !== 0 && optionIsObject.value) {
        marryOption(props.modelValue)
      }
      return props.modelValue
    })
    return () => h('span', {}, [viewValue.value])
  }
}
