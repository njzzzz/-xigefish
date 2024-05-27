import { h } from 'vue'
import CipButton from '@xigefish/components/cip-button'
import CipMessage from '@xigefish/components/cip-message'

export default {
  name: 'message',
  setup () {
    const openBasicMsg = () => {
      CipMessage({ message: '这是一条消息' })
    }
    const openVNodeMsg = () => {
      CipMessage({
        message: h('p', null, [
          h('span', null, '消息可以是'),
          h('i', { style: 'color: teal' }, 'VNode')
        ])
      })
    }
    const status = ['success', 'error', 'warning', 'info']
    const statusMap = {
      success: '成功提示',
      error: '错误提示',
      warning: '告警提示',
      info: '默认提示'
    }
    const openStatusMsg = (state) => {
      CipMessage[state](`${statusMap[state]}类操作`)
    }
    const openCenterMsg = () => {
      CipMessage({
        message: '居中文字',
        center: true
      })
    }
    const openHTMLMsg = () => {
      CipMessage({
        dangerouslyUseHTMLString: true,
        message: '<strong>这是<i>HTML</i>片段</strong>'
      })
    }
    const openGroupMsg = () => {
      CipMessage({
        message: '这是一条消息.',
        grouping: true,
        type: 'success'
      })
    }

    return () => <div>
      <CipButton onClick={openBasicMsg}>基础使用</CipButton>
      <CipButton onClick={openVNodeMsg}>消息使用vNode呈现</CipButton>
      {
        status.map(state => <CipButton onClick={() => { openStatusMsg(state) }}>{statusMap[state]}</CipButton>)

      }
      <CipButton onClick={openCenterMsg}>消息居中</CipButton>
      <CipButton onClick={openHTMLMsg}>消息使用html呈现</CipButton>
      <CipButton onClick={openGroupMsg}>合并相同内容的消息</CipButton>
    </div>
  }
}
