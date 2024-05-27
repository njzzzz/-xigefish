<template>
  <design-framework>
    <template #components>
      <table-components :group-list="groupList"></table-components>
    </template>
    <template #toolbar>
      <cip-button-text size="default" @click="previewJson">预览JSON</cip-button-text>
    </template>
    <div class="cip-td-form-drawing-container">
      <el-form class="form-item-wrap" :size="tableConfig.tableSize||'default'" :label-width="`${tableConfig.labelWidth}px`" :label-position="tableConfig.labelPosition">
        <form-drawing-table field-key="tableData"
                        :select-id="selectId"
                        :config="tableConfig.config"
                        @update:config="updateConfig"
                        @click="handleSelectItem(tableConfig)"
                        @onSelectItem="handleSelectItem"></form-drawing-table>
      </el-form>
    </div>
    <template #property>
      <table-property :selectItem="selectItem"
                      :data="formConfig"
                      :property-tabs="propertyTabs"
                      :defaultActiveType="defaultActiveType"
                      @update:selectItem="updateSelectItem"
                     ></table-property>
    </template>
    <cip-dialog v-model="previewJsonVisible" title="预览JSON" top="5vh" :show-only="true">
      <cip-code-mirror :modelValue="previewJsonResult"></cip-code-mirror>
    </cip-dialog>
  </design-framework>
</template>
<script>
import { computed, ref } from 'vue'
import { ElForm } from 'element-plus'
import CipDialog from '@xigefish/components/cip-dialog'
import CipButtonText from '@xigefish/components/cip-button-text'
import CipCodeMirror from '@xigefish/code-mirror'
import DesignFramework from './framework'
import TableComponents from './table-components'
import TableProperty from './form-property'
import FormDrawingTable from './form-drawing'
import { formConfigListFlat, except } from './util'
import { componentsGroupList } from './components-config.js'
export default {
  components: { ElForm, DesignFramework, TableComponents, TableProperty, CipButtonText, CipDialog, FormDrawingTable, CipCodeMirror },
  props: {
    formConfig: Object,
    isDefaultConfig: {
      type: Boolean,
      default: true
    },
    tableDefaultConfig: Object,
    componentsGroupList: { // 字段组件配置
      type: Array,
      default: () => componentsGroupList
    },
    propertyTabs: Array, // 需要的属性面板tab列表
    defaultActiveType: String // 默认选中的属性面板
  },
  emits: ['update:tableConfig'],
  setup (props, { emit }) {
    const previewFormVisible = ref(false)
    const preview = () => {
      previewFormVisible.value = true
    }
    const previewJsonVisible = ref(false)
    const previewJsonResult = ref('')
    const previewJson = () => {
      previewJsonResult.value = tableConfig.value
      previewJsonVisible.value = true
    }

    /**
     * 转成列表待用组件
     * 筛出子表单和文字组件，将布局组件中的字段提出
     */
    const selectItem = ref({})
    const selectId = ref('')
    // 拿到表单设计组件配置项，使用里边的label来做默认值
    const componentsList = ref([])
    props.componentsGroupList.forEach(i => {
      componentsList.value = componentsList.value.concat(i.components)
    })

    const groupList = computed(() => {
      if (!props.isDefaultConfig) {
        const list = toGroupList(props.formConfig.list) ?? []
        list[0].components.map(i => {
          if (i.label === '') i.label = componentsList.value.find(v => v.type === i.type)?.label ?? ''
          return i
        })
        return list
      } else {
        return props.componentsGroupList
      }
    })
    // 备选表单字段保留的字段格式
    const assignConfig = (i) => {
      return {
        key: i.key,
        id: i.id,
        type: i.config.type,
        label: i.config.label,
        search: i.config.search ?? true,
        fieldAlias: i.config.fieldAlias ?? i.config.label ?? ''
      }
    }
    const toGroupList = (formData) => {
      return [{
        groupName: 'basic',
        label: '表单字段',
        components: formConfigListFlat(formData).filter(v => !except.includes(v.config.type)).map(i => assignConfig(i))
      }]
    }

    /**
     * 列表配置项
     */
    const tableConfig = ref({
      config: {
        type: 'table',
        class: 'disabled-table',
        icon: 'el-icon-edit',
        list: props.tableDefaultConfig?.list ?? []
      }
    })
    const updateConfig = (val) => {
      emit('update:tableConfig', val)
    }
    const handleSelectItem = (item) => {
      selectItem.value = item
      selectId.value = item.id
    }
    const updateSelectItem = val => {
      selectItem.value.key = val.key || ''
      selectItem.value.config = val
      // eslint-disable-next-line
      for (const i in tableConfig.value?.config?.list) {
        if (tableConfig.value.config.list[i].key === val.key) {
          tableConfig.value.config.list[i] = { config: val, key: val.key, id: val.id }
        }
      }
      updateConfig(tableConfig.value)
    }

    return {
      groupList,
      previewFormVisible,
      preview,
      previewJsonVisible,
      previewJsonResult,
      previewJson,

      tableConfig: tableConfig.value,
      updateConfig,
      selectItem,
      selectId,
      handleSelectItem,
      updateSelectItem
    }
  }
}
</script>
