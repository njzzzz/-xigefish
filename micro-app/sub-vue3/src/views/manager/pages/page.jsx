import CipPageCurd from '@xigefish/components/cip-page-curd'
import CipButton from '@xigefish/components/cip-button'
import { generateFieldList } from '@xigefish/d-render'
import { useRouter } from 'vue-router'
export default {

  setup () {
    const router = useRouter()
    const vService = {
      page: () => Promise.resolve({ data: [{ name: 'xie' }] })
    }
    return () => <CipPageCurd
      entity={vService}
      withSearch={true}
      searchAttrs={{ grid: 6 }}
      searchFieldList={generateFieldList({

        data3: { type: 'date', span: 6, viewType: 'datetime' },
        data4: { type: 'date', viewType: 'datetime' }

      })}
      tableColumns={[{ key: 'name', config: {} }]}
    >
      {{
        'handle-buttons': () => <>
          <CipButton onClick={() => router.push({ name: 'subPage', params: { id: '1' } })}>测试子页面1</CipButton>
          <CipButton onClick={() => router.push({ name: 'subPage', params: { id: '2' } })}>测试子页面2</CipButton>
          <CipButton onClick={() => router.push({
            name: 'subPage',
            params: { id: '2' },
            query: { _igq: true, use: 2 }
          })}>测试子页面2query</CipButton>
        </>
      }}
    </CipPageCurd>
  }
}
