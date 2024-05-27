import { ref, markRaw, onMounted } from 'vue'
import { start, initGlobalState } from 'qiankun'
import { useMain } from '@xigefish/hooks/use-main'
// 依赖乾坤(蚂蚁开源)
export default {
  setup () {
    const { setCurrentTitle } = useMain()
    console.log('subapp start')
    const actions = ref()
    onMounted(() => {
      if (!window.qiankunStarted) {
        window.qiankunStarted = true
        const state = { setCurrentTitle }
        actions.value = markRaw(initGlobalState(state))
        actions.value.onGlobalStateChange((state, prevState) => {
          console.log(state, prevState)
        })
        actions.value.setGlobalState(state)
        start()
      }
    })

    return () => <div id={'subapp-viewport'}>
    </div>
  }
}
