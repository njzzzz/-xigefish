
import { ElInputNumber } from 'element-plus'
import { computed, h } from 'vue'
import { generateProps, generateEmits } from '@xigefish/shared'
import { componentScheme } from './component.scheme'
export default {
  props: generateProps(componentScheme),
  emits: generateEmits(componentScheme),
  setup (props, { emit }) {
    // props unit
    const hasUnit = computed(() => {
      return !!props.unit
    })
    const controls = computed(() => {
      if (hasUnit.value) return false
      return props.controls ?? true
    })
    const controlsPosition = computed(() => {
      if (hasUnit.value) return ''
      return props.controlsPosition ?? ''
    })
    const precision = computed(() => {
      return !props.noPrecision ? (props.precision ?? 0) : undefined
    })
    return () => h(ElInputNumber, {
      class: {
        'cip-number': true,
        'cip-number--left': true,
        'cip-number--unit': !!hasUnit.value,
        'cip-number--no-controls': !controls.value,
        'cip-number--standard': controlsPosition.value !== 'right' && !hasUnit.value
      },
      modelValue: props.modelValue, // .value,
      'onUpdate:modelValue': val => { emit('update:modelValue', val) },
      step: props.step ?? 1,
      'step-strictly': props.stepStrictly ?? false,
      min: props.min ?? -Infinity,
      max: props.max ?? Infinity,
      placeholder: props.placeholder ?? '',
      precision: precision.value,
      controls: controls.value,
      disabled: props.disabled,
      'controls-position': controlsPosition.value,
      'data-unit': props.unit // 此处利用 content: attr(data-unit);注入数据
    })
  }
}
