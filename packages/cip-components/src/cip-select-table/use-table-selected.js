import { ref, computed } from 'vue'
export const useTableSelected = (props, { itemList }) => {
  const optionProps = computed(() => {
    return Object.assign({ value: 'value', label: 'label' }, props.optionProps)
  })
  const selectedRows = ref([])
  // 表格组件ref
  const tableRef = ref()
  // 设置当前列表选中 [注：存在分页]
  const setCurrentSelect = () => {
    if (itemList.value.length === 0 || !props.multiple) return
    const valueKey = optionProps.value.value
    selectedRows.value.forEach(row => {
      // 需要用itemList内的值
      const selectedRow = itemList.value.find(v => v[valueKey] === row[valueKey])
      if (selectedRow) {
        tableRef.value.cipTableRef.toggleRowSelection(selectedRow, true)
      }
    })
  }
  // 通过标签去除选中
  const removeSelectRow = (index) => {
    // 如果取消选中行在当前表格内则取消其选中
    const valueKey = optionProps.value.value
    // 从选中列表删除
    const [row] = selectedRows.value.splice(index, 1)
    const selectedRow = itemList.value.find(v => v[valueKey] === row[valueKey])
    if (selectedRow) {
      // 如果在当前视图则取消选中
      tableRef.value.cipTableRef.toggleRowSelection(selectedRow, false)
    }
  }

  const handleSelect = (pageSelected, changeRow) => {
    const valueKey = optionProps.value.value
    const index = selectedRows.value.findIndex(row => row[valueKey] === changeRow[valueKey])
    if (index > -1) {
      selectedRows.value.splice(index, 1)
    } else {
      selectedRows.value.push(changeRow)
    }
  }

  const handleSelectAll = (changeRows) => {
    const valueKey = optionProps.value.value
    if (changeRows.length > 0) {
      // 当前页全选
      changeRows.forEach(changeRow => {
        const index = selectedRows.value.findIndex(row => row[valueKey] === changeRow[valueKey])
        if (index > -1) {
          // 将原先在的删除，然后添加到最后一位
          selectedRows.value.splice(index, 1)
        }
        selectedRows.value.push(changeRow)
      })
    } else {
      // 当前页已选中的全部删除
      itemList.value.forEach(changeRow => {
        const index = selectedRows.value.findIndex(row => row[valueKey] === changeRow[valueKey])
        if (index > -1) {
          selectedRows.value.splice(index, 1)
        }
      })
    }
  }

  // 自带设置

  return {
    tableRef,
    selectedRows,
    optionProps,
    setCurrentSelect,
    removeSelectRow,
    handleSelect,
    handleSelectAll
  }
}
