import CipTable from '@xigefish/d-render/cip-table'
import { useTable } from '../use-table'
import { tableColumns } from './config'
export default {
  setup () {
    const { tableData } = useTable()

    return () => <CipTable
      data={tableData.value}
      columns={tableColumns}
      border={true}>
    </CipTable>
  }
}
