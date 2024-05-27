// 加一个中间层方便以后使用其他ui库
import { ElMessage } from 'element-plus'
import { getEquipmentType } from '@xigefish/d-render-shared'

/**
 * - CipMessage(opts)
 * - CipMessage.success(opts)
 * - CipMessage.error(opts)
 * - CipMessage.warning(opts)
 * - CipMessage.info(opts)
 * - opts => 移动端传vant Notify的参数，pc端传ElMessage的参数
 */
function CipMessage ({ message, type = 'success', ...reset }) {
  const ElMessageTypeToVantTypeMap = {
    success: 'success',
    info: 'primary',
    warning: 'warning',
    error: 'danger'
  }
  const isMobile = getEquipmentType() === 'mobile'
  if (isMobile) {
    import('vant/es/notify').then(res => {
      res.Notify({ type: ElMessageTypeToVantTypeMap[type], message, ...reset })
    })
  } else {
    ElMessage({
      showClose: true,
      type,
      message,
      ...reset
    })
  }
}
function messageTypeWrapper (type, params) {
  const paramsIsStr = typeof params === 'string'
  return paramsIsStr ? CipMessage({ message: params, type }) : CipMessage(params)
}
CipMessage.success = (params) => messageTypeWrapper('success', params)
CipMessage.error = (params) => messageTypeWrapper('error', params)
CipMessage.warning = (params) => messageTypeWrapper('warning', params)
CipMessage.info = (params) => messageTypeWrapper('info', params)

export default CipMessage
