<template>
  <div class="page-layout-list page-layout-list--standard layout-overflow-auto"
       :class="{'page-layout-list--compact': isCompact,'manager-page-padding': isPadding, 'in-page-layout': inPageLayout }">
    <div class="page-layout-list__assist-style"></div>
    <div v-if="$slots.filter" class="page-layout-list__filter">
      <slot name="filter"></slot>
    </div>
    <div  class="page-layout-list__table-title" v-if="$slots.handle || $slots.title">
      <div  class="page-layout-list__handle">
        <slot name="handle"></slot>
      </div>
      <div v-if="withTitleBridge" style="min-width: 200px">
        <slot name="title">{{titleBridge}}</slot>
      </div>
    </div>
    <div class="page-layout-list__content" :class="{'page-layout-list__has-page':$slots.pagination}">
      <slot></slot>
      <slot name="note"></slot>
    </div>
    <div class="page-layout-list__pagination" v-if="$slots.pagination">
      <slot name="pagination"></slot>
    </div>
  </div>
</template>
<script>
import { defineComponent, computed } from 'vue'
// import { useCipConfig } from '@xigefish/components/hooks/use-cip-config'
import { useConfig as useCipConfig, getUsingConfig } from '@xigefish/config'
import { getFieldValue } from '@xigefish/d-render-shared'
import { useTitle, usePageLayout, commonListProps } from '@xigefish/page-layout-shared'
export default defineComponent({
  name: 'PageLayoutListStandard',
  props: commonListProps,
  setup (props) {
    const cipConfig = useCipConfig()
    const isPadding = computed(() => { // 默认开启
      return getUsingConfig(
        !props.noPadding,
        getFieldValue(cipConfig, 'layout.padding'),
        true
      )
    })
    const isCompact = computed(() => { // 默认关闭
      return getUsingConfig(
        props.compact,
        getFieldValue(cipConfig, 'layout.compact'),
        false
      )
    })
    const { inPageLayout } = usePageLayout()
    const { titleBridge, withTitleBridge } = useTitle(props, inPageLayout, {})
    return {
      isCompact,
      isPadding,
      titleBridge,
      withTitleBridge,
      inPageLayout
    }
  }
})
</script>
