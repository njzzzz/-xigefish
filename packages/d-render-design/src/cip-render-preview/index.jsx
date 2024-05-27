import { ref, watchEffect } from 'vue'
import { ElSwitch } from 'element-plus'
import CipDialog from '@xigefish/components/cip-dialog'
import { CipFormRender } from '@xigefish/d-render'
import CipCodeMirror from '@xigefish/code-mirror'
export default {
  name: 'CipFormRenderPreview',
  props: {
    equipment: String,
    scheme: Object,
    modelValue: Boolean
  },
  setup (props, { emit }) {
    const showOnly = ref(false)
    const item = ref({})
    watchEffect(() => {
      if (props.modelValue) {
        item.value = {}
      }
    })
    const emitModelValue = (val) => {
      emit('update:modelValue', val)
    }

    const previewDataDialog = ref(false)
    const previewData = (resolve, reject) => {
      previewDataDialog.value = true
      reject()
    }

    return () => <>
      <CipDialog
        title={'预览表单'}
        modelValue={props.modelValue}
        onUpdate:modelValue={(val) => emitModelValue(val)}
        onConfirm={(resolve, reject) => previewData(resolve, reject)}
        confirmText={'查看数据'}
      >
        <div style="margin-bottom: 20px;">切换表单状态(注：使用时不会显示)   <ElSwitch v-model={showOnly.value}/></div>
        <CipFormRender
          v-models={[[item.value, 'model']]}
          scheme={props.scheme}
          equipment={props.equipment}
          showOnly={showOnly.value}
        />
      </CipDialog>
      <CipDialog title={'数据预览'} v-model={previewDataDialog.value} showOnly={true}>
        <CipCodeMirror modelValue={item.value} height={'500px'}/>
      </CipDialog>
    </>
  }
}
