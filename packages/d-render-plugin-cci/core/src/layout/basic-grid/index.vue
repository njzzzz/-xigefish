<template>
  <el-row
    class="cip-basic-grid"
    :gutter="config.gutter"
    :type="config.componentType"
    :align="config.align"
    :justify="config.justify">
    <template
      v-for="({children,...col},optionIndex) in options"
      :key="optionIndex">
      <el-col
        v-bind="col"
        class="basic-grid__col">
        <slot
          name="item"
          :children="children"
          :optionIndex="optionIndex"
          :is-show="config._isShow"
          :addOptionChild="addOptionChild"
          :deleteOptionChild="deleteOptionChild"
          :copyOptionChild="copyOptionChild"
          :updateOptionChildren="updateOptionChildren"
          :updateOptionChild="updateOptionChild"></slot>
      </el-col>
    </template>
  </el-row>
</template>
<script>
import { ElRow, ElCol } from 'element-plus'
import { layoutProps, useFormLayoutOptions } from '@xigefish/d-render-shared'
export default {
  name: 'BasicGrid',
  props: layoutProps,
  components: {
    ElRow,
    ElCol
  },
  emits: ['update:config', 'selectItem'],
  setup (props, { emit }) {
    const formLayoutOptions = useFormLayoutOptions({ props, emit })
    return {
      ...formLayoutOptions
    }
  }
}
</script>
