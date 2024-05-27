import { ref } from 'vue'
import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import { componentScheme } from '@xigefish/components/cip-pagination/component.scheme'
import ComponentController from '@/components/component-controller'
import ExampleTabs from '@/components/example-page'
import CipPagination from '@xigefish/components/cip-pagination'
import UIStandard from '@/views/manager/example/pagination/ui-standard'
import { ElSwitch } from 'element-plus'
import CipConfigProvide from '@xigefish/components/cip-config-provide'
import { basicConfig, backgroundConfig, switchConfig, compactConfig, eventConfig } from './config'
export default {
  name: 'pagination',
  setup () {
    const refresh = (offset) => {
      console.log('handlePageChange的refresh事件' + offset)
    }
    const changeOffset = (config, offset) => {
      config.currentPage = offset / config.limit + 1
    }
    const testProps = ref({
      currentPage: 2,
      limit: 10,
      total: 120
    })
    const testEvents = ref({
      'onUpdate:offset': (offset) => {
        changeOffset(testProps.value, offset)
      },
      onRefresh: (offset) => { console.log('refresh', offset) }
    })

    return () => <LayoutInfoThemeOne>
      <ExampleTabs>
        {{
          example: () => <>
            <ExampleBlock code={UIStandard.Raw} title={'UI标准'}>
              <UIStandard/>
            </ExampleBlock>
            <ExampleBlock title={basicConfig.title}>
              <CipPagination
                total={basicConfig.total}
                currentPage={basicConfig.currentPage}
                v-model:limit={basicConfig.limit}
                onUpdate:offset={(offset) => changeOffset(basicConfig, offset)}
              />
            </ExampleBlock>
            <ExampleBlock title={backgroundConfig.title}>
              <CipPagination
                total={backgroundConfig.total}
                currentPage={backgroundConfig.currentPage}
                background={backgroundConfig.background}
                v-model:limit={backgroundConfig.limit}
                onUpdate:offset={(offset) => changeOffset(backgroundConfig, offset)}
              />
            </ExampleBlock>
            <ExampleBlock title={switchConfig.title}>
              <ElSwitch v-model={switchConfig.hideOnSinglePage}></ElSwitch>
              <CipPagination
                total={switchConfig.total}
                currentPage={switchConfig.currentPage}
                hideOnSinglePage={switchConfig.hideOnSinglePage}
                v-model:limit={switchConfig.limit}
                onUpdate:offset={(offset) => changeOffset(switchConfig, offset)}
              />
            </ExampleBlock>
            <ExampleBlock title={compactConfig.title}>
              <CipConfigProvide paginationCompact={true}>
                <CipPagination
                  total={compactConfig.total}
                  currentPage={compactConfig.currentPage}
                  v-model:limit={compactConfig.value}
                  onUpdate:offset={(offset) => changeOffset(compactConfig, offset)}
                />
              </CipConfigProvide>
            </ExampleBlock>
            <ExampleBlock title={eventConfig.title}>
              <CipPagination
                total={eventConfig.total}
                currentPage={eventConfig.currentPage}
                v-model:limit={eventConfig.limit}
                onRefresh={refresh}
                onUpdate:offset={(offset) => changeOffset(eventConfig, offset)}
              />
            </ExampleBlock>
          </>,
          try: () => <>
            <ExampleBlock title={'试一试'}>
              <CipPagination
                v-model:limit={testProps.value.limit}
                {...testProps.value}
                {...testEvents.value}
              />
            </ExampleBlock>
            <ComponentController
              v-model:propsConfig={testProps.value}
              v-model:eventsConfig={testEvents.value}
              scheme={componentScheme}
            />
          </>
        }}
      </ExampleTabs>

    </LayoutInfoThemeOne>
  }
}
