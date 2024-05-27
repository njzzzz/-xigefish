import { CipTable } from '@xigefish/d-render'
import CipPageLayoutHandle from '@xigefish/page-layout/handle'
import { tableColumns } from './config'
import { getExpendData, generateSpanMethod } from '@xigefish/d-render/cip-table/util'
export default {
  setup () {
    const data = [
      {
        classId: 1,
        classRoom: '一年一班',
        students: [
          { id: 1, name: '王一', no: 'wangyi' },
          { id: 2, name: '张三', no: 'zangsan' },
          { id: 3, name: '李四', no: 'lisi' }
        ]
      },
      {
        classId: 2,
        classRoom: '一年二班',
        students: [
          { id: 1, name: '王一1', no: 'wangyi1' },
          { id: 2, name: '张三2', no: 'zangsan2' },
          { id: 3, name: '李四3', no: 'lisi3' }
        ]
      }
    ]

    const noSpanColumns = ['students_name', 'students_no']
    const spanMethod = generateSpanMethod(({ row, column, rowIndex, columnIndex }) => {
      return noSpanColumns.includes(column.property)
    })
    const expandData = getExpendData(data, 'students')

    return () =>
      <CipPageLayoutHandle hideHandler={true}>
        <CipTable
          border
          data={expandData}
          columns={tableColumns}
          spanMethod={spanMethod}
        >
        </CipTable>
      </CipPageLayoutHandle>
  }
}
