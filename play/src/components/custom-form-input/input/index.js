import { CipFormInputTransform } from '@xigefish/d-render'
import { ElInput } from 'element-plus'
import { defineComponent } from 'vue'
export default defineComponent({
  setup (props, { attrs }) {
    console.log(attrs)
    const Input = (props, { attrs, emit }) => <>
      <ElInput modelValue={attrs.modelValue} onUpdate:modelValue={(v) => attrs['onUpdate:modelValue'](v) } placeholder={attrs.placeholder}></ElInput>
      <ElInput modelValue={attrs.other0 } onUpdate:modelValue={(v) => attrs['onUpdate:other0'](v) } placeholder={attrs.placeholder}></ElInput>
    </>
    return () => <CipFormInputTransform
      comp={Input}
      inputPropsConfig={['placeholder']}
    />
  }
})
