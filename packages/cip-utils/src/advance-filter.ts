import { getFieldValue, isArray } from './util'
interface IFilterCondition {
  key: string
  operator: string // 内置 = 其余需要自己扩展
  value: any
}
type GroupCondition = IFilterGroup | IFilterCondition
interface IFilterGroup  {
  relation: 'and' | 'or' | undefined // 默认and
  conditions: Array<GroupCondition>
}
type TStrategy = (value: any, conditionValue: any) => boolean

interface IAdvanceFilter {
  setStrategy(operator: string, handler: TStrategy): void
  filter(list: Array<any>, group: IFilterGroup | Array<GroupCondition>): Array<any>
}

export class AdvanceFilter implements IAdvanceFilter{
  // 内置策略
  strategies = {
    '=': (value, conditionValue) => {
      return value === conditionValue
    }
  }

  constructor (strategies) {
    if (strategies) this.strategies = strategies
  }

  setStrategy (operator: string, handler: TStrategy) {
    this.strategies[operator] = handler
  }

  isGroup (condition) {
    return !!condition.conditions?.length
  }

  isCondition (condition) {
    const { key, operator } = condition
    return !!(key && operator)
  }

  conformConditions (item, conditions, relation = 'and') {
    for (let i = 0; i < conditions.length; i++) {
      let result
      const condition = conditions[i]
      if (this.isGroup(condition)) {
        result = this.isConform(item, condition)
      }
      if (this.isCondition(condition)) {
        const value = getFieldValue(item, condition.key)
        result = this.strategies[condition.operator](value, condition.value)
      }
      if (relation === 'or' && result === true) return true
      // 只要有一个不通过就不通过
      if (relation === 'and' && result === false) return false // and逻辑
    }
    if (relation === 'or') return false
    return true // and 逻辑
  }

  isConform (item, group) {
    return this.conformConditions(item, group.conditions, group.relation)
  }

  filter (list: Array<any>, x: IFilterGroup | Array<GroupCondition>) { // group || conditions
    const group = isArray(x)
      ? {
          relation: 'and',
          conditions: x
        }
      : x
    return list.filter(item => {
      // sample 版本
      return this.isConform(item, group) // .map(condition => isConform(condition, item))
    })
  }
}

// 测试代码
