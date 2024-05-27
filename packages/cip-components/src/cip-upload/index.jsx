import { ElUpload, ElIcon, ElProgress } from 'element-plus'
import { SuccessFilled, CircleCloseFilled, Paperclip, UploadFilled, Plus, Close, RefreshRight } from '@element-plus/icons-vue'
import { defineComponent, onMounted, ref } from 'vue'
import CipButton from '../cip-button'
import { uploadProps } from './upload'

/**
 * props设计原则，el-upload的参数都直接放到props下。其他参数可以放到props.config下，为了兼容cip-form参数规则
 */
export default defineComponent({
  name: 'CipUpload',
  props: {
    uploadFile: Function,
    accept: { // 可选择文件类型控制
      type: String,
      default: '' // 所有
    },
    config: { // 配置对象
      type: Object,
      default: () => ({})
    },
    beforeRemove: Function, // 删除文件之前的钩子
    onRemove: Function, // 文件列表移除文件时的钩子
    onError: Function, // 文件上传失败时的钩子
    onSuccess: Function, // 文件上传成功时的钩子
    onPreview: Function, // 点击文件列表中已上传的文件时的钩子
    fileList: { type: Array, default: () => [] }, // 默认上传文件
    disabled: Boolean, // 是否禁用
    directory: Boolean, // 是否上次目录
    multiple: { type: Boolean, default: true },
    limit: Number,
    drag: Boolean, // 是否拖拽上传
    showFileList: { // 是否展示默认，后期考虑不用默认的
      type: Boolean,
      default: true
    },
    itemStyle: { // 文件列表的行内css样式
      type: Object,
      default: () => ({})
    },
    listType: { // 展示形式
      type: String,
      default: 'text'
    }
  },
  emits: ['update:fileList', 'updateValue'],
  inheritAttrs: false,
  setup (props, { slots, emit, attrs }) {
    const uploadRef = ref()
    onMounted(() => {
      // 文件夹模式，给type=file设置webkitdirectory属性来实现
      if (props.directory) {
        const fileDom = uploadRef.value.$el.querySelector('[type=file]')
        fileDom && fileDom.setAttribute('webkitdirectory', true)
      }
    })
    const { fileList, uploadFile, uploadDisabled, beforeUpload, accept } = uploadProps(props, { emit })
    function genDefault () {
      if (props.drag) { // 拖拽
        return <div class="cip-upload__drag-trigger">
          <ElIcon style="font-size: 50px;"><UploadFilled /></ElIcon>
          <div>
            点击或将文件拖拽到这里上传
          </div>
          <div class={'el-upload__tip'}>{slots.tip?.()}</div>
        </div>
      } else if (props.listType === 'picture-card') { // 缩略图
        return uploadDisabled.value || <div class="cip-upload__picture-trigger" style={ props.itemStyle }>
          <ElIcon><Plus /></ElIcon>
          <div>上传</div>
        </div>
      } else { // 默认
        return <CipButton buttonType={props.directory ? 'uploadDir' : 'upload'} disabled={uploadDisabled.value}></CipButton>
      }
    }

    async function deleteItem (index) {
      const uploadFiles = fileList.value.concat()
      const file = uploadFiles.splice(index, 1)[0]
      let flag
      try {
        flag = await props.beforeRemove?.(file, uploadFiles)
      } catch (err) {
        flag = props.beforeRemove?.(file, uploadFiles)
      }
      // 如果beforeRemove函数不存在 或者 返回值为true
      if (flag || !props.beforeRemove) {
        emit('update:fileList', uploadFiles)
        props.onRemove?.(file, uploadFiles)
      }
    }

    function genUpload (slots) {
      return <ElUpload
        ref={uploadRef}
        {...attrs}
        fileList={fileList.value}
        onUpdate:fileList={list => emit('update:fileList', list)}
        class={'cip-upload__content'}
        action={props.action}
        httpRequest={httpRequest}
        beforeUpload={beforeUpload}
        multiple={props.multiple}
        disabled={uploadDisabled.value}
        accept={accept.value}
        drag={props.drag}
        show-file-list={false}
      >
        {{
          // 1. default或者trigger存在，不渲染默认；渲染对应的default或者trigger；trigger在下面一行渲染
          default: () => slots.default?.() || (slots.trigger ? undefined : genDefault()),
          // 这个trigger要这么写，如果给它赋值函数，会出bug
          trigger: slots.trigger ? () => slots.trigger() : undefined,
          tip: () => props.drag || <div class={'el-upload__tip'} style={{ marginLeft: props.listType === 'picture-card' ? '0' : '12px' }}>{slots.tip?.()}</div>
        }}
      </ElUpload>
    }

    function httpRequest (opts) {
      uploadFile(opts)
    }

    function reUpload (item) {
      item.status = 'ready'
      httpRequest(item.opts)
    }

    function genItems () {
      return <>
        {genUpload(slots)}
        { fileList.value?.length === 0
          ? undefined
          : <ul class="el-upload-list el-upload-list--text">
          {
            fileList.value.map((item, index) => <li style={ props.itemStyle } class={['el-upload-list__item', `is-${item.status}`]} key={item.name + index} onClick={() => props.onPreview?.(item)}>
              <div class="el-upload-list__item-name">
                <ElIcon><Paperclip /></ElIcon>
                <span class="el-upload-list__item-file-name">{item.name}</span>
              </div>
              <div class="el-upload-list__item-label">
                {item.status === 'error' && <ElIcon onClick={() => reUpload(item)}><RefreshRight /></ElIcon>}
                <ElIcon class="upload--success"><SuccessFilled /></ElIcon>
                <ElIcon class="upload--close" onClick={() => deleteItem(index)}><Close /></ElIcon>
              </div>
              {item.status === 'ready' && <ElProgress stroke-width={2} indeterminate percentage={72} />}
            </li>)
          }
        </ul>}
      </>
    }

    function genPictureCard () {
      return <>
        <ul class="el-upload-list el-upload-list--picture-card">
          {
            fileList.value.map((item, index) => <li class="el-upload-list__item" style={ props.itemStyle } key={item.name + index} onClick={() => props.onPreview?.(item)}>
              {item.status === 'success' && <img src={item.url} />}
              <div class="upload--close">
                <ElIcon onClick={() => deleteItem(index)}><CircleCloseFilled /></ElIcon>
              </div>
              {item.status === 'ready' && <ElProgress stroke-width={4} style="top:50%;width:80%" indeterminate percentage={72} />}
            </li>)
          }
          {uploadDisabled.value || <li class="el-upload el-upload--picture-card" style={ props.itemStyle }>{genUpload({ trigger: slots.trigger, default: slots.default })}</li>}
        </ul>
        <div class={'el-upload__tip'}>{slots.tip?.()}</div>
      </>
    }

    function genPicture () {
      return <>
        {genUpload(slots)}
        { fileList.value?.length === 0
          ? undefined
          : <ul class="el-upload-list el-upload-list--picture">
          {
            fileList.value.map((item, index) => <li key={item.name + index} onClick={() => props.onPreview?.(item)}>
              {['jpeg', 'jpg', 'png', 'gif', 'svg'].includes(item.name?.split('.').pop())
                ? <img src={item.url} />
                : <i class="picture-icon"></i>}
              <div class="picture-info">
                <div class="item-name">{item.name}</div>
                <span class="item-size">{item.size}</span>
              </div>
              <div class="upload--close">
                <ElIcon onClick={() => deleteItem(index)}><CircleCloseFilled /></ElIcon>
              </div>
            </li>)
          }
        </ul>}
      </>
    }

    const renderTypeMap = {
      text: genItems,
      'picture-card': genPictureCard,
      picture: genPicture
    }

    return () => <div class="cip-upload">
      { props.showFileList ? (renderTypeMap[props.listType]?.()) : genUpload(slots) }
    </div>
  }
})
