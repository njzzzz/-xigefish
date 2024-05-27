import Model, { transformData } from '@xigefish/utils/model'

class AppService extends Model {
  @transformData()
  heartbeat () {
    console.log('send heartbeat')
  }
}

export const appService = new AppService()
