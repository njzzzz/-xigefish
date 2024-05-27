import { computed } from 'vue'
import { generateProps } from '@xigefish/shared'
import { componentScheme } from './component.scheme'

export default {
  name: 'CipSvgIcon',
  props: generateProps(componentScheme),
  setup (props) {
    const className = computed(() => {
      return `#icon-${props.name}`
    })
    return () => <svg class={['cip-svg-icon']} aria-hidden={'true'}>
      <use xlinkHref={className.value}></use>
    </svg>
  }
}
