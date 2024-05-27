/**
 * 文件上传处理函数
*/
import { computed, toRefs } from 'vue'
import { useCipConfig } from '../hooks/use-cip-config'
import CipMessage from '../cip-message'
import { useFormInject } from '@xigefish/d-render-shared'
export const fileTypeList = ['png', 'jpg', 'jpeg', 'jpe', 'gif', 'doc', 'docx', 'ppt', 'pptx', 'pdf', 'xls', 'xlsx', 'zip', '7z', 'rar']
export const uploadProps = (props, { emit }) => {
  const { config, uploadFile } = props
  const { fileList } = toRefs(props)
  const cipForm = Object.assign({uploadQueue: {}}, useFormInject())
  const cipConfig = useCipConfig()
  const useStringValue = computed(() => {
    return config.stringValue
  })
  const objectValue = computed(() => { // 返回的数据是一个对象
    return config.objectValue
  })
  const uploadFileFn = computed(() => {
    if (uploadFile) {
      return (arg) => ({
        reject: undefined,
        send: uploadFile.bind(null, arg),
        abort () {}
      })
    } else {
      // BROKEN: 默认的文件上传方法由cip-config-porvide提供
      return config.uploadFn || cipConfig.fileUpload 
    }
  })
  const fileSplitKey = computed(() => {
    return config.splitKey ?? ','
  })
  // 文件上传
  const useUploadFile = async (info) => {
    let file = info.file
    const uid = info.file.uid
    if (config.getFileName) {
      // 重新命名文件
      file = new window.File([file], config.getFileName(file.name, props.dependOnValues, config))
    }
    // 保持uid
    file.uid = uid
    const fileObject = {
      name: file.name,
      uid: file.uid,
      size: file.size,
      type: file.type,
      percentage: 0,
      status: 'ready'
    }

    // uploadFileFn.value 此处可能返回的是一个promise
    const fileXhr = await uploadFileFn.value({
      file: file,
      dependOnValues: props.dependOnValues,
      config: {
        // 挂载监听钩子
        onUploadProgress: progress => {
          fileUploadProgress(info, { total: progress.total, loaded: progress.loaded, percentage: Math.floor(progress.loaded / progress.total * 100) })
        }
      }
    })
    fileObject.abort = () => {
      cipForm.uploadQueue[uid] = false
      fileXhr.abort()
    }
    // 限制表单提交
    cipForm.uploadQueue[uid] = true
    // 这里兼容只是用来获取file文件，不直接上传
    if (fileList.value?.length) {
      Object.assign(fileList.value.at(-1), fileObject)
    }
    // 这里兼容不直接上传的情况，send函数无返回值或者返回的不是一个promise
    fileXhr.send()?.then((res) => {
      fileUploadProgress(info, { [config.urlKey || 'url']: res.data, status: 'success' })
      if (config.autoNotify) CipMessage.success(res.message)
      updateValue()
    }).catch(e => {
      fileUploadProgress(info, { status: 'exception' })
      setTimeout(() => {
        fileList.value.splice(fileList.value.findIndex(v => v.uid === info.file.uid), 1)
      }, 500)
    }).finally(() => {
      cipForm.uploadQueue[uid] = false
    })
  }
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
    if (config.ignoreFileType) { // 完全不限制类型
      return true
    }
    const fileType = config.fileType && config.fileType.length !== 0 ? config.fileType : fileTypeList
    const obj = file.name?.split('.') ?? ''
    return fileType.includes(obj[obj.length - 1].toLowerCase())
  }
  // 文件大小限制
  const sizeLimit = (file) => {
    return file.size <= (config.size ?? Infinity) * 1024 * 1024
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
  const updateValue = () => {
    let modelValue = fileList.value
    if (useStringValue.value) {
      modelValue = fileList.value?.map(v => v.url).join(fileSplitKey.value)
    } else if (objectValue.value) {
      modelValue = fileList.value[0]
    }
    emit('updateValue', modelValue)
  }
  const uploadDisabled = computed(() => props.disabled || props.limit <= fileList.value.length)

  // 验证文件是否可以上传
  const beforeUpload = (file) => {
    const errorMessage = config.customLimit && config.customLimit(file)
    if (errorMessage) {
      CipMessage.error(errorMessage)
      return false
    }
    if (mainMessage(typeLimit(file), '文件上传类型超出限制') ||
      mainMessage(countLimit(file), '文件上传数量超出限制') ||
      mainMessage(sizeLimit(file), '文件上传大小超出限制')
    ) {
      return false
    }
  }

  const accept = computed(() => {
    if (config.ignoreFileType) {
      return '*/*'
    }
    const fileType = config.fileType || fileTypeList.join(',')
    return '.' + fileType.replace(/,\s?/g, ',.')
  })

  return {
    uploadFile: useUploadFile,
    fileList,
    beforeUpload,
    uploadDisabled,
    accept
  }
}

export const download = (file) => {
  file.percentage = ''
  const download = document.createElement('a')
  download.setAttribute('href', file.url + '?response-content-type=application/octet-stream')
  download.setAttribute('download', file.name)
  download.click()
}
