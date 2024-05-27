import CipTable from '@xigefish/d-render/cip-table'
import { useTable } from '../use-table'
import { tableColumns } from './config'
export default {
  setup () {
    const { tableData } = useTable()

    const objectSpanMethod = ({
      row,
      column,
      rowIndex,
      columnIndex
    }) => {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }

    return () => <CipTable
      data={tableData.value}
      columns={tableColumns}
      spanMethod={objectSpanMethod}
      border={true}>
    </CipTable>
  }
}
