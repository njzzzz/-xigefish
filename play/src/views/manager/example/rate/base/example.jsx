import { ref } from 'vue'
import ExampleRow from '@/components/example-row'
import CipRate from '@xigefish/components/cip-rate'

export default {
  setup () {
    const rate = ref(0)
    return () => (
      <>
        <div style="display: flex;">
          <div style="flex: 1">
            <ExampleRow label="默认">
              <CipRate v-model={rate.value}></CipRate>
            </ExampleRow>
            <ExampleRow label="悬浮">
              <CipRate modelValue={3}></CipRate>
            </ExampleRow>
            <ExampleRow label="点击">
              <CipRate modelValue={3}></CipRate>
            </ExampleRow>
          </div>
          <div style="flex: 1">
            <ExampleRow label="带信息">
              <CipRate modelValue={3} showScore scoreTemplate="{value}分"></CipRate>
            </ExampleRow>
            <ExampleRow label="半星">
              <CipRate modelValue={3.5} allowHalf />
            </ExampleRow>
            <ExampleRow label="禁用【注：UI中无对禁用状态的说明】">
              <CipRate modelValue={3} disabled />
            </ExampleRow>
          </div>
        </div>
      </>
    )
  }
}
