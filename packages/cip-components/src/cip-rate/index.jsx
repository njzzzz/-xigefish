import { ElRate } from 'element-plus'
import { generateProps, generateEmits } from '@xigefish/shared'
import { componentScheme } from './component.scheme'

export default {
  name: 'cip-rate',
  props: generateProps(componentScheme),
  emits: generateEmits(componentScheme),
  setup (props, { emit }) {
    function updateModel (val) {
      emit('update:modelValue', val)
    }
    const handleDblClick = (e) => {
      // UI中双击星星图标，清除当前评分的功能
      if (e.target.tagName.toLowerCase() === 'path') {
        emit('update:modelValue', 0)
      }
    }
    return () => <>
      <ElRate
        class='cip-rate'
        {...props}
        onUpdate:modelValue={(newVal) => { updateModel(newVal) }}
        onDblclick={handleDblClick}
      />
    </>
  }
}
