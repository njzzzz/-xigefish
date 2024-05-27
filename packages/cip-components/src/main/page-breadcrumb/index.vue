<template>
  <el-breadcrumb style="padding:4px 20px;" v-if="routeMatched.length>0">
    <template v-for="item in routeMatched" :key="item.name">
      <!--      :to="item.router" @click.prevent="runRouter(item)"-->
      <el-breadcrumb-item >
        <template v-if="item.router">
          <span class="cip-breadcrumb-item--link" @click.prevent="runRouter(item)">{{getRouteName(item)}}</span>
        </template>
        <template v-else>
          {{getRouteName(item)}}
        </template>
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>
<script>
import { computed, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'
import { depthFirstSearchTree, getUsingConfig } from '@xigefish/d-render-shared'
import { getMenuTitle } from '../helper'
export default {
  props: { navMenu: Array, menuNameMap: Map },
  components: {
    ElBreadcrumb, ElBreadcrumbItem
  },
  setup (props) {
    const cipMenu = inject('cipMenu', {})
    const _navMenu = computed(() => {
      return getUsingConfig(props.navMenu, cipMenu.navMenu)
    })
    const _menuNameMap = computed(() => {
      return getUsingConfig(props.menuNameMap, cipMenu.menuNameMap)
    })
    const route = useRoute()
    const router = useRouter()
    const routeMatched = computed(() => {
      const loop = _navMenu.value?.length ?? 0
      for (let i = 0; i < loop; i++) {
        const result = depthFirstSearchTree(_navMenu.value[i], route.name, 'name')
        if (result) {
          return result
        }
      }
      return []
    })
    const getRouteName = (item) => {
      return _menuNameMap.value.get(item.name) ? getMenuTitle(item) + '-' + _menuNameMap.value.get(item.name) : getMenuTitle(item)
    }
    const runRouter = (item) => {
      if (item.router) {
        if (typeof item.router === 'function') {
          item.router(router, route)
        } else {
          router.replace(item.router === true ? { name: item.name } : item.router)
        }
      }
    }
    return { routeMatched, runRouter, getRouteName }
  }
}
</script>
