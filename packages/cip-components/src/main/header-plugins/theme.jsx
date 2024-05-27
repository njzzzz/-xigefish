import CipDropdown from '../../cip-dropdown'
import { ElDropdownItem, ElDropdownMenu } from 'element-plus'
export default {
  props: { modelValue: String },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const layoutOptions = ['standard', 'dark', 'light', 'data-center', 'smart-center']
    const handlerCommand = (val) => {
      emit('update:modelValue', val)
    }
    return () => <CipDropdown style={'height: 100%'} onCommand={(val) => handlerCommand(val)}>
      {{
        default: () => <span title={'主题'}>{props.modelValue}</span>,
        dropdown: () => <ElDropdownMenu >
          {layoutOptions.map(option => <ElDropdownItem key={option} command={option}>{option}</ElDropdownItem>)}
        </ElDropdownMenu>
      }}
    </CipDropdown>
  }
}
