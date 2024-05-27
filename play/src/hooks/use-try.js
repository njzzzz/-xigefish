import { ref } from 'vue'
export const useTry = () => {
  const tryProps = ref({})
  const trySlots = ref({})
  const tryEvents = ref({})
  return {
    tryProps,
    trySlots,
    tryEvents
  }
}
