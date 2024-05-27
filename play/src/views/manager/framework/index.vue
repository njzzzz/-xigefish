<template>
  <cip-config-provide
    :search-reset="mainConfig.searchReset"
    :search-grid="0"
    :layout="mainConfig.provideLayout"
    :table="mainConfig.table"
    :number="mainConfig.number"
    :main="mainConfig.main"
  >
    <CipLayoutConfigProvide
      :theme="mainConfig.provideLayout.pageTheme"
      :themes="themes">
    <CipMain
      rootPath="/"
      :nav-menu="menu"
      :privileges="privileges"
      :hide-footer="mainConfig.hideFooter"
      :layout="mainConfig.layout"
      :theme="mainConfig.theme"
      :with-breadcrumb="mainConfig.withBreadcrumb"
      :with-tabs="mainConfig.withTabs"
      :menuEllipsis="true"
      :hide-aside-switch="mainConfig.hideAsideSwitch"
      :collapseRegx="[/form-design/]"
    >
      <template #header-plugin>
        <div class="header-plugin--box">
          <setting-plugin v-model="mainConfig"></setting-plugin>
        </div>
      </template>
      <template #footer>
        <div style="color: #666;height: 100%; display: flex;align-items: center;justify-content: center">Copyright ©2018-2021 CityCloud Corporation, All Rights Reserved</div>
      </template>
    </CipMain>
    </CipLayoutConfigProvide>
  </cip-config-provide>
</template>
<script>
import { defineComponent, ref, watch } from 'vue'
import CipMain from '@xigefish/components/main'
import CipConfigProvide from '@xigefish/components/cip-config-provide'
import CipLayoutConfigProvide from '@xigefish/page-layout/src/layout-config'
import Standard from '@xigefish/page-layout-theme-standard'
import '@xigefish/page-layout-theme-standard/style'
import DG from '@xigefish/page-layout-theme-dg'
import '@xigefish/page-layout-theme-dg/style'
import Supergravity from '@xigefish/page-layout-theme-supergravity'
import '@xigefish/page-layout-theme-supergravity/style'
import { menuService, privilegeService } from '@/api'
import { useCollectPrivileges } from '@xigefish/components/cip-judge-privilege'
import SettingPlugin from './widgets/setting/index.jsx'
import { setElColor } from '@xigefish/utils/color-util'
import { useObjectPersistence } from './widgets/setting/use-persistence'
import { SystemTheme } from './auto-system-theme'
// import '@xigefish/plugins/theme/smart-center.less'

export default defineComponent({
  components: { CipConfigProvide, CipMain, SettingPlugin, CipLayoutConfigProvide },
  props: { size: { type: String, default: 'small' } },
  setup () {
    const configPersistence = useObjectPersistence('state-config')
    const menu = ref([])
    const getMenu = async () => {
      await menuService.getManagerMenu().then(res => {
        menu.value = res.data || []
      })
    }
    const privileges = ref([])
    useCollectPrivileges(privileges)
    const getPrivileges = async () => {
      await privilegeService.list().then(res => {
        privileges.value = (res.data || []).map(v => v.code)
      }).catch(() => {
        privileges.value = []
      })
    }
    getMenu()
    getPrivileges()

    const mainConfig = ref(configPersistence.getValue() ?? {
      systemTheme: 'auto',
      theme: 'standard',
      layout: 'top-left',
      withBreadcrumb: false,
      withTabs: true,
      hideFooter: true,
      hideAsideSwitch: false,
      primaryColor: '#3786FD',
      dangerColor: '#FF4F5C',
      successColor: '#11C372',
      warningColor: '#FDAD43',
      searchReset: true,
      provideLayout: {
        compact: true,
        pageTheme: 'supergravity',
        backPosition: 'title'
      },
      table: { size: 'default', standardSize: 'default' },
      number: { thousandSeparator: ',' }
    })
    watch(mainConfig, (value) => {
      configPersistence.setValue(value)
    }, { deep: true })
    const systemTheme = new SystemTheme()
    watch(() => mainConfig.value.systemTheme, (val) => {
      systemTheme[`${val}Theme`]?.()
      // 暗黑
    }, { immediate: true })
    // 颜色部分修改
    const colorTypeArr = ['primary', 'danger', 'success', 'warning']
    watch([
      () => mainConfig.value.primaryColor,
      () => mainConfig.value.dangerColor,
      () => mainConfig.value.successColor,
      () => mainConfig.value.warningColor
    ], (values) => {
      values.forEach((value, i) => {
        setElColor(colorTypeArr[i], value)
      })
    }, {
      immediate: true
    })
    return {
      mainConfig,
      menu,
      privileges,
      platformName: process.env.VUE_APP_PLATFORM_NAME,
      themes: {
        dg: DG,
        standard: Standard,
        supergravity: Supergravity
      }
      // homeView: { fullPath: '/change-log', name: 'changeLog', title: '更新日志' }
    }
  }
})
</script>
<style>
.header-plugin--box {
  display: flex;
  align-items: center;
  height: 64px;
}
</style>
