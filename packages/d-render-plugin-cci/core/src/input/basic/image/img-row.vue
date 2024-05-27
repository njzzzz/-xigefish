<template>
  <div class="cip-image-img-row" :style="{width: config.itemWidth, height: config.itemHeight}">
    <!--    升级img展示组件-->
    <Media class="cip-image-img-row__img-item" :type="config.mediaType" :src="realUrl"></Media>
    <!--    <img class="img-row__img-item" :src="file.url">-->
    <!--进度条仅在当前页面上传的文件中显示-->
    <template v-if="file.status === 'ready'">
      <!-- <el-progress style="flex-grow: 2" type="circle" :percentage="file.percentage" :status="file.status" :width="60"></el-progress> -->
      <div class="progress-cancel">
        ({{parseFileSize(file.loaded)}}/{{parseFileSize(file.total)}})
        <cip-button-text size="small" @click="cancelUpload(file)">取消</cip-button-text>
      </div>
      <el-progress :stroke-width="4" style="top:50%;width:80%" indeterminate :percentage="72" />
    </template>
    <template v-else>
      <div class="handle-button-wrapper">
        <template v-if="file.status!=='error'">
          <ElIcon v-if="previewAble" @click="preview"><View/></ElIcon>
          <ElIcon v-if="downloadAble" @click="download"><Download/></ElIcon>
        </template>
        <!-- <cip-table-button size="small" @click="preview" >
          <i class="el-icon-zoom-in"></i>
        </cip-table-button>
        <cip-table-button size="small" @click="download">
          <i class="el-icon-download"></i>
        </cip-table-button>
        <cip-table-button size="small" @click="remove" :loading="removeLoading" v-if="removable">
          <i class="el-icon-delete"></i>
        </cip-table-button> -->
      </div>
      <div v-if="removable" class="upload--close">
        <ElIcon @click="remove"><CircleCloseFilled /></ElIcon>
      </div>
    </template>
  </div>
</template>
<script>
import { computed, ref } from 'vue'
import { ElMessageBox, ElProgress, ElIcon } from 'element-plus'
import Media from './media'
import { Dialog as VanDialog } from 'vant'
// import apiConfig from '@xigefish/request/apiConfig'
import { store } from '@xigefish/request'
import { getValueByTemplate, getEquipmentType, isEmpty } from '@xigefish/d-render-shared'
import { CircleCloseFilled, View, Download } from '@element-plus/icons-vue'
import CipButtonText from '@xigefish/components/cip-button-text'

export default {
  components: { ElProgress, Media, ElIcon, CircleCloseFilled, View, Download, CipButtonText },
  props: {
    file: {
      type: Object,
      default: () => { return {} }
    },
    config: Object,
    removable: Boolean,
    dependOnValues: Object
  },
  setup (props, { emit }) {
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
    const isMobile = getEquipmentType() === 'mobile'
    const realUrl = computed(() => {
      const url = props.file.url
      if (props.config.imgTemplate) {
        return props.config.imgTemplate(url)
      } else {
        return url
      }
    })
    const removeLoading = ref(false)
    const fileValue = computed(() => {
      return props.file
    })
    const cancelUpload = (file) => {
      file.abort()
    }
    const preview = () => {
      emit('preview', fileValue.value)
    }
    const download = () => {
      const download = document.createElement('a')
      download.setAttribute('href', getValueByTemplate(realUrl.value, store.apiConfig) + '?response-content-type=application/octet-stream')
      const fileName = fileValue.value.name || fileValue.value.url.split('?')[0].split('/').pop()
      download.setAttribute('download', fileName)
      download.click()
    }
    const remove = async () => {
      removeLoading.value = true
      const name = fileValue.value.name
      const message = name ? `确认删除《${name}》` : '确认删除'
      try {
        isMobile
          ? await VanDialog.confirm({
            title: '警告',
            message: `确认删除《${fileValue.value.name}》`
          })
          : await ElMessageBox.confirm(message, '警告', {
            type: 'warning'
          })
        emit('after-remove', fileValue.value)
      } catch (error) {
        console.info('用户取消删除')
      } finally {
        removeLoading.value = false
      }
    }
    const previewAble = computed(() => {
      if (isEmpty(props.config.downloadAble)) return true
      if (typeof props.config.previewAble === 'boolean') return props.config.previewAble
      return props.config.previewAble?.(props.dependOnValues)
    })
    const downloadAble = computed(() => {
      if (isEmpty(props.config.downloadAble)) return true
      if (typeof props.config.downloadAble === 'boolean') return props.config.downloadAble
      return props.config.downloadAble(props.dependOnValues)
    })
    return {
      realUrl,
      previewAble,
      downloadAble,
      cancelUpload,
      preview,
      download,
      remove,
      removeLoading,
      parseFileSize
    }
  }
}
</script>
