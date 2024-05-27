import { computed, inject } from 'vue'
import { isNotEmpty } from '@xigefish/d-render-shared'
export const useCanBack = (props, inPageLayout) => {
  const cipMenu = inject('cipMenu', { })
  return computed(() => {
    if (isNotEmpty(props.canBack)) return props.canBack
    if (inPageLayout?.value) return false
    return cipMenu.canBack
  })
}
