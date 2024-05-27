import { PlList } from '@xigefish/page-layout'
import { provide } from 'vue';
export default {
  setup () {
    provide('cip-config', {
      layout: {
        backPosition: 'title'
      }
    })
    return () => <PlList />
  }
}
