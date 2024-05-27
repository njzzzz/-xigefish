export class Encode {
  constructor (bindProps) {
    this.map = new Map()
    this.addEncodeType(bindProps)
  }

  addEncodeType (bindProps) {
    const { name, value } = bindProps
    this.map.set(['line', 'bar'], { x: name, y: value })
    this.map.set(['pie'], { itemName: name, value })
  }

  getEncode (series) {
    const { type } = series
    const entries = [...this.map.entries()]
    const encode = entries.reduce((obj, array) => {
      const [keys, value] = array
      if (keys.includes(type)) obj = value
      return obj
    }, {})
    return encode
  }

  checkEncode (series = {}) {
    try {
      if (Array.isArray(series)) {
        series[0].encode = series.length > 1 ? {} : this.getEncode(series[0])
      } else {
        series.encode = this.getEncode(series)
      }
    } catch (error) {
      console.log(error)
    }
    return series
  }
}

export const watchDom = (el, callback) => {
  const observer = new MutationObserver(callback)
  observer.observe(el, { attributes: true, childList: true, subtree: true })
}
