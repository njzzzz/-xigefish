import { ElNotification } from 'element-plus'

function CipNotification ({ title, message, type = 'info', customClass = '', ...reset }) {
  // 样式靠拢ui规范
  ElNotification({
    type,
    title,
    message,
    customClass: `cip-notification-${type} ${customClass}`,
    ...reset
  })
}
function messageTypeWrapper (type, params) {
  const paramsIsStr = typeof params === 'string'
  return paramsIsStr ? CipNotification({ message: params, type }) : CipNotification(params)
}
CipNotification.success = (params) => messageTypeWrapper('success', params)
CipNotification.error = (params) => messageTypeWrapper('error', params)
CipNotification.warning = (params) => messageTypeWrapper('warning', params)
CipNotification.info = (params) => messageTypeWrapper('info', params)

export default CipNotification
