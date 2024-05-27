import { PlInfo as LayoutInfoThemeOne } from '@xigefish/page-layout'
import ExampleBlock from '@/components/example-block'
import ExampleTabs from '@/components/example-page'
import CipAutocomplete from '@xigefish/components/cip-autocomplete'
import CipSearchForm from '@xigefish/d-render/cip-search-form'
import CipPageCurd from '@xigefish/components/cip-page-curd'
import { ElSelect, ElOption } from 'element-plus'
import { formFieldList, column, tableList } from './config'
import { accountManagerService } from '@/api'
import { ref } from 'vue'
export default {
  setup () {
    const query = ref('')
    const autocompleteRef = ref()
    const condition = ref('')
    const searchFilter = ref({})
    const loadAll = () => {
      return [
        { value: 'vue', link: 'https://github.com/vuejs/vue' },
        { value: 'element', link: 'https://github.com/ElemeFE/element' },
        { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
        { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
        { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
        { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
        { value: 'babel', link: 'https://github.com/babel/babel' }
      ]
    }
    const querySearchAsync = () => {
      return loadAll()
    }
    const handleClick = () => {
      console.log(query.value, autocompleteRef.value.autocompleteRef)
    }
    return () => <LayoutInfoThemeOne>
      <ExampleTabs>
        {{
          example: <>
            <ExampleBlock>
              <div>常规</div>
              <CipAutocomplete v-model={query.value} fetch-suggestions={querySearchAsync} ref={autocompleteRef}>
              </CipAutocomplete>
            </ExampleBlock>
            <ExampleBlock>
              <div>带条件搜索</div>
              <CipAutocomplete v-model={query.value} fetch-suggestions={querySearchAsync} ref={autocompleteRef} width={360}>
                {{
                  prepend: () => <ElSelect v-model={condition.value} style="width: 120px">
                    <ElOption value="条件一">条件一</ElOption>
                  </ElSelect>
                }}
              </CipAutocomplete>
              <div onClick={handleClick}>测试</div>
            </ExampleBlock>
            <ExampleBlock>
              <CipSearchForm
                v-model:model={searchFilter.value}
                field-list={formFieldList}
                label-position="top"
              ></CipSearchForm>
            </ExampleBlock>
            {
              tableList.map((item, index) => <ExampleBlock key={index}>
                <span>{item.title}</span>|<span style={{ fontSize: '12px' }}>{item.subTitle}</span>
                <CipPageCurd
                  searchFieldList={formFieldList.slice(0, item.span)}
                  entity={accountManagerService}
                  tableColumns={column}
                  withHandle={item.withHandle}
                ></CipPageCurd>
              </ExampleBlock>)
            }
          </>
        }}
      </ExampleTabs>
    </LayoutInfoThemeOne>
  }
}
