import Model, { transformData } from '@xigefish/utils/model'
// import req from '@xigefish/request'
import { privilegeEntity } from '@/api/entity'
class PrivilegeService extends Model {
  // 获取当前用户权限
  @transformData()
  list () {
    return { data: [] }
  }
}

export const privilegeService = new PrivilegeService(privilegeEntity)
