import { computed } from 'vue'
export default {
  name: 'checkTags',
  props: {
    modelValue: {},
    label: {},
    number: {},
    value: {},
    hideNumber: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue', 'change'],
  setup (props, context) {
    const handleClick = () => {
      isActive.value = !isActive.value
    }
    const isActive = computed({
      get: () => props.modelValue,
      set: (val) => {
        context.emit('update:modelValue', val, { label: props.label, value: props.value })
      }
    })
    return () => <div class={['cip-check-tags-wrapper', isActive.value ? 'is-checked' : '']} onClick={handleClick}>
      <span>{props.label}</span>{!props.hideNumber && <span>({props.number})</span>}
    </div>
  }
}
