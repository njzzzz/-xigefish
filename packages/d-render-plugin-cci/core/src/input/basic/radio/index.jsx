import { ElRadioGroup, ElRadio, ElRadioButton } from 'element-plus'
import { useFormInput, useOptions, formInputProps, fromInputEmits } from '@xigefish/d-render-shared'
import { computed, getCurrentInstance, h } from 'vue'
export default {
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, context) {
    const instance = getCurrentInstance()
    const { inputRef, width, updateStream } = useFormInput(props, context)
    const { optionProps, options, getOptions, proxyOptionsValue } = useOptions(props, false, updateStream)
    instance.ctx.getOptions = getOptions
    const display = computed(() => {
      return props.config?.display ?? 'inline-flex'
    })
    const isButton = computed(() => {
      return props.config?.isButton ?? false
    })

    const getRadioComponent = (isButton) => {
      return isButton ? ElRadioButton : ElRadio
    }
    const radioItem = (option) => {
      return h(getRadioComponent(isButton.value), {
        label: option[optionProps.value.value] ?? option,
        style: { display: display.value },
        disabled: option[optionProps.value.disabled]
      }, {
        default: () => `${option[optionProps.value.label] ?? option}`
      })
    }

    const radioItems = () => options.value.map(radioItem)

    return () => {
      return h(ElRadioGroup, {
        ...context.attrs,
        ref: inputRef,
        class: ['cip-basic-radio'],
        style: { width: width.value },
        disabled: props.disabled,
        modelValue: proxyOptionsValue.value,
        'onUpdate:modelValue': (value) => {
          proxyOptionsValue.value = value
        }
      },
      { default: () => radioItems() })
    }
  }
}
