<template>
  <div class="cip-cancel-loading" v-if="visible">
    <div class="cip-cancel-loading__mark"></div>
    <div class="cip-cancel-loading__dialog">
      <div class="cip-cancel-loading__content">
        <slot name="content">
          <ElIcon class="cip-cancel-loading__icon" size="100">
            <Loading />
          </ElIcon>
<!--          <i class="el-icon-loading"></i>-->
          <div class="cip-cancel-loading__text" v-html="message"></div>
        </slot>
      </div>
      <div class="cip-cancel-loading__button" @click="close">{{btnName}}</div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { generateProps } from '@xigefish/shared'
import { componentScheme } from './component.scheme'
import { ElIcon } from 'element-plus'
import { Loading } from '@element-plus/icons-vue'
// 组件介绍：本组件是可关闭的loading加载组件，一般适用于耗时比较长接口连接调用
export default defineComponent({
  name: 'CipCancelLoading',
  props: generateProps(componentScheme),
  components: { ElIcon, Loading },
  emits: ['vanish'],
  setup (props, { emit }) {
    const visible = ref(false)
    const close = () => {
      visible.value = false
      emit('vanish')
    }
    return {
      visible,
      close
    }
  }
})
</script>
