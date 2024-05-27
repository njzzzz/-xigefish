import {
  cloneDeep,
  isEmptyObject,
  getFieldValue,
  setFieldValue,
  getValueByKey,
  getKeyByValue,
  isJson,
  isEmpty,
  isNotEmpty
} from '../util'



interface IAnyObject{
  [key: string]: any
}
type IFieldType = [InstanceType<typeof Model>] | InstanceType<typeof Model> | 'this' | ['this'] | StringConstructor | DateConstructor | NumberConstructor | BooleanConstructor
interface IField{
  field?: string
  type?: IFieldType
  default?: any
  map?: Map<any, any>
  array?: boolean
  json?:boolean
  ignoreToData?: boolean
  _renderConfig?: IAnyObject
}
type IConfig = Record<string, IField>

interface IModelConstructorOptions {
  part?: any
  ignoreEmpty?: boolean
}
type TConfigAttachProps = {
  _paramsTransform?: (...args: any) => any
}

export default class Model <T extends IConfig & TConfigAttachProps | 'this' | ['this'] = IConfig & TConfigAttachProps | 'this' | ['this'] > {
  options?: IModelConstructorOptions
  config?: IConfig
  paramsTransform: (...args: any) => any
  constructor (config: T = {} as T, options: IModelConstructorOptions = {}) {
    this.options = options
    this.config = this.formatConfig(config)
    this.paramsTransform = (config as IConfig & TConfigAttachProps )._paramsTransform
  }

  formatConfig (config = {}): Record<string, Partial<IField>> {
    const obj = {}
    // eslint-disable-next-line no-unused-vars
    for (const key in config) {
      if (key === '_paramsTransform') {
      } else {
        obj[key] = {}
        obj[key].type = config[key].type || String
        obj[key].field = config[key].field || key
        obj[key].default = config[key].default !== undefined ? config[key].default : getDefaultValue(config[key].type)
        obj[key].map = config[key].map !== undefined ? config[key].map : null
        obj[key].array = config[key].array
        obj[key].json = config[key].json // json转换配置，接口数据为json字符串
        obj[key].ignoreToData = config[key].ignoreToData
      }
    }
    return obj
  }

  // 接口数据转换为本地数据
  fromData (data = {}) {
    const config = this.config
    if (isEmptyObject(config)) {
      return data
    }
    const result = this.options.part ? cloneDeep(data) : {}
    // eslint-disable-next-line no-unused-vars
    for (const key in config) {
      // 获取值
      let value = getFieldValue(data, config[key].field)
      if (isNotEmpty(value) && config[key].type === Number && typeof value !== 'number') {
        value = Number(value)
      }
      // 做值映射
      const valueMapping = config[key].map
      if (valueMapping) {
        value = getValueByKey(value, valueMapping)
      }
      if (config[key].json && isJson(value)) { // json字符串转对象
        value = JSON.parse(value)
        // 将原始数据的JSON字符串也转对象
        setFieldValue(data, config[key].field, value)
      }
      // 当值为空时赋予配置中的默认值
      if (isEmpty(value) && !isEmpty(config[key].default)) {
        value = config[key].default
      }
      // 配置了不赋值undefined
      if (!(value === undefined && this.options.ignoreEmpty)) {
        result[key] = value
      } else {
        continue // 取消此次循环不进行一下步操作
      }
      switch (complexType(config[key].type)) {
        case 'complexArray':
          result[key] = (config[key].type[0] === 'this' ? this : config[key].type[0]).fromDataSet(result[key] || [])
          break
        case 'complexObject':
          {
            const type = config[key].type
            if (type === 'this') {
              if (!isEmpty(value)) result[key] = this.fromData(value) // 已经给值
            } else {
              // 复杂类型是否需要初始化一个值的问题
              result[key] = (isEmpty(value) && config[key].default !== undefined)
                ? config[key].default
                : (config[key].type as InstanceType<typeof Model>).fromData(result[key]) // 此处会导致死循环
            }
          }
          break
      }
    }
    return result
  }

  fromDataSet (data = []) {
    return data.map(v => this.fromData(v))
  }

