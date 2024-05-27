/**
 * 特殊组件需要和table配合使用
 */
import { formInputProps, fromInputEmits } from '@xigefish/d-render-shared'
import { useFormInput } from '@xigefish/d-render-shared'
import { ElRadio, ElCheckbox } from 'element-plus'
import { setFieldValue } from '@xigefish/d-render-shared'
import { computed } from 'vue'
export default {
  name: 'TableRadio',
  props: { ...formInputProps },
  emits: [...fromInputEmits],
  setup (props, context) {
    const { width, securityConfig, ...formInput } = useFormInput(props, context)
    const activeValue = computed(() => {
      return props.config.activeValue ?? true
    })
    const inactiveValue = computed(() => {
      return props.config.inactiveValue ?? false
    })
    const activeCurrentValue = () => {
      // 特殊操作，不建议其他组件使用
      props.tableData.forEach(v => {
        // 将当前table的其他数据设置为假值
        setFieldValue(v, props.fieldKey, inactiveValue.value)
      })
      formInput.emitModelValue(activeValue.value)
    }
    const handleChange = (e) => {
      console.log(e)
      if (props.modelValue !== activeValue.value && !props.config.disabled) {
        activeCurrentValue()
      }
    }
    const CheckComponent = computed(() => {
      return securityConfig.value.checkComponent === 'checkbox' ? ElCheckbox : ElRadio
    })
    return () => <CheckComponent.value
      class={'cip-table-radio'}
      modelValue={props.modelValue}
      label={activeValue.value}
      disabled={props.disabled}
      onChange={(e) => handleChange(e)}
      // onUpdate:modelValue={() => { changeModelValue() }}
    />
  }
}
