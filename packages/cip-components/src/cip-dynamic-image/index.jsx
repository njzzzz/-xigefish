import { ElImage } from 'element-plus'
import { computed } from 'vue'
// import apiConfig from '@xigefish/request/apiConfig'
import { store } from '@xigefish/request'
import { getValueByTemplate } from '@xigefish/d-render-shared'
import { generateProps } from '@xigefish/shared'
import { componentScheme } from './component.scheme'
export default {
  props: generateProps(componentScheme),
  setup (props) {
    const realSrc = computed(() => {
      return getValueByTemplate(props.src, store.apiConfig)
    })
    return () => <ElImage src={realSrc.value}/>
  }
}
