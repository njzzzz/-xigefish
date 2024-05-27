<template>
  <div class="main-framework--left">
    <aside class="main-framework--left__aside main-framework__aside" :class="{'is-collapse':collapse}">
      <div class="main-framework--left__name main-framework__name" :class="{'is-collapse':collapse}">
        <slot name="name" :is-collapse="collapse"></slot>
      </div>
      <div class="main-framework--left__aside__nav" :class="{'is-expanded': !asideSwitchBridge}">
        <el-scrollbar :key="collapse">
          <slot name="nav" :is-collapse="collapse"></slot>
        </el-scrollbar>
      </div>
      <div class="main-framework--left__aside__switch main-framework__aside__switch" v-if="asideSwitchBridge">
        <i @click="toggleCollapse" class="fold-icon">
          <Component :is="collapse? 'UnFold': 'Fold'"></Component>
        </i>
      </div>
    </aside>
    <div class="main-framework--left__content main-framework__content">
      <header class="main-framework--left__header main-framework__header">
        <div><slot name="breadcrumb"></slot></div>
        <slot name="header"></slot>
      </header>
      <div style="display: flex; flex-direction: column;flex-grow:2;height:0;">
        <div class="main-framework--left__tabs" v-show="withTabs === true">
          <slot name="tabs"></slot>
        </div>
        <!--        <div class="main-framework__breadcrumb">-->
        <!--          <slot name="breadcrumb"></slot>-->
        <!--        </div>-->
        <main class="main-framework--left__main main-framework__main drawer-insert">
          <slot></slot>
        </main>
      </div>
      <footer class="main-framework--left__footer main-framework__footer" v-if="!hideFooter">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { ElScrollbar } from 'element-plus'
import { UnFold, Fold } from '../icons-vue'
import { frameworkProps } from '../framework-props'
import { useAsideSwitch, useCollapse } from './hooks'
export default defineComponent({
  name: 'MainFrameworkLeft',
  components: { ElScrollbar, UnFold, Fold },
  props: frameworkProps,
  setup (props) {
    const { collapse, toggleCollapse } = useCollapse(props)
    const { asideSwitchBridge } = useAsideSwitch(props)
    return {
      collapse,
      toggleCollapse,
      asideSwitchBridge
    }
  }
})
</script>
