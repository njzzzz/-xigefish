import CipForm from '@xigefish/d-render/cip-form'
import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import { formFieldList, formFieldListCehckbox } from './config'
import { ElCheckbox } from 'element-plus'
import ExampleTabs from '@/components/example-page'
import { ref } from 'vue'
export default {
  setup () {
    const radio = ref({
      disabled: '选中',
      click: '选中',
      float: '选中',
      defaultVal: '选中'
    })
    const checkbox = ref({
      disabled: '选中',
      click: '选中',
      float: '选中',
      defaultVal: '选中'
    })
    const checkAll = ref(true)
    return () => <LayoutInfoThemeOne>
      <ExampleTabs>
        {{
          example: <>
            <ExampleBlock>
              <div>小尺寸</div>
              <CipForm fieldList={formFieldList} v-model:model={radio.value} size="small"></CipForm>
              <div>默认尺寸</div>
              <CipForm fieldList={formFieldList} v-model:model={radio.value}></CipForm>
              <div>大尺寸</div>
              <CipForm fieldList={formFieldList} v-model:model={radio.value} size="large"></CipForm>
            </ExampleBlock>
            <ExampleBlock>
              <div>小尺寸</div>
              <CipForm fieldList={formFieldListCehckbox} v-model:model={checkbox.value} size="small"></CipForm>
              <div>默认尺寸</div>
              <CipForm fieldList={formFieldListCehckbox} v-model:model={checkbox.value}></CipForm>
              <div>大尺寸</div>
              <CipForm fieldList={formFieldListCehckbox} v-model:model={checkbox.value} size="large"></CipForm>
            </ExampleBlock>
            <ExampleBlock>
              <ElCheckbox indeterminate={true} v-model={checkAll.value.true}>半选</ElCheckbox>
            </ExampleBlock>
          </>
        }}
      </ExampleTabs>
    </LayoutInfoThemeOne>
  }
}
