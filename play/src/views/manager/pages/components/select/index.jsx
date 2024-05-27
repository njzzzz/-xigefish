import CipForm from '@xigefish/d-render/cip-form'
import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import { cascader, formFieldList, formFieldList2, formFieldList3, formFieldList4 } from './config'
import ExampleTabs from '@/components/example-page'
import { ElCascader } from 'element-plus'
import CipSearchTags from '@xigefish/components/cip-search-tags'
import CipButton from '@xigefish/components/cip-button'
import { ref } from 'vue'
export default {
  setup () {
    const model = ref([])
    const select1 = ref({
      disabled: '选中',
      click: '选中',
      float: '选中',
      defaultVal: '选中'
    })
    const select2 = ref({
      disabled: '选中',
      click: '选中',
      float: '选中',
      multiplyDisabled: [1, 2],
      multiplySearch: []
    })
    const select3 = ref({
      disabled: '选中',
      click: '选中',
      float: '选中',
      multiplyDisabled: [1, 2],
      multiplySearch: []
    })
    const select4 = ref({
      data: []
    })
    const select5 = ref([])
    const select6 = ref([])
    const list = ref([...new Array(10)].map((item, index) => ({ label: `item${index}`, value: index })))
    const handleValue = (val) => {
      console.log(val, 'val')
      select5.value = val
    }
    const reset = () => {
      select5.value = []
    }
    return () => <LayoutInfoThemeOne>
      <ExampleTabs>
        {{
          example: <>
            <ExampleBlock>
              <div>小尺寸</div>
              <CipForm fieldList={formFieldList} v-model:model={select1.value} grid={4} size='small'></CipForm>
              <div>默认</div>
              <CipForm fieldList={formFieldList} v-model:model={select1.value} grid={4}></CipForm>
              <div>大尺寸</div>
              <CipForm fieldList={formFieldList} v-model:model={select1.value} grid={4} size='large'></CipForm>
            </ExampleBlock>
            <ExampleBlock>
              <CipForm fieldList={formFieldList2} v-model:model={select2.value} grid={3}></CipForm>
            </ExampleBlock>
            <ExampleBlock>
              <CipForm fieldList={formFieldList3} v-model:model={select3.value} grid={3}></CipForm>
            </ExampleBlock>
            <ExampleBlock>
              <CipForm fieldList={formFieldList4} v-model:model={select4.value} grid={3}></CipForm>
              <ElCascader options={cascader.data.options} v-model={model.value}></ElCascader>
            </ExampleBlock>
            {/* <ExampleBlock> */}
            {/*   <CipForm fieldList={formFieldList5} v-model:model={select5.value} grid={1}></CipForm> */}
            {/* </ExampleBlock> */}
            <ExampleBlock>
             <CipSearchTags modelValue={select5.value} options={list.value} mutiple onUpdate:modelValue={handleValue}></CipSearchTags>
              <CipButton onClick={reset}>重置</CipButton>
            </ExampleBlock>
            <ExampleBlock>
              <CipSearchTags v-model={select6.value} options={list.value} multiple={false}></CipSearchTags>
            </ExampleBlock>
          </>
        }}
      </ExampleTabs>
    </LayoutInfoThemeOne>
  }
}
