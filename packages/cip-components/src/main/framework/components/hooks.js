import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { getUsingConfig, isEmpty } from '@xigefish/d-render-shared'

export const useCollapse = (props) => {
  const localCollapse = localStorage.getItem('isCollapse')
  const isCollapse = ref(localCollapse ? JSON.parse(localCollapse) : undefined)
  const toggleCollapse = () => {
    isCollapse.value = !collapse.value
    localStorage.setItem('isCollapse', isCollapse.value)
    window.removeEventListener('resize', autoAdaptation)
  }
  const autoCollapse = ref(false)
  const collapse = computed(() => {
    return getUsingConfig(props.forceCollapse, isCollapse.value ?? autoCollapse.value)
  })
  const autoAdaptation = () => {
    if (window.innerWidth <= 1400) {
      autoCollapse.value = true
    } else {
      autoCollapse.value = false
    }
  }
  onMounted(() => {
    if (isEmpty(isCollapse.value)) {
      autoAdaptation()
      window.addEventListener('resize', autoAdaptation)
    }
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', autoAdaptation)
  })
  return {
    collapse,
    toggleCollapse
  }
}

export const useAsideSwitch = (props) => {
  const asideSwitchBridge = computed(() => {
    if (props.forceCollapse) return false
    return !props.hideAsideSwitch
  })
  return { asideSwitchBridge }
}

export const useContentScroll = () => {
  const content$ = ref()
  const setScrollTop = (scrollTop) => {
    if (content$.value) content$.value.scrollTop = scrollTop
  }
  return {
    content$,
    setScrollTop
  }
}
