import { ElCol, ElRow } from 'element-plus'
import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import ExampleTabs from '@/components/example-page'
import CipSwitch from '@xigefish/d-render-plugin-cci/esm/input/basic/switch'
import BaseSwitch from '@/views/manager/example/switch/example'
import { reactive } from 'vue'
export default {
  setup () {
    const switchModel = reactive({
      defaultOpen: true,
      defaultClose: false,
      hoverOpen: true,
      hoverClose: false,
      disabledOpen: true,
      disabledClose: false
    })
    return () => (
      <LayoutInfoThemeOne>
        <ExampleTabs>
          {{
            example: () => (
              <>
                <ExampleBlock code={BaseSwitch.Raw}>
                  <ElRow>
                    <ElCol span={3} />
                    <ElCol span={3}>开</ElCol>
                    <ElCol span={3}>关</ElCol>
                  </ElRow>
                  <ElCol>
                    <ElRow>
                      <ElCol span={3}>默认</ElCol>
                      <ElCol span={3}><CipSwitch v-model={switchModel.defaultOpen} size="small" config={{ activeText: '是', inactiveText: '否' }}/></ElCol>
                      <ElCol span={3}><CipSwitch v-model={switchModel.defaultClose} size="small"/></ElCol>
                    </ElRow>
                    <ElRow>
                      <ElCol span={3}>悬浮(鼠标放置查看)</ElCol>
                      <ElCol span={3}><CipSwitch v-model={switchModel.hoverOpen} /></ElCol>
                      <ElCol span={3}><CipSwitch v-model={switchModel.hoverClose} /></ElCol>
                    </ElRow>
                    <ElRow>
                      <ElCol span={3}>禁用</ElCol>
                      <ElCol span={3}><CipSwitch v-model={switchModel.disabledOpen} disabled config={{ activeText: '是', inactiveText: '否' }}/></ElCol>
                      <ElCol span={3}><CipSwitch v-model={switchModel.disabledClose} disabled /></ElCol>
                    </ElRow>
                  </ElCol>
                  <ElRow></ElRow>
                </ExampleBlock>
              </>
            ),
            try: () => (
              <>
                <ExampleBlock title={'试一试'}></ExampleBlock>
                {/* <ComponentController
              v-model:propsConfig={testProps.value}
              v-model:eventsConfig={testEvents.value}
              scheme={componentScheme}
            /> */}
              </>
            )
          }}
        </ExampleTabs>
      </LayoutInfoThemeOne>
    )
  }
}
