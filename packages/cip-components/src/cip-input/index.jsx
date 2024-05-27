import { computed } from 'vue'
import { ElInput } from 'element-plus'
import { getUsingConfig } from '@xigefish/d-render-shared'
import { generateProps, generateEmits } from '@xigefish/shared'
import { componentScheme } from './component.scheme'
export default {
  name: 'CipInput',
  props: generateProps(componentScheme),
  emits: generateEmits(componentScheme),
  setup (props, { emit, slots, attrs }) {
    const placeholder = computed(() => {
      return getUsingConfig(attrs.placeholder, '请输入')
    })
    const rows = computed(() => {
      return getUsingConfig(attrs.rows, 3)
    })
    const modelValue = computed(() => {
      if (typeof props.modelValue === 'object' && props.modelValue !== null) {
        return JSON.stringify(props.modelValue)
      }
      return props.modelValue
    })
    return () => <ElInput
      class={
        [
          'cip-input',
          {
            'cip-input--fix-border': props.fixBorder,
            'cip-input--suffix-border': props.fixBorder && (slots.suffix || props.suffixIcon)
          }
        ]
      }
      modelValue={modelValue.value}
      onUpdate:modelValue={(val) => emit('update:modelValue', val)}
      placeholder={placeholder.value}
      suffixIcon={props.suffixIcon}
      rows={rows.value}
      v-slots={slots}
    />
  }
}
