<template>
  <div class="cip-main-breadcrumb">
    <BackButton @click="lBack" class="cip-main-breadcrumb__back" v-if="lCanBack"/>
    <el-breadcrumb  v-if="routeMatched.length>0">
      <template v-for="(item,index) in routeMatched" :key="item.name">
        <el-breadcrumb-item >
          <template v-if="item.router && index!==routeMatched.length-1">
            <span class="cip-main-breadcrumb--link" @click.prevent="runRouter(item)">{{getRouteName(item)}}</span>
          </template>
          <template v-else>
            {{getRouteName(item)}}
          </template>
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>
<script>
import { computed, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'
import { getUsingConfig, isNotEmpty } from '@xigefish/d-render-shared'
import { getMenuTitle } from '../helper'
import BackButton from '../../page-layout/theme/widgets/back-button'
import { useBack } from '../../hooks/use-back'
export default {
  props: {
    // navMenu: Array,
    menuNameMap: Map,
    canBack: { type: Boolean, default: undefined },
    back: Function
  },
  components: {
    ElBreadcrumb, ElBreadcrumbItem, BackButton
  },
  setup (props, { emit }) {
    const { onBack } = useBack(props)
    const cipMenu = inject('cipMenu', {})
    // 此组件不在支持单独设置menu
    // const _navMenu = computed(() => {
    //   return getUsingConfig(props.navMenu, cipMenu.navMenu)
    // })
    const _menuNameMap = computed(() => {
      return getUsingConfig(props.menuNameMap, cipMenu.menuNameMap)
    })
    const route = useRoute()
    const router = useRouter()
    const routeMatched = computed(() => {
      return cipMenu.routeMatched || []
    })
    const getRouteName = (item) => {
      return _menuNameMap.value.get(item.name) ? getMenuTitle(item) + '-' + _menuNameMap.value.get(item.name) : getMenuTitle(item)
    }

    const lCanBack = computed(() => {
      if (isNotEmpty(props.canBack)) return props.canBack
      return cipMenu.canBack ?? false
    })

    const runRouter = (item) => {
      if (item.router) {
        if (typeof item.router === 'function') {
          item.router(router, route)
        } else {
          router.replace(item.router === true ? { name: item.name } : item.router)
        }
      }
    }

    return { routeMatched, runRouter, getRouteName, lCanBack, lBack: onBack }
  }
}
</script>
