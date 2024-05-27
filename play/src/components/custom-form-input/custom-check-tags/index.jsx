import { useFormInput, useOptions, formInputProps } from '@xigefish/d-render-shared'
// import { ArrowUp, ArrowDown } from '@element-plus/icons-vue'
// import CipButtonText from '@xigefish/components/cip-button-text'
import { computed } from 'vue'
import TagsItem from './tags-item'
import './index.less'
export default {
  name: 'CipSearchTags',
  props: formInputProps,
  emits: ['change'],
  setup (props, context) {
    const {
      updateStream,
      securityConfig
    } = useFormInput(props, context)
    // 是否多选
    const multiple = computed(() => {
      return securityConfig.value.multiple ?? false
    })
    const {
      optionProps,
      options,
      proxyOptionsValue,
      isObjectOption
    } = useOptions(props, multiple, updateStream)
    const handleOnChange = (val, isChecked) => {
      if (multiple.value) {
        if (isChecked) {
          proxyOptionsValue.value.push(val)
        } else {
          const index = proxyOptionsValue.value.findIndex(i => i === val)
          proxyOptionsValue.value.splice(index, 1)
        }
      } else {
        proxyOptionsValue.value = val
      }
      context.emit('change', proxyOptionsValue.value)
    }
    const tagList = computed(() => options.value.map(item => {
      const label = isObjectOption.value ? item[optionProps.value.label] : item
      const value = isObjectOption.value ? item[optionProps.value.value] : item
      return {
        label,
        value
      }
    }))
    const getChecked = computed(() => {
      return (item) => {
        const _item = isObjectOption.value
          ? item[optionProps.value.value]
          : item
        return multiple.value ? proxyOptionsValue.value.includes(_item) : proxyOptionsValue.value === _item
      }
    })
    const checkTagsItem = computed(() => tagList.value.map(item => <TagsItem
      modelValue={getChecked.value(item)}
      label={item.label}
      onUpdate:modelValue={(isChecked) => handleOnChange(item.value, isChecked)}
      class="cip-check-tags-group__item">{item.label}
    </TagsItem>))

    return () => <div class="cip-check-tags-group">
      <div>
        {checkTagsItem.value}
      </div>
      {/* <div class="cip-check-tags-group--toggle"> */}
      {/*   <CipButtonText>展开</CipButtonText> */}
      {/*   <ArrowDown class="cip-check-tags-group--icon"></ArrowDown> */}
      {/* </div> */}
    </div>
  }
}
