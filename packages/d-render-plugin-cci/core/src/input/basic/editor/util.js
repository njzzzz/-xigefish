import { isInputEmpty } from '@xigefish/d-render-shared'

export const clearEmptyKey = (obj) => {
  // 清空value为空的key
  // eslint-disable-next-line
  for (const i in obj) {
    if (isInputEmpty(obj[i])) delete obj[i]
  }
  return obj
}
