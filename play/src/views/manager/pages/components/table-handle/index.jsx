import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import CipTableButton from '@xigefish/components/cip-table-button'
import CipTableHandler from '@xigefish/components/cip-table-handler'
export default {
  name: 'TableHandle',
  setup () {
    const typeList = ['primary', 'warning', 'info', 'danger']
    return () => <LayoutInfoThemeOne class='svg-icon-example'>
      <ExampleBlock>
        <CipTableHandler row={{}}>
          {
            typeList.map((type) => <CipTableButton key={type} type={type}>表格按钮</CipTableButton>)
          }
        </CipTableHandler>
      </ExampleBlock>
      <ExampleBlock>
        <CipTableHandler limit={4} row={{}}>
          {
            typeList.map((type) => <CipTableButton key={type} type={type} disabled={true}>表格按钮</CipTableButton>)
          }
        </CipTableHandler>
        <CipTableHandler limit={2} row={{}}>
          {
            typeList.map((type) => <CipTableButton key={type} type={type} disabled={true}>表格按钮</CipTableButton>)
          }
        </CipTableHandler>
      </ExampleBlock>
      <ExampleBlock>
        <CipTableHandler limit={2} row={{}}>
          <CipTableButton >表格按钮</CipTableButton>
          <CipTableButton >表格按钮</CipTableButton>
          {false && <CipTableButton >表格按钮</CipTableButton>}
        </CipTableHandler>
        <CipTableHandler limit={2} row={{}}>
          <div>
            <CipTableButton >表格按钮</CipTableButton>
            <CipTableButton >表格按钮</CipTableButton>
          </div>
          <div>
            <div>
              <div>
                <CipTableButton >表格按钮</CipTableButton>
              </div>
            </div>
          </div>
        </CipTableHandler>
      </ExampleBlock>
    </LayoutInfoThemeOne>
  }
}
