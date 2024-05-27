import Service, { transformData } from '@xigefish/utils/model'
import req from '@xigefish/request'
class NpmService extends Service {
  @transformData({ cache: true })
  async list () {
    const data = await req({
      apiName: 'apiNpm',
      url: '/-/verdaccio/data/packages',
      options: {
        noSuccessCode: true,
        timeout: 0
      }
    })
    return {
      data: data.filter(v =>
        v.name.indexOf('@xigefish/') > -1 ||
        v.name.indexOf('@xigefish/page-layout-') > -1 ||
        v.name.indexOf('@cloud-site-frame/') > -1
      )
    }
  }

  @transformData()
  async page ({ name }, { offset, limit }) {
    const { data } = await this.list()
    const usageData = name ? data.filter(v => v.name.indexOf(name) > -1) : data
    return {
      data: usageData.slice(offset, offset + limit),
      offset,
      limit,
      total: usageData.length
    }
  }
}

export const npmService = new NpmService()
