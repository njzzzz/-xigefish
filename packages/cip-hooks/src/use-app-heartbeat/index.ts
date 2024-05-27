import { onBeforeUnmount } from 'vue'
import { App } from '@/api'
/**
 * 应用心跳，用于维持特殊页面的登录状态
 * @param {Number} timeout 心跳间隔时间(ms)
 */
export const useAppHeartbeat = (timeout = 1000 * 60 * 20) => {
  const timer = setInterval(() => {
    process.env.NODE_ENV === 'development' && console.log('trigger app heartbeat')
    // eslint-disable-next-line no-unused-expressions
    App?.heartbeat()
  }, timeout) // 20分钟

  onBeforeUnmount(() => {
    process.env.NODE_ENV === 'development' && console.log('destroy app heartbeat')
    clearInterval(timer)
  })
}
