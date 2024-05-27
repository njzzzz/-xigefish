import { ElColorPicker } from 'element-plus'
import { setElColor } from '@xigefish/utils/color-util'
export default {
  props: {
    modelValue: String,
    type: {
      type: String,
      default: 'primary',
      validate: (val) => ['primary', 'success', 'warning', 'danger'].includes(val)
    }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const changeColor = (color) => {
      setElColor(props.type, color)
      emit('update:modelValue', color)
    }
    return () =>
      <div class={'header-plugin-color'}>
        <ElColorPicker
          class={'color-picker'}
          popperClass='cip-nav-color'
          modelValue={props.modelValue}
          onUpdate:modelValue={(color) => changeColor(color)}
        />
      </div>
  }
}
