import { ref } from 'vue'

/**
 *
 * 分页列表选择
 * @param itemList {ToRef<*[]>} table列表
 * @param primaryKey {String} 行主键
 * @param fn {Function} 更新值后的回调函数
 * @return {{onSelectAll: onSelectAll, getSelectedList: (function(): Array<UnwrapRefSimple<*>>), cacheSelectedList: ToRef<*[]>, toggleSelectButton: toggleSelectButton, onSelect: onSelect}}
 */
export const useTableCacheSelect = (itemList, primaryKey, fn) => {
  const cacheSelectedList = ref([])

  const toggleSelectButton = (item, handleType = 'standard') => { // type: ['standard','add','remove']
    const index = cacheSelectedList.value.findIndex(value => value[primaryKey] === item[primaryKey])
    if (index > -1) {
      if (handleType !== 'add') {
        cacheSelectedList.value.splice(index, 1)
      }
    } else {
      if (handleType !== 'remove') {
        cacheSelectedList.value.push(item)
      }
    }
    // eslint-disable-next-line no-unused-expressions
    fn?.(cacheSelectedList.value)
  }
  const selectPageItem = (val) => {
    val.forEach(button => {
      toggleSelectButton(button, 'add')
    })
  }
  const clearPageItem = () => {
    const list = itemList.value
    list.forEach(button => {
      toggleSelectButton(button, 'remove')
    })
  }

  const onSelect = (val, row) => { // table select 响应时间
    toggleSelectButton(row)
  }
  const onSelectAll = (val) => { // table select-all 响应时间
    if (val.length > 0) {
      selectPageItem(val)
    } else {
      clearPageItem()
    }
  }
  const getSelectedList = () => {
    return cacheSelectedList.value
  }
  return {
    cacheSelectedList,
    toggleSelectButton,
    onSelect,
    onSelectAll,
    getSelectedList
  }
}
