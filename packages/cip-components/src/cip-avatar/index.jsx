import { ElAvatar } from 'element-plus'
import { generateProps, generateEmits } from '@xigefish/shared'
import { componentScheme } from './component.scheme'
import { DefaultAvatar } from './icons-vue'

export default {
  name: 'CipAvatar',
  props: generateProps(componentScheme),
  emits: generateEmits(componentScheme),
  setup (props, { slots }) {
    const getDefaultIcon = () => {
      if (props.icon) return props.icon
      if (slots.default) return
      return <DefaultAvatar />
    }
    return () => (
      <ElAvatar
        style="--el-avatar-icon-size: var(--el-avatar-size); --ep-avatar-icon-size: var(--ep-avatar-size)"
        {...props}
        icon={getDefaultIcon()}
      >
        {{
          default: () => slots.default?.()
        }}
      </ElAvatar>
    )
  }
}
