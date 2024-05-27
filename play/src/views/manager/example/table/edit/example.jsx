import CipInput from '@xigefish/components/cip-input/index'
import CipTableButton from '@xigefish/components/cip-table-button/index'
import { ElTable, ElTableColumn } from 'element-plus'
import { useTable } from '../use-table'
export default {
  setup () {
    const { tableData } = useTable()

    const handleEdit = (row) => {
      row.isEdit = true
    }
    const handleComplete = (row) => {
      row.isEdit = false
    }
    const defaultSolt = ({ row, column }) => row.isEdit
      ? <CipInput v-model={row[column.property]}></CipInput>
      : <div>{row[column.property]}</div>

    return () => (
      <ElTable class={'cip-table'} size="default" data={tableData.value}>
        <ElTableColumn
          style="display: flex;"
          label="表格"
          prop="text"
        ></ElTableColumn>
        {['text1', 'text2', 'text3', 'text4'].map((i) => (
          <ElTableColumn
            key={i}
            style="display: flex;"
            label="表格"
            prop="text1"
          >
            {{
              default: defaultSolt
            }}
          </ElTableColumn>
        ))}
        <ElTableColumn fix="right" label="操作">
          {{
            default: ({ row }) =>
              row.isEdit
                ? <>
                  <CipTableButton onClick={() => { handleComplete(row) }}>完成</CipTableButton>
                  <CipTableButton onClick={() => { handleComplete(row) }}>取消</CipTableButton>
                </>
                : <CipTableButton onClick={() => { handleEdit(row) }}>编辑</CipTableButton>
          }}
        </ElTableColumn>
      </ElTable>
    )
  }
}
