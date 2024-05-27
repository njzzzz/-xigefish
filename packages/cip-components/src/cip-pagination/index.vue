<template>
  <el-pagination
    class="cip-pagination"
    :class="{'cip-pagination__compact':compact}"
    :background="background"
    @update:currentPage="handlePageChange"
    @update:pageSize="handleSizeChange"
    :currentPage="currentPageBridge"
    :layout="layout"
    :total="total"
    :page-count="pageCount"
    :page-sizes="usingPageSizes"
    :page-size="limit"
    :hide-on-single-page="hideOnSinglePage"
  />
</template>
<script>
import { defineComponent, computed } from 'vue'
import { ElPagination } from 'element-plus'
import { useConfig as useCipConfig } from '@xigefish/config'
import { getUsingConfig } from '@xigefish/d-render-shared'
import { generateProps, generateEmits } from '@xigefish/shared'
import { componentScheme } from './component.scheme'

export default defineComponent({
  name: 'CipPagination',
  inheritAttrs: false,
  components: { ElPagination },
  props: generateProps(componentScheme),
  emits: generateEmits(componentScheme),
  setup (props, context) {
    const currentPageBridge = computed(() => {
      return Math.floor(props.offset / props.limit) + 1
    })

    const pageCount = computed(() => {
      return Math.ceil(props.total / props.limit) || 1
    })

    const handleSizeChange = (size) => {
      const offset = 0 // (props.currentPage - 1) * size
      context.emit('update:offset', offset)
      context.emit('update:limit', size)
      context.emit('refresh')
      // 如何阻塞 pageChange
    }
    // 当前页变化事件
    const handlePageChange = (page) => {
      const offset = (page - 1) * props.limit
      context.emit('update:offset', offset)
      context.emit('refresh', offset)
    }
    // 样式模式
    const cipConfig = useCipConfig()
    const usingPageSizes = computed(() => {
      return getUsingConfig(props.pageSizes, cipConfig.pageSizes)
    })
    const compact = computed(() => {
      return cipConfig.paginationCompact ?? ''
    })
    return {
      handleSizeChange,
      handlePageChange,
      currentPageBridge,
      compact,
      usingPageSizes,
      pageCount
    }
  }
})
</script>
