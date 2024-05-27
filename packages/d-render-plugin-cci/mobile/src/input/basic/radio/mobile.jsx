import { RadioGroup as VanRadioGroup, Radio as VanRadio, Cell as VanCell } from 'vant'
import { useFormInput, useOptions, formInputProps, fromInputEmits } from '@xigefish/d-render-shared'
export default {
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, context) {
    const { width, updateStream } = useFormInput(props, context)
    const { optionProps, options, proxyOptionsValue } = useOptions(props, false, updateStream, context)

    const radioItem = (option) => <VanRadio name={option[optionProps.value.value] ?? option} disabled={option[optionProps.value.disabled]}/>
    // 优化操作-cell增加点击事件
    const cellItem = (option) => <VanCell v-slots={{ 'right-icon': () => radioItem(option) }}
      title={option[optionProps.value.label] ?? option}
      onclick={() => { proxyOptionsValue.value = option[optionProps.value.value] ?? option }}
      clickable />
    const radioItems = () => options.value.map(cellItem)

    return () => <VanRadioGroup
      v-model={proxyOptionsValue.value}
      style={{ width: width.value }}>
      {radioItems()}
    </VanRadioGroup>
  }
}
