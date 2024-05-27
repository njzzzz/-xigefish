<template>
  <CipConfigProvide :file-upload="upload" :quirks="true">
    <el-config-provider :locale="zhCn">
      <router-view/>
    </el-config-provider>
  </CipConfigProvide>
</template>
<script>
// el中文配置
import { ElConfigProvider } from 'element-plus'
import zhCn from './zh-cn'
import store from '@xigefish/components/store'
import CipConfigProvide from '@xigefish/components/cip-config-provide'
export default {
  components: { ElConfigProvider, CipConfigProvide },
  setup () {
    store.dispatch('setApp', { config: { searchGrid: 6 } })
    const upload = (opt) => {
      console.log(opt)
    }
    return {
      zhCn,
      upload
    }
  }
}
</script>
