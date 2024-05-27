export class SubQianKunProp<T> {
  static instance: InstanceType<typeof SubQianKunProp>
  config: T
  constructor () {
    if (!SubQianKunProp.instance) {
      SubQianKunProp.instance = this
    }
    return SubQianKunProp.instance as SubQianKunProp<T>
  }

  getConfig ():T {
    return this.config || ({} as T)
  }

  setConfig (config:T) {
    this.config = config
  }
}
