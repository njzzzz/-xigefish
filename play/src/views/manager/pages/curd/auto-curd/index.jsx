import CipPageCurd from '@xigefish/components/cip-page-curd'
import { useRouter } from 'vue-router'
import { searchFieldList, tableColumns, formFieldList } from '../config'
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
      searchFieldList={searchFieldList}
      tableColumns={tableColumns}
      formFieldList={formFieldList}
      formGrid={2}
      layoutNoPadding={false}
      entity={accountManagerService}
      batchDelete={false}
      formLabelWidth={'80px'}
      itemType={'账户'}
      permission={{ info: '__hidden_info' }}
    >
      {{
        'table-handle-prepend': ({ row, $index }) => <>
          {$index === 2 && <CipButtonText onClick={() => {}}>Test</CipButtonText>}
          <CipButtonText onClick={() => toInfo(row)}>查看</CipButtonText>
        </>
      }}
       {/* {{ */}
       {/*  'table-handle': ({ row, editItem, deleteItem }) => <> */}
       {/*    <CipButtonText onClick={() => toInfo(row)}>查看</CipButtonText> */}
       {/*    <CipButtonText needPop={true} onClick={(e, confirmed) => deleteItem(row, row.name, false, confirmed)}>删除</CipButtonText> */}
       {/*    <CipButtonText onClick={() => editItem(row)}>编辑</CipButtonText> */}
       {/*    <CipButtonText needPop={true} onClick={() => deleteItem(row, row.name)}>删除1</CipButtonText> */}
       {/*  </> */}
       {/* }} */}
    </CipPageCurd>
  }
}
