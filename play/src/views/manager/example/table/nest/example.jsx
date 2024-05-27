import CipTable from '@xigefish/d-render/cip-table'
import CipTableButton from '@xigefish/components/cip-table-button/index'
import { useTable } from '../use-table'
import { tableColumns } from './config'
export default {
  setup () {
    const { tableData } = useTable()
    const tableHandle = ({ $index }) => {
      const buttonText = ['查看']
      return buttonText.map(text => <CipTableButton key={text}>
          {text}
        </CipTableButton>)
    }
    const tableExpand = ({ row, index }) => {
      return <div>嵌套内容</div>
    }
    return () => <CipTable
      data={tableData.value}
      columns={tableColumns}
      withTableHandle={true}
      handlerWidth='160px'>
        {{
          $handler: tableHandle,
          expand: tableExpand
        }}
    </CipTable>
  }
}
