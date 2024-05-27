<template>
  <div class="basic-file">
    <cip-upload action="uploadUrl"
              style="margin-bottom: 10px"
              :config="securityConfig"
              :limit="securityConfig.limit"
              :multiple="securityConfig.multiple"
              :directory="securityConfig.directory"
              :show-file-list="false"
              v-model:file-list="fileList"
              @updateValue="list => proxyValue = list">
      <cip-button :buttonType="securityConfig.directory ? 'uploadDir' : 'upload'" :disabled="uploadDisabled"></cip-button>
      <cip-button v-if="formwork.length>0" @click="downloadFormwork">下载模板</cip-button>
      <template #tip>
        <div class="basic-file__tip">{{limitTip}}</div>
      </template>
    </cip-upload>
    <template v-for="(file,index) in fileList" :key="index">
      <file-row :file="file"
                :config="securityConfig"
                :depend-on-values="dependOnValues"
                :remove-code="securityConfig.removeCode"
                :removable="securityConfig.removable ?? true"
                @after-remove="removeFile"></file-row>
    </template>
  </div>
</template>

<script>
import CipUpload from '@xigefish/components/cip-upload'
import CipButton from '@xigefish/components/cip-button'
import FileRow from './file-row'
import { formInputProps, fromInputEmits, useFormInput } from '@xigefish/d-render-shared'
import { uploadProps, download } from './upload'
import { computed } from 'vue'

export default {
  props: formInputProps,
  emits: [...fromInputEmits],
  components: { FileRow, CipUpload, CipButton },
  setup (props, context) {
    const { securityConfig } = useFormInput(props, context)
    const { proxyValue, removeFile, fileList, uploadDisabled, limitTip } = uploadProps(props, context)

    // 根据数量控制新增按钮
    // const isAppend = computed(() => {
    //   return (securityConfig.value.limit ?? Infinity) > fileList.value.length
    // })
    const formwork = computed(() => {
      return securityConfig.value.formwork ?? []
    })
    const downloadFormwork = (e) => {
      e.stopPropagation()
      download(formwork.value[0])
    }
    return { proxyValue, fileList, limitTip, formwork, downloadFormwork, securityConfig, uploadDisabled, removeFile }
  }
}
</script>
