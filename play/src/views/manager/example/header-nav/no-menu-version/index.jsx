import AccordionMenu from '@xigefish/components/main'

export default {
  name: 'header-nav-no-menu',
  setup () {
    const platformName = '杭州综合管理考核'
    return () => <AccordionMenu platformName={platformName}></AccordionMenu>
  }
}
