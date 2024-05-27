import CipPageCurd from '@xigefish/components/cip-page-curd'
import { searchFieldList, tableColumns, formFieldList } from '../config'
import { accountManagerService } from '@/api'
export default {
  setup () {
    return () => <CipPageCurd
      outParams={{ id: 4 }}
      defaultSearchFilter={ { username: '123' }}
      searchFieldList={searchFieldList}
      tableColumns={tableColumns}
      formFieldList={formFieldList}
      entity={accountManagerService}
      batchDelete={true}
      formLabelWidth={'80px'}
      itemType={'账户'}
    />
  }
}
