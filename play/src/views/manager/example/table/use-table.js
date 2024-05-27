import { ref } from 'vue'
import { fetchTableDataService } from '@/api'
export function useTable () {
  const tableData = ref([])
  fetchTableDataService.page({}, { offset: 0, limit: 20 }).then(res => {
    tableData.value = res.data
  })
  return {
    tableData
  }
}
