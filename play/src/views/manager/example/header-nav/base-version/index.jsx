import { ref } from 'vue'
import AccordionMenu from '@xigefish/components/main'
import { mockMenu } from '../mock'

export default {
  name: 'header-nav-base',
  setup () {
    const platformName = '杭州综合管理考核'
    const navMenu = ref(mockMenu)
    const expandSlot = () => <>
      <img src={require('../images/logo.png')} alt="logo" />
      <span>{platformName}</span>
    </>
    return () => <AccordionMenu layout={'top'} platformName={platformName} navMenu={navMenu.value} v-slots={{ expand: expandSlot }}></AccordionMenu>
  }
}
