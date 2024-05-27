// micro-app __webpack_public_path__ 修改
import microApp from '@micro-zoe/micro-app'
// import '@xigefish/components/cip-subapp-container/micro-app/public-path'
import { render } from '@/render/index.js'
import { microAppRender, setPublicPath } from '@xigefish/micro-app/v3/base'
import 'element-plus/theme-chalk/index.css'
// @xigefish/components样式
import '@xigefish/styles'
// d-render组件样式
// import '@xigefish/d-render/style'
// element-ui时期使用的iconfont
import '@xigefish/plugins/element-icon/index.css'
// 项目全局样式
import '@/style/global.less'
// 项目iconfont(Deprecated)
import '@/assets/icon/iconfont.css'
// 项目svg-icon
import '@/assets/svg-icon'
// dayjs的中文库
import 'dayjs/locale/zh-cn'
// d-render组件配置
// import { DRender } from '@xigefish/d-render'
// import renderConfig from '../d-render.config'

import { request } from '@xigefish/request'
// @xigefish/request配置
import axiosConfig from '_config/axios-config'
// apiConfig配置，从proxyConfig中提取
import proxyConfig from '_config/proxy-config'
// 求错出错时的提示组件
import CipMessage from '@xigefish/components/cip-message'

import { menuService } from '@/api'

setPublicPath()
// const dRender = new DRender()
// dRender.setConfig(renderConfig)
request.use({ install: axiosConfig.customAxiosConfig })
request.setConfig({ ...axiosConfig, MessageError: CipMessage.error })
request.setApiConfig(proxyConfig)

if (window.__MICRO_APP_ENVIRONMENT__) {
  microAppRender(render, (cb) => {
    menuService
      .getManagerMenu()
      .then(res => {
        cb(res.data)
      })
  })
} else {
  // 独立时的渲染方式
  console.time('render')
  render().then((res) => {
    console.timeEnd('render')
  })
}

microApp.start({ 'disable-memory-router': true })
