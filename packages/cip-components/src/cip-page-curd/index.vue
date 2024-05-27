<template>
  <page-layout-list
    v-bind="layoutAttrs"
    :no-padding="layoutNoPadding"
    :compact="layoutCompact"
    :theme="layoutTheme"
  >
    <template v-slot:[searchSlotName] v-if="withSearch">
      <cip-search-form
        v-bind="searchAttrs"
        v-model:model="searchFilter"
        :defaultModel="cDefaultSearchFilter"
        :field-list="searchFieldList"
        :hide-search="simpleSearchModel ? true : hideSearchButton"
        :handleAbsolute="searchHandleAbsolute"
        :complete-row="lSearchCompleteRow"
        :grid="simpleSearchModel ? 1 : searchAttrs?.grid"
        @search="search" />
    </template>
    <template #handle v-if="withHandle">
      <slot name="handle-buttons"
            :create-item="createItem"
            :delete-item-list="deleteItemList"
            :get-select-rows="getSelectRows"
            :get-item-list="getItemList">
      </slot>
      <template  v-if="withCreate">
        <cip-judge-privilege :privilege="permission.create">
          <cip-button button-type="create" @click="createItem(outParams)"></cip-button>
        </cip-judge-privilege>
      </template>
      <template v-if="batchDelete">
        <cip-judge-privilege :privilege="permission.batchDelete ?? permission.delete">
          <cip-button button-type="batchDelete" @click="deleteItemList(getSelectRows)"></cip-button>
        </cip-judge-privilege>
      </template>
    </template>
    <slot></slot>
<!--    从handle中去除 原因：withHandle false 将导致table内的 关于弹窗的按钮无法使用-->
    <cip-dialog v-model="itemDialog" :size="dialogSize" :width="dialogWidth" :on-confirm="saveItem" :title="dialogTitle" :show-only="showOnly">
      <cip-form :label-width="formLabelWidth"
                v-model:model="item"
                :grid="formGrid"
                :label-suffix="formLabelSuffix"
                :show-only="showOnly"
                :field-list="saveFormFieldList"></cip-form>
      <template #footer="slotScope" v-if="$slots['dialog-handle']">
        <slot name="dialog-handle" v-bind="slotScope" :model="item" :get-item-list="getItemList"></slot>
      </template>
    </cip-dialog>
    <cip-table :data="itemList"
               :columns="tableColumns"
               ref="tableRef"
               :default-expand-all="defaultExpandAll"
               :row-key="tableRowKey"
               :tree-props="tableTreeProps"
               :offset="withIndex ? offset : undefined"
               :select-type="selectType"
               :selectable="tableSelectable"
               @update:selectColumns="selectColumns"
               v-bind="tableAttrs"
               @sort="sortChange"
               v-loading="listLoading"
               :handlerWidth="tableHandleWidth"
               :withTableHandle="withTableHandle">
      <slot name="table-slots"></slot>
      <template #expand="scope" v-if="$slots.expand">
        <slot name="expand" v-bind="scope"></slot>
      </template>
      <!--      <el-table-column label="操作" :width="tableHandleWidth" v-if="withTableHandle" fixed="right">-->
      <!--        <template #default="scope">-->
      <template #_handler="scope" v-if="withTableHandle">
          <slot name="table-handle-prepend" v-bind="scope" :get-item-list="getItemList"></slot>
          <slot name="table-handle"
                v-bind="scope"
                :show-item="showItem"
                :delete-item="deleteItem"
                :edit-item="editItem"
                :get-item-list="getItemList">
            <cip-judge-privilege :privilege="permission.info">
              <cip-button-text @click="showItem(scope.row, fetchInfo)">查看</cip-button-text>
            </cip-judge-privilege>
            <cip-judge-privilege :privilege="permission.update">
              <cip-button-text @click="editItem(scope.row, fetchInfo)" :disabled="judgeTableEditButtonDisabledFn && judgeTableEditButtonDisabledFn(scope)">编辑</cip-button-text>
            </cip-judge-privilege>
            <template v-if="withTableDeleteButton &&(!judgeTableDeleteButtonFn || (judgeTableDeleteButtonFn && judgeTableDeleteButtonFn(scope)))" >
              <cip-judge-privilege :privilege="permission.delete">
                <cip-button-text
                  type="danger"
                  :disabled="judgeTableDeleteButtonDisabledFn && judgeTableDeleteButtonDisabledFn(scope)"
                  :needPop="true"
                  @click="(e, confirmed) => deleteItem(scope.row, '', false, confirmed)"
                >删除</cip-button-text>
              </cip-judge-privilege>
            </template>
          </slot>
          <slot name="table-handle-append" v-bind="scope" :get-item-list="getItemList"></slot>
      </template>
    </cip-table>
    <!--        </template>-->
    <!--      </el-table-column>-->
    <template #pagination v-if="withPagination">
      <cip-pagination v-bind="paginationConfig"
                      v-model:offset="offset"
                      v-model:limit="limit"
                      :total="total"
                      :pageSizes="pageSizes"
                      @refresh="getItemList"></cip-pagination>
    </template>
  </page-layout-list>
