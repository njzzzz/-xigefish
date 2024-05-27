<template>
  <micro-app
    :key="name"
    style="height:100%"
    :name="name"
    :url="url"
    :baseroute="baseRoute"
    :shadowDom="shadowDom"
    :data="{ store, router, subPath: subFullPath}"
    @datachange="handleDataChange"
  />
</template>
<script >
// 依赖 @micro-zoe/micro-app (京东开源)
// https://zeroing.jd.com/micro-app/docs.html#/
import { computed, watch, onUnmounted } from 'vue'
import store from '../../store'
import { useMain } from '@xigefish/hooks/use-main'
import { useRouter, useRoute } from 'vue-router'
import { isArray } from '@xigefish/d-render-shared'
import { judgeHiddenFramework, dataChangeStrategy } from './util'
export default {
  props: {
    name: String,
    url: String,
    baseRoute: String,
    subPath: String,
    shadowDom: {
      type: Boolean,
      default: false
    },
    withoutFramework: Array
  },
  setup (props) {
    const { setCurrentTitle, setFrameHide } = useMain()
    const router = useRouter()
    const route = useRoute()
    onUnmounted(() => {
      console.log('Main Unmounted')
    })
    const pathChange = function (path) {
      if (path !== route.fullPath) {
        router.push(path)
      }
    }
    const replacePath = function (path) {
      if (path !== route.fullPath) {
        router.replace(path)
      }
    }

    dataChangeStrategy.setStrategy('pathChange', (data) => {
      const path = data.substring(1)
      pathChange(`${props.baseRoute}${path}`)
    })
    dataChangeStrategy.setStrategy('replacePath', (data) => {
      const path = data.substring(1)
      replacePath(`${props.baseRoute}${path}`)
    })
    dataChangeStrategy.setStrategy('setCurrentTitle', (data) => {
      setCurrentTitle(data)
    })

    const handleDataChange = (e) => {
      const { type, data } = e.detail.data || {}
      dataChangeStrategy.execute(type, data)
    }

    const subFullPath = computed(() => {
      return route.fullPath.replace(new RegExp(`^${props.baseRoute}`), '/')
    })

    watch(() => props.subPath, (val) => {
      if (isArray(props.withoutFramework)) {
        setFrameHide(judgeHiddenFramework(props.withoutFramework, props.subPath))
      } else {
        setFrameHide(false)
      }
    }, { immediate: true })

    return {
      store,
      router,
      handleDataChange,
      subFullPath
    }
  }
}
</script>
