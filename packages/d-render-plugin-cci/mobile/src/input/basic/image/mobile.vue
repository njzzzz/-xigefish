<template>
  <div class="cip-basic-image--mobile">
    <template v-for="(image,index) in fileList" :key="index">
      <img-row :file="image"
               :config="config"
               :remove-code="config.removeCode"
               :removable="true"
               @preview="handlePictureCardPreview"
               @after-remove="removeFile"></img-row>
    </template>
    <el-upload action="uploadUrl"
               v-model:file-list="fileList"
               class="upload-plus"
               :accept="accept"
               :before-upload="beforeUpload"
               :http-request="uploadFn"
               :show-file-list="false"
               multiple>
      <div class="image-plus" v-if="isAppend"><i class="el-icon-plus"></i></div>
      <template #tip>
        <div class="el-upload__tip">{{limitTip}}</div>
      </template>
    </el-upload>
    <el-dialog title="图片预览" v-model="dialogVisible">
      <Media style="width:100%" :type="config.mediaType" :src="dialogImageUrl" alt=""/>
    </el-dialog>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { ElUpload, ElDialog } from 'element-plus'
import Media from '../file/mobile'
import ImgRow from '@xigefish/d-render-plugin-cci/esm/input/basic/file/file-row'
import { uploadProps } from '@xigefish/d-render-plugin-cci/esm/input/basic/file/upload'
import { formInputProps, fromInputEmits } from '@xigefish/d-render-shared'

export default {
  props: formInputProps,
  components: { ElUpload, ElDialog, ImgRow, Media },
  emits: [...fromInputEmits],
  setup (props, context) {
    const { fileList, mainMessage, countLimit, typeLimit, sizeLimit, ...uploadUtils } = uploadProps(props, context)
    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)
    const uploadFn = async (opt) => {
      await uploadUtils.uploadFile.value(opt).send()
    }
    // 验证文件是否可以上传
    const beforeUpload = (file) => {
      if (mainMessage(typeLimit(file), '图片上传类型超出限制') ||
        mainMessage(countLimit(file), '图片上传数量超出限制') ||
        mainMessage(sizeLimit(file), '图片上传大小超出限制')) {
        return false
      }
    }
    const handlePictureCardPreview = (file) => {
      dialogImageUrl.value = props.config.imgTemplate ? props.config.imgTemplate(file.url) : file.url
      dialogVisible.value = true
    }
    // 限制提示语
    const limitTip = computed(() => {
      const { fileType, size } = props.config
      if (!!fileType && !!size) return `只能上传${fileType}文件，且不超过${size}MB`
      if (!!fileType && !size) return `只能上传${fileType}文件`
      if (!fileType && !!size) return `只能上传不超过${props.config.size}MB的文件`
      return ''
    })
    // 根据数量控制新增按钮
    const isAppend = computed(() => {
      return (props.config?.limit ?? Infinity) > fileList.value.length
    })
    const accept = computed(() => {
      const fileType = props.config.fileType
      if (fileType) {
        return '.' + fileType.replace(/,\s?/g, ',.')
      }
      return 'image/*'
    })
    return {
      ...uploadUtils,
      fileList,
      beforeUpload,
      handlePictureCardPreview,
      dialogVisible,
      dialogImageUrl,
      isAppend,
      limitTip,
      accept,
      uploadFn
    }
  }
}
</script>
