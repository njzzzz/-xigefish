import { generateRouter } from '@/router'
import VueRouter from 'vue-router'
import Vue from 'vue'
import App from '@/App.vue'
export const render = async (props) => {
  const router = generateRouter(props)
  const instance = new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
  return {
    instance,
    router,
    VueRouter
  }
}
