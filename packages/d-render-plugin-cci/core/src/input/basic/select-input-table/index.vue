<template>
  <div :style="{width}">
<!--输入框-->
    <template v-if="!securityConfig.trigger">
      <el-input
        :placeholder="securityConfig.placeholder"
        :clearable={clearable}
        @clear="handleClear"
        v-bind="$attrs"
        :model-value="proxyOtherValue[0].value || modelValue"
        :style="{width: securityConfig.width || '100%'}"
        :disabled="disabled"
        @click="openDialog"
      >
        <template #append>
          <cip-button :square="true" :icon="Search" :disabled="disabled" @click="openDialog"/>
        </template>
      </el-input>
    </template>
<!--按钮模式-->
    <template v-if="securityConfig.trigger === 'button'">
      <cip-button type="primary" :disabled="disabled" @click="openDialog">选择({{multiple && (defaultValue?.length || 0)}})</cip-button>
    </template>
<!--选择弹窗-->
    <cip-dialog
                v-model="tableDialog"
                :title="`选择${securityConfig.label}`"
                class="select-input__dialog"
                top="6vh"
                v-bind="securityConfig.dialogAttrs"
                :on-confirm="onConfirm">
      <cip-select-table
        style="width: 100%"
        v-bind="selectTableProps"
        :multiple="multiple"
        v-model="cacheSelectItem"
      />
    </cip-dialog>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { ElInput } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import CipDialog from '@xigefish/components/cip-dialog'
import CipButton from '@xigefish/components/cip-button'
import CipSelectTable from '@xigefish/components/cip-select-table'
import CipMessage from '@xigefish/components/cip-message'
import { formInputProps, fromInputEmits, useFormInput, useInputProps } from '@xigefish/d-render-shared'
import { isArray, isNotEmpty } from '@xigefish/d-render-shared'
export default {
  components: { ElInput, CipDialog, CipButton, CipSelectTable },
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, context) {
    // 转换较为复杂，放弃使用formInput提供的fromModelValue及toModelValue进行modelValue的转换
    const {
      emitInput,
      emitOtherValue,
      proxyOtherValue,
      securityConfig,
      updateStream,
      ...formInput
    } = useFormInput(props, context, {
      fromModelValue: () => {},
      maxOtherKey: 2
    })
    const multiple = computed(() => {
      return securityConfig.value.multiple ?? false
    })
    const optionProps = computed(() => {
      return Object.assign({},
        { label: 'label', value: 'value' },
        securityConfig.value.defaultProp, // 兼容历史数据
        securityConfig.value.optionProps
      )
    })

    // cip-select-table的配置
    const selectTableProps = useInputProps(props, [
      'direction',
      'multiple',
      'entity',
      'curdFn',
      'tableColumns',
      'searchFieldList',
      'optionProps',
      'hideSearch',
      'defaultSearchModel',
      'withPagination',
      'selectable',
      ['tableHideIndex', 'hideIndex'],
      ['searchAttrs', { defaultValue: { grid: 0 } }], // 搜索栏配置
      ['defaultSearchFilter', 'defaultSearchModel'],
      'withTags'
    ])

    const tableDialog = ref(false)
    const cacheSelectItem = ref()
    // 打开选择弹框
    const openDialog = () => {
      if (defaultValue.value) {
        // 进行一次浅拷贝，防止修改数据导致值直接变化
        cacheSelectItem.value = multiple.value ? [...defaultValue.value] : { ...defaultValue.value }
      } else {
        // 清理上一次的选中结果
        cacheSelectItem.value = multiple.value ? [] : undefined
      }
      tableDialog.value = true
    }

    // 获取emit需要的值
    const getEmitValue = (type) => { // {'value'| 'label'}
      const rows = cacheSelectItem.value
      if (multiple.value) {
        let modelValue = rows.map(i => i[optionProps.value[type]])
        if (modelValue.length > 0) {
          if (!securityConfig.value.array) {
            modelValue = modelValue.join(',')
          }
        } else {
          if (!securityConfig.value.array) {
            modelValue = undefined
          }
        }

        return modelValue
      } else {
        if (rows) {
          return rows[optionProps.value[type]]
        } else {
          return undefined
        }
      }
    }

    const updateValues = () => {
      const value = getEmitValue('value')
      const label = getEmitValue('label')
      updateStream.appendValue(value)
      updateStream.appendOtherValue(label)
      updateStream.appendOtherValue(cacheSelectItem.value, 2)
      updateStream.end()
    }

    // 确认保存
    const onConfirm = async (resolve, reject) => {
      if (securityConfig.value.validate) {
        const { valid, message = '校验失败' } = await securityConfig.value.validate?.(cacheSelectItem.value)
        if (!valid) {
          CipMessage.warning(message)
          reject()
        }
      }
      updateValues()
      resolve()
    }
    const fromModel = (val) => {
      const result = []
      if (val) {
        if (isArray(val)) {
          return val
        } else {
          return val.split(',')
        }
      }
      return result
    }
    // 选择table组件
    const defaultValue = computed(() => {
      if (isNotEmpty(props.modelValue)) {
        if (multiple.value) {
          if (proxyOtherValue[1].value) return proxyOtherValue[1].value
          let code = fromModel(props.modelValue)
          if (securityConfig.value.valueType === 'number') code = code.map(v => Number(v))
          const name = fromModel(proxyOtherValue[0].value) // 没有这个数据怎么办
          return code.map((i, idx) => ({
            [optionProps.value.value]: i,
            [optionProps.value.label]: name[idx]
          }))
        } else {
          return {
            [optionProps.value.value]: props.modelValue,
            [optionProps.value.label]: proxyOtherValue[0].value
          }
        }
      } else {
        return undefined
      }
    })
    const handleClear = () => {
      cacheSelectItem.value = multiple.value ? [] : {}
      updateValues()
    }
    return {
      ...formInput,
      selectTableProps,
      securityConfig,
      proxyOtherValue,
      multiple,
      optionProps,
      tableDialog,
      defaultValue,
      openDialog,
      onConfirm,
      cacheSelectItem,
      Search,
      handleClear
    }
  }
}
</script>
