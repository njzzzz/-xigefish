import { h, markRaw } from 'vue'
import CipMessageBox from '@xigefish/components/cip-message-box'
import CipButton from '@xigefish/components/cip-button'
import CipMessage from '@xigefish/components/cip-message'
import { Delete } from '@element-plus/icons-vue'

export default {
  name: 'message-box',
  setup () {
    const confirmButtonText = '确认'
    const cancelButtonText = '取消'
    const openMessageBox = () => {
      CipMessageBox.alert('提示信息', '标题', {
        confirmButtonText,
        callback: (action) => {
          CipMessage({
            type: 'info',
            message: `action: ${action}`
          })
        }
      })
    }
    const openConfirmMessageBox = () => {
      CipMessageBox.confirm(
        '是否继续操作?',
        '警告',
        {
          confirmButtonText,
          cancelButtonText,
          type: 'warning'
        }
      )
        .then(() => {
          CipMessageBox({
            type: 'success',
            message: '操作成功'
          })
        })
        .catch(() => {
          CipMessageBox({
            type: 'info',
            message: '取消操作'
          })
        })
    }
    const openPromptMessageBox = () => {
      CipMessageBox.prompt('请输入你的Email', '提示', {
        confirmButtonText,
        cancelButtonText,
        inputPattern:
          /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '无效的Email'
      })
        .then(({ value }) => {
          CipMessage({
            type: 'success',
            message: `你的Email是:${value}`
          })
        })
        .catch(() => {
          CipMessage({
            type: 'info',
            message: '取消输入'
          })
        })
    }
    const openVNodeMessageBox = () => {
      CipMessageBox({
        title: '消息',
        message: h('p', null, [
          h('span', null, '消息内容可以是'),
          h('i', { style: 'color: teal' }, 'VNode')
        ]),
        showCancelButton: true,
        confirmButtonText,
        cancelButtonText,
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = 'Loading...'
            setTimeout(() => {
              done()
              setTimeout(() => {
                instance.confirmButtonLoading = false
              }, 300)
            }, 3000)
          } else {
            done()
          }
        }
      }).then((action) => {
        CipMessage({
          type: 'info',
          message: `action: ${action}`
        })
      })
    }

    const openHTMLMessageBox = () => {
      CipMessageBox.alert(
        '<strong>这是一段 <i>HTML</i> 片段</strong>',
        'HTML片段',
        {
          dangerouslyUseHTMLString: true
        }
      )
    }

    const openDiffCloseCancelMessageBox = () => {
      CipMessageBox.confirm(
        '是否确认?',
        '确认提示',
        {
          distinguishCancelAndClose: true,
          confirmButtonText,
          cancelButtonText
        }
      )
        .then(() => {
          CipMessage({
            type: 'info',
            message: '确认操作'
          })
        })
        .catch((action) => {
          CipMessage({
            type: 'info',
            message:
              action === 'cancel'
                ? '取消操作'
                : '关闭操作'
          })
        })
    }

    const openCenterContentMessageBox = () => {
      CipMessageBox.confirm(
        '居中的消息?',
        '警告',
        {
          confirmButtonText,
          cancelButtonText,
          type: 'warning',
          center: true
        }
      )
        .then(() => {
          CipMessage({
            type: 'success',
            message: '确认操作'
          })
        })
        .catch(() => {
          CipMessage({
            type: 'info',
            message: '取消操作'
          })
        })
    }
    const openCustomIconMessageBox = () => {
      CipMessageBox.confirm(
        '自定义Icon?',
        'Warning',
        {
          type: 'warning',
          icon: markRaw(Delete)
        }
      )
    }
    const openDraggableMessageBox = () => {
      CipMessageBox.confirm(
        '可拖拽?',
        'Warning',
        {
          confirmButtonText,
          cancelButtonText,
          type: 'warning',
          draggable: true
        }
      )
        .then(() => {
          CipMessage({
            type: 'success',
            message: '确认操作'
          })
        })
        .catch(() => {
          CipMessage({
            type: 'info',
            message: '取消操作'
          })
        })
    }
    return () => <div>
      <CipButton onClick={openMessageBox}>打开消息弹框</CipButton>
      <CipButton onClick={openConfirmMessageBox}>打开消息弹框</CipButton>
      <CipButton onClick={openPromptMessageBox}>打开提交内容弹框</CipButton>
      <CipButton onClick={openVNodeMessageBox}>打开vNode自定义内容弹框</CipButton>
      <CipButton onClick={openHTMLMessageBox}>打开html片段自定义内容弹框</CipButton>
      <CipButton onClick={openDiffCloseCancelMessageBox}>打开区分取消操作与关闭操作弹框</CipButton>
      <CipButton onClick={openCenterContentMessageBox}>打开内容居中弹框</CipButton>
      <CipButton onClick={openCustomIconMessageBox}>打开自定义图标弹框</CipButton>
      <CipButton onClick={openDraggableMessageBox}>打开可拖拽弹框</CipButton>
    </div>
  }
}
