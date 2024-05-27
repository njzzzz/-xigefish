import { debounce } from '../util'

export default (element) => {
  let sensor = null
  let listeners = []
  const newSensor = () => {
    if (getComputedStyle(element).position === 'static') {
      element.style.position = 'relative'
    }
    const ele = document.createElement('object')
    ele.style.position = 'absolute'
    ele.style.width = '100%'
    ele.style.height = '100%'
    ele.style.zIndex = '-1'
    ele.style.top = '0'
    ele.style.left = '0'
    ele.style.pointerEvents = 'none'
    ele.style.opacity = '0'
    ele.style.overflow = 'hidden'

    ele.type = 'text/html'
    element.appendChild(ele)

    ele.data = 'about:blank'
    ele.onload = () => {
      ele.contentDocument.defaultView.addEventListener('resize', resizeListener)
      resizeListener()
    }
    return ele
  }

  const resizeListener = debounce(() => {
    listeners.forEach(listener => listener(element))
  }, 100, false)

  const bind = (cb) => {
    if (!sensor) {
      sensor = newSensor()
    }
    if (listeners.indexOf(cb) === -1) {
      listeners.push(cb)
    }
  }

  const destroy = () => {
    if (sensor && sensor.parentNode) {
      if (sensor.contentDocument) {
        sensor.contentDocument.defaultView.removeEventListener('resize', resizeListener)
      }
      sensor.parentNode.removeChild(sensor)
      sensor = null
      listeners = []
    }
  }

  const unbind = (cb) => {
    const index = listeners.findIndex(callback => callback === cb)
    if (index !== -1) {
      listeners.splice(index, 1)
    }
    if (listeners.length === 0 && sensor) {
      destroy()
    }
  }

  return {
    bind,
    unbind,
    destroy,
    element
  }
}
