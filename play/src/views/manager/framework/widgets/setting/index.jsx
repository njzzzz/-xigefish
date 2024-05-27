import CipDialog from '@xigefish/components/cip-dialog'
import CipForm from '@xigefish/d-render/cip-form'
import CipButton from '@xigefish/components/cip-button'
import { cloneDeep } from '@xigefish/d-render-shared'
import { ElIcon } from 'element-plus'
import { Setting } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { configFieldList } from './config'
const useDialog = () => {
  const dialog = ref(false)
  const openDialog = () => {
    dialog.value = true
  }
  return [dialog, openDialog]
}
export default {
  props: {
    modelValue: Object
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const [dialog, openDialog] = useDialog()
    let initModelValue = {}
    const openDialogBridge = () => {
      initModelValue = cloneDeep(props.modelValue)
      openDialog()
    }
    const updateModelValue = (val) => {
      emit('update:modelValue', val)
    }
    const save = (resolve, reject) => {
      resolve()
    }
    const reset = () => {
      updateModelValue(initModelValue)
    }
    const cancel = () => {
      updateModelValue(initModelValue)
      dialog.value = false
    }

    return () => <>
      <ElIcon size={18} style={{ cursor: 'pointer', paddingRight: '12px' }}>
        <Setting onClick={() => openDialogBridge()}></Setting>
      </ElIcon>
      <CipDialog
        v-model={dialog.value}
        title={'系统设置'}
        dialogType={'drawer'}
        onClose={() => cancel()}
      >
        {{
          default: () => <CipForm
            grid={24}
            labelPosition={'top'}
            model={props.modelValue}
            onUpdate:model={(val) => updateModelValue(val)}
            fieldList={configFieldList}
          />,
          footer: ({ confirm }) => <>
            <CipButton onClick={() => cancel()}>取消</CipButton>
            <CipButton onClick={() => reset()}>重置</CipButton>
            <CipButton type={'primary'} onClick={() => confirm(save)}>确认</CipButton>
          </>
        }}
      </CipDialog>
    </>
  }
}
