import CipTable from '@xigefish/d-render/cip-table'
import CipTableButton from '@xigefish/components/cip-table-button/index'
import { tableColumns } from './config'
export default {
  setup () {
    const tableHandle = ({ $index }) => {
      const buttonText = ['查看']
      return buttonText
        .map(text => <CipTableButton key={text}>
          {text}
        </CipTableButton>)
    }
    return () => <CipTable
      data={[]}
      columns={tableColumns}
      withTableHandle={true}
      handlerWidth='160px'>
        {{
          $handler: tableHandle
        }}
    </CipTable>
  }
}
