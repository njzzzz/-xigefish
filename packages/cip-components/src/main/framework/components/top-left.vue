<template>
  <div class="main-framework--top-left">
    <header class="main-framework--top-left__header main-framework__header">
      <div style="display: flex; align-items: center">
        <div class="main-framework--top-left__name main-framework__name" >
          <slot name="name" :is-collapse="false"></slot>
        </div>
      </div>
      <div class="main-framework--top__nav" style="flex-shrink: 1; flex-grow: 2;"><slot name="headerNav"></slot></div>
      <div style="  flex-shrink: 0;display: flex;justify-content: space-between; height: 100%">
<!--        <div style="flex:1;width: 0;overflow: hidden;"><slot name="header-body"></slot></div>-->
        <slot name="header"></slot>
      </div>
    </header>
    <div class="main-framework--top-left__xx drawer-insert">
      <aside class="main-framework--top-left__aside main-framework__aside" :class="{'is-collapse':collapse}" v-if="!hideAside">
        <div class="main-framework--top-left__aside__nav" :class="{'is-expanded': !asideSwitchBridge}">
          <el-scrollbar :key="collapse">
            <slot name="nav" :is-collapse="collapse"></slot>
          </el-scrollbar>
        </div>
        <div class="main-framework--top-left__aside__switch main-framework__aside__switch" v-if="asideSwitchBridge">
          <i @click="toggleCollapse" class="fold-icon">
            <Component :is="collapse? 'UnFold': 'Fold'"></Component>
          </i>
        </div>
      </aside>
      <div class="main-framework--top-left__content main-framework__content" :ref="content$">
        <div style="display: flex; flex-direction: column;flex-grow:2;height:0;">
          <div class="main-framework--top-left__tabs" v-show="withTabs === true">
            <slot name="tabs"></slot>
          </div>
          <div class="main-framework--top-left__breadcrumb main-framework__breadcrumb" v-if="withBreadcrumb">
            <slot name="breadcrumb"></slot>
          </div>
          <main class="main-framework--top-left__main main-framework__main">
            <slot></slot>
          </main>
        </div>
        <footer class="main-framework--top-left__footer main-framework__footer" v-if="!hideFooter">
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { ElScrollbar } from 'element-plus'
import { UnFold, Fold } from '../icons-vue'
import { frameworkProps } from '../framework-props'
import { useAsideSwitch, useCollapse, useContentScroll } from './hooks'
export default defineComponent({
  name: 'MainFrameworkLeft2',
  components: { ElScrollbar, UnFold, Fold },
  props: frameworkProps,
  setup (props) {
    const { collapse, toggleCollapse } = useCollapse(props)
    const { asideSwitchBridge } = useAsideSwitch(props)
    const { content$, setScrollTop } = useContentScroll()
    return {
      content$,
      setScrollTop,
      collapse,
      toggleCollapse,
      asideSwitchBridge
    }
  }
})
</script>
