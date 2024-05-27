import CipMainBreadcrumb from '@xigefish/components/main/cip-main-breadcrumb'
import { ref } from 'vue'
import { mockMenu } from '../mock'

export default {
  name: 'breadcrumb-base',
  setup () {
    const breadcrumbList = ref(mockMenu)
    return () => <CipMainBreadcrumb navMenu={breadcrumbList.value}></CipMainBreadcrumb>
  }
}
