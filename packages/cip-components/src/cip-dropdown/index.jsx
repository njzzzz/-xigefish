import { ElDropdown, ElIcon } from 'element-plus'
import { CaretBottom } from '@element-plus/icons-vue'
export default {
  name: 'CipDropdown',
  setup (props, { attrs, slots }) {
    return () => <ElDropdown>
      {{
        default: () => <div class={'cip-dropdown__title'}>
          {slots.default?.()}
          {!attrs.disabled && <ElIcon class={'cip-dropdown__icon'}>
            <CaretBottom />
          </ElIcon>}
        </div>,
        dropdown: () => slots.dropdown?.()
      }}
    </ElDropdown>
  }
}
