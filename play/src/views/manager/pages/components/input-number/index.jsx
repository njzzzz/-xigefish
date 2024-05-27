import { ref } from 'vue'
import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import ExampleTabs from '@/components/example-page'
import ExampleRow from '@/components/example-row'
import CipInputNumber from '@xigefish/d-render-plugin-cci/esm/input/basic/number'
import CipNumber from '@xigefish/components/cip-number'
export default {
  setup () {
    const numberValue = ref()
    return () => (
      <LayoutInfoThemeOne>
        <ExampleTabs>
          {{
            example: () => (
              <>
                <ExampleBlock>
                  <div>注⚠️：本组件和ui设计的不一致，与正常input状态保持一致 form-input/number</div>
                  <br/>
                  <ExampleRow label="默认"><CipInputNumber v-model={numberValue.value} /></ExampleRow>
                  <ExampleRow label="默认(禁用)"><CipInputNumber v-model={numberValue.value} disabled/></ExampleRow>
                  <ExampleRow label="悬浮"><CipInputNumber v-model={numberValue.value} /></ExampleRow>
                  <ExampleRow label="悬浮(禁用)"><CipInputNumber v-model={numberValue.value} disabled/></ExampleRow>
                  <ExampleRow label="点击"><CipInputNumber v-model={numberValue.value} /></ExampleRow>
                  <ExampleRow label="点击(禁用)"><CipInputNumber v-model={numberValue.value} disabled/></ExampleRow>
                  <ExampleRow label="带单位"><CipInputNumber v-model={numberValue.value} config={{ unit: '元' }} /></ExampleRow>
                  <ExampleRow label="带单位(禁用)"><CipInputNumber v-model={numberValue.value} config={{ unit: '元' }} disabled/></ExampleRow>
                  <ExampleRow label="上下控制"><CipInputNumber v-model={numberValue.value} config={{ controlsPosition: 'right' }}/></ExampleRow>
                  <ExampleRow label="上下控制(禁用)"><CipInputNumber v-model={numberValue.value} config={{ controlsPosition: 'right' }} disabled/></ExampleRow>
                </ExampleBlock>
                <ExampleBlock>
                  <div>注⚠️：本组件和ui设计的不一致，与正常input状态保持一致 cip-number</div>
                  <br/>
                  <ExampleRow label="默认"><CipNumber v-model={numberValue.value} /></ExampleRow>
                  <ExampleRow label="默认(禁用)"><CipNumber v-model={numberValue.value} disabled/></ExampleRow>
                  <ExampleRow label="悬浮"><CipNumber v-model={numberValue.value} /></ExampleRow>
                  <ExampleRow label="悬浮(禁用)"><CipNumber v-model={numberValue.value} disabled/></ExampleRow>
                  <ExampleRow label="点击"><CipNumber v-model={numberValue.value} /></ExampleRow>
                  <ExampleRow label="点击(禁用)"><CipNumber v-model={numberValue.value} disabled/></ExampleRow>
                  <ExampleRow label="带单位"><CipNumber v-model={numberValue.value} unit='元' /></ExampleRow>
                  <ExampleRow label="带单位(禁用)"><CipNumber v-model={numberValue.value} unit='元' disabled/></ExampleRow>
                  <ExampleRow label="上下控制"><CipNumber v-model={numberValue.value} controlsPosition='right'/></ExampleRow>
                  <ExampleRow label="上下控制(禁用)"><CipNumber v-model={numberValue.value} controlsPosition='right' disabled/></ExampleRow>
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
