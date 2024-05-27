import { ref } from 'vue'
import { ElTooltip, ElSwitch } from 'element-plus'
import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import CipSearchForm from '@xigefish/d-render/cip-search-form'
import ExampleTabs from '@/components/example-page'
import { createSearchFieldList } from './config'
import CipMessage from '@xigefish/components/cip-message'
import SizeExample from '@/views/manager/example/search-form/size'
// import { componentScheme } from './component.scheme'
// import ComponentController from '@/components/component-controller'

export default {
  name: 'SearchInput',
  setup () {
    // const testProps = ref({
    //   fieldList: createSearchFieldList(3)
    // })
    // const testEvents = ref()

    const defaultModel = ref({ pid: 1 })
    Promise.resolve().then(() => {
      defaultModel.value = { pid: 2 }
    })
    const searchFilter = ref({ })
    const handleSearch = (type) => {
      console.log(Date.now())
      // 单独使用searchForm时需要手动合并搜索条件和默认条件
      const params = { ...searchFilter.value, ...defaultModel.value }
      console.log(type) // 操作类型 重置or搜索
      CipMessage({
        type: 'info',
        dangerouslyUseHTMLString: true,
        message: `<div style='display: flex;align-items: flex-start;'>
        搜索条件是<pre style='margin: 0 0 0 10px;'>${JSON.stringify(params, null, 2)}</pre>
        </div>`
      })
    }
    const completeRow = ref(false)

    const tooltip = () => <ElTooltip effect='dark' placement='top'>
      {{
        content: () => '单独使用searchForm组件时需要在search事件中手动合并搜索条件和默认条件',
        default: () => <i class={'el-icon-question'} style={'margin-right:2px;line-height: 24px;'} />
      }}
    </ElTooltip>

    return () => <LayoutInfoThemeOne>
      <ExampleTabs>
        {{
          example: () => <>
            <ExampleBlock title='切换模式'>
              <ElSwitch v-model={completeRow.value}/>
            </ExampleBlock>
            <ExampleBlock title='只有一个搜索条件'>
              <CipSearchForm
                v-model:model={searchFilter.value}
                fieldList={createSearchFieldList(1)}>
                completeRow={completeRow.value}
              </CipSearchForm>
            </ExampleBlock>
            <ExampleBlock title='label位置在上方'>
              <CipSearchForm
                v-model:model={searchFilter.value}
                fieldList={createSearchFieldList(7)}
                completeRow={completeRow.value}
                labelPosition='top'>
              </CipSearchForm>
            </ExampleBlock>
            <ExampleBlock title='隐藏重置按钮'>
              <CipSearchForm
                v-model:model={searchFilter.value}
                fieldList={createSearchFieldList(6)}
                completeRow={completeRow.value}
                searchReset={false}>
              </CipSearchForm>
            </ExampleBlock>
            <ExampleBlock title='自定义搜索按钮文案'>
              <CipSearchForm
                v-model:model={searchFilter.value}
                fieldList={createSearchFieldList(6)}
                completeRow={completeRow.value}
                searchButtonText='自定义'>
              </CipSearchForm>
            </ExampleBlock>
            <ExampleBlock title='隐藏搜索按钮'>
              <CipSearchForm
                v-model:model={searchFilter.value}
                fieldList={createSearchFieldList(6)}
                completeRow={completeRow.value}
                hideSearch={true}>
              </CipSearchForm>
            </ExampleBlock>
            <ExampleBlock title='自定义grid'>
              <CipSearchForm
                v-model:model={searchFilter.value}
                fieldList={createSearchFieldList(7)}
                completeRow={completeRow.value}
                grid={5}>
              </CipSearchForm>
            </ExampleBlock>
            <ExampleBlock title='隐藏展开/收缩'>
              <CipSearchForm
                v-model:model={searchFilter.value}
                fieldList={createSearchFieldList(6)}
                completeRow={completeRow.value}
                collapse={false}>
              </CipSearchForm>
            </ExampleBlock>

            <ExampleBlock title='尺寸' code={SizeExample.Raw}>
              <SizeExample />
            </ExampleBlock>

            <ExampleBlock title='重置时载入默认的搜索条件'>
              <div style='display: flex;margin: 5px 0;'>
                {tooltip()}
                <span>默认条件：</span>
                <pre style='margin: 0;'>
                  { JSON.stringify(defaultModel.value, null, 2) }
                </pre>
              </div>
              <CipSearchForm
                v-model:model={searchFilter.value}
                fieldList={createSearchFieldList(1)}
                defaultModel={defaultModel.value} // 重置时载入默认的搜索条件
                completeRow={completeRow.value}
                onSearch={handleSearch}>
              </CipSearchForm>
            </ExampleBlock>
          </>,
          try: () => <>
            <ExampleBlock title={'试一试'}>
              {/* <CipSearchForm
                {...testProps.value}
                {...testEvents.value}
                v-model:model={testProps.value.model}/> */}
            </ExampleBlock>
            {/* <ComponentController
              v-model:propsConfig={testProps.value}
              v-model:eventsConfig={testEvents.value}
              scheme={componentScheme}/> */}
          </>
        }}
      </ExampleTabs>
    </LayoutInfoThemeOne>
  }
}
