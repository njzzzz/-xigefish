<template>
  <div class="basic-image">
    <template v-for="(image,index) in fileList" :key="index">
      <img-row :file="image"
               :config="config"
               :remove-code="config.removeCode"
               :removable="true"
               @preview="handlePictureCardPreview"
               @after-remove="removeFile"></img-row>
    </template>
    <cip-upload action="uploadUrl"
               listType="picture-card"
               :config="securityConfig"
               :itemStyle="{...inputStyle, width: config.itemWidth, height: config.itemHeight}"
               v-model:file-list="fileList"
               :limit="securityConfig.limit"
               :multiple="securityConfig.multiple"
               :directory="securityConfig.directory"
               :show-file-list="false"
               @updateValue="list => proxyValue = list">
    </cip-upload>
    <div class="el-upload__tip" style="width: 100%">{{limitTip}}</div>
    <cip-dialog :title="(config.mediaType === 'video' ?'视频': '图片') +'预览'" v-model="dialogVisible" :show-only="true">
      <Media style="width:100%" :type="config.mediaType" :src="dialogImageUrl" alt=""/>
    </cip-dialog>
  </div>
</template>

<script>
import { ref } from 'vue'
import CipDialog from '@xigefish/components/cip-dialog'
import Media from './media'
import ImgRow from './img-row'
import { formInputProps, fromInputEmits, useFormInput } from '@xigefish/d-render-shared'
import { uploadProps } from '../file/upload'
import CipUpload from '@xigefish/components/cip-upload'

export default {
  props: formInputProps,
  components: { CipDialog, ImgRow, Media, CipUpload },
  emits: [...fromInputEmits],
  setup (props, context) {
    const { securityConfig, inputStyle } = useFormInput(props, context)
    const { proxyValue, removeFile, fileList, uploadDisabled, limitTip } = uploadProps(props, context)
    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)
    const handlePictureCardPreview = (file) => {
      dialogImageUrl.value = props.config.imgTemplate ? props.config.imgTemplate(file.url) : file.url
      dialogVisible.value = true
    }

    return {
      inputStyle,
      securityConfig,
      uploadDisabled,
      fileList,
      removeFile,
      handlePictureCardPreview,
      dialogVisible,
      dialogImageUrl,
      limitTip,
      proxyValue
    }
  }
}
</script>
