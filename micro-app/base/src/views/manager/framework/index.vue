<template>
    <Main
      v-if="ready"
      :nav-menu="menu"
      :privileges="privileges"
      :hide-footer="true"
      theme="supergravity"
      :layout="layout"
      :with-tabs="true"
      rootPath="/manager"
    >
      <template #collapse>
      </template>
      <template #expand>
        <span style="margin-left: 8px;">{{platformName}}</span>
      </template>
    </Main>
</template>
<script>
import { defineComponent, ref, provide, toRaw } from 'vue'
import Main from '@xigefish/components/main'
import { menuService, privilegeService } from '@/api'
import { store as microState, useBaseMenu } from '@xigefish/micro-app/v3/base'
export default defineComponent({
  components: { Main },
  props: {
    layout: String
  },
  setup () {
    const menu = ref([])
    const ready = ref(false)
    const getMenu = async () => {
      await menuService.getManagerMenu().then(res => {
        menu.value = res.data || []
        console.log('microState', microState)
        console.log('store', menu.value)
        microState.dispatch('setApp', { ...microState.state.app, menu: toRaw(menu) })
        ready.value = true
        // microState.menu = toRaw(menu)
        // console.log(store.state)
      })
    }
    const privileges = ref([])
    provide('ownPrivileges', privileges)
    const getPrivileges = async () => {
      await privilegeService.list().then(res => {
        privileges.value = (res.data || []).map(v => v.code)
      }).catch(() => {
        privileges.value = []
      })
    }

    getMenu()
    useBaseMenu(menu)
    getPrivileges()
    // Promise.allSettled([getMenu(), getPrivileges()]).then(res => {
    //   loading.value = false
    // })
    return {
      menu,
      ready,
      privileges,
      platformName: process.env.VUE_APP_PLATFORM_NAME
    }
  }
})
</script>
