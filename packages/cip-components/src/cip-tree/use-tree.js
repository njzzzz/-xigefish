import { computed, ref } from 'vue'

export const useTree = (props, { emit }, tree, filterText) => {
  const config = computed(() => {
    return props.config ?? {}
  })
  // 头部按钮
  const appendTree = () => {
    emit('node-append', {})
  }
  const reload = () => {
    filterText.value = ''
    emit('tree-reload')
  }

  const defaultProps = computed(() => {
    return Object.assign({}, {
      children: 'children',
      label: 'label'
    }, config.value.defaultProps, config.value.optionProps)
  })
  const isTreeAppend = computed(() => {
    return config.value.isTreeAppend ?? false
  })
  // 节点唯一标识
  const nodeKey = computed(() => {
    return config.value.nodeKey ?? 'id'
  })
  // 是否手风琴模式
  const accordion = computed(() => {
    return config.value.accordion ?? false
  })
  // 懒加载函数
  const lazyLoad = computed(() => {
    return config.value.lazyLoad ?? null
  })
  // 是否进入展开，使用懒加载时默认不展开，不使用时默认展开
  const expandOnClickNode = computed(() => {
    return config.value.expandOnClickNode
  })
  // 且不是手风琴模式才可以默认展开
  const defaultExpandAll = computed(() => {
    return config.value.defaultExpandAll ?? !lazyLoad.value
  })
  // 显示checkbox
  const showCheckbox = computed(() => {
    return config.value.showCheckbox ?? false
  })
  // 树形组件搜索
  const filterNode = (value, data) => {
    if (!value) return true
    return data[defaultProps.value.label].indexOf(value) !== -1
  }
  // 定义渲染层级
  const level = computed(() => {
    return config.value.treeLevel ?? 0
  })
  // 定义树按钮渲染层级
  const buttonLevel = computed(() => {
    return config.value.buttonLevel
  })
  // 显示按钮类型列表
  const buttonList = computed(() => {
    return config.value.buttonList ?? []
  })

  // 点击树节点
  const nodeClick = (data, node, comp) => {
    // 清除高亮后手动开启，配置中不开启高亮则跳过
    if (config.value.highlightCurrent && !highlightCurrent.value) {
      highlightCurrent.value = true
    }
    emit('node-click', { data, node, comp })
  }

  // 节点变化
  const onCurrentChange = (data, node) => {
    emit('current-change', data, node)
  }

  // 是否高亮当前节点
  const highlightCurrent = ref(!!config.value.highlightCurrent)
  // 一些重置操作需要清除高亮，只能手动清除
  const clearHighlight = () => {
    highlightCurrent.value = false
  }
  // 默认展示高亮节点的key值
  const currentNodeKey = computed(() => {
    return config.value.currentNodeKey
  })
  return {
    config,
    appendTree,
    reload,
    defaultProps,
    isTreeAppend,
    nodeKey,
    accordion,
    lazyLoad,
    expandOnClickNode,
    defaultExpandAll,
    showCheckbox,
    filterNode,
    level,
    buttonLevel,
    buttonList,
    nodeClick,
    highlightCurrent,
    currentNodeKey,
    clearHighlight,
    onCurrentChange
  }
}
