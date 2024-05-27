import { isJson } from '@xigefish/d-render-shared'
export const useObjectPersistence = (key) => {
  const setValue = (val) => {
    val = JSON.stringify(val)
    localStorage.setItem(key, val)
  }
  const getValue = () => {
    const v = localStorage.getItem(key)
    if (isJson(v)) {
      return JSON.parse(v)
    } else {
      return undefined
    }
  }
  return {
    setValue,
    getValue
  }
}
