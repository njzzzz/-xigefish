import { onMounted, ref, watch, markRaw, computed } from 'vue'
import MuiPlayer from 'mui-player'
import 'mui-player/dist/mui-player.min.css'
import { getValueByTemplate } from '@xigefish/d-render-shared'
// import apiConfig from '@xigefish/request/apiConfig'
import { store } from '@xigefish/request'
export default {
  props: {
    height: {},
    autoplay: Boolean,
    src: {},
    preload: String // ['none','auto']
  },
  setup (props) {
    const videoRef = ref()
    const instance = ref()
    const _src = computed(() => {
      return getValueByTemplate(props.src, store.apiConfig)
    })
    const isPlay = ref(false)
    const play = () => {
      instance.value.video().play()
      isPlay.value = true
    }

    onMounted(() => {
      if (!props.preload || props.preload === 'auto') isPlay.value = true
      instance.value = markRaw(new MuiPlayer({
        container: videoRef.value,
        src: _src.value,
        height: props.height || '750px',
        autoplay: props.autoplay,
        pageHead: false,
        preload: props.preload,
        customSetting: {
          show: false
        }
      }))
    })
    watch(_src, (val) => {
      if (instance.value) {
        instance.value.reloadUrl(val)
      }
    })
    return () => <div class={'cip-dynamic-video__container'} >
      {!isPlay.value && <div class={'cip-dynamic-video__mask'}>
        <div class={'cip-dynamic-video__play'} onClick={() => play()}>
          <svg width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" fill="white" fill-opacity="0.01"/>
            <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" fill="" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/>
            <path d="M20 24V17.0718L26 20.5359L32 24L26 27.4641L20 30.9282V24Z" fill="currentColor" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>}
      <div ref={videoRef}></div>
    </div>
  }
}
