import { ElStep, ElIcon } from 'element-plus'
import { WarningFilled } from '@element-plus/icons-vue'
import { generateProps } from '@xigefish/shared'
import { componentScheme } from './step.scheme'

export default {
  name: 'cip-step',
  props: generateProps(componentScheme),
  setup (props, { emit, slots }) {
    return () => <>
      {
        props.status !== 'error'
          ? <ElStep {...props}>
              {''}
              {{
                icon: slots.icon?.(),
                title: slots.title?.(),
                description: slots.description?.()
              }}
            </ElStep>
            // error状态的图标根据ui规范特殊处理，带有状态属性时，传入icon会显示异常
          : <ElStep {...props} status="process">
              {{
                icon: () => <ElIcon class="is-error-icon"><WarningFilled/></ElIcon>,
                title: slots.title?.(),
                description: slots.description?.()
              }}
            </ElStep>
      }
    </>
  }
}
