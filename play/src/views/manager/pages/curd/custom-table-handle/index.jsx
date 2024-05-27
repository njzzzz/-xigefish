import CipPageCurd from '@xigefish/components/cip-page-curd'
import CipTableButton from '@xigefish/components/cip-table-button'
import { searchFieldList, tableColumns, formFieldList } from '../config'
import { accountManagerService } from '@/api'
export default {
  setup () {
    return () => <CipPageCurd
      searchFieldList={searchFieldList}
      tableColumns={tableColumns}
      formFieldList={formFieldList}
      entity={accountManagerService}
      batchDelete={true}
      formLabelWidth={'80px'}
      tabeleHandleWidth={'120px'}
      itemType={'账户'}
    >
      {{
        'table-handle': ({ row, editItem, showItem, deleteItem }) => <>
          <CipTableButton onClick={() => showItem(row)}>查看</CipTableButton>
          { row.status && <CipTableButton onClick={() => editItem(row)}>编辑</CipTableButton>}
          <CipTableButton onClick={() => showItem(row)}>{row.status ? '冻结' : '解冻'}</CipTableButton>
          <CipTableButton disabled={!row.status} onClick={() => deleteItem(row, row.userName)}>删除</CipTableButton>
        </>
      }}
    </CipPageCurd>
  }
}
