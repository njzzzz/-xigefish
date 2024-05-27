export interface IConfig {
  mergeFn?: any
  DEFAULT_SUCCESS_CODE?: string | number
  MessageError?: (message: string) => void
  appendTimestamp?: boolean
  CancelLoading?: ({ enableCancel, onCancel }: {enableCancel: boolean, onCancel: () => void}) => ({hide: ()=> void})
}

export type IProxyConfig = Array<{
  key: string
  target?: string
  productionTarget?: string
}>

export type IApiConfig = Record<string, string>

class Store {
  constructor () {
    this.setConfig = this.setConfig.bind(this)
    this.setApiConfig = this.setApiConfig.bind(this)
  }

  #config: IConfig = {}
  setConfig (val: IConfig) {
    this.#config = val
  }

  get config () {
    return this.#config
  }

  set config (_val) {
    throw new Error('不允许直接修改config')
  }

  #apiConfig: IApiConfig = {}

  setApiConfig (proxyConfig: IProxyConfig, mode = '') {
    let env = process.env.NODE_ENV
    if((window as Window & typeof globalThis &{ __MICRO_APP_ENVIRONMENT__?: boolean }).__MICRO_APP_ENVIRONMENT__){
      // 对子应用进行特殊处理
      if(mode) {
        env = mode
      }else{
        if (['localhost', '0.0.0.0', '127.0.0.1'].includes(location.hostname)) {
          env = 'development'
        } else {
          env = 'production'
        }
      }
    }
    const transformFn = env === 'development'
      ? (config: IProxyConfig[number]) => `/${config.key}`
      : (config: IProxyConfig[number]) => config.productionTarget

    this.#apiConfig = proxyConfig.reduce((acc , config) => {
      acc[config.key] = transformFn(config)
      return acc
    }, {} as IApiConfig)
  }

  get apiConfig () {
    return this.#apiConfig
  }

  set apiConfig (_val) {
    throw new Error('不允许直接修改apiConfig')
  }
}
const store = new Store()

export default store
