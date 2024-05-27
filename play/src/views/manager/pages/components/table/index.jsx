import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import ExampleTabs from '@/components/example-page'
import BaseTables from '@/views/manager/example/table/base'
import EditTables from '@/views/manager/example/table/edit'
import FixedColumnTables from '@/views/manager/example/table/fixed-column'
import NestTables from '@/views/manager/example/table/nest'
import SmallTables from '@/views/manager/example/table/small'
import EmptyTables from '@/views/manager/example/table/empty'
import MultiStageTableHeadTables from '@/views/manager/example/table/multi-stage-table-head'
import PhotoTables from '@/views/manager/example/table/show-photo'
import MultiLayerContentTables from '@/views/manager/example/table/multi-layer-content'
import BorderTables from '@/views/manager/example/table/border'

export default {
  setup () {
    return () => <LayoutInfoThemeOne>
      <ExampleTabs>
        {{
          example: () => <>
            <ExampleBlock code={BaseTables.Raw} title='基础表格'>
              <BaseTables />
            </ExampleBlock>
            <ExampleBlock code={EditTables.Raw} title='编辑状态'>
              <EditTables />
            </ExampleBlock>
            <ExampleBlock code={FixedColumnTables.Raw} title='固定列表格'>
              <FixedColumnTables />
            </ExampleBlock>
            <ExampleBlock code={NestTables.Raw} title='嵌套表格'>
              <NestTables />
            </ExampleBlock>
            <ExampleBlock code={SmallTables.Raw} title='小表格'>
              <SmallTables />
            </ExampleBlock>
            <ExampleBlock code={EmptyTables.Raw} title='数据为空'>
              <EmptyTables />
            </ExampleBlock>
            <ExampleBlock code={MultiStageTableHeadTables.Raw} title='多层表头'>
              <MultiStageTableHeadTables />
            </ExampleBlock>
            <ExampleBlock code={PhotoTables.Raw} title='照片显示'>
              <PhotoTables />
            </ExampleBlock>
            <ExampleBlock code={MultiLayerContentTables.Raw} title='多层内容'>
              <MultiLayerContentTables />
            </ExampleBlock>
            <ExampleBlock code={BorderTables.Raw} title='描边型表格'>
              <BorderTables />
            </ExampleBlock>
          </>
        }}
      </ExampleTabs>
    </LayoutInfoThemeOne>
  }
}
