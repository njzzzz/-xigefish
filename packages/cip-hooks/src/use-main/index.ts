import { inject } from 'vue'
import { useRouter } from 'vue-router'
export const useMain = () => {
  const router = useRouter()
  const setCurrentTitle = inject('setCurrentTitle', (title) => {
    window.setCurrentTitle?.(title)
    console.error('祖先组件中未存在Main')
  })
  const setTitle = inject('setTitle', (fullPath, name, title) => { console.error('祖先组件中未存在Main') })
  const closeTab = inject('closeTab', () => {
    console.error('祖先组件中未存在Main')
    router.back()
  })
  const pathChange = inject('pathChange', (data) => { console.error('祖先组件中未存在Main') })
  const setChangeSign = inject('setChangeSign', () => { console.error('祖先组件中未存在Main') })
  const setFrameHide = inject('setFrameHide', (isHide) => { console.error('祖先组件中未存在Main') })
  return {
    setCurrentTitle,
    setChangeSign,
    setTitle,
    setFrameHide,
    closeTab,
    pathChange
  }
}
