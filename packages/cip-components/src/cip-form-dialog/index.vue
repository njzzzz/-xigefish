<template>
  <CipConfigProvide v-bind="cipConfig">
    <cip-dialog v-model="visible"
                :title="title"
                :width="width"
                :destroy-on-close="true"
                :show-close="showClose"
                :show-cancel="showCancel"
                :confirmText="confirmText"
                :fullscreen="fullscreen"
                :close-on-press-escape="closeOnPressEscape"
                :on-confirm="confirm">
      <cip-form ref="formRef"
                :label-width="labelWidth"
                :label-position="labelPosition"
                v-model:model="innerModel"
                :grid="grid"
                :field-list="formFieldList" />
    </cip-dialog>
  </CipConfigProvide>
</template>
<script>
import { defineComponent, ref, watch } from 'vue'
import CipDialog from '../cip-dialog'
import { CipForm } from '@xigefish/d-render'
import CipConfigProvide from '../cip-config-provide'
export default defineComponent({
  name: 'CipFormDialog',
  components: { CipDialog, CipForm, CipConfigProvide },
  inheritAttrs: false,
  props: {
    title: { type: String, required: true },
    model: { type: Object, default: () => ({}) },
    width: { type: String },
    formFieldList: { type: Array, default: () => [] },
    labelWidth: { type: String },
    labelPosition: { type: String, default: 'right' },
    onConfirm: { type: Function, default: (resolve, reject, model) => { resolve(model) } },
    confirmText: String,
    showClose: { },
    showCancel: {},
    fullscreen: {},
    grid: {},
    closeOnPressEscape: { type: Boolean, default: true },
    cipConfig: Object
  },
  emits: ['update:model', 'action', 'vanish'],
  setup (props, { emit }) {
    const visible = ref(false)
    const confirm = (resolve, reject) => {
      props.onConfirm((data) => {
        onAction('resolve', data)
        resolve() // 关闭弹窗
        unwatch() // 取消监听事件
        onVanish() // 销毁组件
      }, (err) => {
        reject(err)
      }, innerModel.value)
    }
    const unwatch = watch(visible, (val) => {
      if (val === false) {
        onAction('close')
        onVanish()
      }
    })
    const innerModel = ref({ ...props.model })
    // 如果这样写，会导致即使取消外层传入的model数据依然被修改的问题
    // const { model: innerModel } = toRefs(props)
    const onAction = (action, data) => {
      emit('action', action, data)
    }
    const onVanish = () => {
      emit('vanish')
    }

    return {
      innerModel,
      visible,
      confirm
    }
  }
})
</script>