  // 本地数据转换为结构数据
  toData (data = {}) {
    const config = this.config
    if (isEmptyObject(config)) {
      return data
    }
    const currentData = cloneDeep(data)
    let result = this.options.part ? cloneDeep(data) : {}
    // eslint-disable-next-line no-unused-vars

    Object.keys(config).reverse().forEach(key => {
      // if (config[key].ignoreToData) break; // 存在ignoreToData时不转化该数据()
      // // TODO: 此处key为带.字符串时将无法正常执行

      switch (complexType(config[key].type)) {
        case 'complexArray':
          currentData[key] = (config[key].type[0] === 'this' ? this : config[key].type[0]).toDataSet(currentData[key])
          break
        case 'complexObject':
          {
            const type = config[key].type
            if (type === 'this') {
              if (!isEmpty(currentData[key])) currentData[key] = this.toData(currentData[key])
            } else {
              currentData[key] = (isEmpty(currentData[key]) && config[key].default !== undefined)
                ? config[key].default
                : (config[key].type as InstanceType<typeof Model>).toData(currentData[key])
            }
          }

          break
      }
      let value = getFieldValue(currentData, key)
      // 复杂对象
      const valueMapping = config[key].map
      if (valueMapping) {
        value = getKeyByValue(value, valueMapping)
      }
      if (config[key].json && !isEmpty(value)) { // 对象转json字符串
        value = JSON.stringify(value)
      }
      // 当值为空时赋予配置中的默认值
      if (isEmpty(value) && !isEmpty(config[key].default)) {
        value = config[key].default
      }
      if (!(value === undefined && this.options.ignoreEmpty)) {
        setFieldValue(result, config[key].field, value)
      }
    })
    if (typeof this.paramsTransform === 'function') {
      result = this.paramsTransform(result)
    }

    return result
  }

  toDataSet (data = []) {
    return data.map(v => this.toData(v))
  }
}

const getDefaultValue = (type) => {
  switch (type) {
    case String: return undefined
    case Number: return undefined
    case Boolean: return undefined
    case Date: return undefined
    case Object: return {}
    case Array: return []
    default : return undefined
  }
}

// 判断是否复合类型并返回类型
const complexType = (val) => {
  if (val.constructor === Array) {
    if (val[0] instanceof Model || val[0] === 'this') {
      return 'complexArray'
    } else {
      return false
    }
  } else if (val instanceof Model || val === 'this') {
    return 'complexObject'
  } else {
    return false
  }
}

export function defineEntity<T extends Record<string, IField>>(entity: T): T {
  return entity as T
}

export type ExtractEntityTypes<O> = {
  [K in keyof O]?: InferPropType<O[K], O>
}
type DefaultFactory<T> = (props: Data) => T | null | undefined
export type Data = Record<string, unknown>
export interface PropOptions<T = any, D = T> {
  type?: PropType<T> | true | null
  required?: boolean
  default?: D | DefaultFactory<D> | null | undefined | object
  validator?(value: unknown): boolean
  /**
   * @internal
   */
  skipCheck?: boolean
  /**
   * @internal
   */
  skipFactory?: boolean
}
type PropConstructor<T = any> =
  | { new (...args: any[]): T & {} }
  | { (): T }
  | PropMethod<T>
type PropMethod<T, TConstructor = any> = [T] extends [
    ((...args: any) => any) | undefined
  ] // if is function with args, allowing non-required functions
    ? { new (): TConstructor; (): T; prototype: TConstructor } // Create Function like constructor
    : never
export type PropType<T> = PropConstructor<T> | PropConstructor<T>[]
export type Prop<T, D = T> = PropOptions<T, D> | PropType<T>
export type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N
type InferPropType<T, O> = [T] extends [null]
  ? any // null & true would fail to infer
  : [T] extends [{ type: null | true }]
  ? any // As TS issue https://github.com/Microsoft/TypeScript/issues/14829 // somehow `ObjectConstructor` when inferred from { (): T } becomes `any` // `BooleanConstructor` when inferred from PropConstructor(with PropMethod) becomes `Boolean`
  : [T] extends [{ type: ObjectConstructor }]
  ? Record<string, any>
  : [T] extends [{ type: BooleanConstructor }]
  ? boolean
  : [T] extends [{ type: DateConstructor }]
  ? Date

  : [T] extends [{ type: Model<infer X>[] }]
  ? X extends string
    ? ExtractEntityTypes<O>[]
    : ExtractEntityTypes<X>[]

  : [T] extends [{ type: Model<infer X> }]
  ? X extends string
    ? ExtractEntityTypes<O>
    : ExtractEntityTypes<X>

  : [T] extends [{ type: (infer U)[] }]
  ? U extends DateConstructor
    ? Date | InferPropType<U, O>
    : InferPropType<U, O>
  : [T] extends [Prop<infer V, infer D>]
  ? unknown extends V
    ? IfAny<V, V, D>
    : V

  : T
