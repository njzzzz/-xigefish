import { ref } from 'vue'
import AccordionMenu from '@xigefish/components/main'
import { mockMenu } from './mock'

export default {
  name: 'accordion-menu-no-icons',
  setup () {
    const navMenu = ref(mockMenu)
    const hideAsideSwitch = ref(true)
    return () => <AccordionMenu navMenu={navMenu.value} hideAsideSwitch={hideAsideSwitch.value}></AccordionMenu>
  }
}
