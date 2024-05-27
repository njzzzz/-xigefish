import { ref } from 'vue'
import { ElRow, ElCol } from 'element-plus'
import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import ExampleTabs from '@/components/example-page'
import CipSlider from '@xigefish/d-render-plugin-cci/esm/input/basic/slider'
export default {
  setup () {
    const sliderDefault = ref(10)
    const sliderRange = ref([10, 50])
    const sliderMarks = ref({
      0: '0',
      100: '100'
    })

    return () => (
      <LayoutInfoThemeOne>
        <ExampleTabs>
          {{
            example: () => (
              <>
                <ExampleBlock>
                  <ElRow>
                    <ElCol span={12}>
                      <ElRow>
                        <ElCol span={2}>默认</ElCol>
                        <ElCol span={18}>
                          <CipSlider v-model={sliderDefault.value} />
                        </ElCol>
                      </ElRow>
                      <ElRow>
                        <ElCol span={2}>悬浮</ElCol>
                        <ElCol span={18}>
                          <CipSlider v-model={sliderDefault.value} />
                        </ElCol>
                      </ElRow>
                      <ElRow>
                        <ElCol span={2}>禁用</ElCol>
                        <ElCol span={18}>
                          <CipSlider v-model={sliderDefault.value} disabled />
                        </ElCol>
                      </ElRow>
                    </ElCol>
                    <ElCol span={12}>
                      <ElRow>
                        <ElCol span={2}>带输入框</ElCol>
                        <ElCol span={20}>
                          <CipSlider
                            v-model={sliderDefault.value}
                            config={{
                              showInput: true
                            }}
                          />
                        </ElCol>
                      </ElRow>
                      <ElRow>
                        <ElCol span={2}>区间选择</ElCol>
                        <ElCol span={18}>
                          <CipSlider v-model={sliderRange.value} config={{
                            range: true
                          }}/>
                        </ElCol>
                      </ElRow>
                      <ElRow>
                        <ElCol span={2}>带标签</ElCol>
                        <ElCol span={18}>
                          <CipSlider v-model={sliderDefault.value} config={{
                            marks: sliderMarks.value
                          }}/>
                        </ElCol>
                      </ElRow>
                    </ElCol>
                  </ElRow>
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
