import CipPageCurd from '@xigefish/components/cip-page-curd'
import { npmService } from '@/api/npm'
import { tableColumns, searchFieldList } from './config'
export default {
  setup () {
    return () => <CipPageCurd
      tableAttrs={{ border: false }}
      searchFieldList={searchFieldList}
      tableColumns={tableColumns}
      entity={npmService}
      withHandle={false}
      withTableHandle={false}
    />
  }
}
