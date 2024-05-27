import Model from '@xigefish/utils/model'
// import { UploadFile } from '@xigefish/request'

class FileService extends Model {
  uploadImage ({ file }) {
    return {
      reject: undefined,
      send () {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = (e) => {
            setTimeout(() => resolve({ data: e.target.result }), 2000)
          }
        })
      },
      abort () {
      }
    }
    // 制造一个虚拟的接口
    // return new UploadFile({
    //   method: 'post'
    // })
  }

  uploadVideo ({ file }) {
    return {
      reject: undefined,
      send () {
        return new Promise((resolve, reject) => {
          resolve({ data: file })
        })
      },
      abort () {
      }
    }
  }
}

export const fileService = new FileService()
