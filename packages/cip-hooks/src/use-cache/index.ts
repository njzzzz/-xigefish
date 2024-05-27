import { computed, ref } from 'vue'
import { isEmptyObject, isJson } from '@xigefish/d-render-shared'
import CipMessageBox from '@xigefish/components/cip-message-box'
export const useCache = (key: string) => {
  const _item = ref({})

  const item = computed({
    get () {
      return _item.value
    },
    set (val) {
      sessionStorage.setItem(key, JSON.stringify(val))
      _item.value = val
    }
  })
  const loadCache = async () => {
    const json = sessionStorage.getItem(key)
    if (json && isJson(json)) {
      const obj = JSON.parse(json)
      if (!isEmptyObject(obj)) {
        await CipMessageBox.confirm('发现存在未提交的缓存信息，是否加载?', '提示', { type: 'info', cancelButtonText: '否', confirmButtonText: '是' })
        return JSON.parse(json)
      } else {
        throw new Error('no cache')
      }
    } else {
      throw new Error('no cache')
    }
  }
  const clearCache = async () => {
    sessionStorage.removeItem(key)
  }
  return [item, loadCache, clearCache]
}
