import { computed, watch, nextTick, onMounted, unref, defineComponent } from 'vue'
import { ElLoading } from 'element-plus'
import { useRetrieve } from '@xigefish/hooks/use-retrieve'
import { getFieldValue, isNotEmpty, isObject, objectEqual } from '@xigefish/d-render-shared'
import { useTableSelected } from './use-table-selected'
import { CipTable, CipSearchForm } from '@xigefish/d-render'
import { PlList } from '@xigefish/page-layout'
import CipPagination from '../cip-pagination'
import SelectTags from './tags'

export default defineComponent({
  name: 'CipSelectTable',
  props: {
    modelValue: [Object, Array], // 单选时为对象多选时为数组
    direction: {
      type: String,
      default: 'row',
      validate: (val) => [
        'row',
        'row-reverse',
        'column',
        'column-reverse'
      ].includes(val)
    },
    multiple: {
      type: Boolean,
      default: true
    },
    searchAttrs: {},
    tableData: Array, // 支持外部数据或以给接口的方式传入 外部接口异步接口分页 [暂不考虑]
    entity: Object, // 设置获取数据的接口 外部数据优先级更高
    curdFn: Object,
    tableColumns: Array,
    searchFieldList: Array,
    optionProps: Object,
    hideSearch: { type: Boolean, default: undefined },
    defaultSearchModel: Object,
    withPagination: { type: Boolean, default: true },
    selectable: Function,
    hideIndex: { type: Boolean, default: undefined },
    withTags: { type: Boolean, default: true },
    withDivider: Boolean // 分割线
  },
  directives: {
    loading: ElLoading.directive
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const selectType = computed(() => {
      return props.multiple ? 'checkbox' : 'radio'
    })
    const {
      itemList,
      getItemList,
      searchFilter,
      defaultSearchFilter,
      search,
      listLoading,
      offset,
      limit,
      total,
      currentPage
    } = useRetrieve(props.entity, props.curdFn)

    const {
      tableRef,
      selectedRows,
      optionProps,
      setCurrentSelect,
      removeSelectRow,
      handleSelect,
      handleSelectAll
    } = useTableSelected(props, { itemList })
    // eslint-disable-next-line vue/no-setup-props-destructure
    defaultSearchFilter.value = props.defaultSearchModel
    search()

    watch(() => props.defaultSearchModel, (val) => {
      if (!objectEqual(defaultSearchFilter.value, props.defaultSearchModel)) {
        defaultSearchFilter.value = props.defaultSearchModel
        search()
      }
    }, { deep: true })

    const selectRadio = computed(() => {
      return getFieldValue(selectedRows.value[0] || {}, optionProps.value.value)
    })

    const selectable = (row) => {
      if (typeof props.selectable !== 'function') return true
      return props.selectable(row)
    }

    const currentChange = (changeRow) => {
      if (!props.multiple) { // 仅在非多选模式下生效
        if (changeRow && selectable(changeRow)) {
          selectedRows.value[0] = changeRow
        }
      }
    }

    const getSingelSelectedValue = (val) => {
      val = unref(val)
      return isObject(val) ? val?.[optionProps.value.value] ?? '' : val
    }

    watch(selectedRows, (val) => {
      if (props.multiple) {
        emit('update:modelValue', val)
      } else {
        const currentValue = val[0]
        const isSameValue = getSingelSelectedValue(currentValue) === getSingelSelectedValue(props.modelValue)
        if (isSameValue) {
          return
        }
        emit('update:modelValue', currentValue)
      }
    }, { deep: true })

    onMounted(() => {
      watch(itemList, () => {
        nextTick().then(() => setCurrentSelect())
      })

      watch(() => props.modelValue, (val) => {
        // 浅拷贝
        // 先清空
        tableRef.value.cipTableRef.clearSelection()
        // 赋值
        if (props.multiple) {
          selectedRows.value = val || []
        } else {
          if (isNotEmpty(val)) {
            selectedRows.value = [val]
          } else {
            selectedRows.value = []
          }
        }
        // 设置选中
        setCurrentSelect()
      }, { immediate: true })
    })
    console.log(props.searchAttrs)
    return () => <div class={['cip-select-table', `cip-select-table--${props.direction}`]} style={{ flexDirection: props.direction }}>
      <PlList class={'cip-select-table__table'} style={'flexShrink: 2'} hideHeader={true} withTitle={false} noPadding={true}>
        {{
          filter: props.searchFieldList?.length > 0
            ? () => <CipSearchForm
              {...props.searchAttrs}
              grid={3}
              v-model:model={searchFilter.value}
              defaultModel={defaultSearchFilter.value}
              fieldList={props.searchFieldList}
              hideSearch={props.hideSearch}
              onSearch={search}
            />
            : undefined,
          default: () => <CipTable
            ref={tableRef}
            v-loading={listLoading.value}
            data={itemList.value}
            selectType={selectType.value}
            selectRadio={selectRadio.value}
            selectLabel={optionProps.value.value}
            hideIndex={props.hideIndex}
            offset={offset.value}
            columns={props.tableColumns}
            selectable={props.selectable}
            onSelect={handleSelect}
            onSelectAll={handleSelectAll}
            onRow-click={currentChange}
          />,
          pagination: props.withPagination
            ? () => <CipPagination
              v-model:offset={offset.value}
              v-model:limit={limit.value}
              background={false}
              layout={'prev, pager, next'}
              total={total.value}
              current-page={currentPage.value}
              onRefresh={getItemList} />
            : undefined
        }}
      </PlList>
      <div class={['cip-select-table__divider', { 'without-divider': !props.withDivider }]} />
      {/* v-if="!$slots.group && withTags" */}
      {props.withTags && <div
        class={['cip-select-table__tags', { 'limited-height': props.direction.indexOf('column') !== -1 }]}
        style={{ flexBasis: props.direction.includes('row') ? '220px' : '100px', flexShrink: 0 }}
      >
        <SelectTags
          modelValue={selectedRows.value}
          optionProps={optionProps.value}
          onRemove={(index) => removeSelectRow(index)}
        />
      </div>}
    </div>
  }
})
