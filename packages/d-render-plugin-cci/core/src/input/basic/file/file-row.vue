<template>
  <div class="cip-file-row" >
    <span class="cip-file-row__file-name">{{file.name}}</span>
    <!--    进度条仅在当前页面上传的文件中显示-->
    <template v-if="file.status === 'ready'">
      <el-progress style="width: 100%" :percentage="file.percentage" :stroke-width="2"></el-progress>
      <div>
        ({{parseFileSize(file.loaded)}}/{{parseFileSize(file.total)}})
        <cip-button-text v-if="file.status === 'ready'" type="danger" @click="cancelUpload(file)">取消</cip-button-text>
      </div>
    </template>
    <template v-else>
      <div class="handle-button-wrapper">
        <!-- <cip-table-button size="large" :type="isPreview?'visited':undefined" :loading="previewLoading" v-if="previewAble" @click="previewFile">
          预览
        </cip-button-text>
        <cip-button-text size="large" :type="isDownload?'visited':undefined" :loading="downloadLoading" v-if="downloadAble" @click="downloadFile">
          下载
        </cip-table-button> -->
        <template v-if="file.status!=='error'">
          <el-icon v-if="previewAble" @click="previewFile"><View/></el-icon>
          <el-icon v-if="downloadAble" @click="downloadFile"><Download/></el-icon>
        </template>
        <el-icon v-if="file.status==='success'" class="upload--success"><SuccessFilled /></el-icon>
        <el-icon v-if="removable" class="upload--close" @click="remove"><Close/></el-icon>
      </div>
    </template>
  </div>
</template>
<script>
import { computed, ref } from 'vue'
import { ElMessageBox, ElProgress, ElIcon } from 'element-plus'
import { Dialog as VanDialog } from 'vant'
import { download } from './upload'
import { getEquipmentType, isEmpty } from '@xigefish/d-render-shared'
import { SuccessFilled, View, Download, Close } from '@element-plus/icons-vue'
import CipButtonText from '@xigefish/components/cip-button-text'

export default {
  components: { ElProgress, CipButtonText, ElIcon, SuccessFilled, View, Download, Close },
  props: {
    file: {
      type: Object,
      default: () => { return {} }
    },
    config: Object,
    dependOnValues: Object,
    removable: Boolean
  },
  setup (props, { emit }) {
    const isMobile = getEquipmentType() === 'mobile'
    const previewLoading = ref(false)
    const downloadLoading = ref(false)
    const fileValue = computed(() => {
      return props.file
    })
    // 根据文件大小 显示 B kb mb
    const parseFileSize = (size) => {
      let unit = 'k'
      if (size > 1024) {
        size = size / 1024
        unit = 'kb'
      }
      if (size > 1024) {
        size = size / 1024
        unit = 'mb'
      }
      return `${Math.floor(size)}${unit}`
    }
    const cancelUpload = (file) => {
      file.abort()
    }

    const previewAble = computed(() => {
      if (typeof props.config.previewAble === 'boolean') return props.config.previewAble
      return props.config.previewAble?.(props.dependOnValues)
    })
    const isPreview = computed(() => {
      return !!props.file.read
    })
    const isDownload = computed(() => {
      return !!props.file.download
    })
    const previewFile = async () => {
      previewLoading.value = true
      try {
        await props.config.previewFile?.(fileValue.value)
      } finally {
        previewLoading.value = false
      }
    }
    const downloadAble = computed(() => {
      if (isEmpty(props.config.downloadAble)) return true
      if (typeof props.config.downloadAble === 'boolean') return props.config.downloadAble
      return props.config.downloadAble(props.dependOnValues)
    })
    const downloadFile = async () => {
      try {
        downloadLoading.value = true
        if (isEmpty(props.config.downloadFile)) {
          await download(fileValue.value)
        } else {
          await props.config.downloadFile(fileValue.value)
        }
      } finally {
        downloadLoading.value = false
      }
    }

    const remove = async () => {
      try {
        isMobile
          ? await VanDialog.confirm({
            title: '警告',
            message: `确认删除《${fileValue.value.name}》`
          })
          : await ElMessageBox.confirm(`确认删除《${fileValue.value.name}》`, '警告', { type: 'warning' })
        if (props.config.deleteFile) {
          await props.config.deleteFile?.(fileValue.value)
        }
        emit('after-remove', fileValue.value)
      } catch (e) {
      }
    }
    return {
      parseFileSize,
      cancelUpload,
      previewAble,
      previewLoading,
      previewFile,
      downloadAble,
      downloadLoading,
      downloadFile,
      remove,
      isPreview,
      isDownload
    }
  }
}
</script>
