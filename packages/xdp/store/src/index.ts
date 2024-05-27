/**
 * 用于代替vuex的依赖
 */

import { reactive, readonly } from 'vue'
import * as defaultActions from './actions'

const storeActions = defaultActions

// 注册actions
const registerActions = (actions) => {
  Object.keys(actions).forEach(key => {
    const action = actions[key]
    // 当前开放对默认action的修改
    storeActions[key] = action
  })
}

const state = reactive({
  accountInfo: {},
  app: {}
})

const dispatch = (type, payload) => {
  const action = storeActions[type]
  if (action) {
    action.bind(this, { state, dispatch })(payload)
  } else {
    Error('type action not found!!')
  }
}

export default {
  // 如何保证多个唯一， 保证不了
  state: readonly(state),
  dispatch,
  registerActions
}
