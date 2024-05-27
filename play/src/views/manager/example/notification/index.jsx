import { h } from 'vue'
import CipButton from '@xigefish/components/cip-button'
import CipNotification from '@xigefish/components/cip-notification'

export default {
  name: 'notification',
  setup () {
    const autoCloseNotification = () => {
      CipNotification({
        title: '标题',
        message: h('i', { style: 'color: teal' }, '这是说明'),
        duration: 3000
      })
    }
    const noAutoCloseNotification = () => {
      CipNotification({
        title: '备注',
        message: '这是一条不是自动关闭的信息',
        duration: 0
      })
    }
    const status = ['success', 'error', 'warning', 'info']
    const statusMap = {
      success: '成功提示',
      error: '错误提示',
      warning: '告警提示',
      info: '默认提示'
    }
    const openStatusNotification = (state) => {
      CipNotification({
        type: state,
        title: statusMap[state],
        message: '这是一行说明文字',
        duration: 0
      })
    }
    const positions = ['top-right', 'bottom-right', 'bottom-left', 'top-left']
    const openPositionNotification = (position) => {
      CipNotification({
        position,
        title: '自定义位置',
        message: `I'm at the ${position} corner`
      })
    }
    const openHTMLNotification = () => {
      CipNotification({
        title: 'HTML String',
        dangerouslyUseHTMLString: true,
        message: '<strong>This is <i>HTML</i> string</strong>'
      })
    }
    const noCloseNotification = () => {
      CipNotification({
        message: '这个消息没有关闭按钮',
        showClose: false
      })
    }

    return () => <div>
      <CipButton onClick={autoCloseNotification}>自动关闭的消息</CipButton>
      <CipButton onClick={noAutoCloseNotification}>不会自动关闭的消息</CipButton>
      {
        status.map(state => <CipButton onClick={() => { openStatusNotification(state) }}>{statusMap[state]}</CipButton>)

      }
      {
        positions.map(position => <CipButton onClick={() => { openPositionNotification(position) }}>{position}</CipButton>)

      }
      <CipButton onClick={openHTMLNotification}>消息使用html呈现</CipButton>
      <CipButton onClick={noCloseNotification}>没有关闭按钮</CipButton>
    </div>
  }
}