</template>
<script>
import { computed, defineComponent, onActivated, ref, watchEffect } from 'vue'
import { ElLoading } from 'element-plus'
import { CipSearchForm, CipForm, CipTable } from '@xigefish/d-render'
import { CipButton, CipButtonText } from '@xigefish/button'
import { PlList as PageLayoutList } from '@xigefish/page-layout'
import CipDialog from '../cip-dialog'
import CipPagination from '../cip-pagination'
import CipJudgePrivilege from '../cip-judge-privilege'
import { useCurd } from '@xigefish/hooks/use-curd'
import { isEmpty, getUsingConfig, useCipConfig, getFieldValue } from '@xigefish/d-render-shared'
import pageCurdProps from './props'
export default defineComponent({
  name: 'CipPageCurd',
  components: {
    PageLayoutList,
    CipSearchForm,
    CipPagination,
    CipTable,
    CipForm,
    CipButton,
    CipDialog,
    CipButtonText,
    CipJudgePrivilege
  },
  directives: {
    loading: ElLoading.directive
  },
  props: pageCurdProps,
  setup (props, { emit, slots }) {
    const cipConfig = useCipConfig()
    const tableRef = ref()
    const CURD = useCurd(props.entity, { ...props.curdFn, itemType: props.itemType })
    const { searchFilter, defaultSearchFilter: cDefaultSearchFilter, getItemList, limit } = CURD

    // eslint-disable-next-line vue/no-setup-props-destructure
    if (typeof props.tableDefaultLimit === 'number') limit.value = props.tableDefaultLimit // (一次性)

    watchEffect(() => {
      cDefaultSearchFilter.value = { ...props.outParams, ...props.defaultSearchFilter }
    })
    // const defaultSearchModel = computed(() => {
    //   return { ...props.outParams, ...props.defaultSearchFilter }
    // })
    // 搜索部分处理按钮是否在特定条件下开启绝对定位
    const searchHandleAbsolute = computed(() => {
      const compact = getUsingConfig(
        props.layoutCompact,
        getFieldValue(cipConfig, 'layout.compact')
      )
      if (compact === false) return false // BROKEN: 修改默认行为，原来会undefined和false一并成立，修改为仅false成立
      if (!props.withHandle) return false
      return !!(props.withCreate || props.batchDelete || slots['handle-buttons'])
    })

    const lSearchCompleteRow = computed(() => {
      return getUsingConfig(props.searchCompleteRow, searchHandleAbsolute.value)
    })

    // searchFilter.value = { ...defaultSearchModel.value, ...searchFilter.value }
    // if (props.cache) {
    onActivated(() => {
      if (!props.autoSelected) {
        getItemList()
      }
    })
    if (!props.autoSelected) { // 如果搜索中有autoSelect的字段则传true,避免请求两次数据不一致导致页面“跳动”
      getItemList()
    }
    // } else {
    // if (!props.autoSelected) { // 如果搜索中有autoSelect的字段则传true,避免请求两次数据不一致导致页面“跳动”
    //   getItemList()
    // }
    // }
    // 计算列表是否需要select
    const selectType = computed(() => {
      if (props.batchDelete) return 'checkbox'
      return props.tableSelectType
      // return undefined
    })
    const getSelectRows = () => { // 返回值 Ref<T[]>
      return tableRef.value.cipTableRef.store.states.selection
    }
    // 外层触发请求
    const getTableList = (item = {}) => {
      searchFilter.value = Object.assign(searchFilter.value, item) // { ...item }
      getItemList()
    }

    // 排序
    const sortChange = ({ prop, order }) => {
      searchFilter.value = { ...searchFilter.value, ...{ orderBy: prop, orderAsc: isEmpty(order) ? undefined : order === 'ascending' } }
      getItemList()
    }

    const saveFormFieldList = computed(() => {
      if (props.updateFormFieldList) { // 如果存在updateFormFieldList则对当前进行判断
        return CURD.isUpdate.value ? props.updateFormFieldList : props.formFieldList
      } else {
        return props.formFieldList
      }
    })
    const selectColumns = (val) => { // table组件选择列表抛出
      emit('selectColumns', val)
    }
    // 决定查询条件要放到哪个插槽展示
    const searchSlotName = computed(() => {
      return props.simpleSearchModel ? 'title' : 'filter'
    })

    // 为单个input查询方式加上查询按钮图标
    if (props.simpleSearchModel) {
      props.searchFieldList.forEach(item => {
        item.config.withSearch = true
      })
    }

    return {
      ...CURD,
      ...props.componentData, // 覆盖默认配置
      cDefaultSearchFilter,
      searchHandleAbsolute,
      lSearchCompleteRow,
      tableRef,
      saveFormFieldList,
      selectType,
      getSelectRows,
      getTableList,
      sortChange,
      selectColumns,
      searchSlotName
    }
  }
})
</script>
