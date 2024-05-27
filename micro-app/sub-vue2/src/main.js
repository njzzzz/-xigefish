import { microAppRender } from '@xigefish/micro-app/v2/sub'
import Vue from 'vue'
import VueRouter from 'vue-router'
import { render } from '@/render'
// setPublicPath()
Vue.config.productionTip = false
if (window.__MICRO_APP_ENVIRONMENT__) {
  microAppRender(render, [{ name: 'about', pName: 'home', title: 'About' }], VueRouter)
} else {
  render().then(res => {
    console.log(res)
  })
}
