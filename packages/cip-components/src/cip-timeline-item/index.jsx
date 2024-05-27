import { generateProps, generateEmits } from '@xigefish/shared'
import { componentScheme } from './component.scheme'
import { computed, h, inject } from 'vue'
import { ElIcon } from 'element-plus'
import * as Icons from '@element-plus/icons-vue'
export default {
  name: 'CipTimelineItem',
  props: generateProps(componentScheme),
  emits: generateEmits(componentScheme),
  setup (props, { slots }) {
    const mode = inject('cip-timeline-mode', {})
    const positionClass = mode === 'right' ? 'right' : ''
    const isHollow = computed(() => {
      return props.hollow ? 'node-dot' : 'node'
    })
    const colorStyle = { '--bgColor': props.color }
    const currentIcon = computed(() => {
      if (!props.icon) return
      return Icons[props.icon]
    })
    return () =>
      <li class={['cip-timeline-item', positionClass]}>
        <div class="cip-timeline-item__tail"></div>
        {props.icon && <ElIcon color={props.color}>
          {h(currentIcon.value)}
        </ElIcon>}
        {!props.icon && <div class={[
          'cip-timeline-item__node',
          'cip-timeline-item__node--normal',
          isHollow.value]} style={colorStyle}></div>
        }
        <div class="cip-timeline-item__wrapper">
          <div class="cip-timeline-item__title">{props.title}</div>
          <div class="cip-timeline-item__timestamp">{props.timestamp}</div>
          <div class="cip-timeline-item__desc">{slots.default?.()}</div>
        </div>
      </li>
  }
}
