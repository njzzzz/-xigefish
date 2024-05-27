import { ref } from 'vue'
import CipRate from '@xigefish/components/cip-rate'

export default {
  setup () {
    const rate = ref(0)
    const sizes = ['small', 'default', 'large']
    return () => (
      <>
        {sizes.map(size => <div key={size}><CipRate v-model={rate.value} size={size}/></div>)}
      </>
    )
  }
}
