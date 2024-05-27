import { computed, defineComponent } from 'vue'
import { isInputEmpty } from '@xigefish/d-render-shared'
import { usePrivileges, useCollectPrivileges } from '@xigefish/hooks/use-privileges'
// 收集依赖用于下级的授权[注：export useCollectPrivileges 是为了兼容历史版本]
export {
  useCollectPrivileges,
  usePrivileges
}
export default defineComponent({
  name: 'CipJudgePrivilege',
  props: {
    privilege: [Object, String, Number] // 不支持
  },
  setup (props, { slots }) {
    const ownPrivileges = usePrivileges() // 当前拥有的权限 由provide下发
    const judgeType = computed(() => {
      if (typeof props.privilege === 'object' && props.privilege.type === 'and') {
        return 'and'
      }
      return 'or'
    })
    // 返回数组
    const privilegeValues = computed(() => {
      let codes = []
      if (typeof props.privilege === 'object') { // 判断是否为对象
        codes = codes.concat(props.privilege.code)
      } else {
        codes = codes.concat(props.privilege)
      }
      return codes
    })
    // 判断是否拥有特权
    const hasPrivilege = computed(() => {
      if (judgeType.value === 'or') { // 或模式 存在 '' ｜ undefined | null
        if (privilegeValues.value.findIndex(v => isInputEmpty(v)) > -1) return true
      }
      // 过滤掉 '' ｜ undefined | null
      const effectiveCodes = privilegeValues.value.filter(code => !isInputEmpty(code))
      if (effectiveCodes.length === 0) return true
      if (judgeType.value === 'and') {
        return !effectiveCodes.some(v => !ownPrivileges.value.includes(v))
      } else {
        return effectiveCodes.some(v => ownPrivileges.value.includes(v))
      }
    })

    return () => {
      if (!hasPrivilege.value) {
        // 渲染无权限插槽
        return slots.noPrivilege?.()
      } else {
        // 渲染默认插槽
        return slots.default?.()
      }
    }
  }
})
