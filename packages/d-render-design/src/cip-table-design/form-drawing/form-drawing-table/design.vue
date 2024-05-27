<template>
<!--    <div style="display:flex;" class="table-design">-->
    <el-form-item :label="config.hideLabel===true?'':config.label"  class="table-design">
      <div v-if="!hideDelete" style="width:55px" class="table-design__column">
        <div class="table-design__column__label"></div>
        <div class="table-design__column__content">
          <i class="is-danger el-icon-remove" style="font-size: 24px;"/>
        </div>
        <!--        <cip-table :offset="0" :data="[{}]" :columns="[]" ></cip-table>-->
      </div>
      <template v-if="!config.hideIndex">
      <div style="width:55px" class="table-design__column">
        <div class="table-design__column__label">序号</div>
        <div class="table-design__column__content">1</div>
        <!--        <cip-table :offset="0" :data="[{}]" :columns="[]" ></cip-table>-->
      </div>
      </template>
      <div class="table-design__drag-wrapper" >
        <slot></slot>
      </div>
    </el-form-item>
<!--    </div>-->
</template>
<script>
import { ElFormItem } from 'element-plus'
export default {
  name: 'basic-table',
  components: { ElFormItem },
  props: {
    config: Object,
    hideDelete: {
      type: Boolean,
      default: false
    }
  }
}
</script>
