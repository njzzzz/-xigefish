import CipPageCurd from '@xigefish/components/cip-page-curd'
import { useRouter } from 'vue-router'
import { inputSearchFieldList, tableColumns, formFieldList } from '../config'
import { accountManagerService } from '@/api'
import CipButtonText from '@xigefish/components/cip-button-text'
import { toUpperFirstCase } from '@xigefish/d-render-shared'
export default {
  props: {
    layoutTheme: String
  },
  setup (props) {
    const router = useRouter()
    const toInfo = ({ id }) => {
      const theme = toUpperFirstCase(props.layoutTheme || 'basic')
      router.push({ name: `curd${theme}ReallyInfo`, params: { id } })
    }
    return () => <CipPageCurd
      layoutTheme={props.layoutTheme}
      searchFieldList={inputSearchFieldList}
      tableColumns={tableColumns}
      formFieldList={formFieldList}
      entity={accountManagerService}
      simpleSearchModel
      batchDelete={false}
      formLabelWidth={'80px'}
      itemType={'账户'}
    >
       {{
         'table-handle': ({ row }) => <CipButtonText onClick={() => toInfo(row)}>查看</CipButtonText>
       }}
    </CipPageCurd>
  }
}
