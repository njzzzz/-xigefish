<template>
  <div class="cip-basic-image--preview">
    <template v-for="(image,index) in fileList" :key="index">
      <img-row :file="image"
               :depend-on-values="dependOnValues"
               :config="config"
               @preview="handlePictureCardPreview"></img-row>
    </template>
    <cip-dialog :title="(config.mediaType === 'video' ?'视频': '图片') +'预览'" v-model="dialogVisible" :show-only="true">
      <Media style="width:100%" :type="config.mediaType" :src="dialogImageUrl" alt=""/>
    </cip-dialog>
  </div>
</template>

<script>
import { ref } from 'vue'
import { formInputProps } from '@xigefish/d-render-shared'
import CipDialog from '@xigefish/components/cip-dialog'
import ImgRow from './img-row'
import Media from './media'
import { uploadProps } from '../file/upload'
export default {
  props: formInputProps,
  components: { CipDialog, ImgRow, Media },
  emits: ['update:modelValue'],
  setup (props, context) {
    const { fileList } = uploadProps(props, context)

    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)
    const handlePictureCardPreview = (file) => {
      dialogImageUrl.value = props.config.imgTemplate ? props.config.imgTemplate(file.url) : file.url
      dialogVisible.value = true
    }
    return {
      fileList,
      handlePictureCardPreview,
      dialogVisible,
      dialogImageUrl
    }
  }
}
</script>
