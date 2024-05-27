import { computed } from 'vue'

export const useTitle = (props, inPageLayout, cipMenu) => {
  const titleBridge = computed(() => props.title || cipMenu.lastTitle)
  const withTitleBridge = computed(() => {
    // widthTitle优先级最高
    if (props.withTitle !== undefined) return props.withTitle
    if (props.title) return true
    return !inPageLayout.value
  })
  return {
    titleBridge,
    withTitleBridge
  }
}
