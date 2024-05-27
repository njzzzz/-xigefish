import { ref } from 'vue'
import AccordionMenu from '@xigefish/components/main/index'
import { mockMenu } from './mock'

export default {
  name: 'accordion-menu-base',
  setup () {
    const navMenu = ref(mockMenu)
    return () => <AccordionMenu navMenu={navMenu.value}></AccordionMenu>
  }
}
