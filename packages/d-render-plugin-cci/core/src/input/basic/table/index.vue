<template>
  <div class="basic-table">
    <cip-table :offset="offset"
               v-model:data="proxyValue"
               :columns="options"
               :depend-on-values="dependOnValues"
               :border="!hideBorder"
               :field-key="fieldKey"
               :row-key="securityConfig.rowKey"
               :tree-props="optionProps"
               :default-expand-all="securityConfig.defaultExpendAll"
               :rule-key="securityConfig.ruleKey || fieldKey"
               :tableHeaderLabel="securityConfig.tableHeaderLabel"
               :hide-index="securityConfig.hideIndex"
               :index-fixed="securityConfig.indexFixed ?? true"
               :show-summary="securityConfig.showSummary"
               :span-method="securityConfig.spanMethod"
               :height="securityConfig.height"
               size="default"
               :stripe="securityConfig.stripe"
               :in-form="true">
      <el-table-column :min-width="isTreeTable && !securityConfig.hideAddChild ? '160px':'90px'" v-if="!securityConfig.hideDelete" fixed="right" label="操作">
        <template #default="{$index, row}">
          <cip-button-text v-if="!securityConfig.hideAdd" @click="insertItem($index)">
            插入
          </cip-button-text>
          <template v-if="isTreeTable && !securityConfig.hideAddChild">
            <cip-button-text @click="insertChildItem($index,row)">
              插入子项
            </cip-button-text>
          </template>
          <cip-button-text @click="deleteItem($index, row)">
            删除
          </cip-button-text>
        </template>
      </el-table-column>
    </cip-table>
    <div style="text-align: center" class="basic-table__add" type="info" v-if="!securityConfig.hideAdd">
      <cip-button link  @click="addItem" :icon="Plus">
        添加
      </cip-button>
    </div>
  </div>
</template>
<script>
import { computed, defineAsyncComponent, nextTick } from 'vue'
import { formInputProps, fromInputEmits, useFormInput, useElementFormEvent } from '@xigefish/d-render-shared'
import { ElMessageBox, ElTableColumn } from 'element-plus'
import CipButtonText from '@xigefish/components/cip-button-text'
import CipButton from '@xigefish/components/cip-button'
import { v4 as uuid } from 'uuid'
import { isDesignOptions, setOptionWritable } from './util'
import { setFieldValue, getFieldValue } from '@xigefish/d-render-shared'
import { analyseData, getPropertyKeyByPath } from '@xigefish/d-render/cip-table/util'
import { Plus } from '@element-plus/icons-vue'
export default {
  name: 'basic-table',
  components: {
    CipTable: defineAsyncComponent(() => import('@xigefish/d-render/cip-table')),
    CipButton,
    CipButtonText,
    ElTableColumn
  },
  props: {
    ...formInputProps,
    type: {
      default: 'input'
    }
  },
  emits: [...fromInputEmits],
  setup (props, context) {
    const { handleChange } = useElementFormEvent() // inject('elFormItem', {})
    const formInput = useFormInput(props, context)
    const { proxyValue, securityConfig } = formInput

    const offset = computed(() => {
      return securityConfig.value.hideIndex ? undefined : 0
    })
    const hideBorder = computed(() => {
      return securityConfig.value.hideBorder
    })
    const optionProps = computed(() => {
      // el-table 默认treeProps参数
      return Object.assign({ children: 'children', hasChildren: 'hasChildren' }, securityConfig.value.optionProps)
    })
    const isTreeTable = computed(() => {
      // 只要设置了rowKey即认为该表单可能是树形表单
      return securityConfig.value.rowKey
    })
    // 新版本的从options的第一个对象的children中获取

    const options = computed(() => {
      let options = securityConfig.value.options || []
      if (isDesignOptions(options)) options = options[0].children
      if (securityConfig.value.tableColumnStatus === 'writable') {
        options = setOptionWritable(options, true)
      }
      return options
    })

    const emitItemValidate = (val) => { // 触发验证
      nextTick(() => {
        handleChange(val)
      })
    }
    const getNewItem = () => {
      // tree 新增时必须由唯一key
      return isTreeTable.value ? { $id: uuid() } : {}
    }
    // 插入一个最后的行
    const addItem = () => {
      const val = Array.isArray(proxyValue.value) ? proxyValue.value : []
      const newItem = getNewItem()
      val.push(newItem)
      emitItemValidate(val)
      proxyValue.value = val
    }
    // 在当前行上方插入
    const insertItem = (index) => {
      const allArray = props.modelValue || []
      const newItem = getNewItem()
      if (isTreeTable.value) {
        const indexed = analyseData(allArray, optionProps.value)
        const realIndexArr = indexed[index]
        if (realIndexArr.length > 1) {
          const realIndex = realIndexArr.pop() // realIndex 为要剔除的index realIndexArr为父数组下标
          const key = getPropertyKeyByPath(realIndexArr, optionProps.value)
          const parentArr = getFieldValue(allArray, key)
          parentArr[optionProps.value.children].splice(realIndex, 0, newItem)
        } else {
          allArray.splice(realIndexArr[0], 0, newItem)
        }
      } else {
        allArray.push(newItem)
      }
      emitItemValidate(allArray)
      proxyValue.value = allArray
    }
    // 插入一个最后的子行
    const insertChildItem = (index, row) => {
      if (isTreeTable.value) {
        const newItem = getNewItem()
        const children = getFieldValue(row, optionProps.value.children)
        if (!children) {
          setFieldValue(row, optionProps.value.children, [newItem])
        } else {
          children.push(newItem)
        }
      }
    }
    // 删除当前行
    const deleteItem = (index) => {
      ElMessageBox.confirm('确定删除此行？', '提示').then(() => {
        const allArray = props.modelValue || []
        if (isTreeTable.value) {
          const indexed = analyseData(allArray, optionProps.value)
          const realIndexArr = indexed[index]
          if (realIndexArr.length > 1) {
            const realIndex = realIndexArr.pop() // realIndex 为要剔除的index realIndexArr为父数组下标
            const key = getPropertyKeyByPath(realIndexArr, optionProps.value)
            const parentArr = getFieldValue(allArray, key)
            parentArr[optionProps.value.children].splice(realIndex, 1)
          } else {
            allArray.splice(realIndexArr[0], 1)
          }
        } else {
          allArray.splice(index, 1)
        }
        emitItemValidate(allArray)
        proxyValue.value = allArray
      }).catch(() => {})
    }

    return {
      offset,
      hideBorder,
      options,
      securityConfig,
      isTreeTable,
      insertItem,
      insertChildItem,
      deleteItem,
      addItem,
      proxyValue,
      optionProps,
      Plus
    }
  }
}
</script>
