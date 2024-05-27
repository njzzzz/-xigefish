import CipSvgIcon from '../../cip-svg-icon'
import { ElIcon } from 'element-plus'
import { isObject } from '@xigefish/d-render-shared'
import DOMPurify from 'dompurify'
const domPurifyOptions = {
  ADD_TAGS: ['use'],
  ADD_ATTR: ['xlink:href'],
  USE_PROFILES: { mathMl: true, svg: true, svgFilters: true }
}
const CipMainIcon = (props) => {
  let name = props.name
  if (name) {
    if (typeof name === 'string') {
      if (name.indexOf('_') === 0) {
        name = name.substr(1)
        return <CipSvgIcon name={name}/>
      } else if (name.indexOf('<') === 0) {
        const htmlStr = DOMPurify.sanitize(name, domPurifyOptions)
        return <ElIcon class={'cip-menu-icon'} v-html={htmlStr}></ElIcon>
      } else {
        return <i class={name} /> // h('i', { class: iconName })
      }
    } else if (isObject(name) && name.render) {
      return name.render()
    }
  } else {
    return undefined
  }
}

CipMainIcon.props = {
  name: [String, Object]
}

export default CipMainIcon
