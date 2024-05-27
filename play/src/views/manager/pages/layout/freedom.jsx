import Freedom from '@xigefish/page-layout-theme-dg/esm/freedom'
import '@xigefish/page-layout-theme-dg/src/styles/index.less'
import { provide } from 'vue';

export default {
  setup () {
    provide('cip-config', {
      layout: {
        backPosition: 'breadcrumb'
      }
    })
    return () => <Freedom>11111</Freedom>
  }
}
