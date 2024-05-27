import { v4 as uuid } from 'uuid'
const isDev = process.env.NODE_ENV === 'development'

type Data<I> = {uid: string, info: {method: I, startTime: number, times?: number }}
class CConsole<T, I> {
  effective: T
  requestHistory: Record<string, Data<I>>
  constructor (effective: T) {
    this.effective = effective
    this.requestHistory = {}
  }

  open (info: I) {
    if (this.effective) {
      const uid = uuid()
      const data: Data<I> = { uid, info: { method: info, startTime: Date.now() } }
      this.requestHistory[uid] = data
      return uid
    }
  }

  append (uid: string, type, info) {
    if (this.effective) {
      const currentReq = this.requestHistory[uid]
      if (currentReq) {
        currentReq.info[type] = info
      }
    }
  }

  end (uid) {
    if (this.effective) {
      const endTime = Date.now()
      const times = endTime - this.requestHistory[uid].info.startTime
      Reflect.deleteProperty(this.requestHistory[uid].info, 'startTime')
      this.requestHistory[uid].info.times = times
      console.log('%c【cConsole】', 'color: #67c23a;', this.requestHistory[uid].info)
      this.requestHistory[uid] = null
    }
  }
}

export const cConsole = new CConsole(isDev)
