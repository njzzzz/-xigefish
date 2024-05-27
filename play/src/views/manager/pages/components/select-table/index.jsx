import { reactive, ref } from 'vue'
import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import CipSelectTable from '@xigefish/components/cip-select-table'
import { tableColumns, searchFieldList } from '@/views/manager/pages/curd/config'
import { accountManagerService } from '@/api'
export default {
  setup () {
    const optionProps = { value: 'id', label: 'userName', getLabel: (row) => `${row.userName}` }
    const selectExample = reactive({
      multiple0: [{ id: 1, userName: '测试' }],
      multiple1: { id: 2, userName: '测试' }
    })
    // 测试异步数据
    accountManagerService.info({ id: 1 }).then(res => {
      selectExample.multiple0 = [res.data]
    })

    accountManagerService.info({ id: 2 }).then(res => {
      selectExample.multiple1 = res.data
    })

    accountManagerService.page({ }, { offset: 0, limit: 20 }).then(res => {
      selectExample.direction = res.data
    })
    const defaultSearchModel = ref({})
    setTimeout(() => {
      defaultSearchModel.value = { username: 'xie' }
    }, 10000)
    return () => <LayoutInfoThemeOne class='svg-icon-example'>
      {
        [true, false].map((multiple, idx) =>
          <ExampleBlock title={multiple ? '多选' : '单选'}>
            选中值: {JSON.stringify(selectExample[`multiple${idx}`])}
            <CipSelectTable
              v-model={selectExample[`multiple${idx}`]}
              defaultSearchModel={defaultSearchModel.value}
              key={multiple}
              multiple={multiple}
              tableColumns={tableColumns}
              entity={accountManagerService}
              searchFieldList={searchFieldList}
              optionProps={optionProps}
            />
          </ExampleBlock>
        )
      }

      {
        [
          'row',
          'row-reverse',
          'column',
          'column-reverse'
        ].map(direction => <ExampleBlock title={'direction:' + direction}>
          <CipSelectTable
            key={direction}
            direction={direction}
            v-model={selectExample.direction}
            entity={accountManagerService}
            tableColumns={tableColumns}
            searchFieldList={searchFieldList}
            optionProps={optionProps}
          />
        </ExampleBlock>
        )
      }

      <ExampleBlock title={'隐藏搜索按钮'}>
        <CipSelectTable
          v-model={selectExample.direction}
          entity={accountManagerService}
          tableColumns={tableColumns}
          searchFieldList={searchFieldList}
          optionProps={optionProps}
          hideSearch={true}
        />
      </ExampleBlock>

      <ExampleBlock title={'隐藏分页'}>
        <CipSelectTable
          v-model={selectExample.direction}
          entity={accountManagerService}
          tableColumns={tableColumns}
          searchFieldList={searchFieldList}
          optionProps={optionProps}
          withPagination={false}
        />
      </ExampleBlock>

      <ExampleBlock title={'设置是否可选'}>
        <CipSelectTable
          v-model={selectExample.selectable1}
          entity={accountManagerService}
          tableColumns={tableColumns}
          searchFieldList={searchFieldList}
          optionProps={optionProps}
          withPagination={false}
          selectable={(row) => row.id % 2 !== 0}
        />
        <CipSelectTable
          v-model={selectExample.selectable2}
          multiple={false}
          entity={accountManagerService}
          tableColumns={tableColumns}
          searchFieldList={searchFieldList}
          optionProps={optionProps}
          withPagination={false}
          selectable={(row) => row.id % 2 !== 0}
        />
      </ExampleBlock>
    </LayoutInfoThemeOne>
  }
}
