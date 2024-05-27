<template>
  <div class="main-framework--top main-framework">
    <header class="main-framework__header">
      <div class="main-framework--top__header">
        <div style="display: flex; flex-grow: 2;">
          <div class="main-framework--top__name main-framework__name">
            <!--使用展开的name数据-->
            <slot name="name" :is-collapse="false"></slot>
          </div>
          <div class="main-framework--top__nav">
            <slot name="nav" :is-collapse="false"></slot>
          </div>
        </div>
        <slot name="header"></slot>
      </div>
    </header>
    <div class="main-framework--top__tabs" v-show="withTabs === true">
      <slot name="tabs" ></slot>
    </div>
    <main class="main-framework--top__main main-framework__main drawer-insert" :ref="content$">
      <div class="main-framework--top__main__limit">
        <div class="main-framework--top__breadcrumb">
<!--          <slot name="breadcrumb"></slot>-->
        </div>
        <slot></slot>
      </div>
    </main>
    <footer class="main-framework--top__footer main-framework__footer" v-if="!hideFooter">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { frameworkProps } from '../framework-props'
import { useContentScroll } from './hooks'
export default defineComponent({
  name: 'MainFrameworkTop',
  props: frameworkProps,
  setup () {
    const { content$, setScrollTop } = useContentScroll()
    return { content$, setScrollTop }
  }
})
</script>
