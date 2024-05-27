import { ref } from 'vue'
import AccordionMenu from '@xigefish/components/main'
import CipDropdown from '@xigefish/components/cip-dropdown'
import { ElDropdownMenu, ElDropdownItem, ElBadge } from 'element-plus'
import { mockMenu } from '../mock'

export default {
  name: 'header-nav-plugins',
  setup () {
    const platformName = '杭州综合管理考核'
    const navMenu = ref(mockMenu)
    const expandSlot = () => <>
      <img src={require('../images/logo.png')} alt="logo" />
      <span>{platformName}</span>
    </>
    const headerPluginsSlot = () => <span className={'example__header-bar__plugins'}>
      <i className="el-icon-edit"></i>
      <i className="el-icon-share"></i>
      <i className="el-icon-chat-line-square"></i>
      <ElBadge value="4"><i className="el-icon-bell"></i></ElBadge>
    </span>
    const dropdownSlot = () => <ElDropdownMenu><ElDropdownItem>退出</ElDropdownItem></ElDropdownMenu>
    const headerUserSlot = () => <CipDropdown v-slots={{ dropdown: dropdownSlot }}><span className="account-name">情报系统运维</span></CipDropdown>
    return () => <AccordionMenu layout={'top'} platformName={platformName} navMenu={navMenu.value} v-slots={{
      expand: expandSlot,
      'header-plugin': headerPluginsSlot,
      'header-user': headerUserSlot
    }}> < /AccordionMenu>
  }
}
// var(--el-font-size-base)
