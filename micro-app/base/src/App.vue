<template>
  <cip-config-provide :search-grid="true" :search-reset="true">
    <el-config-provider :locale="zhCn">
      <router-view/>
    </el-config-provider>
  </cip-config-provide>
</template>
<script>
import CipConfigProvide from '@xigefish/components/cip-config-provide'
// el中文配置
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
export default {
  components: { CipConfigProvide, ElConfigProvider },
  setup () {
    return {
      zhCn
    }
  }
}
</script>
