import { debounce } from '../util'

export default (element) => {
  let sensor = null
  let listeners = []

  const resizeListener = debounce(() => {
    listeners.forEach(listener => listener(element))
  }, 100, false)

  const newSensor = () => {
    const s = new ResizeObserver(resizeListener)
    s.observe(element)
    resizeListener()
    return s
  }

  const bind = cb => {
    if (!sensor) {
      sensor = newSensor()
    }
    if (listeners.indexOf(cb) === -1) {
      listeners.push(cb)
    }
  }

  const destroy = () => {
    sensor.disconnect()
    listeners = []
    sensor = null
  }

  const unbind = cb => {
    const idx = listeners.findIndex(i => i === cb)
    if (idx !== -1) {
      listeners.splice(idx, 1)
    }

    if (listeners.length === 0 && sensor) destroy()
  }

  return {
    bind,
    destroy,
    unbind,
    element
  }
}
