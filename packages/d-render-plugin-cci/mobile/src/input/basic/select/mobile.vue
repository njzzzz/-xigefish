<template>
  <div class="cip-van-select">
    <van-field :model-value="inputValue"
               :placeholder="placeholder"
               :disabled="disabled"
               readonly
               is-link
               v-bind="$attrs"
               @click="openPopup"/>
    <van-popup v-model:show="show" position="bottom" style="height: 40%">
      <mobile-picker :config="config"
        :model-value="modelValue"
        :other-value="otherValue"
        :customFieldName="customFieldName"
        :columns="columns"
        @confirm="confirm"
        @cancel="cancel" />
    </van-popup>
  <!-- 多选如何处理 -->
  </div>
</template>
<script>
import { Field as VanField, Popup as VanPopup } from 'vant'
import MobilePicker from './mobile-picker'
import { computed, ref } from 'vue'
import { useFormInput, useOptions, formInputProps, fromInputEmits, isArray, isObject } from '@xigefish/d-render-shared'

export default {
  inheritAttrs: false,
  components: { VanField, VanPopup, MobilePicker },
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, context) {
    const { width, emitModelValue, emitOtherValue, ...formInput } = useFormInput(props, context)
    // 是否多选
    const multiple = computed(() => {
      return props.config?.multiple ?? false
    })
    const { optionProps, options, getValue, getModelValue, getOtherValue } = useOptions(props, multiple)
    // 另一个键
    const otherKey = computed(() => {
      return props.config?.otherKey ?? ''
    })
    // 面板按钮触发emit
    const emitInput = (value) => {
      if (!isArray(value) && isObject(value)) {
        value = value[customFieldName.value.value]
      }
      const modelValue = getModelValue(value)
      emitModelValue(modelValue)
      if (otherKey.value) {
        const otherValue = getOtherValue(modelValue, value)
        emitOtherValue(otherValue)
      }
    }
    // 内部代理一个Value
    const proxyValue = computed({
      get () {
        return getValue(props.modelValue)
      },
      set (value) {
        emitInput(value)
      }
    })
    // 打开面板
    const openPopup = () => {
      show.value = true
    }

    // 同级有没有children的情况下，级联选择器不出现下层
    const columns = computed(() => {
      if (customFieldName.value.children) {
        return addChildren(options.value)
      } else {
        return options.value
      }
    })
    // 都没有children的情况下，会多加一级，待处理
    const addChildren = (items) => {
      return items.map(i => {
        if (i.children) {
          addChildren(i.children)
        } else {
          i.children = []
        }
        return i
      })
    }
    // vant使用text代替label
    const customFieldName = computed(() => {
      const { label = 'label', value = 'value', children } = props.config?.optionProps ?? {}
      return { text: label, value, children }
    })
    // input输入框展示数据
    const inputValue = computed({
      get () {
        const value = getValue(props.modelValue)
        if (multiple.value) {
          return getOtherValue(props.modelValue, value)
        }
        const findItem = findChildrenItem(columns.value, value)
        return findItem ? findItem[customFieldName.value.text] : value
      }
    })
    // 对children进行递归
    const findChildrenItem = (array, value) => {
      // eslint-disable-next-line
      for(const item of array){
        if (item[customFieldName.value.value] === value) return item
        if (item[customFieldName.value.children] && item[customFieldName.value.children].length > 0) {
          const findItem = findChildrenItem(item[customFieldName.value.children], value)
          if (findItem) return findItem
        }
      }
    }
    // 面板按钮
    const show = ref(false)
    const confirm = (value) => {
      emitInput(value)
      show.value = false
    }
    const cancel = () => {
      show.value = false
    }

    return {
      ...formInput,
      multiple,
      columns,
      proxyValue,
      width,
      optionProps,

      show,
      customFieldName,
      inputValue,
      openPopup,
      confirm,
      cancel
    }
  }
}
</script>
