import { computed, ref } from 'vue'
import { ElAutocomplete, ElIcon } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { getUsingConfig } from '@xigefish/d-render-shared'
import { generateProps, generateEmits } from '@xigefish/shared'
import { componentScheme } from './component.scheme'
export default {
  name: 'CipAutocomplete',
  inheritAttrs: false,
  props: generateProps(componentScheme),
  emits: generateEmits(componentScheme),
  setup (props, { slots, attrs, expose }) {
    const autocompleteRef = ref()
    const inputRef = ref()
    const suffixIcon = () => <ElIcon >
      <Search/>
    </ElIcon>
    const placeholder = computed(() => {
      return getUsingConfig(attrs.placeholder, '搜索')
    })
    const width = computed(() => typeof props.width === 'string' ? props.width : `${props.width}px`)

    expose({
      autocompleteRef,
      inputRef
    })
    return () => <ElAutocomplete
      {...attrs}
      modelValue={props.modelValue}
      placeholder={placeholder.value}
      style={{ width: width.value }}
      ref={($el) => { autocompleteRef.value = $el; inputRef.value = $el }}>
      {{
        suffix: suffixIcon,
        prefix: slots.prefix,
        prepend: slots.prepend,
        default: slots.default
      }}
    </ElAutocomplete>
  }
}
