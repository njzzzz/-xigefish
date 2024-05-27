import { ref } from 'vue'
import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import CipSearchInput from '@xigefish/components/cip-search-input'
import { componentScheme } from '@xigefish/components/cip-search-input/component.scheme'
import ComponentController from '@/components/component-controller'
import ExampleTabs from '@/components/example-page'

export default {
  name: 'SearchInput',
  setup () {
    const testSlots = ref({})
    const testProps = ref({})
    const testEvents = ref({})
    return () => <LayoutInfoThemeOne class='svg-icon-example'>

      <ExampleTabs>
        {{
          example: () => <>
            <ExampleBlock>
              <CipSearchInput></CipSearchInput>
            </ExampleBlock>

            <ExampleBlock title={'按钮文字'}>
              <CipSearchInput buttonText={'查询'}></CipSearchInput>
              <CipSearchInput style={{ marginTop: '12px' }}>
                {{ buttonText: () => <span>查询</span> }}
              </CipSearchInput>
            </ExampleBlock>

            <ExampleBlock title={'加载状态'}>
              <CipSearchInput loading={true}></CipSearchInput>
            </ExampleBlock>

            <ExampleBlock title={'append插槽'}>
              <CipSearchInput style={{ marginTop: '12px' }}>
                {{
                  append: () => <span>附加信息</span>
                }}
              </CipSearchInput>
            </ExampleBlock>
          </>,
          try: () => <>
            <ExampleBlock title={'试一试'}>
              <CipSearchInput
                {...testProps.value}
                v-slots={testSlots.value}
                {...testEvents.value}
                v-model={testProps.value.modelValue}/>
            </ExampleBlock>
            <ComponentController
              v-model:propsConfig={testProps.value}
              v-model:slotsConfig={testSlots.value}
              v-model:eventsConfig={testEvents.value}
              scheme={componentScheme}
            />
          </>
        }}
      </ExampleTabs>
    </LayoutInfoThemeOne>
  }
}
