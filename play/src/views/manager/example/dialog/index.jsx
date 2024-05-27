import { ref } from 'vue'
import CipMessage from '@xigefish/components/cip-message'
import CipButton from '@xigefish/components/cip-button'
import CipDialog from '@xigefish/components/cip-dialog'
import CipForm from '@xigefish/d-render/cip-form'
import { formFieldList } from './form-config'
import CipMessageBox from '@xigefish/components/cip-message-box'
const useDialog = () => {
  const dialog = ref(false)
  const openDialog = () => {
    dialog.value = true
  }
  return [dialog, openDialog]
}

export default {
  setup () {
    const [basicDialog, openBasicDialog] = useDialog()
    const [confirmDialog, openConfirmDialog] = useDialog()
    const [formDialog, openFormDialog] = useDialog()
    const [multiFormDialog, openMultiFormDialog] = useDialog()
    const [errorRequestDialog, openErrorRequestDialog] = useDialog()
    const [sizeDialog, openSizeDialog] = useDialog()
    const item = ref({})
    const item2 = ref({})
    const item3 = ref({})
    const containerStyle = {
      display: 'flex'
    }
    const childStyle = {
      marginLeft: '20px'
    }
    const sizes = ['large', 'default', 'small', 'mini']
    const dialogSize = ref('default')
    const openSizeDialogProxy = (size) => {
      dialogSize.value = size
      openSizeDialog()
    }
    return () => <>
      <div style={containerStyle}>
        <div style={childStyle}>
          <CipButton onClick={openBasicDialog}>打开一个只读弹窗</CipButton>
          <CipDialog
            v-model={basicDialog.value}
            title={'弹窗标题'}
            subTitle={'我是二级标题'}
            showOnly={true}
          >
            <div>我是正文内容哦哦</div>
          </CipDialog>
        </div>
        <div style={childStyle}>
          <CipButton onClick={openConfirmDialog}>打开一个带确认按钮的弹窗</CipButton>
          <CipDialog
            v-model={confirmDialog.value}
            title={'弹窗标题'}
          >
            <div>我是正文内容哦哦</div>
          </CipDialog>
        </div>
        <div style={childStyle}>
          <CipButton onClick={openFormDialog}>打开一个带form的弹窗</CipButton>
          <CipDialog
            v-model={formDialog.value}
            title={'弹窗标题'}
            onConfirm={(resolve, reject) => {
              CipMessageBox.alert(JSON.stringify(item.value), '提示').then(res => {
                resolve(res)
              }).catch(err => {
                reject(err)
              })
            }}
          >
            <CipForm v-model:model={item.value} fieldList={formFieldList} labelWidth={'80px'}/>

          </CipDialog>
        </div>
        <div style={childStyle}>
          <CipButton onClick={openMultiFormDialog}>打开一个多个form的弹窗</CipButton>
          <CipDialog
            v-model={multiFormDialog.value}
            title={'弹窗标题'}
            onConfirm={(resolve, reject) => {
              CipMessageBox.alert(JSON.stringify(item2.value) + JSON.stringify(item3.value), '提示').then(res => {
                resolve(res)
              }).catch(err => {
                reject(err)
              })
            }}
          >
            <CipForm v-model:model={item2.value} fieldList={formFieldList} labelWidth={'80px'}/>
            <CipForm v-model:model={item3.value} fieldList={formFieldList} labelWidth={'80px'}/>
          </CipDialog>
        </div>
        <div style={childStyle}>
          <CipButton onClick={() => openErrorRequestDialog()}>打开一个会模拟请求失败的Dialog</CipButton>
          <CipDialog
            v-model={errorRequestDialog.value}
            title={'弹窗标题'}
            onConfirm={(resolve, reject) => {
              setTimeout(() => {
                CipMessage.error('请求出错')
                reject()
              }, 1500)
            }}
          >
            <CipForm v-model:model={item2.value} fieldList={formFieldList} labelWidth={'80px'}/>
          </CipDialog>
        </div>
        <div style={childStyle}>
          {sizes.map(size => <CipButton onClick={() => openSizeDialogProxy(size)}>{size}</CipButton>)}
          <CipDialog
            v-model={sizeDialog.value}
            size={dialogSize.value}
            title={'弹窗标题'}
          >
            <div>对话框尺寸: {dialogSize.value}</div>
          </CipDialog>
        </div>
      </div>
    </>
  }
}
