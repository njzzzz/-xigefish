<template>
  <div class="cip-td-form-drawing-table" :class="{'is-active':isActive}">
    <i class="el-icon-rank show-focus handle-icon move-icon"/>
    <!-- <span class="right-top item-field-key">{{fieldKey}}</span> -->
    <div class="right-bottom show-focus">
      <i class="el-icon-document-copy handle-icon" @click.stop="copyItem"></i>
      <i class="el-icon-delete handle-icon" @click.stop="deleteItem"></i>
    </div>
    <div>
      <table-design :config="tableConfig" :hide-delete="true">
        <vue-draggable :model-value="list"
                       @update:modelValue="updateOptions"
                       :group="{name: 'components',put: judgePut}"
                       handle=".move-icon"
                       ghost-class="table-ghost"
                       @add="addOptions"
                       :animation="200"
                       item-key="id"
                       :component-data="{ class:'form-table-options', style: {height: '100%',border:'1px dashed #ddd',width: '100%',display: 'flex',boxSizing:'border-box'}}">
          <template #item="{element, index}">
            <form-drawing-item :field-key="element.key"
                               :style="itemStyle(element)"
                               :selectId="selectId"
                               :is-active="selectId === element.id"
                               :config="element.config"
                               :show-copy="false"
                               @click.stop="selectOption(element)"
                               @onDelete="deleteOption(index)"></form-drawing-item>
          </template>
        </vue-draggable>
      </table-design>
    </div>

  </div>
</template>
<script>
import { computed, ref } from 'vue'
import FormDrawingItem from './form-drawing-item'
import TableDesign from './form-drawing-table/design'
import { handleFormConfig } from './handle-config'
import { getCopyRow } from '../util'
import VueDraggable from 'vuedraggable'
import { getNextItem } from '@xigefish/d-render-shared'
export default {
  name: 'FormDrawingTable',
  components: {
    VueDraggable, FormDrawingItem, TableDesign
  },
  props: {
    isActive: Boolean,
    fieldKey: String,
    config: Object,
    selectId: [String, Number]
  },
  emits: ['onDelete', 'onCopy', 'onSelectItem', 'update:config'],
  setup (props, { emit }) {
    const computedConfig = computed(() => {
      return handleFormConfig(props.config, [], {

      }, { })
    })
    const tableConfig = computed(() => {
      // 表格中的组件全部变为可读
      return list.value?.map(i => {
        i.config.writable = false
        i.config.readable = true
        return i
      })
    })
    const list = computed(() => {
      return props.config.list || []
    })
    // 列表布局样式
    const itemStyle = computed(() => {
      return row => {
        if (row.config.width) {
          return { flexShrink: 0, flexBasis: row.config.width }
        } else {
          return { flexShrink: 0, flexGrow: 1 }
        }
      }
    })
    const deleteItem = () => {
      emit('onDelete')
    }
    const copyItem = () => {
      emit('onCopy')
    }
    const updateConfig = (val) => {
      emit('update:config', val)
    }
    const selectItem = (element) => {
      emit('onSelectItem', element)
    }
    const unique = (array) => {
      const result = []; const sign = {}
      // eslint-disable-next-line
      for (const i of array) {
        if (!sign[i.key]) {
          result.push(i)
          sign[i.key] = i
        }
      }
      return result
    }
    // 修改list配置
    const updateOptions = (list) => {
      const config = ref(props.config || {})
      list = unique(list)
      config.value.list = list.map(option => {
        const width = option.config.width !== undefined ? option.config.width : '200px'
        return {
          ...option,
          config: {
            ...option.config,
            width,
            writable: true
          }
        }
      }
      )
      updateConfig(config.value)
    }
    // 添加一个字段
    const addOptions = ({ newIndex }) => {
      const newItem = list.value[newIndex]
      if (newItem) {
        emit('onSelectItem', newItem)
      }
    }
    const selectOption = (element) => {
      emit('onSelectItem', element)
    }
    const deleteOption = (index) => {
      const config = props.config
      const nextItem = getNextItem(config.list, index)
      if (nextItem) selectOption(nextItem)
      config.list.splice(index, 1)
      updateConfig(config)
    }
    const copyOption = (index) => {
      const config = props.config
      const newRow = getCopyRow(config.list[index])
      config.list.splice(index + 1, 0, newRow)
      updateConfig(config)
      selectOption(newRow)
    }
    const judgePut = (...val) => {
      const dom = val?.[2] ?? {}
      return !dom.classList.contains('disabled-table')
    }
    return {
      list,
      tableConfig,
      computedConfig,
      deleteItem,
      copyItem,
      updateConfig,
      selectItem,
      updateOptions,
      addOptions,
      selectOption,
      deleteOption,
      copyOption,
      judgePut,
      itemStyle
    }
  }
}
</script>
