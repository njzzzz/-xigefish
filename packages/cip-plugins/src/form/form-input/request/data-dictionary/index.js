import { computed, watch, defineComponent, onMounted, h, ref } from 'vue'
import { formInputProps, fromInputEmits } from '@xigefish/d-render-shared'
import BasicSelect from '@xigefish/d-render-plugin-cci/esm/input/basic/select'
import BasicCheckBox from '@xigefish/d-render-plugin-cci/esm/input/basic/checkbox'
import BasicRadio from '@xigefish/d-render-plugin-cci/esm/input/basic/radio'
import { dictionaryService } from '@/api'
// 逻辑简化版接口select
export default defineComponent({
  name: 'BasicDataDictionary',
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, context) {
    const inputRef = ref()
    onMounted(() => {
      watch(() => props.config.dictionaryCode, () => {
        inputRef.value?.getOptions()
      })
    })

    const asyncOptions = async () => {
      if (!props.config.dictionaryCode) return []
      const { data } = await dictionaryService.list({ dictionaryCode: props.config.dictionaryCode })
      return data || []
    }
    const rewriteConfig = computed(() => {
      const originConfig = props.config
      originConfig.asyncOptions = asyncOptions
      return originConfig
    })
    const getComponentByViewType = (viewType = 'select') => {
      switch (viewType) {
        case 'radio': return BasicRadio
        case 'checkbox': return BasicCheckBox
        default: return BasicSelect
      }
    }
    return () => h(getComponentByViewType(props.config.viewType), {
      ref: inputRef,
      ...props,
      'onStreamUpdate:model': (val) => context.emit('streamUpdate:model', val),
      config: rewriteConfig.value
    })
  }
})
