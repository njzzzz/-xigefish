<template>
  <div class="cip-td-form-property">
    <config-tabs v-model:active="activeType" :group-list="groupList"></config-tabs>
    <div class="config-form-wrapper">
      <template v-if="propertyTabs.includes('field')">
        <div v-show="activeType === 'field' && !selectItem?.id" class="empty-form--text">请添加字段</div>
        <cip-form v-show="activeType === 'field' && selectItem.id"
                  label-position="top"
                  :model="itemConfig"
                  @update:model="updateSelectItem"
                  :field-list="fieldComponentConfigureFieldConfigList"
                  model-key="id">
          <template #labelWidthInput="{fieldKey, updateModel}">
            <cip-input-switch :model-value="itemConfig[fieldKey]" @update:modelValue="updateModel">
              <template #input="{disabled, modelValue, updateModelValue}">
                <el-input-number :disabled="disabled"
                                 :modelValue="modelValue"
                                 :step="10"
                                 controls-position="right"
                                 @update:modelValue="updateModelValue"></el-input-number>
              </template>
            </cip-input-switch>
          </template>
          <template #validateValueInput="{fieldKey, updateModel}">
            <cip-input-switch :model-value="itemConfig[fieldKey]" @update:modelValue="updateModel">
              <template #input="{disabled, modelValue, updateModelValue}">
                <el-select :disabled="disabled"
                           :model-value="modelValue"
                           @update:modelValue="updateModelValue"
                           placeholder="选择值类型"
                           clearable style="width:100%">
                  <el-option value="email" label="电子邮箱"></el-option>
                  <el-option value="mobilePhone" label="手机号"></el-option>
                  <el-option value="identityCard" label="身份证号"></el-option>
                </el-select>
              </template>
            </cip-input-switch>
          </template>
          <template #regexpValidateInput="{fieldKey, updateModel}">
            <cip-input-switch :model-value="itemConfig[fieldKey]" @update:modelValue="updateModel">
              <template #input="{disabled, modelValue, updateModelValue}">
                <el-input placeholder="填写正则表达式"
                          :disabled="disabled"
                          :model-value="modelValue"
                          @update:modelValue="updateModelValue"
                          clearable>
                </el-input>
              </template>
            </cip-input-switch>
          </template>
        </cip-form>
      </template>
      <template v-if="propertyTabs.includes('form')">
        <cip-form v-show="activeType === 'form'"
                  label-position="top"
                  :model="data"
                  @update:model="updateData"
                  :field-list="formConfigFieldConfigList"></cip-form>
      </template>

      <template v-if="propertyTabs.includes('table')">
        <div v-show="activeType === 'table' && !selectItem.id" class="empty-form--text">请添加字段</div>
        <cip-form
          v-show="activeType === 'table' && selectItem.id"
          label-position="top"
          :model="itemConfig"
          :field-list="tableConfigFieldConfigList"
          :inline="false"
          @update:model="updateSelectItem">
          <template #labelWidthInput="{ fieldKey, updateModel }">
            <el-input-number
              :model-value="itemConfig[fieldKey]"
              @update:modelValue="updateModel"></el-input-number>
          </template>
        </cip-form>
      </template>

      <template v-if="propertyTabs.includes('search')">
        <div v-show="activeType === 'search' && !selectItem.id" class="empty-form--text">请添加字段</div>
        <cip-form
          v-show="activeType === 'search' && selectItem.id"
          label-position="top"
          :model="itemConfig"
          :field-list="searchConfigFieldConfigList"
          :inline="false"
          @update:model="updateData"></cip-form>
      </template>
<!--        <cip-form v-show="activeType === 'column'"-->
<!--                  label-position="top"-->
<!--                  :model="tableConfig"-->
<!--                  @update:model="updateTableItem"-->
<!--                  :field-list="columnConfigFieldConfigList"-->
<!--                  :inline="false"></cip-form>-->
    </div>
  </div>
</template>

<script>
import { computed, nextTick, ref, watch } from 'vue'
import { ElInputNumber, ElSelect, ElOption, ElInput } from 'element-plus'
import CipInputSwitch from '@xigefish/components/cip-input-switch'
import { mergeFieldConfig, configMapToList } from '@xigefish/d-render-shared'
import { CipForm } from '@xigefish/d-render'
import { configureOptionsFieldConfigMap, defaultConfigureOptions } from '@xigefish/d-render-shared'
import ConfigTabs from './config-tabs'
import { formConfigFieldConfigList, getComponentConfigure, tableConfigFieldConfigList, searchConfigFieldConfigList } from './config'
export default {
  components: {
    CipForm,
    CipInputSwitch,
    ConfigTabs,
    ElInputNumber,
    ElSelect,
    ElOption,
    ElInput
  },
  props: {
    selectItem: { type: Object, default: () => ({}) },
    data: Object,
    propertyTabs: {
      type: Array,
      default: () => ['field', 'form']
    },
    defaultActiveType: {
      type: String,
      default: 'field'
    }
  },
  name: 'FormProperty',
  emits: ['update:data', 'update:selectItem', 'update:tableItem'],
  setup (props, { emit }) {
    const activeType = ref(props.defaultActiveType)
    const defaultGroupList = [
      { label: '字段配置', value: 'field' },
      { label: '表单配置', value: 'form' },

      // 工作流列表设计
      { label: '列表配置', value: 'table' },
      { label: '搜索配置', value: 'search' }
    ]
    const groupList = computed(() => defaultGroupList.filter(item => props.propertyTabs.includes(item.value)))
    const itemConfig = computed(() => {
      const result = props.selectItem.config || {}
      result.key = props.selectItem.key
      result.id = props.selectItem.id
      return result
    })

    const getFieldComponentConfigureFieldConfigList = async (val) => {
      let configure
      try {
        configure = await getComponentConfigure(val)
      } catch (e) {
        // 若获取配置发生错误直接使用默认配置
        console.warn(`form-design: 获取${val}组件配置文件发生错误,使用默认配置进行替换`)
        configure = defaultConfigureOptions()
      }
      return configMapToList(mergeFieldConfig(configure, configureOptionsFieldConfigMap))
    }

    const fieldComponentConfigureFieldConfigList = ref([])
    watch(() => itemConfig.value.type, (val) => {
      if (val) {
        // dependOn存在缓存问题，暂时先进行清空再赋值操作
        getFieldComponentConfigureFieldConfigList(val).then(res => {
          fieldComponentConfigureFieldConfigList.value = []
          nextTick(() => {
            fieldComponentConfigureFieldConfigList.value = res
          })
        })
      } else {
        return []
      }
    }, { immediate: true })

    const tableConfig = computed(() => {
      return props.selectItem?.config?.tableItem ?? {}
    })

    const updateData = (val) => {
      emit('update:data', val)
    }
    const updateSelectItem = (val) => {
      emit('update:selectItem', val)
    }
    const updateTableItem = val => {
      emit('update:tableItem', val)
    }
    const onActivated = (name) => {
      activeType.value = name
    }
    return {
      formConfigFieldConfigList,
      fieldComponentConfigureFieldConfigList,
      tableConfigFieldConfigList,
      searchConfigFieldConfigList,
      // columnConfigFieldConfigList,
      itemConfig,
      tableConfig,
      onActivated,
      groupList,
      activeType,
      updateData,
      updateSelectItem,
      updateTableItem
    }
  }
}
</script>
