<template>
    <Main :nav-menu="menu" :privileges="privileges" :hide-footer="true" theme="dark" :layout="layout" :with-tabs="true" :home-view="homeView">
      <template #collapse>
      </template>
      <template #expand>
        <span style="margin-left: 8px;">{{platformName}}</span>
      </template>
    </Main>
</template>
<script>
import { defineComponent, ref, provide, watch } from 'vue'
import Main from '@xigefish/components/main'
import { menuService, privilegeService } from '@/api'
import { useSubMenu } from '@xigefish/micro-app/v3/sub'
export default defineComponent({
  components: { Main },
  props: {
    layout: String
  },
  setup () {
    const menu = ref([])
    const getMenu = async () => {
      await menuService.getManagerMenu().then(res => {
        menu.value = res.data || []
      })
    }
    if (window.__MICRO_APP_ENVIRONMENT__) {
      useSubMenu(menu)
      // watch(() => store.state.app.menu, (value, oldValue, onCleanup) => {
      //   menu.value = value || []
      // }, { immediate: true, deep: true })
    } else {
      getMenu()
    }
    watch(menu, (val) => {
      console.log('subApp menu change', val)
    }, { })
    const privileges = ref([])
    provide('ownPrivileges', privileges)
    const getPrivileges = async () => {
      await privilegeService.list().then(res => {
        privileges.value = (res.data || []).map(v => v.code)
      }).catch(() => {
        privileges.value = []
      })
    }
    // const loading = ref(true)

    getPrivileges()
    // Promise.allSettled([getMenu(), getPrivileges()]).then(res => {
    //   loading.value = false
    // })
    return {
      menu,
      privileges,
      platformName: process.env.VUE_APP_PLATFORM_NAME,
      homeView: { fullPath: '/manager', name: 'managerHome', title: '首页' }
    }
  }
})
</script>
