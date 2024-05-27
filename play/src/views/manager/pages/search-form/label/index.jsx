import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import CipSearchForm from '@xigefish/d-render/cip-search-form'
import { defineSearchFieldConfig, generateFieldList } from '@xigefish/d-render-shared'
import ExampleTabs from '@/components/example-page'
import ExampleBlock from '@/components/example-block'
const fieldList = generateFieldList(defineSearchFieldConfig({
  input: { label: '搜索项' }
}))
const fieldList1 = (len) => new Array(len)
  .fill(fieldList[0])
  .map((v, i) => ({ key: v.key + '' + i, config: { ...v.config, label: v.config.label + i } }))
export default {
  setup () {
    return () => <LayoutInfoThemeOne>
      <ExampleTabs>
        {{
          example: () => <ExampleBlock title='labelPosition'>
            {
              ['top', 'left', 'right'].map(labelPosition => <CipSearchForm
                key={labelPosition}
                labelWidth={'80px'}
                model={{}}
                labelPosition={labelPosition}
                fieldList={fieldList}
                style={{ margin: '6px 0' }}
              />)
            }
            {
              ['top', 'left', 'right'].map(labelPosition => <CipSearchForm
                key={labelPosition}
                labelWidth={'80px'}
                model={{}}
                labelPosition={labelPosition}
                fieldList={fieldList1(3)}
                style={{ margin: '6px 0' }}
              />)
            }
          </ExampleBlock>
        }}
      </ExampleTabs>
    </LayoutInfoThemeOne>
  }
}
