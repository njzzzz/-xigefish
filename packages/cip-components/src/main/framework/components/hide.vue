<template>
  <div class="main-framework--hide drawer-insert">
    <div class="main-framework--hide__tabs" v-show="withTabs === true">
<!--      维持缓存功能，但是不展示-->
      <slot name="tabs"></slot>
    </div>
    <main class="main-framework--hide__main main-framework__main" :ref="content$">
      <slot></slot>
    </main>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { frameworkProps } from '../framework-props'
import { useContentScroll } from './hooks'
export default defineComponent({
  name: 'MainFrameworkHide',
  props: frameworkProps,
  setup () {
    const { content$, setScrollTop } = useContentScroll()
    return { content$, setScrollTop }
  }
})
</script>
