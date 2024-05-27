import { ElSteps } from 'element-plus'
import { generateProps } from '@xigefish/shared'
import { componentScheme } from './steps.scheme'
import Step from './step'

const Steps = {
  name: 'cip-steps',
  props: generateProps(componentScheme),
  emits: ['update:modelValue'],
  setup (props, { slots }) {
    return () => <ElSteps {...props} class={props.titleUp ? 'title-up' : ''}>
      {slots.default?.()}
    </ElSteps>
  }
}

Steps.Step = Step
export default Steps
