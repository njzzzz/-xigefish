<template>
    <div class="form-drawing-item" :class="{'is-active':isActive,'is-layout': config.type === 'grid'}">
      <div class="form-drawing-item__handle">
        <i class="el-icon-rank show-focus handle-icon move-icon"/>
        <!-- <span class="right-top item-field-key">{{fieldKey}}
          <template v-if="twoValueComponentList.includes(config.type)">
            -{{config.otherKey}}
          </template>
        </span> -->
        <div class="right-bottom show-focus">
          <i class="el-icon-document-copy handle-icon" v-if="showCopy" @click.stop="copyItem"></i>
          <i class="el-icon-delete handle-icon" @click.stop="deleteItem"></i>
        </div>
      </div>
      <cip-form-item :field-key="fieldKey" :config="computedConfig" :show-template="true" :model="model"></cip-form-item>
    </div>
</template>
<script>
import { computed, watch, ref } from 'vue'
import { CipFormItem } from '@xigefish/d-render'
import { handleFormConfig } from './handle-config'
import { twoValueComponentList } from '../util'
export default {
  name: 'FormDrawingItem',
  components: {
    CipFormItem
  },
  props: {
    isActive: Boolean,
    fieldKey: String,
    config: Object,
    showCopy: {
      type: Boolean,
      default: true
    }
  },
  emits: ['onDelete', 'onCopy'],
  setup (props, context) {
    const model = ref({})
    const computedConfig = computed(() => {
      return handleFormConfig(props.config, [], {
        table: 'basic-table-design'
      }, { })
    })
    watch(() => computedConfig.value.defaultValue, (val) => {
      model.value[props.fieldKey] = val
    })
    const deleteItem = () => {
      context.emit('onDelete')
    }
    const copyItem = () => {
      context.emit('onCopy')
    }
    return {
      twoValueComponentList,
      computedConfig,
      deleteItem,
      copyItem,
      model
    }
  }
}
</script>
