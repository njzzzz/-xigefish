import { useMain } from '@xigefish/hooks/use-main'
import { computed, onMounted } from 'vue'
import { isObject } from '@xigefish/d-render-shared'
import { useRouter } from 'vue-router'
export default {
  props: {
    subPath: String,
    baseUrl: String,
    query: Object
  },
  setup (props) {
    const { setCurrentTitle } = useMain()
    const router = useRouter()
    const src = computed(() => {
      return `${props.baseUrl}/${props.subPath}?`
    })
    onMounted(() => {
      window.addEventListener('message', (e) => {
        const { data } = e
        if (isObject(data)) {
          let { type, fullPath } = data
          if (type === 'changeUrl') {
            fullPath = decodeURI(fullPath.substr(1))
            if (fullPath !== props.subPath) {
              console.log(fullPath)
              router.push({ params: { subPath: fullPath } })
            }
          }
        }
      })
    })
    return () => <iframe class={'cip-iframe-container'} frameBorder={0} src={src.value}></iframe>
  }
}
