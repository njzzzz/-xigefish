import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import ExampleTabs from '@/components/example-page'
import CipUpload from '@xigefish/components/cip-upload'
import CipButton from '@xigefish/components/cip-button'
import { ref, watch } from 'vue'
import { ElTag } from 'element-plus'
import File from '@xigefish/d-render-plugin-cci/esm/input/basic/file/view'
import CipForm from '@xigefish/d-render/cip-form'
import { defineFormFieldConfig, generateFieldList } from '@xigefish/d-render-shared'
import { fileService } from '@/api/service/basic'

export default {
  setup () {
    const fileList = ref([{
      name: 'huax.png',
      url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100.png'
    },
    {
      name: '9bfda99bce42a18cdd1jpeg.jpeg',
      url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100.png'
    }])

    const model = ref({
      // fileRow: fileList
    })
    watch(model, () => console.log(model.value), { deep: true })

    const formFieldList = generateFieldList(defineFormFieldConfig({
      fileDir: {
        required: true,
        defaultValue: fileList,
        label: '选择文件夹',
        size: 1,
        limit: 30,
        fileType: 'png,jpg,jpeg,git,bmp',
        type: 'file',
        directory: true,
        uploadFn (opts) {
          console.log(fileService.uploadImage)
          return fileService.uploadImage(opts)
        }
      },
      fileRow: {
        required: true,
        defaultValue: fileList,
        label: '文件列表',
        size: 1,
        limit: 3,
        fileType: 'png,jpg,jpeg,git,bmp',
        type: 'file',
        uploadFn (opts) {
          return fileService.uploadImage(opts)
        }
      },
      imageDir: {
        required: true,
        defaultValue: fileList,
        label: '图片列表',
        size: 1,
        limit: 30,
        itemWidth: '124px',
        itemHeight: '124px',
        fileType: 'png,jpg,jpeg,git,bmp',
        type: 'image',
        directory: true,
        uploadFn (opts) {
          console.log(fileService.uploadImage)
          return fileService.uploadImage(opts)
        }
      },
      image: {
        required: true,
        defaultValue: fileList,
        label: '图片列表',
        size: 1,
        limit: 3,
        itemWidth: '124px',
        itemHeight: '124px',
        fileType: 'png,jpg,jpeg,git,bmp',
        type: 'image',
        uploadFn (opts) {
          console.log(fileService.uploadImage)
          return fileService.uploadImage(opts)
        }
      }
    }))

    function uploadFile (opts) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const n = Math.random() * 10
          console.log(n)
          n > 5 ? reject(new Error('请求错误')) : resolve({ ...opts.file, url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100.png' })
        }, 1000)
      })
    }

    function onSuccess (file, uploadFile, fileList) {
      console.log(file, uploadFile, fileList)
    }
    function onError (err, file, fileList) {
      console.log(err, file, fileList)
    }
    function onPreview (file) {
      console.log(file)
    }

    return () => <LayoutInfoThemeOne>
      <ExampleTabs>
        {{
          example: () => <>
            <ExampleBlock title='在CipForm中使用'>
              <CipForm v-models={[[model.value, 'model']]} fieldList={formFieldList} />
            </ExampleBlock>
            <ExampleBlock title='只有上传功能，看控制台输出（不传fileList，所以limit在这里也不生效）'>
              <CipUpload action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple uploadFile={opts => console.log(opts, opts.file)}></CipUpload>
            </ExampleBlock>
            <ExampleBlock title='自定义上传文件列表'>
              <CipUpload action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple v-model:fileList={fileList.value} show-file-list={false} limit={3} uploadFile={uploadFile}>
                {{
                  tip: () => 'jpg/png files with a size less than 500kb'
                }}
              </CipUpload>
              <File modelValue={fileList.value} />
            </ExampleBlock>
            <ExampleBlock title='自定义上传按钮样式（传入slots.default）'>
              <CipUpload action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple v-model:fileList={fileList.value} uploadFile={uploadFile} limit={3}>
                {{
                  default: () => <CipButton type="primary">上传</CipButton>,
                  tip: () => 'jpg/png files with a size less than 500kb'
                }}
              </CipUpload>
            </ExampleBlock>
            <ExampleBlock title='按钮形式'>
              <CipUpload action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple v-model:fileList={fileList.value} limit={3}
                uploadFile={uploadFile} onSuccess={onSuccess} onError={onError} onPreview={onPreview}>
                {{
                  tip: () => 'jpg/png files with a size less than 500kb'
                }}
              </CipUpload>
            </ExampleBlock>
            <ExampleBlock title='缩略图形式（list-type="picture-card"）'>
            <ElTag type="danger">UI设计搞，缺少上传失败状态</ElTag>
              <CipUpload action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple list-type="picture-card" v-model:fileList={fileList.value} uploadFile={uploadFile} limit={3}>
                {{
                  tip: () => 'jpg/png files with a size less than 500kb'
                }}
              </CipUpload>
            </ExampleBlock>
            <ExampleBlock title='拖拽形式（drag=true）'>
              <CipUpload action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple drag v-model:fileList={fileList.value} accept="image/png, image/jpeg" uploadFile={uploadFile} limit={3}>
                {{
                  tip: () => 'jpg/png files with a size less than 500kb'
                }}
              </CipUpload>
            </ExampleBlock>
            <ExampleBlock title='图标形式（list-type="picture"）'>
              <ElTag type="danger">UI设计搞，缺少删除按钮、上传中状态、上传失败状态</ElTag>
              <CipUpload action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple list-type="picture" v-model:fileList={fileList.value} uploadFile={uploadFile} limit={3}>
                {{
                  tip: () => 'jpg/png files with a size less than 500kb'
                }}
              </CipUpload>
            </ExampleBlock>
            <ExampleBlock title='文件夹上传'>
              <CipUpload action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple directory v-model:fileList={fileList.value} uploadFile={uploadFile} limit={3}>
                {{
                  default: () => <CipButton type="primary">上传文件夹</CipButton>,
                  tip: () => 'jpg/png files with a size less than 500kb'
                }}
              </CipUpload>
            </ExampleBlock>
          </>
        }}
      </ExampleTabs>
    </LayoutInfoThemeOne>
  }
}
