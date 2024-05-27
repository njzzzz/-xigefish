import { PlHandle } from '@xigefish/page-layout'
import { provide } from 'vue';

export default {
  setup () {
    provide('cip-config', {
      layout: {
        backPosition: 'breadcrumb'
      }
    })
    return () => <PlHandle />
  }
}
