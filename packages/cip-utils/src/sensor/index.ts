// 监听dom元素resize
import elementSensor from './element'
import observeSensor from './resize-observe'
export const sensor = typeof ResizeObserver !== 'undefined' ? observeSensor : elementSensor
