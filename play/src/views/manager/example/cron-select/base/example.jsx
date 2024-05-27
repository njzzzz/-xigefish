import { ref } from 'vue'
import CipCronSelect from '@xigefish/components/cip-cron-select'
export default {
  setup () {
    const cron = ref('')
    return () => <CipCronSelect v-model={cron.value}></CipCronSelect>
  }
}
