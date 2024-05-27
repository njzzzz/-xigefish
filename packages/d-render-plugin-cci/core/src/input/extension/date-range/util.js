import dayjs from 'dayjs'
import { isInputEmpty } from '@xigefish/d-render-shared'
// 用于比较大小
export const dateInfoToTimes = (dateInfoList) => {
  return dateInfoList.map(v => {
    if (typeof v === 'number') return v
    if (v instanceof Date) return v.getTime()
    return dayjs(v).valueOf()
  })
}

export const getNotEmptyValue = (a, b) => {
  if (!isInputEmpty(a) && !isInputEmpty(b)) return [a, b]
  if (!isInputEmpty(a)) return [a]
  if (!isInputEmpty(b)) return [b]
  return []
}
