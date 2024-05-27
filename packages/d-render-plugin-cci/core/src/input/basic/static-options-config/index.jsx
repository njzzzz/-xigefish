import { ElCheckboxGroup, ElCheckbox, ElRadioGroup, ElRadio, ElInput, ElCol } from 'element-plus'
import { Minus } from '@element-plus/icons-vue'
import CipButton from '@xigefish/components/cip-button'
import CipButtonText from '@xigefish/components/cip-button-text'
import { useFormInput, formInputProps, fromInputEmits } from '@xigefish/d-render-shared'
import { computed, h } from 'vue'
import { isArray } from '@xigefish/d-render-shared'
export default {
  inheritAttrs: false,
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, context) {
    const { width, emitModelValue, ...formInput } = useFormInput(props, context)

    const isMultiple = computed(() => {
      if (['radio', 'checkbox'].includes(props.model?.type)) {
        return props.model.type === 'checkbox'
      } else {
        return props.model?.multiple ?? false
      }
    })
    const modelOptions = computed(() => {
      return props.otherValue ?? []
    })
    const limit = computed(() => {
      return props.config?.limit ?? ''
    })
    const transValue = computed({
      get () {
        const value = props.modelValue
        if (isMultiple.value) {
          if (!isArray(value)) {
            return value ? value.split(props.config.splitKey || ',') : []
          } else {
            return value ?? []
          }
        } else {
          return value ?? ''
        }
      }
    })
    const emitInput = val => {
      let modelValue = val
      if (isMultiple.value) {
        modelValue = val?.join(props.config.splitKey || ',') ?? val
      }
      emitModelValue(modelValue)
    }
    const getModelValue = (val) => {
      if (isMultiple.value) {
        return val.filter(v => modelOptions.value.includes(v))
      } else {
        return modelOptions.value.includes(val) ? val : ''
      }
    }
    // 输入框
    const inputItem = (value, index) => h(ElInput, {
      modelValue: value.label ?? value,
      maxlength: limit.value,
      'show-word-limit': true,
      'onUpdate:modelValue': val => {
        value.label ? value.label = val : value = val
        modelOptions.value[index] = value
        emitInput(getModelValue(transValue.value))
        context.emit('update:otherValue', modelOptions.value)
      }
    })
    // 删除按钮
    const deleteItem = (val, idx) => h(CipButton, {
      icon: Minus,
      type: 'danger',
      plain: true,
      round: true,
      size: 'small',
      onClick: e => {
        const deleteItem = modelOptions.value.splice(idx, 1)
        // 删除已选值时，清空默认值
        if (props.modelValue === deleteItem[0]) {
          emitInput()
        }
        context.emit('update:otherValue', modelOptions.value)
      }
    })

    const checkboxItem = (val, idx) => {
      const ElComponent = isMultiple.value ? ElCheckbox : ElRadio
      return h(ElComponent, {
        label: val.label ?? val,
        style: { display: 'block' },
        'onUpdate:modelValue': emitInput
      }, {
        default: () => [inputItem(val, idx), deleteItem(val, idx)]
      })
    }

    // 新增
    const addItem = () => h(CipButtonText, {
      onClick: e => {
        modelOptions.value.push('新选项')
        context.emit('update:otherValue', modelOptions.value)
      }
    }, { default: () => '新增' })
    const checkboxItems = () => modelOptions.value.map(checkboxItem)
    const checkboxDefaultSlots = () => {
      return checkboxItems()
    }
    const checkboxGroup = () => {
      const ElComponentGroup = isMultiple.value ? ElCheckboxGroup : ElRadioGroup
      return h(ElComponentGroup, {
        ...context.attrs,
        ...formInput,
        modelValue: transValue.value,
        class: 'option-static-data',
        'onUpdate:modelValue': emitInput
      },
      { default: checkboxDefaultSlots })
    }
    return () => h(ElCol, {}, { default: () => [checkboxGroup(), addItem()] })
  }
}
