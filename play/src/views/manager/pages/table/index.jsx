import { ref } from 'vue'
import CipTable from '@xigefish/d-render/cip-table'
import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import { tableColumns } from './config'
import CipTableButton from '@xigefish/components/cip-table-button'
import ExampleBlock from '@/components/example-block'
export default {
  setup () {
    const itemList = ref([
      { input: '我是一个单行输入文本', textarea: '多行输入文本\n你好啊！', select: 1, number: 10000 },
      { input: '我是一个单行输入文本', textarea: '多行输入文本\n你好啊！', select: 1, number: 10000 },
      { input: '我是一个单行输入文本', textarea: '多行输入文本\n你好啊！', select: 1, number: 10000 }
    ])
    return () => <LayoutInfoThemeOne>
      <ExampleBlock>
        <CipTable
          data={itemList.value}
          columns={tableColumns}
          withTableHandle={true}
        >
          {{
            $handler: () => <>
              <CipTableButton >查看</CipTableButton>
              <CipTableButton >编辑</CipTableButton>
              <CipTableButton type={'danger'}>删除</CipTableButton>
            </>
          }}
        </CipTable>
      </ExampleBlock>
    </LayoutInfoThemeOne>
  }
}
