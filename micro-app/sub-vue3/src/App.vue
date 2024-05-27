<template>
  <cip-config-provide :search-grid="true" :search-reset="true" :layout="{pageTheme: 'dg'}">
    <PlConfigProvide :theme="theme" :themes="themes">
      <el-config-provider :locale="zhCn">
        <router-view/>
      </el-config-provider>
    </PlConfigProvide>
  </cip-config-provide>
</template>
<script>
import { ref } from 'vue'
import CipConfigProvide from '@xigefish/components/cip-config-provide'
import { PlConfigProvide } from '@xigefish/page-layout'
// el中文配置
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import ThemeStandard from '@xigefish/page-layout-theme-standard'
import '@xigefish/page-layout-theme-standard/dist/index.css'
import ThemeSupergravity from '@xigefish/page-layout-theme-supergravity'
import '@xigefish/page-layout-theme-supergravity/dist/index.css'
export default {
  components: { CipConfigProvide, ElConfigProvider, PlConfigProvide },
  setup () {
    const theme = ref('supergravity')
    const themes = {
      standard: ThemeStandard,
      supergravity:  ThemeSupergravity
    }
    console.log(theme)
    return {
      theme,
      themes,
      zhCn
    }
  }
}
</script>
