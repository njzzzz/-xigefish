<template>
  <micro-app
    :key="name"
    style="height:100%"
    :name="name"
    :url="url"
    :baseroute="baseRoute"
    :shadowDom="shadowDom"
    :data="{ subPath: subFullPath, store }"
    @datachange="handleDataChange"
  />
</template>
<script >
// 依赖 @micro-zoe/micro-app (京东开源)
// https://zeroing.jd.com/micro-app/docs.html#/
import { computed, watch, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMain } from '@xigefish/hooks/use-main'
import { isArray, subStr } from '@xigefish/d-render-shared'
import { judgeHiddenFramework, dataChangeStrategy } from '../../common/util'
import store from '@xigefish/components/store'
import microApp from '@micro-zoe/micro-app'
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
      console.log('Main Unmounted', props.name)
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
      if (type) {
        dataChangeStrategy.execute(type, data, props)
      } else {
        console.warn(e, 'has no type')
      }
    }
    const subFullPath = computed(() => {
      // FIX: [1.0.12] 修复根路径最后不加/无法正确匹配的问题
      const replaceSign = /\/$/.test(props.baseRoute) ? subStr(props.baseRoute, 0, -1) : props.baseRoute
      return route.fullPath.replace(new RegExp(`^${replaceSign}`), '') || '/'
    })
    watch([() => store.state.app?.menu, () => props.name], () => {
      setTimeout(() => {
        microApp.setData(props.name, { store, subPath: subFullPath.value, menuChangeCount: 1 })
      }, 0)
    }, { immediate: true })
    // 数据合并导致第一次的data的数据丢失
    watch(() => props.subPath, (val) => {
      if (isArray(props.withoutFramework)) {
        setFrameHide(judgeHiddenFramework(props.withoutFramework, props.subPath))
      } else {
        setFrameHide(false)
      }
    }, { immediate: true })

    return {
      subFullPath,
      store,
      handleDataChange
    }
  }
}
</script>
