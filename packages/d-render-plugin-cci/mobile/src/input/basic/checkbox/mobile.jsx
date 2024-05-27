import { ref, onBeforeUpdate } from 'vue'
import { CheckboxGroup as VanCheckboxGroup, Checkbox as VanCheckbox, Cell as VanCell } from 'vant'
import { formInputProps, fromInputEmits, useFormInput, useOptions } from '@xigefish/d-render-shared'
export default {
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, context) {
    const { updateStream, width } = useFormInput(props, context)
    const { optionProps, options, proxyOptionsValue } = useOptions(props, true, updateStream)

    const checkboxRefs = ref([])
    const checkRefFn = (el, index) => {
      checkboxRefs.value[index] = el
    }
    const cellToggle = (index) => {
      checkboxRefs.value[index].toggle()
    }
    onBeforeUpdate(() => {
      checkboxRefs.value = []
    })

    const checkboxItem = (option, index) => <VanCheckbox shape="square"
      name={option[optionProps.value.value] ?? option}
      disabled={option[optionProps.value.disabled]}
      ref={el => checkRefFn(el, index)}
      onclick={e => e.stopPropagation()} />
    // 优化操作-cell增加点击事件
    const cellItem = (option, index) => <VanCell v-slots={{ 'right-icon': () => checkboxItem(option, index) }}
      title={option[optionProps.value.label] ?? option}
      onclick={() => cellToggle(index)}
      clickable />
    const checkboxItems = () => options.value.map(cellItem)

    return () => <VanCheckboxGroup v-model={proxyOptionsValue.value}
      style={{ width: width.value }}>
      {checkboxItems()}
    </VanCheckboxGroup>
  }
}
