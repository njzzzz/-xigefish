<template>
  <div :class="['cip-tree', {'cip-tree--border': border }]" >
    <div class="cip-tree__filter" v-if="showSearch">
      <el-input :suffix-icon="icon" :placeholder="searchPlaceholder" size="default" v-model="filterText" ></el-input>
    </div>
    <div class="cip-tree__header" v-if="showButton">
      <slot name="header">
        <cip-button-text v-if="isTreeAppend" :icon="CirclePlus" @click="appendTree">新增</cip-button-text>
        <cip-button-text :icon="RefreshRight" @click="reload">刷新</cip-button-text>
        <cip-button-text :icon="Bottom" @click="expandAll">展开</cip-button-text>
        <cip-button-text :icon="Top" @click="narrowAll">折叠</cip-button-text>
      </slot>
    </div>
    <TreeWrapper :withScroll="withScroll">
      <el-tree class="filter-tree"
               ref="tree"
               v-bind="$attrs"
               :node-key="nodeKey"
               :default-expand-all="defaultExpandAll && !accordion"
               :current-node-key="currentNodeKey"
               :props="defaultProps"
               :expandOnClickNode="expandOnClickNode"
               :filter-node-method="filterNode"
               :data="options"
               :accordion="accordion"
               :lazy="!!lazyLoad"
               :load="lazyLoad"
               :show-checkbox="showCheckbox"
               :highlight-current="highlightCurrent"
               :render-content="renderContent"
               :onCurrent-change="onCurrentChange"
               @node-click="nodeClick"/>
    </TreeWrapper>
  </div>
</template>

<script lang="jsx">
import { watch, ref } from 'vue'
import { ElTree, ElInput, ElScrollbar, ElIcon } from 'element-plus'
import { RefreshRight, Bottom, Top, CirclePlus, Delete, Plus, EditPen } from '@element-plus/icons-vue'
import CipButtonText from '../cip-button-text'
import { useTree } from './use-tree'
const TreeWrapper = (props, { slots }) => {
  return props.withScroll
    ? slots.default()
    : <ElScrollbar class="cip-tree__scrollbar">
      {slots.default()}
    </ElScrollbar>
}
export default {
  name: 'CipTree',
  inheritAttrs: false, // 关闭顶层自动继承attrs
  components: { ElTree, ElInput, CipButtonText, TreeWrapper },
  props: {
    config: {},
    options: {},
    showButton: {
      type: Boolean,
      default: true
    },
    showSearch: {
      type: Boolean,
      default: true
    },
    searchPlaceholder: {
      type: String,
      default: '请输入关键字过滤'
    },
    size: {
      type: String,
      default: 'normal'
    },
    icon: {
      type: Object
    },
    border: {
      type: Boolean,
      default: false
    },
    withScroll: { // 是否需要内部的滚动条
      type: Boolean,
      default: true
    }
  },
  emits: ['node-click', 'node-append', 'node-edit', 'node-remove', 'tree-reload', 'expand-all', 'narrow-all', 'handle-remote'],
  setup (props, content) {
    const { emit } = content
    const filterText = ref('')
    const tree = ref(null)
    const { config, defaultProps, level, buttonLevel, buttonList, ...useTreeOption } = useTree(props, content, tree, filterText)

    // 头部按钮
    const expandAll = () => {
    // eslint-disable-next-line
      for (const i in tree.value.store.nodesMap) {
        tree.value.store.nodesMap[i].expanded = true
      }
    }
    const narrowAll = () => {
    // eslint-disable-next-line
      for (const i in tree.value.store.nodesMap) {
        tree.value.store.nodesMap[i].expanded = false
      }
    }

    watch(filterText, val => {
      if (config.value.remoteFilter) {
        emit('handle-remote', val)
      } else {
        tree.value.filter(val)
      }
    })

    // 节点增删改函数
    const nodeAppend = (e, data, node) => {
      e.stopPropagation()
      emit('node-append', data)
    }
    const nodeEdit = (e, data, node) => {
      e.stopPropagation()
      emit('node-edit', data)
    }
    const nodeRemove = (e, data, node) => {
      e.stopPropagation()
      emit('node-remove', data)
    }

    const renderButton = (h, { node, data, store }) => {
      const buttonAttr = { size: 'small' }
      const appendButton = h(CipButtonText,
        { ...buttonAttr, onClick: e => nodeAppend(e, data, node) }, { default: () => <ElIcon><Plus/></ElIcon> }) // h('i', { class: 'el-icon-plus' })
      const editButton = h(CipButtonText,
        { ...buttonAttr, onClick: e => nodeEdit(e, data, node) }, { default: () => <ElIcon><EditPen/></ElIcon> }) // h('i', { class: 'el-icon-edit' })
      const removeButton = h(CipButtonText,
        { ...buttonAttr, onClick: e => nodeRemove(e, data, node) }, { default: () => <ElIcon><Delete/></ElIcon> }) // h('i', { class: 'el-icon-delete' })
      const buttonDefault = [
        { type: 'append', component: appendButton },
        { type: 'edit', component: editButton },
        { type: 'remove', component: removeButton }]
      if (node.level > buttonLevel.value) {
        buttonDefault.splice(buttonDefault.findIndex(i => i.type === 'append'), 1)
      }
      return buttonList.value.map((item) => {
        // eslint-disable-next-line
        for (const btn of buttonDefault) {
          if (item === btn.type) {
            return btn.component
          }
        }
      })
    }

    // 自定义树节点
    const renderContent = (h, { node, data, store }) => {
      const showButton = renderButton(h, { node, data, store })
      // 外部传节点
      const renderNode = config.value.renderNode
      const operationNode = renderNode ? <span class="view-node">{renderNode?.(data, node, store)}</span> : <span class='operation'>{showButton}</span>
      const iconNode = <span><i class={[data.icon, 'icon-node']}></i></span>
      const renderItem = config.value.renderItem
      const spanClass = ['custom-tree-node__text', { is_disabled: data.disabled }]
      const itemLabel = data[defaultProps.value.label]
      const renderItemNode = renderItem
        ? <span class={spanClass}>{renderItem({ node, data, store })}</span>
        : <span class={spanClass} title={itemLabel}>
          {iconNode}
          {itemLabel}
        </span>
      const nodeClass = props.size === 'large' ? '--font-text:14px' : '--font-text:12px'
      return <span class='custom-tree-node' style={nodeClass}>
        {renderItemNode}
        {operationNode}
      </span>
    }
    const getCheckedKeys = (leafOnly = false) => {
      return tree.value.getCheckedKeys(leafOnly)
    }
    const setCheckedKeys = (keys, leafOnly = false) => {
      return tree.value.setCheckedKeys(keys, leafOnly)
    }
    const setCurrentKey = (key) => {
      tree.value.setCurrentKey(key)
    }
    return {
      tree,
      defaultProps,
      filterText,
      renderContent,
      expandAll,
      narrowAll,
      getCheckedKeys,
      setCheckedKeys,
      setCurrentKey,
      CirclePlus,
      Bottom,
      RefreshRight,
      Top,
      TreeWrapper,
      ...useTreeOption
    }
  }
}
</script>
