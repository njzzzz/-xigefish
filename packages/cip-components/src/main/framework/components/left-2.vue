<template>
  <div class="main-framework--left-2">
    <header class="main-framework--left-2__header main-framework__header">
      <div style="display: flex; align-items: center">
<!--        :class="{'is-collapse':collapse}"left-2 不需要收缩-->
        <div class="main-framework--left-2__name main-framework__name" >
          <slot name="name" :is-collapse="false"></slot>
        </div>

      </div>
      <div style="flex: 1;display: flex;justify-content: space-between;align-items: center;">
        <div style="flex:1;width: 0;overflow: hidden;"><slot name="header-body"></slot></div>
        <slot name="header"></slot>
      </div>
    </header>
    <div class="main-framework--left-2__xx drawer-insert">
      <aside class="main-framework--left-2__aside main-framework__aside" :class="{'is-collapse':collapse}" v-if="!hideAside">
        <div class="main-framework--left-2__aside__nav" :class="{'is-expanded': !asideSwitchBridge}">
          <el-scrollbar :key="collapse">
            <slot name="nav" :is-collapse="collapse"></slot>
          </el-scrollbar>
        </div>
        <div class="main-framework--left-2__aside__switch main-framework__aside__switch" v-if="asideSwitchBridge">
          <i @click="toggleCollapse" class="fold-icon">
            <Component :is="collapse? 'UnFold': 'Fold'"></Component>
          </i>
        </div>
      </aside>
      <div class="main-framework--left-2__content main-framework__content">
        <div style="display: flex; flex-direction: column;flex-grow:2;height:0;">
<!--          <div class="main-framework&#45;&#45;left-2__breadcrumb"><slot name="breadcrumb"></slot></div>-->
          <div class="main-framework--left-2__tabs" v-show="withTabs === true">
            <slot name="tabs"></slot>
          </div>
<!--          <div class="main-framework__breadcrumb">-->
<!--            <slot name="breadcrumb"></slot>-->
<!--          </div>-->
          <main class="main-framework--left-2__main main-framework__main" :ref="content$">
            <slot></slot>
          </main>
        </div>
        <footer class="main-framework--left-2__footer main-framework__footer" v-if="!hideFooter">
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
