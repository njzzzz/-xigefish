<template>
  <header class="header-bar">
      <slot name="header-plugin"></slot>
      <slot name="header-user">
        <div class="header-user">
          <cip-dropdown @command="handleCommand" :disabled="!($slots.dropdown || $slots['pre-dropdown'] || dropdownLogout)">
            <cip-avatar size="small"/>
            <span class="account-name">{{accountInfo.userName}} </span>
            <template #dropdown>
              <el-dropdown-menu>
                <slot name="pre-dropdown"></slot>
                <slot name="dropdown" />
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </cip-dropdown>
          <span v-if="!dropdownLogout" class="header-bar__logout" @click="()=>handleCommand('logout')">退出</span>
        </div>
      </slot>
  </header>
</template>
<script>

import { ElDropdownMenu, ElDropdownItem } from 'element-plus'
import CipDropdown from '../../cip-dropdown'
import CipAvatar from '../../cip-avatar'
import { computed } from 'vue'
import { Token } from '@/lib/token'
import { useRouter } from 'vue-router'
// import { accountService } from '@/api'
import store from '../../store'
import { useCipConfig } from '../../hooks/use-cip-config'

export default {
  name: 'CipHeaderBar',
  components: {
    CipDropdown, CipAvatar, ElDropdownMenu, ElDropdownItem
  },
  props: {
    dropdownLogout: Boolean
  },
  setup (props, { slots }) {
    // const store = useStore()
    const cipConfig = useCipConfig()
    const router = useRouter()
    const accountInfo = computed(() => {
      return store.state.accountInfo || {}
    })
    const handleCommand = (command) => {
      if (command === 'logout') {
        if (cipConfig.logout) {
          cipConfig.logout()
        } else {
          Token.remove()
          location.href = `${router.options.history.base}/login`
        }
      }
    }
    return { accountInfo, handleCommand }
  }
}
</script>
