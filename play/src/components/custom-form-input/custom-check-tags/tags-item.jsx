import { ElCheckTag } from 'element-plus'
import { ref } from 'vue'
export default {
  props: {
    modelValue: {},
    label: {}
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const isChecked = ref(props.modelValue)
    const handleChange = (val) => {
      isChecked.value = val
      emit('update:modelValue', val)
    }
    return () => <ElCheckTag
      checked={isChecked.value}
      onChange={(val) => handleChange(val)}
      class="cip-check-tags-group__item">{props.label}
    </ElCheckTag>
  }
}
