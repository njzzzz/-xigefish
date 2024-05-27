import { computed, ref, watch } from 'vue'
import { useFormInput, useCipConfig } from '@xigefish/d-render-shared'
import { isString } from '@xigefish/d-render-shared'
import CipMessage from '@xigefish/components/cip-message'
export const fileTypeList = ['png', 'jpg', 'jpeg', 'jpe', 'gif', 'doc', 'docx', 'ppt', 'pptx', 'pdf', 'xls', 'xlsx', 'zip', '7z', 'rar']
export const uploadProps = (props, context) => {
  const { proxyValue, securityConfig } = useFormInput(props, context)
  const useStringValue = computed(() => {
    return securityConfig.value.stringValue
  })
  const cipConfig = useCipConfig()
  const objectValue = computed(() => { // 返回的数据是一个对象
    return securityConfig.value.objectValue
  })
  const fileSplitKey = computed(() => {
    return securityConfig.value.splitKey ?? ','
  })
  const fileList = ref([])
  // 这个watch是moduleValue转成fileList数组；下面一个函数updateValue，是把fileList数组转成moduleValue
  watch(() => props.modelValue, () => {
    if (props.modelValue) {
      if (!useStringValue.value) {
        // 兼容未配置stringValue但存储结果为string的modelValue
        if (isString(props.modelValue)) {
          fileList.value = props.modelValue.split(fileSplitKey.value).map(v => ({ url: v }))
        } else if (objectValue.value) {
          fileList.value = [props.modelValue]
        } else {
          fileList.value = props.modelValue
        }
      } else {
        fileList.value = props.modelValue.split(fileSplitKey.value).map(v => ({ url: v }))
      }
    } else {
      fileList.value = []
    }
  }, { immediate: true })
  // 文件列表删除
  const removeFile = (file, list) => {
    const fileIndex = fileList.value.findIndex(v => v.uid === file.uid)
    fileList.value.splice(fileIndex, 1)
    updateValue()
  }
  // 是把fileList数组转成元素的数据类型moduleValue
  const updateValue = () => {
    let modelValue = fileList.value
    if (useStringValue.value) {
      modelValue = fileList.value?.map(v => v.url).join(fileSplitKey.value)
    } else if (objectValue.value) {
      modelValue = fileList.value[0]
    }
    proxyValue.value = modelValue
  }
  const uploadFile = computed(() => {
    return securityConfig.uploadFn || cipConfig.fileUpload
  })
  // 单例模式加载message
  let messageInstance = null
  const mainMessage = (through, message) => {
    if (!through) {
      if (messageInstance) {
        CipMessage.closeAll()
      }
      messageInstance = CipMessage.warning(message)
      return true
    }
  }
  // 文件数量限制
  const countLimit = (file) => {
    // 加上正在上传的数量
    return fileList.value.length + 1 <= (props.limit ?? Infinity)
  }
  // 文件类型限制
  const typeLimit = (file) => {
    if (securityConfig.ignoreFileType) { // 完全不限制类型
      return true
    }
    const fileType = securityConfig.fileType && securityConfig.fileType.length !== 0 ? securityConfig.fileType : fileTypeList
    const obj = file.name?.split('.') ?? ''
    return fileType.includes(obj[obj.length - 1].toLowerCase())
  }
  // 文件大小限制
  const sizeLimit = (file) => {
    return file.size <= (securityConfig.size ?? Infinity) * 1024 * 1024
  }
  // 修改文件列表某文件的状态
  const fileUploadProgress = (info, writeObj) => {
    return fileList.value.map(i => {
      if (i.uid === info.file.uid) {
        // eslint-disable-next-line
        for (const item in writeObj) {
          i[item] = writeObj[item]
        }
      }
      return i
    })
  }
  // 限制提示语
  const limitTip = computed(() => {
    const { fileType, size, limitTip: configLimitTip } = securityConfig.value
    if (configLimitTip) return configLimitTip
    if (!!fileType && !!size) return `只能上传${fileType}文件，且不超过${size}MB`
    if (!!fileType && !size) return `只能上传${fileType}文件`
    if (!fileType && !!size) return `只能上传不超过${size}MB的文件`
    return ''
  })
  const uploadDisabled = computed(() => props.disabled || securityConfig.value.limit <= fileList.value.length)
  return {
    removeFile,
    fileList,
    uploadDisabled,
    limitTip,
    proxyValue,
    mainMessage,
    countLimit,
    typeLimit,
    sizeLimit,
    fileUploadProgress,
    uploadFile
  }
}

export const download = (file) => {
  file.percentage = ''
  const download = document.createElement('a')
  download.setAttribute('href', file.url + '?response-content-type=application/octet-stream')
  download.setAttribute('download', file.name)
  download.click()
}
