import CipMainBreadcrumb from '@xigefish/components/main/cip-main-breadcrumb'
import { ref } from 'vue'
import { mockMenu } from '../mock'

export default {
  name: 'breadcrumb-base',
  setup () {
    const breadcrumbList = ref(mockMenu)
    return () => <div style="display: flex;">
      <CipMainBreadcrumb canBack={true} navMenu={breadcrumbList.value}></CipMainBreadcrumb>
    </div>
  }
}
