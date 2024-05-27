import Model, { transformData } from '@xigefish/utils/model'
// import req from '@xigefish/request'
import { mockRequest } from '@xigefish/request'
import { mock, Random } from 'mockjs'
class FetchTableDataService extends Model {
  tableList = mock({
    'data|5': [{
      'id|+1': 1,
      text: () => '文本内容',
      text1: () => '文本内容',
      text2: () => '文本内容',
      text3: () => '文本内容',
      text4: () => '文本内容',
      number: () => 380.00,
      status: () => Random.integer(0, 4),
      sortTextField: () => '文本内容',
      progress: () => 58,
      img: () => Random.image(),
      switch: () => Random.boolean(),
      sortNumberField: () => 380.00
    }]
  })

  @transformData()
  page (searchFilter, { offset, limit }) {
    const data = this.tableList.data
    return mockRequest({
      responseData: data,
      code: 200,
      message: '获取成功'
    }, 'get', 'apiTable', '/api/v1/table/page', { ...searchFilter, offset, limit })
  }
}

export const fetchTableDataService = new FetchTableDataService()
