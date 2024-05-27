<template>
  <el-scrollbar>
    <template v-for="group in groupList" :key="group.groupName">
      <form-component-group :group="group"></form-component-group>
    </template>
  </el-scrollbar>
</template>
<script>
import { ElScrollbar } from 'element-plus'
import FormComponentGroup from './group'
export default {
  name: 'FormComponents',
  components: { FormComponentGroup, ElScrollbar },
  props: {
    groupList: Array
  }
}
</script>
