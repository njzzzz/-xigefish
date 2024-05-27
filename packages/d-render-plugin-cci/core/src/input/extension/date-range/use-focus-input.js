import { ref } from 'vue'

export const useFocusInput = () => {
  const isFocus = ref(false)
  const onFocus = (e) => {
    isFocus.value = true
  }
  const onBlur = (e) => {
    isFocus.value = false
  }
  return [isFocus, onFocus, onBlur]
}
