import { computed, h } from 'vue'
import { useOptions, formInputViewProps } from '@xigefish/d-render-shared'
import { dictionaryService } from '@/api'
// 不获取数据
export default {
  props: formInputViewProps,
  setup (props) {
    const multiple = computed(() => {
      return props.config?.multiple ?? false
    })
    const asyncOptions = async () => {
      if (!props.config.dictionaryCode) return []
      const { data } = await dictionaryService.list({ dictionaryCode: props.config.dictionaryCode })
      return data || []
    }
    props.config.asyncOptions = asyncOptions
    const { getOtherValue, getValue } = useOptions(props, multiple)
    const viewValue = computed(() => {
      const value = getValue(props.modelValue)
      return getOtherValue(props.modelValue, value)
    })

    return () => h('span', {}, [viewValue.value])
  }
}
