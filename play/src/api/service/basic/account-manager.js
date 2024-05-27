import Model, { transformData } from '@xigefish/utils/model'
// import req from '@xigefish/request'
import { accountEntity } from '@/api/entity'
import { mockRequest } from '@xigefish/request'
import { mock, Random } from 'mockjs'
import { AdvanceFilter } from '@xigefish/utils/advance-filter'
import { isInputEmpty } from '@xigefish/d-render-shared'

const advanceFilter = new AdvanceFilter()
advanceFilter.setStrategy('>', (value, conditionValue) => value > conditionValue)
advanceFilter.setStrategy('in', (value, conditionValue) => { return conditionValue.includes(value) })

const searchFilterToScheme = (searchFilter) => Object.keys(searchFilter)
  .filter(key => !isInputEmpty(searchFilter[key]))
  .map(key => ({
    key,
    operator: '=',
    value: searchFilter[key]
  }))

// const conditions =
//   {
//     relation: 'or',
//     conditions: [
//       { key: 'sex', operator: '=', value: 'F' },
//       {
//         relation: 'and',
//         conditions: [
//           { key: 'sex', operator: '=', value: 'M' },
//           { key: 'status', operator: '=', value: 0 }
//         ]
//       }
//     ]
//   }

class AccountManagerService extends Model {
  accountList = mock({
    'data|500': [{
      'id|+1': 1,
      username: () => Random.name().replace(/ /g, ''),
      userName: () => Random.cname(),
      sex: () => Random.boolean() ? 'M' : 'F',
      birthday: () => Random.date('yyyy-MM'),
      status: () => Random.boolean(9, 1, true) ? 1 : 0,
      createTime: () => Random.date('yyyy-MM-dd hh:mm:ss'),
      'num|1-1000000': 1
    }]
  })

  @transformData()
  page (searchFilter, { offset, limit }) {
    const conditions = searchFilterToScheme(searchFilter)
    console.log(conditions)
    const data = advanceFilter.filter(this.accountList.data, conditions)
    return mockRequest({
      responseData: data,
      code: 200,
      message: '获取成功'
    }, 'get', 'apiBasic', '/api/v1/user/page', { ...searchFilter, offset, limit })
  }

  @transformData()
  info ({ id }) {
    const data = this.accountList.data.find(v => v.id === id)
    return mockRequest({
      responseData: data,
      code: 200,
      message: '获取成功'
    }, 'get', 'apiBasic', '/api/v1/user/{id}', { id })
  }

  create (data) {
    return mockRequest({
      responseData: data,
      code: 200,
      message: '添加成功'
    }, 'post', 'apiBasic', '/api/v1/user/add', data)
  }

  update (data) {
    return mockRequest({
      responseData: data,
      code: 200,
      message: '添加成功'
    }, 'post', 'apiBasic', '/api/v1/user/add', data)
  }

  delete (data) {
    return mockRequest({
      responseData: data,
      code: 200,
      message: '删除成功'
    }, 'delete', 'apiBasic', '/api/v1/user/delete', data)
  }
}

export const accountManagerService = new AccountManagerService(accountEntity)
