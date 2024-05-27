import CipDropdown from '../../cip-dropdown'
import { ElDropdownItem, ElDropdownMenu } from 'element-plus'
const layoutOptions = ['left', 'left-2', 'top', 'top-left']
export default {
  props: {
    modelValue: String,
    options: {
      type: Array,
      default: () => layoutOptions
    }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const handlerCommand = (val) => {
      emit('update:modelValue', val)
    }
    return () => <CipDropdown style={'height: 100%'} onCommand={(val) => handlerCommand(val)} popperClass='cip-nav-layout'>
      {{
        default: () => <span title={'布局'}>{props.modelValue}</span>,
        dropdown: () => <ElDropdownMenu >
          {props.options.map(option => <ElDropdownItem key={option} command={option}>{option}</ElDropdownItem>)}
        </ElDropdownMenu>
      }}
    </CipDropdown>
  }
}
