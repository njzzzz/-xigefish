import { isNotEmpty } from './util'
const responseTimeFactory = () => (500 * Math.random() + 100) // 100 - 500 ms

export const mockRequest = ({ responseData, code, message }, method, apiName, url, data, config) => {
  return new Promise((resolve, reject) => {
    const delayTime = responseTimeFactory()
    setTimeout(() => {
      let response
      const { offset, limit } = data
      if (isNotEmpty(offset) && limit) {
        const total = responseData.length// offset + limit * 2
        response = {
          code,
          data: responseData.slice(offset, offset + limit),
          message,
          pageNum: Math.floor(offset / limit) + 1,
          offset: data.offset,
          limit: data.limit,
          total
        }
      } else {
        response = { code, data: responseData, message }
      }
      console.log('返回', response)
      console.log('返回延时:', delayTime)
      resolve(response)
    }, delayTime)
  })
}
