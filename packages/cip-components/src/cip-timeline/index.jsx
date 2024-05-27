import { provide } from 'vue'
import { generateProps, generateEmits } from '@xigefish/shared'
import { componentScheme } from './component.scheme'
export default {
  name: 'CipTimeline',
  props: generateProps(componentScheme),
  emits: generateEmits(componentScheme),
  setup (props, { slots }) {
    provide('cip-timeline-mode', props.mode)
    return () =>
      <ul class="cip-timeline">
        {slots.default?.()}
      </ul>
  }
}
